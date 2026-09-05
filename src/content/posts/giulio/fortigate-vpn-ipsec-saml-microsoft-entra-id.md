---
title: "FortiGate: VPN IPsec con autenticazione SAML e Microsoft Entra ID"
description: "Come integrare una VPN IPsec remote access FortiGate con autenticazione SAML tramite Microsoft Entra ID: architettura, IKEv2, FortiClient, MFA, Conditional Access e troubleshooting."
pubDatetime: 2026-09-05T17:30:00Z
draft: false
tags:
  - networking
  - security
  - fortinet
  - fortigate
  - vpn
  - ipsec
  - saml
  - microsoft-365
  - entra-id
  - troubleshooting
ogImage: "/images/articles/fortigate-ipsec-saml-entra-hero.webp"
---

## Introduzione

L'accesso remoto alle risorse aziendali non è più soltanto un problema di cifratura del traffico. In un'infrastruttura moderna è altrettanto importante stabilire **chi sta richiedendo l'accesso, con quale identità e secondo quali criteri di sicurezza**.

Una VPN IPsec su **FortiGate** può essere integrata con **SAML** utilizzando **Microsoft Entra ID** come Identity Provider. In questo modello l'identità Microsoft 365 dell'utente diventa parte del processo di accesso alla rete: FortiGate protegge e termina la VPN, mentre Entra ID gestisce l'autenticazione federata e può applicare controlli come MFA e, dove previsto dalle licenze e dalle policy aziendali, Conditional Access.

È importante essere precisi sulla terminologia: si parla spesso di “autenticazione Microsoft 365”, perché l'utente utilizza lo stesso account aziendale con cui accede ai servizi Microsoft 365, ma **l'Identity Provider coinvolto nel flusso SAML è Microsoft Entra ID**.

Nelle versioni attuali documentate da Fortinet, l'autenticazione SAML per FortiClient remote-access IPsec richiede **FortiClient 7.2.4 o successivo** ed è supportata con **IKEv2**. Questo rende la soluzione particolarmente interessante quando si vuole spostare l'accesso remoto da credenziali locali o repository separati verso un'identità aziendale centralizzata.

![FortiGate utilizzato come gateway VPN IPsec remote access con autenticazione SAML tramite Microsoft Entra ID](/images/articles/fortigate-ipsec-saml-entra-hero.webp)

---

## Il punto centrale: separare trasporto VPN e autenticazione

IPsec e SAML svolgono due funzioni differenti.

**IPsec** costruisce il canale protetto tra endpoint e FortiGate. Gestisce quindi negoziazione IKE, cifratura, integrità, Security Association e trasporto del traffico attraverso il tunnel.

**SAML**, invece, interviene sul piano dell'identità. FortiGate opera come **Service Provider (SP)** e Microsoft Entra ID come **Identity Provider (IdP)**. FortiClient rende possibile il passaggio dell'utente attraverso il flusso di autenticazione web necessario a completare la federazione.

Il risultato è un'architettura nella quale la VPN non dipende necessariamente da una password mantenuta localmente sul firewall. L'utente viene autenticato attraverso l'infrastruttura di identità aziendale e FortiGate utilizza l'esito della procedura SAML per autorizzare la connessione VPN.

![Architettura logica di una VPN IPsec FortiGate con SAML e Microsoft Entra ID](/images/articles/fortigate-ipsec-saml-entra-architecture.webp)

---

## Come avviene il flusso di autenticazione

Quando l'utente seleziona il tunnel IPsec in FortiClient e avvia la connessione, il processo coinvolge più componenti.

In forma semplificata, il flusso è il seguente:

1. **FortiClient avvia la connessione verso FortiGate** e contatta il servizio utilizzato per l'autenticazione IKE/SAML.
2. **FortiGate genera la richiesta SAML** e indica a FortiClient l'Identity Provider configurato.
3. FortiClient apre il contesto web necessario e l'utente viene indirizzato verso **Microsoft Entra ID**.
4. Entra ID autentica l'utente secondo le policy previste dal tenant. In questa fase possono entrare in gioco MFA e gli altri controlli di identità configurati dall'organizzazione.
5. Dopo l'autenticazione, Entra ID produce la **SAML Response**, contenente le assertion necessarie e gli attributi previsti dalla configurazione.
6. La risposta viene restituita al FortiGate attraverso FortiClient.
7. FortiGate valida la risposta SAML, verifica l'identità e l'eventuale appartenenza ai gruppi autorizzati.
8. Se autenticazione e autorizzazione hanno esito positivo, prosegue la negoziazione della VPN IPsec IKEv2 e viene stabilito il tunnel.

