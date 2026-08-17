---
title: "Infrastruttura enterprise protetta e gestita da FortiGate"
description: "Come progettare una rete enterprise in cui FortiGate diventa il punto centrale di controllo e sicurezza: segmentazione, policy, routing, VPN, ispezione, alta affidabilità, logging e troubleshooting."
pubDatetime: 2026-08-17T18:35:00Z
draft: false
tags:
  - networking
  - security
  - fortinet
  - fortigate
  - vlan
  - routing
  - vpn
  - ipsec
  - troubleshooting
---
## Introduzione

Quando un'infrastruttura enterprise viene protetta e governata attraverso **FortiGate**, il firewall non è più soltanto il dispositivo che separa la LAN da Internet.

Diventa un punto di controllo attraverso cui convergono **segmentazione, routing, accesso tra reti, connettività WAN, VPN, ispezione del traffico, logging e gestione della sicurezza**.

È proprio questa centralità a rendere il progetto interessante, ma anche delicato.

Se FortiGate viene trattato come un semplice apparato perimetrale, si perde gran parte del valore architetturale che può offrire. Se invece viene usato come nodo decisionale della rete, ogni flusso importante deve essere pensato in termini di **origine, destinazione, policy, servizio, identità, livello di ispezione e percorso**.

In questo articolo considero una realtà aziendale ipotetica con una sede principale, più VLAN interne, servizi pubblicati, collegamenti verso sedi remote e accesso a Internet. L'obiettivo non è descrivere una configurazione specifica, ma ragionare su come strutturare una rete nella quale **FortiGate rappresenta il punto di enforcement e visibilità dell'infrastruttura**.

---

## Il principio di base: sicurezza e routing non sono due mondi separati

In molte reti tradizionali il routing viene progettato prima e la sicurezza viene aggiunta dopo.

Lo switch di core instrada il traffico tra le VLAN, il firewall protegge l'uscita verso Internet e solo una parte dei flussi attraversa realmente il sistema di sicurezza.

Questa impostazione può essere perfettamente valida in alcuni contesti, ma quando si decide di affidare a FortiGate il controllo della rete enterprise cambia il principio progettuale.

Il traffico tra domini differenti deve attraversare un punto nel quale sia possibile stabilire **se quel flusso è consentito, con quali servizi, con quale livello di ispezione e con quale tracciabilità**.

Il percorso logico diventa quindi qualcosa di simile a:

**Client → Switch di accesso → VLAN → FortiGate → Policy → Destinazione**

La destinazione può essere Internet, un server interno, una DMZ, una rete guest, una sede remota oppure un altro segmento della stessa LAN.

Il vantaggio non è semplicemente avere “più firewalling”. Il vantaggio è costruire una rete nella quale i confini tra i diversi domini sono espliciti e osservabili.

---

## FortiGate come punto centrale di enforcement

In uno scenario di questo tipo FortiGate svolge contemporaneamente più funzioni.

Gestisce il traffico che entra ed esce dalla rete, ma può anche diventare il gateway di più segmenti VLAN, controllare il traffico inter-VLAN, terminare tunnel IPsec, applicare policy di sicurezza e registrare gli eventi rilevanti.

L'aspetto più importante è evitare di vedere queste funzioni come moduli indipendenti.

Una policy firewall, ad esempio, non è soltanto una regola “source-destination-service”. È parte di una decisione architetturale più ampia: determina quale segmento può parlare con quale altro segmento, su quali porte, con quali profili di sicurezza e attraverso quale percorso.

Lo stesso vale per il routing.

Una rotta non stabilisce soltanto dove inviare un pacchetto. In una rete governata da FortiGate contribuisce a determinare **quale interfaccia e quale policy verranno coinvolte nel flusso**.

Per questo il troubleshooting deve sempre considerare insieme routing e security policy.

---

## Segmentazione: il primo vero livello di sicurezza

Una rete enterprise non dovrebbe essere trattata come un unico dominio piatto.

Utenti, server, apparati di rete, telefoni IP, sistemi di videosorveglianza, dispositivi IoT, reti guest e servizi pubblicati hanno requisiti differenti e non dovrebbero condividere indiscriminatamente lo stesso livello di fiducia.

