---
title: "Microsoft Teams Direct Routing multi-sede: AudioCodes come punto di attestazione e interoperabilità"
description: "Architettura e criteri di progettazione per un cliente multi-sede che utilizza AudioCodes come SBC di attestazione verso Microsoft Teams: Direct Routing, SIP, media, resilienza, sicurezza e troubleshooting."
pubDatetime: 2026-08-17T13:23:00Z
draft: false
tags:
  - voip
  - audiocodes
  - microsoft-teams
  - sip
  - call-flow
  - interoperabilita
  - routing
  - troubleshooting
---
## Introduzione

Portare la telefonia di un'organizzazione multi-sede su **Microsoft Teams** non significa semplicemente collegare un trunk SIP al cloud.

Quando gli utenti sono distribuiti tra sede centrale, filiali e uffici remoti, la componente voce deve essere trattata come un'infrastruttura end-to-end nella quale **signaling SIP, media RTP, connettività WAN, numerazione, sicurezza, resilienza e interoperabilità** concorrono allo stesso risultato.

In questo scenario considero un cliente ipotetico con più sedi geograficamente distribuite che utilizza **Microsoft Teams Phone con Direct Routing** e una piattaforma **AudioCodes Session Border Controller** come **punto di attestazione verso Teams**.

L'SBC non è quindi un elemento accessorio posto a valle della soluzione: rappresenta il punto di demarcazione tra il dominio Microsoft e il dominio telefonico dell'azienda.

Da un lato espone verso Teams l'interfaccia certificata richiesta dal Direct Routing; dall'altro governa l'interoperabilità con carrier SIP, numerazioni aziendali, eventuali sistemi telefonici preesistenti e servizi che non possono essere trasferiti direttamente nel cloud.

L'obiettivo dell'articolo non è descrivere una configurazione specifica né proporre una distinta di apparati, ma ragionare su **come progettare e analizzare una soluzione multi-sede** nella quale AudioCodes diventa il punto centrale di controllo della telefonia Teams.

---

## Lo scenario: un'azienda distribuita, una sola piattaforma di comunicazione

Immaginiamo un'organizzazione composta da una sede principale e diverse filiali collegate tramite una rete WAN aziendale.

Gli utenti utilizzano Teams come client di collaborazione e telefonia, ma l'azienda mantiene la propria connettività PSTN attraverso uno o più carrier SIP. Alcune sedi possono inoltre avere esigenze locali specifiche: numerazioni geografiche, dispositivi analogici, citofoni, fax, sistemi di allarme o apparati legacy che devono continuare a comunicare con il nuovo ambiente.

Il modello logico può essere rappresentato in questo modo:

**Teams Client → Microsoft Teams Phone → Direct Routing → AudioCodes SBC → Carrier SIP / PSTN / sistemi legacy**

Per gli utenti delle filiali il percorso applicativo resta lo stesso, anche quando il client si trova fisicamente lontano dall'SBC:

**Utente sede remota → WAN/Internet → Microsoft 365 → Direct Routing → AudioCodes → rete telefonica**

Questa rappresentazione è volutamente semplice. Nella realtà, signaling e media possono seguire percorsi differenti e proprio questa separazione è uno dei punti che devono essere compresi prima di iniziare il troubleshooting.

---

## AudioCodes come punto di attestazione verso Microsoft Teams

Nel Direct Routing Microsoft Teams non si collega direttamente al trunk SIP del carrier. La connessione avviene attraverso un **Session Border Controller supportato**, che costituisce il confine tra Teams Phone e la rete voce del cliente.

Nel nostro scenario questa funzione è affidata ad AudioCodes.

L'SBC termina la relazione SIP verso Microsoft Teams e presenta verso il cloud un FQDN, certificati e parametri di trasporto coerenti con i requisiti del Direct Routing. Sul lato opposto instaura sessioni SIP con il carrier o con gli altri sistemi voce presenti nell'infrastruttura.

Il concetto di attestazione è importante perché consente di separare due domini che possono avere comportamenti molto diversi.

Teams applica le proprie regole di signaling, sicurezza e gestione delle chiamate. Il carrier può utilizzare header, formati di numerazione, codec e criteri di routing differenti. Un PBX esistente può avere ulteriori vincoli ancora.

L'SBC deve fare in modo che questi domini riescano a comunicare senza obbligare ogni piattaforma a conoscere i dettagli interni delle altre.