Questa distinzione è fondamentale nel troubleshooting: **una sessione SAML correttamente autenticata non garantisce da sola che il tunnel IPsec possa trasportare traffico**, così come una configurazione IPsec formalmente corretta non garantisce che l'autenticazione federata venga completata.

---

## Prerequisiti da verificare prima della configurazione

Prima di costruire il tunnel conviene validare alcuni elementi architetturali.

Il FortiGate deve essere raggiungibile dall'esterno attraverso un **FQDN stabile**, preferibilmente associato a un certificato server attendibile. Utilizzare un nome coerente evita differenze tra gli URL configurati nell'applicazione SAML e quelli realmente utilizzati da FortiClient.

Occorre inoltre verificare:

- versione FortiOS compatibile con il modello di configurazione scelto;
- **FortiClient 7.2.4 o successivo** per l'autenticazione SAML su IPsec;
- utilizzo di **IKEv2**;
- certificato valido sul FortiGate per il servizio esposto;
- risoluzione DNS pubblica del gateway VPN;
- connettività tra client, FortiGate e endpoint Microsoft necessari all'autenticazione;
- tenant Microsoft Entra ID disponibile per la configurazione dell'Enterprise Application;
- utenti o gruppi Entra ID che dovranno essere autorizzati alla VPN;
- piano di indirizzamento per l'IP pool assegnato ai client remoti;
- policy firewall e routing verso le reti aziendali raggiungibili dal tunnel.

La compatibilità deve sempre essere verificata sulla documentazione della **specifica release FortiOS/FortiClient in produzione**. La sintassi e alcune opzioni cambiano nel tempo; copiare una configurazione appartenente a una release diversa è una delle cause più comuni di troubleshooting inutile.

---

## Il ruolo del certificato

Il certificato presentato dal FortiGate non è un dettaglio estetico.

FortiClient deve poter raggiungere il gateway e stabilire una relazione TLS coerente durante il flusso di autenticazione. Un certificato pubblico associato al nome DNS del gateway riduce warning, ambiguità e problemi di trust.

In un ambiente enterprise eviterei, quando possibile, di basare l'esperienza dell'utente su certificati self-signed accettati manualmente.

Il nome utilizzato nel certificato, il FQDN configurato sul client e gli URL utilizzati nell'integrazione SAML dovrebbero rappresentare **lo stesso servizio logico**.

---

## Configurazione lato Microsoft Entra ID

Sul tenant Microsoft, FortiGate deve essere rappresentato come applicazione enterprise per l'autenticazione SAML.

La configurazione ruota intorno a tre elementi:

- **Identifier / Entity ID**, che identifica il Service Provider;
- **Reply URL / Assertion Consumer Service URL**, verso cui viene restituita la risposta SAML;
- informazioni dell'Identity Provider, tra cui URL di login, Entity ID e certificato di firma.

I valori devono corrispondere esattamente a quelli utilizzati sul FortiGate. Errori apparentemente minimi — schema `https`, porta, FQDN, slash finali o URL non coincidenti — possono interrompere il processo.

Dopo la configurazione dell'applicazione è necessario assegnare gli utenti o, preferibilmente in un ambiente strutturato, **i gruppi autorizzati alla VPN**.

Questo permette di evitare che il semplice possesso di un account nel tenant equivalga automaticamente al diritto di aprire una VPN verso la rete aziendale.

---

## SAML claims e gruppi

L'autenticazione risponde alla domanda “chi è l'utente?”. L'autorizzazione deve rispondere a una seconda domanda: **questo utente può utilizzare questa VPN?**

Per questo la gestione degli attributi SAML e dei gruppi è importante.

FortiGate può utilizzare le informazioni contenute nelle assertion per associare l'utente al gruppo previsto dalle regole di accesso. La configurazione deve essere coerente tra il claim emesso da Entra ID e l'attributo che FortiGate si aspetta di ricevere.

In ambienti con molti gruppi Microsoft è necessario prestare attenzione anche alla struttura dei group claims. Il principio progettuale resta semplice: inviare e utilizzare **solo le informazioni realmente necessarie per l'autorizzazione**, mantenendo chiara la relazione tra gruppo Entra ID, gruppo FortiGate e policy VPN.

---

## Importazione del certificato dell'Identity Provider

FortiGate deve poter verificare la firma della risposta proveniente dall'Identity Provider.