La segmentazione tramite VLAN permette di separare logicamente questi domini, ma la VLAN da sola non costituisce una misura di sicurezza sufficiente.

Il punto decisivo è **dove avviene il routing tra i segmenti**.

Se tutto il traffico inter-VLAN viene instradato direttamente dal core switch, FortiGate non vede quei flussi e non può applicare policy o ispezione.

Se invece il routing dei segmenti critici viene portato sul FortiGate, il traffico tra le diverse zone deve attraversare il firewall.

A quel punto la segmentazione diventa realmente enforceable.

Un esempio concettuale potrebbe prevedere:

- VLAN utenti;
- VLAN server;
- VLAN management;
- VLAN VoIP;
- VLAN guest;
- VLAN IoT;
- DMZ.

La parte importante, però, non è l'elenco delle VLAN. È il modello di fiducia che rappresentano.

La rete management dovrebbe avere privilegi molto differenti rispetto alla rete guest. La VLAN IoT non dovrebbe poter iniziare liberamente connessioni verso i server aziendali. La rete utenti dovrebbe raggiungere solo i servizi realmente necessari.

È questa logica a trasformare la segmentazione da semplice organizzazione della rete a **controllo del rischio**.

---

## Interfacce, VLAN e zone di sicurezza

Quando il numero di interfacce logiche cresce, ragionare solo in termini di porte fisiche diventa poco efficace.

FortiGate permette di associare le policy alle interfacce VLAN oppure di raggruppare interfacce con ruolo simile in **zone**.

Le zone possono essere utili per evitare una proliferazione incontrollata di regole quasi identiche, ma devono essere utilizzate con criterio.

Inserire troppe reti differenti nella stessa zona può nascondere differenze di sicurezza che invece dovrebbero rimanere esplicite.

Una buona regola progettuale è che una zona dovrebbe rappresentare segmenti con comportamento e livello di fiducia realmente simili.

L'obiettivo non è ridurre il numero di policy a tutti i costi, ma mantenere il firewall **leggibile**.

La leggibilità è un requisito tecnico.

Una configurazione difficile da interpretare aumenta il rischio di errori, rende il troubleshooting più lento e complica ogni futura modifica.

---

## Le policy firewall come rappresentazione dei flussi reali

Una policy ben progettata dovrebbe descrivere un flusso reale e comprensibile.

Per esempio:

**Utenti → Server applicativi → HTTPS**

oppure:

**Management → Apparati di rete → SSH / HTTPS / SNMP**

Questo è molto diverso da una regola generica che permette a una rete intera di raggiungere un'altra rete su “ALL”.

Il principio di least privilege non significa necessariamente creare centinaia di regole microscopiche, ma ridurre l'accesso a ciò che è realmente richiesto.

Ogni policy dovrebbe poter rispondere chiaramente ad alcune domande:

- quale traffico rappresenta;
- perché esiste;
- quali sistemi coinvolge;
- quali servizi sono necessari;
- se deve essere loggata;
- quali profili di sicurezza devono essere applicati.

In un'infrastruttura gestita da FortiGate, la qualità delle policy determina in larga parte la qualità della sicurezza complessiva.

---

## Security Profiles: ispezionare dove ha realmente senso

Il firewalling tradizionale valuta principalmente indirizzi, porte e stato della sessione.

Un Next-Generation Firewall può andare oltre attraverso funzioni come **IPS, Application Control, Web Filter, Antivirus e DNS Filter**.

Questo non significa che tutti i profili debbano essere applicati indiscriminatamente a ogni flusso.

L'ispezione ha un costo in termini di risorse, complessità e possibilità di impatto applicativo.

Il punto progettuale è quindi capire **dove l'ispezione produce valore reale**.

Sul traffico Internet degli utenti, ad esempio, Application Control e Web Filtering possono fornire visibilità e controllo molto maggiori rispetto a una policy basata soltanto su TCP/443.

Su traffico east-west particolarmente sensibile, l'IPS può contribuire a ridurre il rischio di movimento laterale o sfruttamento di vulnerabilità.

L'IPS di FortiGate può analizzare il traffico alla ricerca di pattern associati a vulnerabilità, firme e comportamenti anomali, contribuendo a rilevare e bloccare attività indesiderate prima che raggiungano la destinazione.

