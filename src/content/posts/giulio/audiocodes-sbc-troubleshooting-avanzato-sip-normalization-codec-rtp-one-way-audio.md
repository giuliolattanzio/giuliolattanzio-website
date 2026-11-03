---
title: "AudioCodes SBC troubleshooting avanzato: SIP normalization, codec, RTP e problemi di one-way audio"
description: "Troubleshooting avanzato su AudioCodes SBC: SIP normalization, codec, transcoding, RTP/SRTP, NAT, one-way audio e analisi dei principali errori SIP in ambienti Microsoft Teams Direct Routing e SIP trunk."
pubDatetime: 2026-11-03T11:30:00Z
draft: false
tags:
  - audiocodes
  - sbc
  - sip
  - voip
  - microsoft-teams
  - direct-routing
  - rtp
  - troubleshooting
  - unified-communications
ogImage: /images/articles/audiocodes-sbc-troubleshooting-avanzato-hero.svg
---

## Introduzione

Un Session Border Controller viene spesso percepito come un componente che "fa passare le chiamate" tra Microsoft Teams, un SIP trunk, un PBX o un'infrastruttura VoIP. In realtà, quando si entra nel troubleshooting avanzato, un **AudioCodes SBC** è molto di più: è il punto in cui signaling, identità, codec, SDP, NAT, media anchoring, transcoding e policy devono diventare coerenti tra sistemi che spesso parlano dialetti SIP differenti.

Quando una chiamata fallisce, il problema non è quasi mai descritto dall'utente in termini SIP. Il sintomo è più semplice: la chiamata non parte, squilla ma cade, l'audio è presente in una sola direzione, il numero chiamante è errato oppure un carrier restituisce un errore apparentemente generico.

Il compito del troubleshooting è trasformare quel sintomo in una sequenza tecnica verificabile.

![AudioCodes SBC troubleshooting avanzato](/images/articles/audiocodes-sbc-troubleshooting-avanzato-hero.svg)

La distinzione più importante da fare fin dall'inizio è tra **signaling** e **media**.

Il signaling SIP costruisce, modifica e termina la sessione. Il media RTP o SRTP trasporta invece la voce reale. Una chiamata può quindi essere perfettamente stabilita dal punto di vista SIP e avere contemporaneamente un problema completo sul media path.

Questa separazione è il punto di partenza di tutto il troubleshooting su SBC.

---

## Il ruolo dell'AudioCodes SBC nel call flow

In un'architettura Microsoft Teams Direct Routing tipica, l'AudioCodes SBC si trova tra Microsoft Phone System e il mondo PSTN o SIP trunk.

Il flusso logico può essere semplificato così:

**Microsoft Teams → AudioCodes SBC → SIP Trunk / PBX / PSTN**

Ma questa rappresentazione nasconde una parte importante del lavoro svolto dall'SBC.

Durante una chiamata, il dispositivo può terminare una sessione SIP e generarne una nuova verso il peer successivo, normalizzare header e URI, applicare routing e manipolazioni numeriche, negoziare codec e parametri SDP, ancorare il media, effettuare transcoding, gestire RTP e SRTP, attraversare NAT e firewall e applicare policy di sicurezza e interoperabilità.

Per questo un errore che compare "sull'SBC" non significa necessariamente che l'SBC sia la causa. Spesso è semplicemente il punto in cui diventa visibile un'incompatibilità tra due domini.

---

## SIP signaling e RTP: due flussi da analizzare separatamente

Uno degli errori più comuni nel troubleshooting VoIP è considerare la chiamata come un unico flusso.

In realtà abbiamo almeno due piani differenti.

Il **SIP signaling** gestisce il controllo della chiamata. Qui troviamo messaggi come INVITE, 100 Trying, 180 Ringing, 183 Session Progress, 200 OK, ACK, BYE e CANCEL.

Il **media RTP/SRTP** trasporta invece l'audio.

Questo significa che un 200 OK seguito da ACK dimostra che la sessione SIP è stata stabilita, ma non dimostra che l'audio stia passando correttamente.

Se la chiamata si instaura ma non si sente nulla, continuare a cercare esclusivamente errori SIP può essere una perdita di tempo.

A quel punto l'analisi deve spostarsi su:

**SDP → indirizzi IP → porte RTP → NAT → firewall → media anchoring → codec**

![Call flow SIP e RTP attraverso AudioCodes SBC](/images/articles/audiocodes-sbc-sip-rtp-callflow.svg)

