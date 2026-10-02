---
title: "AudioCodes SBC e Microsoft Teams Direct Routing: configurazione, call routing, media e troubleshooting"
description: "Come integrare AudioCodes SBC con Microsoft Teams Direct Routing: FQDN, TLS, SIP trunk, voice routing, media bypass, numerazione, call flow e troubleshooting."
pubDatetime: 2026-10-02T06:35:00Z
draft: false
tags:
  - voip
  - audiocodes
  - microsoft-teams
  - direct-routing
  - sip
  - sbc
  - call-flow
  - troubleshooting
ogImage: /images/articles/audiocodes-sbc-microsoft-teams-direct-routing-hero.svg
---
## Introduzione

L'integrazione tra **Microsoft Teams Phone** e la rete telefonica pubblica tramite **Direct Routing** è uno degli scenari più interessanti nelle infrastrutture di Unified Communications enterprise.

Il principio è semplice: Microsoft Teams gestisce utenti, policy e servizi telefonici nel cloud, mentre un **Session Border Controller** collega il dominio Microsoft alla componente PSTN, ai carrier SIP e agli eventuali sistemi telefonici ancora presenti nell'infrastruttura aziendale.

Nella pratica, però, il funzionamento di una chiamata dipende da molti elementi che devono essere coerenti tra loro:

- DNS e FQDN
- certificati TLS
- signaling SIP
- voice routing di Teams
- configurazione dell'SBC
- normalizzazione della numerazione
- codec
- media RTP/SRTP
- NAT e firewall
- policy di sicurezza
- interoperabilità con il carrier

In questo articolo analizzo una soluzione basata su **AudioCodes SBC** come punto di interconnessione tra **Microsoft Teams Direct Routing** e un trunk SIP PSTN.

L'obiettivo non è fornire una configurazione da copiare senza adattamenti, ma descrivere il modello tecnico che utilizzo per progettare, verificare e diagnosticare questo tipo di integrazione.

![AudioCodes SBC e Microsoft Teams Direct Routing](/images/articles/audiocodes-sbc-microsoft-teams-direct-routing-hero.svg)

---

## Il ruolo di AudioCodes nel Direct Routing

Microsoft Teams Direct Routing richiede un **SBC certificato** tra Teams Phone e la rete telefonica esterna.

AudioCodes dispone di diversi modelli Mediant, oltre alle versioni virtuali e cloud, certificati per Direct Routing. In fase di progetto è comunque necessario verificare sempre la matrice Microsoft aggiornata relativa a modello e firmware supportati.

Dal punto di vista logico, l'SBC si trova esattamente al confine tra due domini:

**Microsoft Teams ↔ AudioCodes SBC ↔ SIP Carrier / PSTN**

Il ruolo dell'SBC non consiste semplicemente nell'inoltrare pacchetti SIP.

AudioCodes deve:

- terminare la sessione SIP proveniente da Microsoft
- instaurare una nuova relazione SIP verso il carrier
- controllare il routing delle chiamate
- normalizzare numeri e header
- gestire codec e SDP
- proteggere il dominio voce
- governare il percorso media
- fornire strumenti di logging e troubleshooting

È quindi più corretto considerarlo come un **punto di demarcazione e controllo** tra Microsoft 365 e l'infrastruttura telefonica.

---

## Architettura logica

Una configurazione tipica può essere rappresentata così:

**Teams Client → Microsoft Teams Phone → Direct Routing → AudioCodes SBC → SIP Carrier → PSTN**

L'SBC può inoltre collegarsi contemporaneamente ad altri sistemi:

- PBX tradizionali
- contact center
- gateway analogici
- fax
- citofoni
- sistemi di allarme
- piattaforme SIP legacy

Questa capacità di interconnessione è particolarmente utile durante le migrazioni verso Teams, perché permette di mantenere per un certo periodo una situazione ibrida.

---

## Prima della configurazione: FQDN, DNS e certificati

Uno dei primi elementi da progettare è l'identità pubblica dell'SBC.

Il Direct Routing utilizza un **FQDN**, ad esempio:

`teams-sbc.contoso.com`

Il dominio utilizzato nel nome dell'SBC deve essere coerente con un dominio registrato nel tenant Microsoft 365.

Il nome DNS deve risolvere verso l'indirizzo pubblico attraverso il quale Microsoft raggiunge l'SBC.

La relazione SIP tra Microsoft e AudioCodes utilizza **TLS**, quindi l'SBC deve presentare un certificato valido per il proprio FQDN.