In altre parole, l'interoperabilità non consiste nel “far passare SIP”, ma nel **normalizzare e controllare il dialogo tra sistemi che parlano SIP con aspettative differenti**.

---

## Il ruolo dell'SBC in una vera architettura multi-sede

In un ambiente distribuito l'SBC assume contemporaneamente più responsabilità.

Gestisce innanzitutto il **call routing**: una chiamata originata da Teams deve essere inviata verso il trunk corretto in funzione del numero composto, della sede, del piano di numerazione e delle policy aziendali.

Gestisce poi la **normalizzazione della segnalazione**. Numeri telefonici, header SIP, URI, informazioni sull'identità del chiamante e parametri SDP devono essere coerenti tra i due lati della comunicazione.

L'SBC governa inoltre la relazione tra signaling e media. Può intervenire sulla negoziazione dei codec, sull'ancoraggio dei flussi RTP, sulla gestione degli indirizzi e sulle differenze tra reti interne, pubbliche e cloud.

Infine costituisce un punto di controllo fondamentale per sicurezza e osservabilità: separa le reti, limita le relazioni SIP ammesse e fornisce log e tracciati utili a ricostruire ciò che è realmente avvenuto durante una chiamata.

Per questo motivo, in una rete multi-sede, considero AudioCodes non come un semplice gateway tra Teams e PSTN ma come il **punto di controllo del dominio voce aziendale**.

---

## Centralizzare l'attestazione senza ignorare la geografia

Una scelta frequente consiste nel centralizzare gli SBC in uno o due data center o punti di presenza principali.

Questa architettura offre un modello operativo coerente: Teams vede un insieme controllato di SBC, le configurazioni sono concentrate e i trunk SIP possono essere gestiti in modo uniforme.

La centralizzazione, tuttavia, non deve far dimenticare che gli utenti e le sedi restano geograficamente distribuiti.

Una chiamata di un utente della filiale non è soltanto una sessione SIP. È anche un flusso audio che deve attraversare una determinata topologia di rete con latenza, jitter, perdita di pacchetti e possibili colli di bottiglia.

Per questo la progettazione deve separare almeno tre piani:

**controllo e signaling**, cioè la relazione SIP tra Teams, AudioCodes e carrier;

**media**, cioè il percorso effettivo dell'audio;

**connettività delle sedi**, cioè il modo in cui i client raggiungono Microsoft 365 e, quando necessario, le interfacce media degli SBC.

Una soluzione può essere perfetta dal punto di vista SIP e produrre comunque una qualità voce insufficiente se il percorso media è stato progettato male.

---

## Signaling e media non sono la stessa cosa

Questo è uno degli aspetti più importanti del troubleshooting Teams Direct Routing.

Il fatto che l'INVITE attraversi correttamente Teams e l'SBC non garantisce che l'RTP stia seguendo un percorso valido.

In assenza di media bypass, il media tra l'SBC e Teams passa attraverso l'infrastruttura media Microsoft. Con il **Media Bypass**, quando le condizioni di rete lo consentono, il flusso può essere stabilito direttamente tra client Teams e SBC, riducendo il numero di hop.

Per ambienti con più sedi Microsoft mette inoltre a disposizione la **Local Media Optimization**, che consente di controllare il percorso media in funzione della topologia enterprise e del sito nel quale si trova l'utente.

Questo significa che il progetto non può essere limitato a “Teams raggiunge l'SBC sulla porta SIP”.

È necessario sapere:

**dove termina il signaling, dove termina il media e quale rete deve trasportare ciascun flusso.**

Quando questi tre elementi non vengono distinti, problemi di rete vengono spesso diagnosticati come problemi SIP e viceversa.

---

## Local Media Optimization in un cliente con molte filiali

Immaginiamo che l'azienda disponga di un'infrastruttura WAN ben connessa e di un SBC AudioCodes centrale che rappresenta il punto di attestazione verso Teams.

Se tutti i flussi media delle filiali venissero obbligati a seguire percorsi non ottimali, la voce potrebbe attraversare segmenti di rete non necessari prima di raggiungere l'SBC o il cloud.

La Local Media Optimization nasce proprio per gestire topologie di questo tipo: Microsoft consente di descrivere siti, subnet e indirizzi trusted in modo che Teams possa prendere decisioni coerenti sul percorso media.

In una progettazione corretta, la topologia Teams deve quindi riflettere la topologia reale dell'azienda.