---

## SIP normalization: perché è necessaria

SIP è uno standard, ma nella pratica piattaforme differenti possono utilizzare header, formati URI e convenzioni non perfettamente identiche.

Microsoft Teams, un carrier SIP e un PBX legacy possono avere aspettative differenti sullo stesso messaggio.

È qui che la **SIP normalization** diventa essenziale.

L'AudioCodes SBC può modificare i messaggi tra un leg e l'altro per rendere interoperabili i sistemi.

Gli header più frequentemente coinvolti sono From, To, Contact, P-Asserted-Identity, Diversion, History-Info e Request-URI.

Un esempio tipico riguarda l'identità chiamante.

Teams può presentare un numero in un determinato formato E.164, mentre il carrier può aspettarsi una struttura differente nel P-Asserted-Identity oppure nel From.

Il risultato può essere una chiamata rifiutata, una CLI errata o un numero anonimo.

La normalizzazione deve quindi essere pensata come una traduzione controllata tra i due peer, non come una serie di modifiche casuali agli header.

---

## From, P-Asserted-Identity e identità chiamante

Nei problemi di caller ID è importante non confondere gli header.

Il campo From rappresenta l'identità presentata nella sessione SIP, ma in molte architetture carrier l'identità considerata attendibile viene letta dal P-Asserted-Identity.

Questo porta a casi in cui il From appare corretto in una trace, ma il carrier continua a presentare un numero errato o rifiuta la chiamata.

Il troubleshooting deve quindi verificare formato del numero, presenza del prefisso internazionale, utilizzo coerente di E.164, contenuto di From, contenuto di P-Asserted-Identity, eventuali manipolazioni applicate dall'SBC e policy del carrier.

Un'altra casistica frequente riguarda i trasferimenti e le deviazioni.

In questi scenari possono entrare in gioco Diversion o History-Info, ed è facile che una manipolazione troppo aggressiva elimini informazioni necessarie al carrier.

---

## Request-URI e number manipulation

Quando una chiamata genera **404 Not Found**, uno dei primi controlli riguarda la destinazione effettivamente inoltrata al peer successivo.

Il numero digitato dall'utente può essere trasformato più volte prima di arrivare al carrier.

Per esempio:

**interno → numero normalizzato → E.164 → formato richiesto dal trunk**

Ogni fase deve essere verificata.

Un errore di una singola cifra, un prefisso duplicato o una regola applicata nel contesto sbagliato può portare il carrier a ricevere una destinazione inesistente.

Il SIP ladder è particolarmente utile perché consente di confrontare l'INVITE in ingresso con quello generato dall'SBC in uscita.

Il confronto tra i due messaggi mostra immediatamente se la trasformazione è avvenuta come previsto.

---

## SDP: il punto di incontro tra signaling e media

Il Session Description Protocol è la parte del SIP che descrive il media.

Qui vengono pubblicate informazioni fondamentali come indirizzo IP, porta RTP, lista dei codec, payload type, SRTP, direction attribute e parametri del media.

Quando una chiamata viene stabilita ma l'audio non funziona, l'SDP diventa uno dei punti principali dell'analisi.

Bisogna verificare quale IP viene annunciato da ciascun peer e quale IP l'AudioCodes pubblica verso l'altra parte.

Un indirizzo privato non raggiungibile, una porta errata o un'interfaccia media configurata male possono produrre una chiamata formalmente stabilita ma completamente silenziosa.

---

## Codec negotiation e mismatch

Il codec deve essere compatibile su entrambi i lati oppure l'SBC deve poter effettuare transcoding.

In un ambiente Microsoft Teams possiamo incontrare codec e profili differenti rispetto a quelli utilizzati su un SIP trunk tradizionale o su un PBX.

Supponiamo che un leg utilizzi un codec che il peer opposto non supporta.

Se non esiste un codec comune e il transcoding non è disponibile o non è configurato, la negoziazione può fallire.

Un errore tipico in questo scenario è:

**488 Not Acceptable Here**

Il 488 non deve essere interpretato genericamente come "problema SIP".

Molto spesso è necessario aprire il corpo SDP e confrontare ciò che è stato offerto con ciò che il peer è in grado di accettare.

Bisogna verificare lista codec, ordine di preferenza, payload type, parametri fmtp, SRTP/RTP, eventuale transcoding, media realm e policy.

---

## Transcoding: utile, ma non gratuito