La catena di certificazione deve essere considerata parte integrante del progetto.

Problemi apparentemente SIP possono infatti essere causati da:

- FQDN errato
- certificato scaduto
- CN/SAN non coerente
- catena CA incompleta
- DNS non corretto
- porta TLS non raggiungibile

Prima ancora di analizzare un INVITE conviene quindi verificare che la relazione di trasporto sia correttamente stabilita.

---

## La configurazione logica di AudioCodes

Una delle caratteristiche delle piattaforme AudioCodes è la suddivisione della configurazione in oggetti logici.

Per comprendere il call flow è utile avere chiaro il ruolo dei principali elementi.

### IP Interface

Definisce l'interfaccia IP utilizzata dal dispositivo.

In una configurazione complessa possono essere presenti reti differenti per:

- management
- signaling Teams
- signaling carrier
- media

### Media Realm

Definisce il contesto utilizzato per i flussi media.

Permette di associare indirizzi e intervalli di porte RTP/SRTP a uno specifico dominio.

### SIP Interface

Definisce il punto di ascolto SIP dell'SBC.

Qui vengono stabiliti elementi come:

- indirizzo locale
- protocollo
- porta
- TLS context
- relazione con il Media Realm

### Proxy Set

Rappresenta i server remoti con i quali AudioCodes instaura una relazione SIP.

Possono essere definiti Proxy Set distinti per:

- Microsoft Teams
- carrier SIP
- PBX
- piattaforme VoIP interne

### IP Group

L'IP Group rappresenta logicamente un dominio SIP.

È uno degli elementi più importanti perché permette di separare la logica relativa a Teams da quella del carrier.

Il principio è:

**IP Group Teams → dominio Microsoft**

**IP Group Carrier → dominio PSTN**

Tra questi due domini l'SBC applica routing, manipolazioni e criteri di interoperabilità.

---

## Collegare l'SBC al tenant Teams

Nel tenant Microsoft il Session Border Controller viene registrato come **PSTN Gateway**.

Il gateway utilizza l'FQDN pubblico configurato sull'SBC.

Concettualmente il tenant deve conoscere:

- FQDN dell'SBC
- porta SIP
- stato enabled/disabled
- eventuale utilizzo del Media Bypass
- opzioni relative agli header e al call history

Dopo la configurazione è fondamentale verificare che Teams consideri il gateway raggiungibile.

Un SBC presente nella configurazione ma non realmente connesso non rappresenta un'integrazione funzionante.

---

## Voice Routing: come Teams decide dove inviare una chiamata

Quando un utente Teams compone un numero PSTN, Microsoft deve determinare quale SBC utilizzare.

La logica si basa principalmente su:

**Voice Routing Policy → PSTN Usage → Voice Route → PSTN Gateway**

Una Voice Route può essere associata a un pattern numerico.

Ad esempio:

`^\+39\d+$`

può identificare una determinata classe di numerazioni italiane in formato E.164.

La route indica poi quale gateway Direct Routing utilizzare.

Questa separazione permette di creare scenari molto flessibili.

È possibile avere, ad esempio:

- un SBC per le chiamate nazionali
- un altro SBC per servizi internazionali
- gateway diversi per sedi differenti
- route di backup
- carrier multipli

Il punto importante è che Teams decide **a quale SBC consegnare la chiamata**, mentre l'SBC decide successivamente **come gestire il leg telefonico verso il carrier**.

---

## Il routing all'interno di AudioCodes

Quando AudioCodes riceve un INVITE da Teams, deve stabilire dove inoltrarlo.

Qui entra in gioco la logica **IP-to-IP Routing**.

Una regola può basarsi su diversi parametri, ad esempio:

- IP Group sorgente
- IP Group destinazione
- Called Number
- Calling Number
- Request URI
- classificazione del traffico

Un percorso tipico è:

**IP Group Teams → IP-to-IP Routing → IP Group Carrier**

Per una chiamata entrante:

**IP Group Carrier → IP-to-IP Routing → IP Group Teams**

In ambienti con più operatori o piattaforme legacy, la tabella di routing può diventare il vero centro della logica telefonica.

Per questo consiglio di mantenere regole leggibili e ordinate, evitando condizioni troppo generiche.

---

## Numerazione: utilizzare E.164 come riferimento

Uno degli elementi che generano più problemi nelle integrazioni telefoniche è la numerazione.

Teams lavora molto bene quando il numero viene normalizzato in formato **E.164**, ad esempio:

`+390212345678`