Una subnet non è semplicemente un dato amministrativo. Può determinare il modo in cui Microsoft identifica la posizione di un client e, di conseguenza, influenzare la scelta del percorso media.

Questo introduce una dipendenza diretta tra **networking e telefonia**: un errore nella definizione dei siti o delle subnet può produrre un problema VoIP pur senza alcun errore evidente nella configurazione SIP dell'SBC.

---

## Numerazione e call routing: l'interoperabilità inizia prima dell'INVITE

In un cliente multi-sede il piano di numerazione raramente è uniforme fin dall'inizio.

Una sede può utilizzare numeri geografici completi, un'altra estensioni interne, un'altra ancora un vecchio piano a quattro cifre ereditato dal PBX precedente.

Teams tende a lavorare in modo efficace quando la numerazione viene normalizzata secondo criteri chiari, tipicamente verso un formato coerente come E.164. Il carrier, tuttavia, può aspettarsi un formato differente su alcuni trunk.

L'SBC diventa quindi il punto nel quale il numero viene interpretato nel contesto del dominio verso cui la chiamata deve essere inoltrata.

Un esempio semplice:

**Teams invia +390212345678 → AudioCodes identifica il trunk della sede di Milano → il carrier riceve il formato richiesto dal proprio profilo SIP.**

Per una chiamata entrante avviene il processo opposto:

**Carrier → AudioCodes → normalizzazione del Called Number → Teams → utente o servizio corretto.**

Il valore di questa architettura non è la trasformazione del numero in sé, ma la possibilità di **mantenere separata la logica interna di Teams dalle specificità del carrier**.

Se in futuro cambia l'operatore, il piano Microsoft non dovrebbe essere riscritto solo perché cambia il formato atteso sul lato PSTN.

---

## Message Manipulation: quando due implementazioni SIP non coincidono

SIP è uno standard, ma questo non significa che tutte le piattaforme lo implementino nello stesso modo operativo.

Carrier, PBX, contact center e sistemi di comunicazione possono attribuire significati differenti a determinati header o richiedere informazioni in posizioni specifiche del messaggio.

In questi casi le funzionalità di manipolazione dell'SBC permettono di adattare la segnalazione senza introdurre modifiche invasive negli altri sistemi.

Gli interventi possono riguardare, ad esempio, l'identità chiamante, il formato degli URI, la gestione di header specifici o la normalizzazione di informazioni necessarie per il corretto instradamento.

Queste regole devono però essere trattate con estrema cautela.

Una manipulation troppo generica può risolvere un caso e introdurre anomalie in altri call flow. Per questo ogni regola dovrebbe avere **uno scopo preciso, un perimetro definito e un riscontro nei trace SIP**.

Il principio operativo che seguirei è semplice: prima comprendere perché i due domini non interoperano, poi modificare soltanto ciò che è necessario per renderli compatibili.

---

## Un call flow uscente: dalla filiale alla PSTN

Consideriamo un utente Teams nella sede di Bologna che chiama un numero PSTN.

Il client genera la richiesta secondo le policy configurate nel tenant. Teams applica le logiche di voice routing e seleziona il PSTN usage e il route appropriato. La chiamata viene quindi presentata al gateway Direct Routing associato all'AudioCodes SBC.

L'SBC riceve l'INVITE proveniente dal dominio Microsoft e verifica il contesto della chiamata: origine, destinazione, classificazione, policy IP-to-IP e routing applicabile.

A questo punto può normalizzare il numero, adattare la segnalazione e inoltrare la sessione al carrier corretto.

Il percorso può essere sintetizzato così:

**Teams Client → Teams Phone → Voice Route → AudioCodes SBC → IP-to-IP Routing → SIP Trunk → PSTN**

Il media viene poi negoziato secondo l'architettura scelta, con o senza bypass e con le eventuali logiche di ottimizzazione previste per la sede.

Per il troubleshooting è fondamentale non leggere questo processo come un unico blocco. Ogni passaggio rappresenta un punto nel quale la chiamata può essere accettata, modificata, rifiutata o instradata diversamente.

---

## Un call flow entrante: dalla PSTN all'utente Teams

Per una chiamata entrante il carrier consegna la sessione all'SBC AudioCodes.

L'SBC identifica il trunk di origine, valida il messaggio, applica le trasformazioni previste e decide se la destinazione appartiene al dominio Teams oppure a un altro sistema voce.

Nel caso Teams, la sessione viene inoltrata verso il leg Direct Routing e Microsoft completa la consegna all'utente, al resource account o al servizio previsto.