La scelta, però, deve essere sempre contestuale.

Un profilo di sicurezza applicato senza comprendere il traffico può generare falsi positivi, blocchi difficili da diagnosticare o un carico inutile sul sistema.

---

## SSL inspection e il problema del traffico cifrato

Gran parte del traffico moderno utilizza TLS.

Questo riduce drasticamente la visibilità del firewall sul contenuto della sessione se non viene utilizzata una forma di SSL inspection.

Qui entra in gioco una delle decisioni più delicate del progetto.

La **certificate inspection** consente di analizzare alcune informazioni della sessione senza decifrare completamente il traffico.

La **deep inspection**, invece, implica una vera interposizione TLS e richiede che i client riconoscano come attendibile la CA utilizzata dal FortiGate.

Da un punto di vista tecnico la deep inspection può aumentare notevolmente la visibilità, ma deve essere implementata con grande attenzione.

Occorre considerare applicazioni con certificate pinning, sistemi non gestiti, aspetti di privacy, esclusioni necessarie e distribuzione dei certificati ai client.

Non è quindi una funzione da attivare semplicemente perché disponibile.

È una scelta architetturale che deve essere coerente con il livello di controllo dell'organizzazione sui propri endpoint.

---

## Routing e policy: il percorso deve essere sempre deterministico

Una sessione può essere perfettamente autorizzata dalla policy firewall ma fallire comunque per un problema di routing.

Allo stesso modo, una rotta corretta non garantisce che il traffico venga consentito.

Quando FortiGate è il gateway centrale, ogni flusso dipende da entrambe le condizioni.

Per esempio, un client della VLAN utenti può avere una policy che permette l'accesso a una rete server remota attraverso un tunnel IPsec. Se però la rotta verso quella subnet non punta al tunnel corretto, la policy non risolve il problema.

Nel troubleshooting è quindi importante ricostruire sempre la catena:

**Source → Gateway → Route lookup → Policy lookup → Session → Next hop**

Questa sequenza evita uno degli errori più frequenti: modificare le policy quando il problema è di routing, oppure modificare il routing quando la sessione viene bloccata dalla sicurezza.

---

## WAN e accesso a Internet

In una rete con più collegamenti WAN, FortiGate può utilizzare la componente **Secure SD-WAN** per trattare i diversi accessi non semplicemente come route statiche di backup, ma come percorsi valutabili in base allo stato e alle prestazioni.

L'architettura può combinare underlay, overlay, routing, security policy e criteri SD-WAN per scegliere il percorso più adatto a un determinato traffico.

Questo approccio è particolarmente interessante quando la sede dispone, ad esempio, di una linea primaria e di un collegamento secondario.

Il failover non dovrebbe dipendere soltanto dallo stato fisico dell'interfaccia.

Una linea può risultare “up” ma avere latenza molto elevata, perdita di pacchetti o problemi verso specifiche destinazioni.

I performance SLA permettono di controllare la qualità del percorso e rendere la decisione più vicina all'esperienza reale delle applicazioni.

---

## Collegamenti tra sedi e VPN IPsec

In una realtà distribuita, FortiGate può diventare anche il punto di terminazione delle VPN tra sedi.

Il tunnel IPsec crea il trasporto sicuro, ma il progetto non termina con la corretta negoziazione delle fasi IKE e IPsec.

Una VPN realmente funzionante richiede coerenza tra:

- reti locali e remote;
- routing;
- policy firewall;
- NAT;
- cifratura;
- MTU e frammentazione;
- resilienza dei percorsi.

Un tunnel può risultare correttamente “up” e al tempo stesso non trasportare il traffico applicativo previsto.

Per questo il troubleshooting deve distinguere chiaramente tra **stato del tunnel** e **funzionamento del flusso**.

In ambienti con molti siti, tecnologie come ADVPN possono essere utilizzate per ridurre la dipendenza da topologie rigidamente hub-and-spoke e creare, quando previsto dall'architettura, percorsi più diretti tra sedi.

---

## Internet access delle filiali: centralizzare tutto non è sempre la scelta migliore