Il transcoding permette all'SBC di ricevere il media in un codec e generarlo verso l'altro peer utilizzandone un altro.

È una funzione molto utile in scenari di interoperabilità, ma non deve essere vista come una soluzione universale.

Il transcoding introduce elaborazione aggiuntiva e utilizza risorse di media processing.

Dal punto di vista progettuale è sempre preferibile verificare se esiste un codec comune tra i due domini prima di introdurre conversioni non necessarie.

Nel troubleshooting, invece, bisogna capire se il transcoding atteso stia realmente avvenendo.

Una chiamata che funziona in alcuni scenari e fallisce in altri può dipendere dal fatto che soltanto determinati call flow richiedano una conversione codec.

---

## Media anchoring

Con il media anchoring l'SBC diventa il punto attraverso cui passa il traffico RTP/SRTP dei due leg.

In termini semplificati:

**Teams ⇄ SBC ⇄ Carrier**

anziché un media path diretto tra gli endpoint.

Questo comportamento offre controllo, sicurezza e interoperabilità, ma rende fondamentale la corretta configurazione degli indirizzi media e delle interfacce.

Se l'SBC pubblica un IP non raggiungibile da uno dei peer, si genera facilmente un problema di one-way audio.

Il signaling continua a funzionare perché può attraversare una connessione completamente diversa, mentre RTP viene inviato verso un indirizzo che non restituisce traffico.

---

## One-way audio: perché succede

Il **one-way audio** è uno dei problemi più classici nei sistemi VoIP.

La chiamata viene stabilita, ma soltanto una delle due parti sente l'altra.

Questo sintomo è estremamente utile perché indica immediatamente che almeno una direzione media sta funzionando.

Le cause più frequenti includono NAT errato, firewall che blocca una direzione RTP, IP media non corretto nell'SDP, porta RTP non raggiungibile, media realm errato, routing asimmetrico, anchoring non coerente e policy SRTP/RTP incompatibile.

La diagnosi deve seguire il flusso.

Se Teams invia SRTP verso l'SBC, bisogna verificare che l'SBC lo riceva.

Se l'SBC genera RTP verso il carrier, bisogna verificare destinazione e porta.

Poi si ripete la stessa analisi nella direzione opposta.

![Diagnosi one-way audio su AudioCodes SBC](/images/articles/audiocodes-sbc-one-way-audio.svg)

---

## NAT e firewall traversal

Signaling e media possono attraversare NAT e firewall in modo molto diverso.

SIP può viaggiare su una sessione TLS stabile e perfettamente funzionante, mentre RTP utilizza un insieme di porte UDP dinamiche.

Questo spiega perché una chiamata possa segnalare correttamente ma non avere audio.

Nel troubleshooting bisogna evitare una conclusione molto comune:

**"la porta SIP funziona, quindi il firewall è a posto".**

Non è sufficiente.

Bisogna verificare separatamente il range RTP previsto, la direzione delle sessioni e il mapping NAT.

È inoltre importante assicurarsi che l'indirizzo pubblicizzato nell'SDP sia realmente raggiungibile dal peer.

---

## RTP e SRTP

RTP trasporta il media senza cifratura integrata.

SRTP aggiunge protezione crittografica al flusso.

In scenari Teams Direct Routing il lato Microsoft richiede specifici meccanismi di sicurezza, mentre il trunk carrier può utilizzare una configurazione differente.

L'SBC può quindi trovarsi a gestire SRTP su un leg e RTP sull'altro oppure SRTP su entrambi con parametri differenti.

Quando il problema riguarda il media, è necessario verificare non solo che i pacchetti arrivino, ma che il formato di protezione atteso sia coerente.

Un flusso UDP presente sulla rete non significa automaticamente audio valido.

---

## 403 Forbidden

Un **403 Forbidden** indica generalmente che la richiesta è stata compresa ma non autorizzata.

In un ambiente SBC può dipendere da sorgente non autorizzata, policy del carrier, identità chiamante non accettata, IP non presente tra quelli consentiti, regole di classificazione o routing oppure numero non autorizzato.

L'errore deve essere analizzato nel punto in cui viene generato.

Se il 403 arriva dal carrier, il problema deve essere interpretato secondo le regole del trunk.

Se viene generato dall'SBC, bisogna controllare la configurazione locale.

---

## 404 Not Found

Il 404 è spesso legato al routing o alla normalizzazione della destinazione.