Il flusso diventa:

**PSTN → Carrier SIP → AudioCodes SBC → Direct Routing → Teams Phone → Utente Teams**

Se una chiamata entrante non raggiunge l'utente, quindi, non basta verificare che il carrier abbia inviato l'INVITE.

È necessario stabilire almeno:

- quale numero è arrivato all'SBC;
- quale regola di classificazione è stata applicata;
- come è stato normalizzato il numero;
- quale route ha scelto l'SBC;
- quale risposta è arrivata dal dominio Microsoft;
- se l'utente o il servizio Teams è realmente raggiungibile con quella destinazione.

Il troubleshooting deve ricostruire il call flow, non limitarsi a cercare un singolo codice di errore.

---

## Alta disponibilità: il punto di attestazione non deve diventare il single point of failure

Se AudioCodes rappresenta il punto di attestazione dell'intera telefonia Teams, la sua disponibilità diventa parte della disponibilità del servizio voce.

Una soluzione enterprise dovrebbe quindi essere progettata considerando ridondanza degli SBC, dei collegamenti di rete e, dove necessario, dei trunk verso i carrier.

Microsoft Direct Routing consente di costruire configurazioni con più SBC e più route. La logica di failover deve però essere verificata end-to-end: non è sufficiente avere due apparati se entrambi dipendono dallo stesso firewall, dallo stesso collegamento Internet o dallo stesso punto fisico.

La resilienza reale si misura osservando le dipendenze comuni.

In un cliente multi-sede è utile chiedersi cosa accade quando si perde:

- il collegamento Internet di una filiale;
- il collegamento tra una filiale e il data center;
- un SBC;
- il trunk di un carrier;
- il data center principale;
- la raggiungibilità verso Microsoft 365.

La risposta a queste domande definisce l'architettura di continuità più di qualunque schema nominalmente “ridondato”.

---

## Survivable Branch Appliance per le sedi realmente critiche

Non tutte le filiali hanno lo stesso requisito di continuità.

Un piccolo ufficio commerciale può accettare una temporanea indisponibilità della telefonia PSTN durante un'interruzione completa della connettività. Una sede produttiva, un presidio operativo o un sito con funzioni di emergenza può invece richiedere la possibilità di continuare a effettuare e ricevere chiamate anche durante la perdita della connettività verso il cloud.

In questi scenari Microsoft Direct Routing prevede il modello **Survivable Branch Appliance (SBA)**. AudioCodes supporta soluzioni SBA per Teams, che possono essere utilizzate nelle filiali dove il requisito di survivability lo giustifica.

La logica non è sostituire Teams durante il guasto, ma fornire una modalità di continuità limitata per la telefonia quando il sito non riesce temporaneamente a raggiungere i servizi Microsoft.

È importante trattare l'SBA come una funzione di resilienza con vincoli specifici, non come una copia completa del servizio Teams cloud.

---

## Sicurezza: l'SBC come confine tra domini

Il Session Border Controller esiste anche perché il confine SIP non dovrebbe essere trattato come una semplice apertura firewall.

Verso Teams, Direct Routing utilizza una relazione controllata basata su FQDN, certificati e TLS. Verso il carrier possono esistere requisiti differenti in funzione del servizio sottoscritto.

L'SBC consente di mantenere separati i domini e di applicare policy coerenti con l'origine del traffico.

Dal punto di vista operativo è fondamentale evitare configurazioni eccessivamente permissive.

Un'interfaccia SIP esposta senza una corretta classificazione delle sorgenti, senza limiti e senza una chiara separazione tra peer può trasformare un problema di interoperabilità in un problema di sicurezza.

Anche qui la progettazione multi-sede aggiunge complessità: interfacce interne, reti di management, media network, collegamenti ai carrier e connessioni verso Microsoft devono essere documentati come domini distinti.

---

## Codec e transcoding: non dare per scontato il percorso audio

La negoziazione dei codec è un altro punto nel quale l'interoperabilità può fallire pur in presenza di un signaling apparentemente corretto.

Teams Direct Routing supporta un insieme definito di codec sulla gamba verso l'SBC. Il carrier o un sistema legacy può avere preferenze o limitazioni differenti.

In alcuni scenari l'SBC può dover mediare tra queste capacità, ma il transcoding non dovrebbe essere considerato automaticamente la soluzione a ogni incompatibilità.