Una vecchia architettura WAN tendeva spesso a riportare il traffico Internet delle filiali verso il datacenter centrale per applicare lì le funzioni di sicurezza.

Questo modello garantisce controllo centralizzato, ma può introdurre percorsi inefficienti e dipendenza dalla WAN.

Quando la sicurezza è concentrata esclusivamente nel datacenter, parte del traffico tra sedi può seguire percorsi poco efficienti e consumare capacità WAN anche per flussi che potrebbero essere gestiti localmente.

Con FortiGate distribuiti sulle sedi è possibile applicare le policy direttamente sul branch edge e utilizzare breakout Internet locale quando l'architettura lo richiede.

Il punto non è stabilire che un modello sia sempre migliore dell'altro.

La scelta deve dipendere da applicazioni, connettività, modello operativo e requisiti di sicurezza.

---

## Alta affidabilità: il firewall non può diventare il singolo punto di guasto

Se FortiGate controlla routing, segmentazione, accesso Internet e VPN, la sua disponibilità diventa direttamente collegata alla disponibilità della rete.

In una sede critica può quindi essere necessario utilizzare un cluster HA.

Il modello più comune è active-passive, dove un nodo gestisce normalmente il traffico e il secondo è pronto a subentrare in caso di guasto.

Il concetto importante non è soltanto duplicare l'hardware.

Un progetto HA deve considerare anche:

- ridondanza degli switch a monte e a valle;
- alimentazioni separate;
- ridondanza WAN;
- collegamenti heartbeat;
- monitoraggio delle interfacce critiche;
- comportamento delle sessioni durante il failover.

Un cluster di firewall collegato a un unico switch o a un unico circuito WAN resta comunque esposto a single point of failure esterni al firewall stesso.

---

## Logging: una policy senza visibilità è difficile da gestire

In un'infrastruttura FortiGate il logging non dovrebbe essere considerato un elemento accessorio.

È uno degli strumenti principali per capire cosa sta realmente accadendo sulla rete.

I log consentono di osservare sessioni consentite o negate, eventi IPS, applicazioni rilevate, uso delle VPN e anomalie di sicurezza.

Tuttavia è importante trovare un equilibrio.

Loggare indiscriminatamente tutto senza una strategia può produrre enormi quantità di dati poco utili. Loggare troppo poco può rendere quasi impossibile ricostruire un incidente.

In ambienti strutturati, **FortiAnalyzer** può raccogliere e analizzare i log generati da FortiGate e altri componenti Fortinet, centralizzando eventi, report e alerting.

Questo diventa particolarmente utile quando i FortiGate sono distribuiti su più sedi.

---

## Gestione centralizzata e coerenza delle configurazioni

Quando esiste un solo firewall, la gestione diretta dell'apparato può essere sufficiente.

Quando i FortiGate diventano molti, il problema cambia.

Non si tratta più soltanto di configurare ogni dispositivo correttamente, ma di garantire che **la configurazione rimanga coerente nel tempo**.

Policy, object, VPN, SD-WAN, logging e standard operativi devono essere mantenuti in modo controllato.

In scenari più ampi, **FortiManager** può essere utilizzato per centralizzare gestione, template e distribuzione delle configurazioni, mentre FortiAnalyzer può concentrarsi sulla raccolta e sull'analisi degli eventi.

Il valore non è soltanto la comodità amministrativa.

Una gestione centralizzata riduce il rischio che apparati simili evolvano in configurazioni completamente differenti nel tempo.

---

## DNS, DHCP e servizi di infrastruttura

FortiGate può svolgere diversi servizi di rete, ma il fatto che una funzione sia disponibile non significa necessariamente che debba essere utilizzata in ogni scenario.

In una sede piccola può essere ragionevole affidare al firewall anche parte dei servizi DHCP.

In un ambiente enterprise con Active Directory, IPAM e server dedicati, può essere più appropriato utilizzare relay DHCP verso server centrali.

Lo stesso principio vale per DNS e altri servizi.

L'architettura dovrebbe evitare di concentrare sul firewall funzioni che non aggiungono reale valore al modello di sicurezza o che sono già gestite meglio da piattaforme dedicate.