Il certificato SAML esportato da Microsoft Entra ID viene quindi importato sul FortiGate come certificato remoto e associato alla configurazione del server SAML.

Questo passaggio è essenziale: SAML non deve essere interpretato come un semplice redirect verso una pagina Microsoft. Il valore del protocollo sta proprio nella possibilità per il Service Provider di **validare crittograficamente la risposta dell'Identity Provider**.

Nelle release FortiOS più recenti è inoltre importante verificare i requisiti relativi alla firma di response e assertion. Fortinet documenta, ad esempio, che a partire da FortiOS 7.6.4 è richiesta la verifica della firma dei messaggi SAML e raccomanda di configurare sul provider la firma della response e dell'assertion.

---

## Configurazione SAML sul FortiGate

Sul FortiGate viene definito il server SAML che rappresenta la relazione di trust con Microsoft Entra ID.

Concettualmente la configurazione contiene:

- nome dell'oggetto SAML;
- Entity ID del FortiGate;
- URL di Single Sign-On/ACS del Service Provider;
- Entity ID di Microsoft Entra ID;
- URL di login dell'Identity Provider;
- certificato remoto utilizzato per verificare la firma;
- attributi utilizzati per identificare username e gruppi.

I valori esatti non dovrebbero essere inventati o riutilizzati da un altro ambiente: **devono essere ricavati dalla configurazione effettiva dell'Enterprise Application Entra ID e dal FQDN del gateway VPN**.

Fortinet prevede inoltre una porta dedicata all'autenticazione SAML per IKE, configurabile attraverso `auth-ike-saml-port`. Nella documentazione corrente il valore predefinito indicato è TCP/1001. In determinate release FortiOS è possibile utilizzare configurazioni differenti, incluso l'allineamento con la porta IKE su TCP: anche questo punto va verificato rispetto alla versione installata.

---

## Perché IKEv2

Con FortiClient moderno, l'autenticazione SAML per remote-access IPsec è legata a **IKEv2**.

Non si tratta soltanto di sostituire IKEv1 con una versione più recente. Il modello di autenticazione deve permettere l'interazione necessaria tra client, FortiGate e Identity Provider.

Fortinet documenta che con questa configurazione l'autenticazione utente viene gestita attraverso **EAP** nel contesto IKEv2.

Da un punto di vista operativo, questo significa che durante il troubleshooting bisogna distinguere almeno tre livelli:

**raggiungibilità del gateway → autenticazione SAML → negoziazione IKEv2/IPsec**.

Se si analizza soltanto l'ultimo livello si rischia di cercare problemi crittografici quando in realtà il processo si è fermato sull'identità.

---

## Configurazione del tunnel IPsec remote access

Una volta definita la componente SAML, il tunnel IPsec deve essere configurato come remote access/dial-up coerentemente con il client FortiClient.

Gli elementi principali sono:

- IKEv2;
- interfaccia WAN su cui viene terminata la VPN;
- autenticazione utente associata al gruppo SAML;
- algoritmi crittografici compatibili tra FortiGate e FortiClient;
- pool di indirizzi assegnato agli utenti remoti;
- DNS da fornire ai client, quando necessario;
- reti protette raggiungibili attraverso il tunnel;
- full tunnel o split tunnel in funzione del progetto;
- policy firewall dal tunnel verso le destinazioni autorizzate.

Il tunnel non dovrebbe essere considerato concluso quando lo stato diventa “up”. La verifica deve arrivare fino al **flusso applicativo reale**.

---

## Full tunnel o split tunnel

La scelta tra full tunnel e split tunnel è architetturale.

Con **full tunnel**, il traffico del client viene instradato attraverso il FortiGate secondo il perimetro definito dalla configurazione. Questo aumenta il controllo centralizzato ma può incrementare consumo di banda, dipendenza dalla sede e carico di ispezione.

Con **split tunnel**, soltanto le reti aziendali previste vengono inviate nella VPN, mentre il resto del traffico continua a utilizzare l'accesso Internet locale dell'utente.

Non esiste una scelta universalmente corretta. Devono essere considerati requisiti di sicurezza, applicazioni SaaS, modello operativo, capacità del gateway, policy aziendali e necessità di ispezione.

L'integrazione SAML non modifica questo principio: **identità e percorso del traffico restano due decisioni separate**.

---

## MFA: uno dei vantaggi principali dell'integrazione

Uno dei motivi più forti per integrare la VPN con Microsoft Entra ID è poter utilizzare il modello di autenticazione già governato dall'organizzazione.