Il carrier potrebbe tuttavia richiedere:

`0212345678`

oppure:

`390212345678`

oppure ancora un formato specifico per il trunk.

L'SBC permette di mantenere separati i due domini.

Teams può continuare a utilizzare una numerazione coerente internamente, mentre AudioCodes converte il numero solo nel momento in cui la chiamata passa verso il carrier.

Lo stesso vale nella direzione opposta.

Una chiamata ricevuta come:

`0212345678`

può essere trasformata dall'SBC in:

`+390212345678`

prima di essere inviata a Teams.

Questo approccio evita di adattare l'intera configurazione Microsoft alle particolarità di ciascun operatore.

---

## Message Manipulation

La normalizzazione non riguarda soltanto il numero telefonico.

Due piattaforme SIP possono richiedere informazioni differenti all'interno degli header.

AudioCodes mette a disposizione le **Message Manipulations**, che consentono di modificare in modo controllato la segnalazione SIP.

Possono essere utilizzate per intervenire, ad esempio, su:

- From
- To
- Contact
- P-Asserted-Identity
- Diversion
- History-Info
- Request URI
- SDP

La manipulation non dovrebbe però diventare il primo strumento utilizzato quando una chiamata non funziona.

Prima bisogna comprendere il problema.

Una regola costruita senza conoscere il call flow può nascondere temporaneamente un'anomalia e crearne altre in scenari differenti.

Il metodo corretto è:

**trace → identificazione della differenza → modifica minima necessaria → nuovo test.**

---

## Call flow di una chiamata uscente

Consideriamo un utente Teams che chiama un numero PSTN.

### 1. Dialing

L'utente compone il numero.

Teams applica eventuali regole di normalizzazione e identifica la Voice Routing Policy assegnata.

### 2. Voice Route

Microsoft seleziona una Voice Route compatibile con il numero.

La route individua il PSTN Gateway associato all'AudioCodes SBC.

### 3. INVITE verso AudioCodes

Teams genera una sessione SIP verso l'SBC.

AudioCodes classifica il traffico come proveniente dall'IP Group Teams.

### 4. Routing interno

L'SBC verifica le regole IP-to-IP.

La chiamata viene destinata all'IP Group del carrier.

### 5. Normalizzazione

Prima dell'inoltro possono essere applicate:

- trasformazioni del Called Number
- trasformazioni del Calling Number
- Message Manipulations
- adattamenti SDP

### 6. INVITE verso il carrier

AudioCodes genera un nuovo leg SIP verso il provider PSTN.

Il carrier completa quindi l'instradamento verso la rete telefonica.

Il flusso può essere sintetizzato come:

**Teams → Voice Route → AudioCodes → IP-to-IP Routing → SIP Carrier → PSTN**

---

## Call flow di una chiamata entrante

La direzione opposta parte dal carrier.

### 1. INVITE dal carrier

AudioCodes riceve una chiamata destinata a un numero aziendale.

### 2. Classificazione

L'SBC riconosce il trunk e associa il messaggio all'IP Group corretto.

### 3. Manipolazione della numerazione

Il numero ricevuto viene eventualmente convertito nel formato utilizzato da Teams.

### 4. IP-to-IP Routing

L'SBC identifica Teams come dominio di destinazione.

### 5. INVITE verso Microsoft

La sessione viene presentata al Direct Routing.

### 6. Teams Phone

Microsoft identifica l'utente, il resource account o il servizio associato al numero e completa la chiamata.

Il percorso diventa:

**PSTN → SIP Carrier → AudioCodes → Direct Routing → Teams Phone → Utente**

---

## Signaling e media devono essere analizzati separatamente

Una delle regole più importanti nel troubleshooting VoIP è non confondere **SIP** e **media**.

Una chiamata può essere correttamente instaurata dal punto di vista della segnalazione e avere comunque:

- audio monodirezionale
- assenza totale di audio
- audio degradato
- disconnessioni

Il SIP descrive e negozia la sessione.

Il media trasporta la voce.

Sono due problemi differenti.

---

## Media attraverso Microsoft

Nel funzionamento standard del Direct Routing, il media può transitare attraverso i **Microsoft Media Processor**.

L'SBC negozia quindi il flusso SRTP con l'infrastruttura Microsoft.

Il firewall deve permettere il traffico richiesto verso gli indirizzi e le porte documentati da Microsoft.

Un errore frequente consiste nel configurare correttamente il TLS SIP e dimenticare che RTP/SRTP utilizza porte e percorsi differenti.