Ogni trasformazione media introduce risorse, complessità e un ulteriore punto da osservare nel troubleshooting.

Prima di intervenire è quindi necessario capire quali codec sono realmente proposti nell'SDP, quali vengono accettati e quale percorso media viene stabilito.

Una chiamata con signaling completato e audio monodirezionale, per esempio, richiede un'analisi molto diversa da una chiamata respinta con errore SIP prima ancora della negoziazione RTP.

---

## Troubleshooting: partire dal call flow, non dalla configurazione

Quando una chiamata fallisce in un ambiente Teams multi-sede, la tentazione è spesso quella di aprire immediatamente la configurazione dell'SBC e cercare una regola “sbagliata”.

Preferisco l'approccio opposto: **prima ricostruire la chiamata, poi verificare la configurazione che ha prodotto quel comportamento**.

Il punto di partenza è identificare con precisione:

**chi ha chiamato, quale numero è stato composto, da quale sede, verso quale destinazione e in quale direzione.**

Successivamente si segue il signaling hop-by-hop.

Se Teams invia l'INVITE all'SBC, il problema è successivo alla selezione del route Microsoft. Se l'SBC non inoltra il messaggio al carrier, bisogna analizzare classificazione e routing interno. Se il carrier risponde con un errore, occorre capire se il problema riguarda numerazione, autenticazione, policy o formato SIP. Se la chiamata viene stabilita ma l'audio è assente o monodirezionale, l'attenzione deve spostarsi sul media path.

Questa separazione evita di confondere problemi completamente diversi.

---

## Scenario 1: la chiamata funziona dalla sede centrale ma non da una filiale

Se il signaling Direct Routing è centralizzato e le stesse policy Teams vengono utilizzate da più sedi, una differenza di comportamento legata alla posizione dell'utente suggerisce di osservare attentamente la rete e il percorso media.

Il primo controllo riguarda la topologia: il client della filiale viene identificato nel network site corretto? Le subnet sono definite correttamente? Il traffico verso le interfacce dell'SBC segue il percorso previsto? Firewall e NAT trattano il media nello stesso modo della sede centrale?

Se la chiamata viene instaurata ma presenta audio degradato o assente, modificare una manipulation SIP difficilmente risolverà il problema.

Il contesto della sede diventa quindi un dato tecnico fondamentale nel trace.

---

## Scenario 2: chiamate uscenti corrette, chiamate entranti verso Teams non raggiungono gli utenti

Questo comportamento porta l'analisi verso il percorso PSTN → SBC → Teams.

Bisogna verificare quale Called Number consegna il carrier e quale numero viene effettivamente presentato a Microsoft dopo le trasformazioni dell'SBC.

Un errore nella normalizzazione può essere difficile da vedere dall'esterno: il trunk è attivo, Teams è raggiungibile e il TLS è corretto, ma la destinazione inviata non corrisponde al numero assegnato all'utente o al servizio Teams.

Il trace SIP consente di confrontare il messaggio ricevuto dal carrier con quello trasmesso verso Microsoft e di capire esattamente dove il numero è cambiato.

---

## Scenario 3: la chiamata viene stabilita ma l'audio è monodirezionale

In questo caso il signaling ha già svolto gran parte del proprio lavoro.

L'attenzione deve passare all'SDP e all'RTP.

Bisogna verificare quali indirizzi e porte sono stati negoziati, se è attivo Media Bypass o Local Media Optimization, quale interfaccia media dell'SBC viene utilizzata e se il firewall consente realmente i flussi in entrambe le direzioni.

In un ambiente multi-sede è particolarmente importante verificare se il client si trova all'interno, all'esterno o su VPN, perché la topologia percepita da Teams può influire sulla scelta del percorso media.

Il sintomo “sento ma non mi sentono” è quindi un ottimo esempio di problema che non dovrebbe essere diagnosticato osservando soltanto i codici SIP.

---

## Scenario 4: un carrier cambia un dettaglio SIP e l'interoperabilità si rompe

Un trunk che ha funzionato per mesi può iniziare a mostrare comportamenti differenti dopo una modifica lato carrier.

Se l'SBC rappresenta il punto di demarcazione, il vantaggio operativo è poter confrontare i messaggi in ingresso e in uscita e determinare se l'anomalia è esterna al dominio Teams.

Una nuova forma del From, del P-Asserted-Identity, del Request-URI o di altri header può richiedere un adattamento, ma la modifica dovrebbe essere introdotta soltanto dopo aver identificato chiaramente il delta.