FortiGate deve essere centrale nel controllo dei flussi, non necessariamente diventare il contenitore di ogni servizio dell'infrastruttura.

---

## Pubblicazione dei servizi e DMZ

Quando un servizio interno deve essere raggiungibile da Internet, il firewall diventa il punto in cui convergono NAT, policy e sicurezza del servizio pubblicato.

Una Virtual IP può associare un indirizzo pubblico a un server interno o a una porta specifica.

Ma la presenza del NAT non implica automaticamente che il traffico venga consentito.

La policy deve autorizzare il flusso e può applicare i profili di sicurezza appropriati.

In un'infrastruttura ben segmentata, i server esposti non dovrebbero trovarsi nella stessa rete degli utenti interni.

Una DMZ dedicata permette di limitare sia l'accesso dall'esterno verso il servizio sia il traffico che il server pubblicato può iniziare verso la rete interna.

Questo secondo punto è fondamentale.

Proteggere soltanto il traffico inbound non è sufficiente se un sistema compromesso può muoversi liberamente verso il resto dell'infrastruttura.

---

## Amministrazione del FortiGate: separare management e traffico utente

L'interfaccia di amministrazione del firewall deve essere trattata come una risorsa critica.

L'accesso HTTPS o SSH non dovrebbe essere esposto indiscriminatamente sulle interfacce utente o, peggio, direttamente su Internet senza ulteriori controlli.

È preferibile utilizzare una rete management dedicata, trusted hosts, autenticazione forte e, quando necessario, accesso remoto attraverso VPN amministrative.

Anche la configurazione dei servizi amministrativi sulle interfacce deve essere ridotta al minimo necessario.

Ogni protocollo abilitato rappresenta una superficie di attacco aggiuntiva.

---

## Scenario di troubleshooting 1: una VLAN non raggiunge Internet

Supponiamo che gli utenti della VLAN 30 non riescano a navigare.

La tentazione può essere quella di controllare immediatamente DNS o Web Filter.

Un metodo più ordinato parte invece dal flusso.

Il client ha il gateway corretto?

Il FortiGate riceve il traffico sull'interfaccia VLAN prevista?

Esiste una rotta di default valida?

La policy dalla VLAN verso la WAN esiste?

Il NAT è configurato correttamente?

La sessione viene creata?

Un security profile sta bloccando il traffico?

Solo dopo aver determinato in quale punto si interrompe la catena ha senso intervenire sulla configurazione.

---

## Scenario di troubleshooting 2: il traffico tra due VLAN viene bloccato

In questo caso il primo controllo è verificare che entrambe le reti siano realmente instradate attraverso FortiGate.

Se il routing avviene su un core switch, il firewall potrebbe non vedere affatto il traffico.

Se invece il FortiGate è il gateway, bisogna verificare:

**route lookup → policy lookup → session table → eventuale security profile**.

Il log forward traffic può mostrare rapidamente se il flusso viene negato e da quale policy.

Se non compare alcun log, può essere un segnale che il pacchetto non sta raggiungendo il firewall oppure che il percorso non è quello ipotizzato.

---

## Scenario di troubleshooting 3: una VPN è up ma il traffico non passa

Questo scenario è particolarmente comune.

Il tunnel risulta attivo, quindi si presume che la VPN “funzioni”.

In realtà lo stato della VPN conferma soltanto che la negoziazione è avvenuta.

Occorre poi verificare:

- routing verso la subnet remota;
- policy in entrambe le direzioni;
- reti incluse nei selector, se utilizzati;
- assenza di NAT indesiderato;
- routing e policy sul peer remoto;
- eventuale sovrapposizione delle subnet.

Il principio è sempre lo stesso: analizzare il flusso end-to-end, non fermarsi allo stato di un singolo componente.

---

## Scenario di troubleshooting 4: una policy esiste ma non viene utilizzata

FortiGate valuta le policy in ordine.

Una regola apparentemente corretta può non essere mai utilizzata perché una policy precedente intercetta lo stesso traffico.

Inoltre source interface, destination interface, address object e service devono corrispondere al flusso reale.

Per questo, quando una policy non sembra funzionare, è utile evitare modifiche casuali e verificare con strumenti di debug quale regola viene effettivamente selezionata.