Le verifiche principali sono Request-URI, numero chiamato, manipolazioni, IP-to-IP routing, destinazione effettiva e formato numerico richiesto dal peer.

Un confronto tra INVITE inbound e outbound è quasi sempre il modo più rapido per identificare una manipolazione errata.

---

## 486 Busy Here

**486 Busy Here** è normalmente coerente con una destinazione occupata, ma in infrastrutture complesse bisogna comunque capire quale peer lo abbia generato.

Può provenire dal PBX, dal carrier o dalla piattaforma remota.

Non va quindi confuso con un errore dell'SBC soltanto perché compare nei suoi log.

L'SBC spesso si limita a inoltrare la risposta.

---

## 488 Not Acceptable Here

Il 488 merita particolare attenzione perché molto spesso porta direttamente al media negotiation.

In presenza di 488 bisogna aprire l'SDP e controllare codec offerti, encryption, SRTP, media type, direction, parametri SDP e policy del peer.

È uno degli errori in cui leggere soltanto la riga di risposta SIP non basta.

La spiegazione reale è quasi sempre nel contenuto della session description.

---

## 503 Service Unavailable

Un **503 Service Unavailable** indica indisponibilità del servizio, ma la causa può essere molto differente.

Può trattarsi di carrier non raggiungibile, trunk fuori servizio, manutenzione, capacità temporaneamente esaurita, peer non disponibile oppure failover o routing non corretto.

In presenza di 503, oltre alla trace SIP, conviene verificare lo stato della connettività verso il peer e il comportamento delle policy di fallback.

---

## SIP ladder: il modo più rapido per leggere una chiamata

Il SIP ladder permette di trasformare una grande quantità di log in una sequenza temporale leggibile.

Un call flow sano può apparire così:

**INVITE → 100 Trying → 180 Ringing → 200 OK → ACK**

La sessione prosegue, quindi viene terminata con:

**BYE → 200 OK**

Quando qualcosa fallisce, il punto esatto in cui la sequenza cambia è estremamente informativo.

Se dopo l'INVITE arriva subito un 403, il problema si trova prima della fase di ringing.

Se arriva 180 Ringing ma poi un errore, l'analisi cambia.

Se arriva 200 OK e la chiamata è stabilita ma manca l'audio, bisogna smettere di concentrarsi sul call setup e passare al media.

---

## Syslog e trace

I log dell'AudioCodes SBC sono fondamentali, ma devono essere raccolti con un obiettivo.

La quantità di informazioni può diventare molto elevata.

Prima di iniziare una trace è utile annotare numero chiamante, numero chiamato, timestamp, direzione della chiamata, peer coinvolti e sintomo preciso.

Questo permette di filtrare rapidamente i messaggi rilevanti.

L'analisi migliore nasce dalla correlazione tra:

**SIP ladder + SDP + log SBC + packet capture**

Non da uno di questi elementi preso isolatamente.

---

## Packet capture

La packet capture diventa necessaria quando bisogna dimostrare cosa entra ed esce realmente dalle interfacce.

È particolarmente utile per i problemi RTP.

In un caso one-way audio possiamo verificare RTP/SRTP ricevuto dal primo peer, RTP/SRTP generato dall'SBC, destinazione IP, porta, traffico di ritorno ed eventuali blocchi.

La packet capture consente inoltre di distinguere tra problema di configurazione SBC e problema nella rete esterna.

Se l'SBC genera correttamente RTP verso l'indirizzo concordato ma il traffico viene perso a valle, la causa non è più nel signaling.

---

## Un metodo pratico di troubleshooting

Quando una chiamata AudioCodes fallisce, un metodo ordinato riduce enormemente i tempi di analisi.

### La chiamata non parte

Controllare routing, manipolazioni, SIP response, classificazione, identità e trunk status.

### La chiamata squilla ma non si completa

Controllare messaggio finale, SDP, risposta del peer ed eventuali timer.

### La chiamata si stabilisce ma non c'è audio

Controllare SDP, RTP/SRTP, media realm, NAT, firewall e codec.

### Audio in una sola direzione

Seguire separatamente i due media path e trovare il punto in cui una direzione scompare.

Questo approccio evita di cambiare configurazioni non correlate al sintomo.

---

## Esempio: Teams chiama PSTN ma non sente audio

Consideriamo questo scenario:

**Teams → AudioCodes SBC → SIP Carrier**

La chiamata viene stabilita correttamente.

Teams vede la sessione attiva, il telefono remoto squilla e risponde, ma l'utente Teams non sente l'interlocutore.