Il trace deve guidare la manipulation, non il contrario.

---

## Monitoraggio e documentazione: rendere leggibile l'infrastruttura

Una soluzione multi-sede diventa difficile da gestire quando la conoscenza resta solo nella configurazione degli apparati.

È importante documentare almeno le relazioni tra:

**sedi → subnet → network site Teams → SBC → trunk → piano di numerazione → route.**

Questa mappa permette di leggere un problema in modo molto più rapido.

Se un utente di Roma chiama un numero internazionale e la chiamata fallisce, chi esegue il troubleshooting dovrebbe poter determinare immediatamente quale voice policy e quale route Teams sono coinvolte, quale SBC riceve la sessione e quale trunk deve essere selezionato verso il carrier.

La documentazione deve quindi descrivere il comportamento, non soltanto elencare indirizzi IP e porte.

---

## Interoperabilità significa governare le differenze

In un'infrastruttura di questo tipo, Microsoft Teams, AudioCodes e il carrier non devono essere considerati tre blocchi indipendenti.

Sono tre domini che cooperano per completare la stessa chiamata.

Teams controlla l'esperienza utente, le policy e il routing nel dominio Microsoft. AudioCodes governa il confine SIP e media tra i sistemi. Il carrier fornisce l'accesso alla rete telefonica pubblica e applica le proprie regole di servizio.

L'interoperabilità nasce dalla capacità di rendere prevedibile il comportamento ai confini.

Per questo considero l'SBC il punto migliore nel quale osservare il sistema: vede ciò che arriva da Teams e ciò che viene inviato al carrier, e viceversa. Quando i trace sono letti correttamente, permettono di trasformare un generico “Teams non chiama” in una diagnosi precisa del punto in cui il call flow si interrompe.

---

## Conclusioni

In un cliente con più sedi dislocate, **AudioCodes come punto di attestazione verso Microsoft Teams** permette di costruire un confine controllato tra Teams Phone e l'infrastruttura telefonica aziendale.

Il valore tecnico dell'SBC non risiede soltanto nel collegamento al Direct Routing, ma nella capacità di governare signaling, call routing, normalizzazione, media, sicurezza e interoperabilità tra domini differenti.

La vera complessità di un progetto multi-sede emerge quando si osservano insieme **telefonia e rete**.

Un piano di numerazione coerente non compensa un media path inefficiente. Un trunk SIP perfettamente configurato non risolve una topologia Teams errata. Una manipulation corretta non può compensare una perdita di pacchetti sulla WAN.

Per questo il metodo più efficace è ragionare sempre end-to-end:

**Utente → Teams → Direct Routing → AudioCodes → Carrier → PSTN**, e poi percorrere lo stesso cammino in senso inverso per le chiamate entranti.

Quando questa catena è progettata, documentata e osservata come un unico sistema, l'SBC smette di essere una “scatola SIP” e diventa ciò che realmente è nell'architettura: **il punto di controllo dell'interoperabilità voce tra Microsoft Teams e il mondo telefonico esterno**.

---

## Fonti tecniche

Per i concetti descritti nell'articolo sono stati utilizzati come riferimento la documentazione ufficiale Microsoft relativa a **Direct Routing**, **Session Border Controller certificati**, **Media Bypass**, **Local Media Optimization** e **Survivable Branch Appliance**, oltre alla documentazione AudioCodes dedicata alle soluzioni SBC e di survivability per Microsoft Teams.

- [Microsoft Learn — Pianificare Direct Routing](https://learn.microsoft.com/it-it/microsoftteams/direct-routing-plan)
- [Microsoft Learn — Session Border Controller certificati per Direct Routing](https://learn.microsoft.com/it-it/microsoftteams/direct-routing-border-controllers)
- [Microsoft Learn — Pianificare il Media Bypass](https://learn.microsoft.com/it-it/microsoftteams/direct-routing-plan-media-bypass)
- [Microsoft Learn — Local Media Optimization](https://learn.microsoft.com/it-it/microsoftteams/direct-routing-media-optimization)
- [Microsoft Learn — Survivable Branch Appliance](https://learn.microsoft.com/it-it/microsoftteams/direct-routing-survivable-branch-appliance)
- [AudioCodes — Microsoft Teams Direct Routing](https://www.audiocodes.com/solutions/microsoft-teams-solutions/microsoft-teams-direct-routing)