Il **diagnose debug flow** è uno degli strumenti più potenti in questo contesto perché permette di osservare come FortiGate processa il traffico e dove viene presa la decisione di drop o forwarding.

Va utilizzato con filtri precisi, soprattutto sui firewall in produzione, per evitare output eccessivo.

---

## Packet capture e session table

Due strumenti fondamentali nel troubleshooting FortiGate sono il packet sniffer e la session table.

Il packet capture permette di capire se un pacchetto entra realmente nel firewall e se ne esce.

La session table mostra invece come FortiGate sta trattando una comunicazione già riconosciuta come sessione.

Questi strumenti rispondono a domande differenti.

Se il pacchetto non arriva, il problema può essere a monte.

Se arriva ma non esce, occorre analizzare routing, policy o inspection.

Se la sessione esiste ma il traffico di ritorno non segue il percorso atteso, può esserci un problema di routing asimmetrico.

È proprio la combinazione tra capture, sessioni, route e policy a rendere il troubleshooting efficace.

---

## Il rischio del troubleshooting “a tentativi”

Su un firewall centrale ogni modifica può avere effetti molto più ampi di quanto sembri.

Cambiare una policy, disabilitare un profilo IPS o aggiungere una route per “provare” può risolvere temporaneamente un sintomo e al tempo stesso introdurre un problema di sicurezza.

Per questo il metodo dovrebbe essere sempre:

**osservare → localizzare → verificare → modificare → validare**.

Non il contrario.

Prima di modificare la configurazione è necessario capire quale componente sta prendendo la decisione sbagliata.

---

## FortiGate e la sicurezza east-west

Uno degli aspetti più interessanti dell'utilizzo di FortiGate all'interno dell'infrastruttura è la possibilità di controllare non soltanto il traffico north-south, cioè tra rete interna e Internet, ma anche parte del traffico **east-west** tra segmenti interni.

Un NGFW posizionato sull'edge protegge il traffico north-south; firewall interni o punti di enforcement opportunamente posizionati possono invece contribuire alla segmentazione e alla protezione del traffico laterale.

Questo concetto è rilevante perché molte minacce non si fermano al punto iniziale di compromissione.

Una volta ottenuto accesso a un endpoint, un attaccante può tentare di muoversi verso altri sistemi.

Segmentazione e policy inter-zone possono ridurre questa libertà di movimento.

---

## Un'infrastruttura sicura deve rimanere comprensibile

Aumentare il numero di policy, profili e controlli non rende automaticamente la rete più sicura.

Una configurazione eccessivamente complessa può produrre l'effetto opposto.

Regole duplicate, address object non più utilizzati, policy temporanee mai rimosse e nomi poco descrittivi rendono difficile capire il comportamento reale del firewall.

Nel tempo questo porta spesso alla creazione di eccezioni sempre più ampie perché nessuno vuole rischiare di rompere servizi esistenti.

La manutenzione della configurazione è quindi parte integrante della sicurezza.

Naming coerente, commenti, revisioni periodiche delle policy e rimozione degli oggetti obsoleti sono attività operative, non semplici questioni estetiche.

---

## Conclusioni

Utilizzare FortiGate come punto centrale di protezione e gestione di un'infrastruttura enterprise significa cambiare il modo in cui si osserva la rete.

Il firewall non è più soltanto il confine con Internet.

Diventa il punto nel quale **routing, segmentazione e sicurezza si incontrano**.

Le VLAN definiscono i domini, ma sono le policy a stabilire le relazioni tra quei domini. Le route determinano il percorso, ma la sessione deve essere autorizzata. I tunnel VPN creano connettività, ma routing e policy devono renderla realmente utilizzabile. I security profile aumentano il livello di controllo, ma devono essere applicati in modo consapevole.

La qualità della soluzione dipende quindi meno dal numero di funzioni abilitate e molto di più dalla coerenza del progetto.

Un FortiGate correttamente inserito nell'architettura permette di osservare e governare i flussi critici della rete, ridurre la comunicazione non necessaria tra segmenti, proteggere l'accesso verso Internet e sedi remote e costruire un metodo di troubleshooting basato su evidenze invece che su tentativi.