Se il tenant richiede MFA per l'accesso VPN, la verifica aggiuntiva avviene nel processo di autenticazione Microsoft prima che FortiGate accetti l'identità.

In questo modo non è necessario creare un secondo universo di credenziali soltanto per il firewall.

La VPN entra invece nel modello aziendale di Identity and Access Management, nel quale account disabilitati, requisiti MFA e policy di accesso possono essere gestiti centralmente.

Questo non elimina la necessità di configurare correttamente FortiGate. Riduce però il rischio di avere identità VPN scollegate dal ciclo di vita dell'utente aziendale.

---

## Conditional Access: identità non significa soltanto password

Quando l'ambiente Microsoft e le licenze utilizzate lo consentono, **Conditional Access** permette di aggiungere condizioni alla decisione di autenticazione.

La logica può considerare elementi come utente, gruppo, rischio, posizione, requisiti MFA e altre condizioni definite dall'organizzazione.

Il principio interessante è che il FortiGate non deve replicare tutta questa logica localmente. Il firewall delega l'autenticazione all'Identity Provider e riceve il risultato del processo federato.

È comunque fondamentale testare attentamente le policy: una regola Conditional Access troppo aggressiva può bloccare l'accesso remoto proprio nel momento in cui l'utente ne ha bisogno.

---

## Policy firewall dopo l'autenticazione

Autenticare correttamente un utente non significa concedergli accesso indiscriminato alla LAN.

Dopo l'instaurazione del tunnel entrano in gioco le normali policy FortiGate.

Il traffico dovrebbe essere autorizzato secondo il principio di **least privilege**:

**VPN users → risorse necessarie → servizi necessari**.

Una policy generica dal pool VPN verso “all” può essere semplice da far funzionare, ma riduce drasticamente il valore della segmentazione.

In un ambiente enterprise è preferibile distinguere, quando necessario, accesso ai server, management, applicazioni interne, servizi infrastrutturali e altre destinazioni sensibili.

L'identità determina chi può entrare. **Le policy determinano cosa può fare una volta entrato.**

---

## DNS, routing e reti raggiungibili

Molti problemi attribuiti alla VPN sono in realtà problemi di routing o DNS.

Un utente può autenticarsi correttamente, ricevere un indirizzo IP e avere il tunnel attivo, ma non riuscire ad aprire un'applicazione interna.

Il troubleshooting deve verificare:

- indirizzo assegnato al client;
- route installate sull'endpoint;
- subnet incluse nello split tunnel;
- route di ritorno verso il pool VPN;
- policy FortiGate;
- eventuale NAT;
- DNS assegnato al client;
- risoluzione dei nomi interni;
- MTU e frammentazione quando il problema interessa soltanto determinati flussi.

La domanda corretta non è quindi soltanto “la VPN è connessa?”, ma **“il percorso completo client → FortiGate → risorsa → FortiGate → client è coerente?”**.

---

## FortiClient e l'esperienza dell'utente

Dal punto di vista dell'utente, il vantaggio di SAML è evidente quando il flusso è progettato bene.

L'utente seleziona la VPN, viene presentata l'autenticazione Microsoft, completa eventualmente l'MFA e ottiene il tunnel senza dover ricordare una password VPN separata.

Per ottenere questa esperienza servono però coerenza tra configurazione FortiClient e FortiGate, trust del certificato, raggiungibilità degli endpoint e corretta gestione della sessione web utilizzata da SAML.

In ambienti gestiti con FortiClient EMS, il profilo VPN può essere distribuito centralmente, riducendo configurazioni manuali e differenze tra endpoint.

---

## Troubleshooting: dividere il problema per livelli

Una metodologia efficace evita di modificare contemporaneamente SAML, IPsec e firewall policy.

### 1. Raggiungibilità

Verificare che il client risolva correttamente il FQDN VPN e raggiunga il FortiGate sulle porte previste dall'architettura.

### 2. Certificato

Controllare validità, catena di trust, nome del certificato e corrispondenza con il gateway configurato.

### 3. Redirect verso Entra ID

Se non compare l'autenticazione Microsoft, il problema è ancora prima dell'IPsec vero e proprio. Vanno controllati configurazione SAML, URL, porta IKE/SAML e raggiungibilità.

### 4. Login Microsoft riuscito ma VPN negata

In questo caso è necessario analizzare assertion, claim, gruppi, utenti assegnati all'Enterprise Application e mapping sul FortiGate.

### 5. Autenticazione riuscita ma IKEv2 fallisce