Il risultato tipico è:

**la chiamata squilla e si connette, ma non si sente nulla.**

---

## Media Bypass

Con il **Media Bypass**, quando l'architettura lo consente, il media può fluire direttamente tra il client Teams e l'SBC evitando il passaggio attraverso il Media Processor Microsoft.

Il signaling continua invece a coinvolgere l'infrastruttura Teams.

Questa distinzione è fondamentale:

**Signaling:** Teams ↔ SBC

**Media:** Client ↔ SBC

Il Media Bypass può ridurre il percorso del traffico voce, ma richiede una progettazione accurata di:

- routing
- firewall
- indirizzi pubblici
- NAT
- reachability dell'SBC

Microsoft raccomanda di verificare che il modello SBC utilizzato supporti effettivamente questa modalità e di seguire la documentazione del vendor.

---

## Codec

La negoziazione dei codec è un altro punto nel quale Teams, AudioCodes e carrier devono essere coerenti.

Tra i codec supportati negli scenari Direct Routing rientrano, a seconda del percorso media:

- SILK
- G.711
- G.722
- G.729
- AMR-WB in specifici scenari non bypass

L'SBC può adattare la negoziazione tra i due domini.

In un'analisi SIP è quindi importante leggere il contenuto SDP e verificare quali codec vengono:

- offerti
- accettati
- selezionati

Un errore di interoperabilità può produrre risposte come:

`488 Not Acceptable Here`

che richiedono l'analisi della negoziazione media, non soltanto del routing.

---

## TLS e SRTP

Un'integrazione Teams Direct Routing deve essere progettata considerando la sicurezza come requisito strutturale.

Il signaling verso Microsoft utilizza TLS.

Il media utilizza SRTP.

Questo significa che l'SBC non gestisce soltanto una relazione SIP tradizionale, ma deve operare con:

- certificati
- cipher
- TLS context
- secure media
- trusted peers

L'utilizzo dell'SBC come confine permette inoltre di non esporre direttamente il carrier o altri sistemi telefonici interni al dominio Microsoft.

---

## NAT e firewall

Il NAT è uno degli elementi più delicati nelle architetture SBC.

Nel SIP e nell'SDP possono essere presenti indirizzi utilizzati per stabilire sessioni e media.

Se l'SBC presenta un indirizzo non raggiungibile dal peer remoto, il signaling può funzionare ma il media fallirà.

Durante il troubleshooting verifico sempre:

1. indirizzo sorgente reale
2. indirizzo presentato nel SIP
3. indirizzo presentato nell'SDP
4. NAT applicato dal firewall
5. percorso di ritorno
6. porte RTP/SRTP aperte

Il concetto fondamentale è che l'SBC deve conoscere correttamente il rapporto tra:

**indirizzo locale → indirizzo NAT → peer remoto.**

---

## Troubleshooting: partire dal call flow

Quando una chiamata non funziona evito di modificare subito la configurazione.

Il primo obiettivo è capire **dove si interrompe il call flow**.

Domande iniziali:

- Teams ha generato l'INVITE?
- AudioCodes lo ha ricevuto?
- l'SBC ha identificato il corretto IP Group?
- quale regola IP-to-IP è stata applicata?
- AudioCodes ha inviato un INVITE al carrier?
- quale risposta è tornata?
- il media è stato negoziato?
- dove sono indirizzati i flussi RTP?

Questa sequenza permette di restringere rapidamente il problema.

---

## SIP response code: alcuni esempi utili

### 403 Forbidden

Può indicare una chiamata rifiutata per policy, autorizzazioni o identità non corretta.

Bisogna stabilire innanzitutto **chi ha generato il 403**.

Un 403 proveniente da Teams e uno proveniente dal carrier hanno significati completamente differenti.

### 404 Not Found

Può indicare che il numero o la destinazione non sono riconosciuti dal dominio che ha generato la risposta.

Anche in questo caso il punto fondamentale è identificare il leg SIP che ha prodotto l'errore.

### 488 Not Acceptable Here

Spesso richiede di controllare SDP, codec e parametri media.

### 503 Service Unavailable

Può indicare indisponibilità del peer, problemi di trunk, routing o condizioni temporanee del servizio.

L'errore deve sempre essere letto nel contesto del call flow completo.

---

## Audio monodirezionale

Il one-way audio è uno dei problemi più classici nelle infrastrutture VoIP.

Se la chiamata viene stabilita correttamente ma soltanto una parte sente l'altra, il problema è quasi sempre da ricercare nel percorso media.