Il troubleshooting non dovrebbe partire dalle routing rule.

Il setup è già riuscito.

Bisogna invece analizzare SDP ricevuto dal carrier, indirizzo e porta media, RTP ricevuto sull'SBC, eventuale conversione RTP/SRTP e SRTP inviato verso Teams.

Se l'SBC non riceve RTP dal carrier, la causa si trova sul leg carrier/rete.

Se l'SBC riceve RTP ma non genera SRTP verso Teams, l'analisi si sposta sul media handling interno.

Se genera SRTP ma Teams non lo riceve, bisogna verificare il percorso di rete.

La stessa metodologia vale in direzione opposta.

---

## Manipulation Set: attenzione alla complessità

Le manipulation rule sono potentissime, ma possono trasformarsi rapidamente in una fonte di problemi se il loro scopo non è documentato.

Ogni regola dovrebbe avere una funzione precisa.

Quando possibile, è utile documentare input atteso, condizione, trasformazione, output e peer a cui si applica.

Una regola apparentemente innocua sul From può avere effetti su caller ID, autenticazione o policy carrier.

Una modifica al Contact può influire su richieste successive nella dialog.

Nel troubleshooting avanzato bisogna quindi evitare di "provare una manipolazione" senza prima verificare il messaggio originale.

---

## Internal routing e separazione dei leg

Un AudioCodes SBC lavora spesso con più entità logiche: Teams, carrier, PBX, gateway, ambienti di test o route di backup.

Per questo è importante analizzare ogni leg separatamente.

La domanda non è:

**"la chiamata passa dall'SBC?"**

ma:

**"come entra la chiamata, quale regola la classifica, quale route viene scelta e come viene trasformata prima di uscire?"**

Questa separazione rende molto più semplice identificare errori che altrimenti sembrano casuali.

---

## Collegamento con Microsoft Teams Direct Routing

In un ambiente Teams Direct Routing l'SBC rappresenta il confine tra Microsoft Phone System e il dominio telefonico esterno.

Per una panoramica più ampia sulla configurazione e sul troubleshooting del Direct Routing è disponibile anche l'articolo:

[AudioCodes SBC e Microsoft Teams Direct Routing: configurazione e troubleshooting](/posts/audiocodes-sbc-microsoft-teams-direct-routing-configurazione-troubleshooting/)

Per l'analisi del call flow SIP lato Teams:

[Microsoft Teams Direct Routing: troubleshooting del call flow SIP](/posts/microsoft-teams-direct-routing-troubleshooting-call-flow-sip/)

Questi scenari diventano particolarmente interessanti in ambienti multisede:

[Microsoft Teams Direct Routing multisede con AudioCodes](/posts/microsoft-teams-direct-routing-multisede-audiocodes-interoperabilita/)

Il troubleshooting avanzato descritto qui completa questi argomenti concentrandosi soprattutto sull'interoperabilità e sul media path.

---

## Checklist finale

Prima di modificare la configurazione dell'SBC, conviene verificare nell'ordine:

1. quale peer genera l'errore;
2. ultimo messaggio SIP corretto;
3. SIP response ricevuta;
4. Request-URI;
5. From e P-Asserted-Identity;
6. SDP;
7. codec;
8. RTP/SRTP;
9. IP e porte media;
10. NAT e firewall;
11. routing;
12. manipulation rule.

L'ordine è importante.

Cambiare codec quando il carrier sta rispondendo 403 per una policy sull'identità non risolve nulla.

Allo stesso modo, modificare il SIP routing quando il problema è one-way audio dopo un 200 OK sposta soltanto l'attenzione lontano dal vero dominio di guasto.

---

## Conclusioni

Il troubleshooting di un AudioCodes SBC diventa molto più semplice quando si separano chiaramente **signaling, session description e media**.

Il SIP ladder permette di capire come viene costruita la chiamata.

Gli header mostrano identità e routing.

L'SDP descrive il media.

RTP e SRTP dimostrano infine se la voce sta realmente attraversando la rete.

SIP normalization, transcoding e media anchoring sono strumenti fondamentali per garantire interoperabilità tra Microsoft Teams, carrier e PBX, ma devono essere analizzati con metodo.

La regola più utile è semplice:

**prima individua il punto esatto in cui il call flow cambia comportamento, poi modifica la configurazione.**

È la differenza tra troubleshooting per tentativi e troubleshooting realmente ingegneristico.