Il focus si sposta su Phase 1, EAP, proposte crittografiche, certificati e compatibilità FortiClient/FortiOS.

### 6. Tunnel attivo ma applicazioni irraggiungibili

A questo livello SAML non è più il primo sospettato. Bisogna analizzare routing, policy, split tunnel, DNS, NAT e percorso di ritorno.

Questa separazione riduce drasticamente il tempo perso nel troubleshooting.

---

## Logging e diagnostica

Per un problema SAML/IPsec è utile correlare gli eventi invece di leggere un singolo log isolato.

L'obiettivo è ricostruire una timeline:

**connessione FortiClient → richiesta SAML → autenticazione Entra ID → risposta SAML → autorizzazione → IKEv2 → creazione del tunnel → traffico utente**.

Sul FortiGate i debug di autenticazione e IKE possono fornire informazioni molto dettagliate, ma in produzione devono essere utilizzati con criterio, filtrando quando possibile il client o la sessione interessata e disattivandoli dopo la raccolta.

Anche i log di sign-in di Microsoft Entra ID sono fondamentali: permettono di capire se l'utente è arrivato all'Identity Provider, quale policy è stata applicata e perché un'autenticazione è stata consentita o negata.

---

## Aspetti di sicurezza da non trascurare

SAML migliora la centralizzazione dell'identità, ma non rende automaticamente sicura una VPN configurata male.

Restano fondamentali:

- aggiornare FortiOS e FortiClient secondo il ciclo di patching aziendale;
- utilizzare certificati validi e algoritmi crittografici adeguati;
- limitare l'accesso VPN ai gruppi realmente autorizzati;
- applicare MFA dove previsto dal modello di sicurezza;
- evitare policy firewall eccessivamente permissive;
- monitorare autenticazioni anomale e tentativi falliti;
- rimuovere tempestivamente l'accesso quando cambia il ruolo dell'utente;
- verificare periodicamente l'Enterprise Application e i relativi certificati SAML;
- documentare FQDN, Entity ID, Reply URL, gruppi e dipendenze del servizio.

Particolare attenzione va dedicata alla **scadenza dei certificati SAML**. Una configurazione perfettamente funzionante può interrompersi quando il certificato di firma dell'Identity Provider cambia o scade e il FortiGate continua a utilizzare il certificato precedente.

---

## Perché questa architettura è interessante in un ambiente Microsoft 365

In un'organizzazione che utilizza già Microsoft 365, Entra ID rappresenta spesso il punto centrale del ciclo di vita delle identità.

Integrare FortiGate con questo modello evita di mantenere un database VPN parallelo e permette di collegare l'accesso remoto alle stesse identità utilizzate per Teams, Exchange Online, SharePoint e gli altri servizi aziendali.

Il beneficio più importante non è il Single Sign-On in sé.

È la **coerenza operativa dell'identità**: quando un account viene disabilitato o perde l'appartenenza al gruppo autorizzato, anche il diritto di autenticarsi alla VPN può essere governato attraverso lo stesso processo centrale.

---

## Conclusioni

Una VPN IPsec FortiGate con autenticazione SAML tramite Microsoft Entra ID unisce due domini che devono essere progettati insieme ma diagnosticati separatamente: **connettività sicura e identità**.

FortiGate continua a svolgere il ruolo di gateway e punto di enforcement della rete. Microsoft Entra ID diventa invece il riferimento per l'autenticazione federata dell'utente, consentendo di integrare MFA e le policy di identità previste dall'organizzazione.

La qualità della soluzione dipende soprattutto dalla coerenza tra i componenti: FQDN, certificati, Entity ID, Reply URL, claim, gruppi, IKEv2, FortiClient, routing e firewall policy devono descrivere la stessa architettura.

Quando questa coerenza viene mantenuta, l'accesso remoto smette di essere una configurazione isolata sul firewall e diventa parte del modello complessivo di sicurezza e gestione delle identità aziendali.

---

## Riferimenti tecnici

Per implementazioni operative è opportuno verificare sempre la documentazione Fortinet relativa alla release effettivamente utilizzata:

- Fortinet Document Library — SAML-based authentication for FortiClient remote access VPNs
- Fortinet Document Library — Configuring Microsoft Entra ID as SAML IdP and FortiGate as SAML SP
- Fortinet Document Library — IPsec VPN SAML-based authentication

Le opzioni disponibili e alcuni requisiti possono variare tra release FortiOS e FortiClient; la documentazione della versione installata deve quindi prevalere su qualsiasi esempio generico.