Verifico:

- indirizzi SDP
- NAT
- Media Realm
- porte RTP
- firewall
- routing
- Media Bypass
- indirizzi pubblici e privati utilizzati dall'SBC

Un trace SIP può dimostrare che la chiamata è stata accettata, ma soltanto un'analisi del media permette di capire se RTP/SRTP sta realmente transitando in entrambe le direzioni.

---

## Quando il problema non è AudioCodes

L'SBC si trova in una posizione centrale e per questo viene spesso considerato automaticamente responsabile di ogni anomalia.

In realtà una chiamata può fallire per problemi presenti in qualunque dominio:

**Teams**
- voice policy errata
- voice route non compatibile
- utente non correttamente abilitato
- numero non assegnato

**AudioCodes**
- classificazione errata
- routing errato
- manipulation
- certificato
- media configuration

**Carrier**
- formato numerico non accettato
- trunk non autorizzato
- routing PSTN
- limitazioni del servizio

**Rete**
- firewall
- NAT
- DNS
- packet loss
- latenza
- porte media

Il compito del troubleshooting è identificare il dominio responsabile basandosi su evidenze, non su supposizioni.

---

## Un metodo operativo di troubleshooting

Il workflow che considero più efficace è:

### 1. Definire il problema

Esempio:

> chiamate outbound Teams → PSTN falliscono, inbound funzionanti.

Già questa informazione riduce notevolmente il campo di ricerca.

### 2. Riprodurre una singola chiamata

Utilizzare:

- numero chiamante noto
- numero chiamato noto
- timestamp preciso

### 3. Acquisire il trace

Analizzare la sessione sul lato AudioCodes.

### 4. Separare i due leg

**Teams ↔ AudioCodes**

e

**AudioCodes ↔ Carrier**

### 5. Individuare l'ultimo evento corretto

Qual è l'ultimo messaggio che segue il comportamento atteso?

### 6. Individuare la prima anomalia

Response code, numero errato, routing errato, SDP non coerente.

### 7. Modificare una sola variabile

Evitare modifiche multiple contemporaneamente.

### 8. Ripetere il test

Solo in questo modo è possibile stabilire una relazione causa-effetto.

---

## Monitoraggio e logging

Un SBC enterprise deve essere considerato anche come punto di osservabilità.

I dati più utili includono:

- registri SIP
- call detail
- sessioni attive
- stato dei Proxy Set
- statistiche sui trunk
- failure response
- informazioni media
- allarmi
- stato dei certificati

La disponibilità dei log permette di passare da:

> “la chiamata non funziona”

a:

> “Teams ha consegnato correttamente l'INVITE, AudioCodes ha applicato la route prevista, il carrier ha risposto 403 perché il Calling Number non è autorizzato”.

Questa differenza rappresenta il vero valore del troubleshooting strutturato.

---

## Best practice

In un progetto Teams Direct Routing con AudioCodes considero particolarmente importanti questi principi:

- utilizzare sempre SBC e firmware attualmente certificati
- mantenere una numerazione interna coerente, preferibilmente E.164
- separare chiaramente IP Group Teams e carrier
- utilizzare nomi descrittivi per Proxy Set, SIP Interface e routing
- limitare le Message Manipulation ai casi realmente necessari
- documentare ogni trasformazione applicata
- distinguere sempre signaling e media
- progettare NAT e firewall prima del go-live
- verificare certificati e scadenze
- acquisire trace di riferimento quando il sistema funziona
- testare chiamate inbound, outbound, trasferimenti e deviazioni
- verificare il comportamento in caso di indisponibilità di trunk o peer

---

## Conclusioni

**Microsoft Teams Direct Routing** consente di integrare Teams Phone con carrier e infrastrutture telefoniche esistenti mantenendo un elevato livello di controllo sulla connettività PSTN.

In questa architettura **AudioCodes SBC** rappresenta molto più di un semplice punto di transito.

L'SBC separa il dominio Microsoft dal dominio telefonico, controlla il call routing, normalizza la segnalazione, gestisce il media e fornisce gli strumenti necessari per analizzare il comportamento reale delle chiamate.

Per questo una buona implementazione non dovrebbe essere valutata soltanto verificando che una chiamata venga completata.

Una soluzione correttamente progettata deve essere:

**leggibile, documentata, sicura e soprattutto diagnosticabile.**

Quando Teams, AudioCodes e carrier vengono trattati come tre domini distinti collegati da call flow precisi, anche il troubleshooting diventa molto più efficace.
