---
title: "Microsoft Teams Direct Routing: come analizzare un call flow SIP e capire dove fallisce una chiamata"
description: "Troubleshooting Microsoft Teams Direct Routing: analisi del call flow SIP, INVITE, 100 Trying, 180 Ringing, 200 OK, ACK, errori 403, 404, 488 e 503, SDP, media, codec, NAT e one-way audio."
pubDatetime: 2026-10-07T09:00:00Z
draft: false
tags:
  - voip
  - microsoft-teams
  - direct-routing
  - sip
  - call-flow
  - sbc
  - troubleshooting
  - media
ogImage: /images/articles/microsoft-teams-direct-routing-troubleshooting-call-flow-sip-hero.svg
---
## Introduzione

Quando una chiamata **Microsoft Teams Direct Routing** non funziona, il modo più efficace per arrivare alla causa non è modificare configurazioni a tentativi.

Bisogna ricostruire il **call flow**.

Una chiamata attraversa più domini. Teams applica policy e voice routing, l'SBC gestisce signaling e interoperabilità, il carrier instrada verso la PSTN e la rete deve consentire sia il traffico SIP sia il media.

Per questo un errore che appare sul client Teams può avere origine molto più avanti nel percorso.

In questo articolo analizzo un metodo operativo per seguire una chiamata **dall'INVITE iniziale fino alla chiusura della sessione**, separando sempre signaling e media.

![Microsoft Teams Direct Routing troubleshooting e call flow SIP](/images/articles/microsoft-teams-direct-routing-troubleshooting-call-flow-sip-hero.svg)

---

## Il primo principio: dividere la chiamata in domini

Una chiamata Direct Routing può essere rappresentata in modo semplificato così:

**Teams Client → Microsoft Teams → SBC → SIP Carrier → PSTN**

Nella direzione opposta:

**PSTN → SIP Carrier → SBC → Microsoft Teams → Teams Client**

Questa rappresentazione è fondamentale durante il troubleshooting.

Quando qualcosa fallisce bisogna chiedersi:

**qual è l'ultimo dominio che ha funzionato correttamente?**

Da lì si restringe progressivamente il problema.

---

## Signaling e media non sono la stessa cosa

Prima di leggere qualsiasi trace bisogna separare due piani.

### Signaling

Il signaling SIP gestisce:

- instaurazione della chiamata
- risposte provvisorie
- risposta finale
- modifiche della sessione
- trasferimenti
- terminazione

### Media

Il media trasporta voce e altri flussi real-time tramite RTP o SRTP.

Una chiamata può quindi essere perfettamente stabilita a livello SIP e avere contemporaneamente:

- nessun audio
- audio in una sola direzione
- jitter elevato
- packet loss
- qualità instabile

Se il telefono squilla, l'utente risponde e la sessione resta attiva, il problema non è necessariamente nel call routing.

Potrebbe essere esclusivamente nel media path.

---

## Un call flow SIP essenziale

Una chiamata riuscita include normalmente una sequenza riconoscibile.

### INVITE

L'INVITE chiede di creare una nuova sessione.

Contiene informazioni fondamentali come:

- Request-URI
- From
- To
- Contact
- P-Asserted-Identity
- Call-ID
- Via
- SDP

Per il troubleshooting è uno dei messaggi più importanti.

L'INVITE dice **chi sta chiamando, chi viene chiamato, da dove arriva la richiesta e quale media viene proposto**.

### 100 Trying

La risposta:

`100 Trying`

indica che la richiesta è stata ricevuta e sta venendo elaborata.

Non significa che il destinatario stia già squillando.

### 180 Ringing

La risposta:

`180 Ringing`

indica normalmente che la destinazione è stata raggiunta e sta generando una condizione di ringing.

È una risposta provvisoria.

### 200 OK

Il:

`200 OK`

conferma che la chiamata è stata accettata.

Nel caso di sessioni con SDP, la risposta contiene anche i parametri media negoziati.

### ACK

L'ACK completa il three-way handshake applicativo della transazione INVITE.

A questo punto la sessione è instaurata.

### BYE

Il BYE termina una sessione già stabilita.

Il lato che invia il BYE è un'informazione molto utile.

Se una chiamata cade dopo pochi secondi, bisogna identificare **chi ha generato il BYE e perché**.

---

## Esempio di chiamata uscente Teams

Consideriamo un utente Teams che chiama un numero PSTN.

Il percorso logico è:

**Teams → Voice Routing → SBC → Carrier → PSTN**

Durante il troubleshooting verifico nell'ordine:

1. Teams genera la chiamata
2. viene selezionata una Voice Route
3. viene individuato il PSTN Gateway
4. l'INVITE raggiunge l'SBC
5. l'SBC classifica correttamente il traffico
6. viene applicata la route verso il carrier
7. eventuali manipolazioni vengono eseguite
8. l'INVITE raggiunge il carrier
9. il carrier restituisce una risposta
10. la risposta torna verso Teams
11. il media viene negoziato

Se il passaggio 4 non avviene, analizzare la configurazione del carrier è prematuro.

Se invece il carrier riceve l'INVITE e restituisce immediatamente un errore, il problema si trova più avanti nel percorso.

---

## Esempio di chiamata entrante

Per una chiamata inbound il percorso è opposto:

**PSTN → Carrier → SBC → Microsoft Teams → Utente**

Controllo quindi:

1. il carrier consegna la chiamata all'SBC
2. l'SBC riconosce il peer
3. il numero viene normalizzato
4. la route punta verso Teams
5. l'INVITE parte dall'SBC
6. Microsoft accetta il trunk
7. il numero viene associato al destinatario
8. Teams genera il ringing
9. la chiamata viene risposta
10. il media viene negoziato

Una differenza apparentemente minima nel formato del numero può interrompere il processo.

---

## Il numero chiamato è spesso il primo elemento da verificare

Teams Direct Routing lavora molto bene con numerazione normalizzata in formato **E.164**.

Un numero italiano può essere rappresentato come:

`+390212345678`

Il carrier potrebbe però consegnare:

`0212345678`

oppure:

`390212345678`

Se Microsoft si aspetta una numerazione diversa, il reverse number lookup può fallire.

Per questo nel trace controllo sempre:

- Request-URI
- To
- P-Asserted-Identity
- formato del numero
- eventuali manipulation dell'SBC

Una singola cifra, un prefisso o il simbolo `+` possono determinare un comportamento completamente diverso.

---

## Errore SIP 403

Un **403 Forbidden** indica che la richiesta è stata compresa ma non autorizzata o accettata nel contesto corrente.

In Direct Routing non esiste una sola causa possibile.

Tra gli scenari da verificare ci sono:

- trunk non riconosciuto
- FQDN SBC non coerente
- Contact header non corretto
- utente non abilitato correttamente alla telefonia
- policy che impedisce la chiamata
- Location-Based Routing
- restrizioni sul numero chiamato
- rifiuto generato dall'SBC o dal carrier

Il dettaglio fondamentale è capire **chi ha generato il 403**.

Un 403 proveniente da Microsoft richiede un'indagine diversa da un 403 proveniente dal carrier.

---

## Errore SIP 404

Il **404 Not Found** non significa sempre semplicemente "numero inesistente".

Nel Direct Routing può indicare anche che Microsoft non riesce ad associare correttamente il numero ricevuto a un utente o resource account.

Per una chiamata inbound verifico in particolare:

- numero presente nel Request-URI
- formato E.164
- assegnazione del numero
- eventuali trasformazioni effettuate dall'SBC
- corretta destinazione della route

La domanda utile non è soltanto "il numero esiste?".

È:

**Microsoft sta ricevendo esattamente il numero che si aspetta?**

---

## Errore SIP 488

Il **488 Not Acceptable Here** è spesso associato a un problema nella negoziazione della sessione.

Quando compare, analizzo immediatamente il contenuto SDP.

Controllo:

- codec proposti
- codec accettati
- indirizzo media
- porta RTP/SRTP
- protocollo
- crypto
- eventuale transcoding
- manipolazioni SDP

Un 488 non va risolto aggiungendo codec a caso.

Bisogna confrontare la proposta e la risposta e capire quale parametro non è compatibile.

---

## Errore SIP 503

Il **503 Service Unavailable** indica che un elemento non è temporaneamente disponibile o non riesce a gestire la richiesta.

Può essere prodotto da:

- SBC
- proxy
- carrier
- infrastruttura a valle

In presenza di 503 verifico:

- stato del Proxy Set
- raggiungibilità del trunk
- SIP OPTIONS
- eventuali limiti di sessione
- stato del carrier
- route alternative
- failover
- risorse disponibili sull'SBC

Anche qui il Via e la provenienza della risposta aiutano a individuare il dominio responsabile.

---

## Leggere l'SDP

Il Session Description Protocol descrive il media proposto.

In un trace SIP cerco almeno:

- indirizzo IP nel campo `c=`
- porta indicata in `m=audio`
- codec offerti
- payload type
- direzione media
- parametri SRTP
- eventuali modifiche tra un leg e l'altro

Se una chiamata viene stabilita ma non passa audio, confrontare l'SDP dei due leg è spesso il punto di partenza migliore.

---

## One-way audio

L'audio monodirezionale è uno dei problemi VoIP più classici.

La chiamata funziona apparentemente, ma una delle due parti non sente l'altra.

Le cause frequenti includono:

- NAT errato
- IP privato annunciato nell'SDP
- firewall
- porte RTP/SRTP bloccate
- Media Realm non corretto
- routing asimmetrico
- media bypass configurato in modo incoerente
- indirizzo media non raggiungibile

La domanda da porsi è molto concreta:

**dove viene inviato il flusso RTP e quell'indirizzo è realmente raggiungibile dal peer?**

---

## Media attraverso Microsoft

Nel Direct Routing senza Media Bypass il traffico media utilizza i Microsoft Media Processor.

Questo significa che non basta consentire il signaling SIP.

La rete deve permettere anche il traffico media previsto dall'architettura Microsoft.

Una configurazione può quindi avere:

**TLS perfettamente funzionante + SIP perfetto + media completamente bloccato**

Da qui nasce il classico caso:

**la chiamata squilla, viene risposta, ma non c'è audio.**

---

## Media Bypass

Con **Media Bypass** il signaling continua a coinvolgere Microsoft, mentre il media può seguire un percorso differente tra client e SBC.

Concettualmente:

**Signaling: Teams ↔ SBC**

**Media: Client ↔ SBC**

Questo può ridurre la distanza del percorso media e migliorare alcuni scenari, ma aumenta l'importanza di:

- routing
- firewall
- NAT
- raggiungibilità dell'SBC
- subnet aziendali
- corretta classificazione del client

Quando troubleshooting signaling e media vengono mescolati, il Media Bypass può sembrare più complesso di quanto sia realmente.

---

## Codec: verificare entrambi i leg

L'SBC separa il dominio Teams dal dominio carrier.

Per questo possono esistere due negoziazioni differenti:

**Teams ↔ SBC**

e

**SBC ↔ Carrier**

Il carrier non deve necessariamente utilizzare esattamente lo stesso set di codec della piattaforma Microsoft se l'SBC gestisce correttamente l'interoperabilità prevista.

Microsoft documenta per Direct Routing codec come SILK, G.711, G.722, G.729 e AMR-WB in specifici scenari.

La verifica deve comunque essere fatta sulla documentazione aggiornata e sulla certificazione del modello SBC utilizzato.

---

## TLS e certificati

Se il problema si presenta prima ancora dell'INVITE, il livello SIP potrebbe non essere il punto giusto da analizzare.

Direct Routing utilizza TLS per la relazione con l'SBC.

Controllo quindi:

- FQDN
- DNS
- certificato
- CN e SAN
- trust chain
- scadenza
- porta TLS
- SIP OPTIONS
- stato del gateway nel tenant

Un errore di certificato può far apparire l'SBC inattivo anche se la configurazione di routing è corretta.

---

## Il valore dei SIP OPTIONS

I SIP OPTIONS sono utili per verificare lo stato della relazione tra i peer.

Se un trunk viene indicato come down o inattivo, verifico:

- OPTIONS inviati
- OPTIONS ricevuti
- risposta
- TLS
- FQDN
- indirizzo sorgente
- Proxy Set
- firewall

Prima di analizzare una chiamata reale è utile sapere che la relazione di base tra le piattaforme è stabile.

---

## Troubleshooting con AudioCodes SBC

Con un AudioCodes SBC il mio approccio è partire dalla sessione specifica e ricostruire i due leg.

Il modello è:

**Leg A: Teams ↔ AudioCodes**

**Leg B: AudioCodes ↔ Carrier**

Per ogni leg verifico:

- INVITE
- risposte SIP
- numero chiamante
- numero chiamato
- header
- SDP
- codec
- indirizzi media
- eventuale BYE
- response code

Questo permette di capire se AudioCodes sta semplicemente propagando un errore ricevuto o se lo sta generando localmente.

Per un approfondimento sull'architettura puoi leggere anche [AudioCodes SBC e Microsoft Teams Direct Routing: configurazione, call routing, media e troubleshooting](/posts/audiocodes-sbc-microsoft-teams-direct-routing-configurazione-troubleshooting/).

---

## Non modificare cinque cose contemporaneamente

Uno degli errori più comuni durante il troubleshooting è fare contemporaneamente:

- nuova route
- nuova manipulation
- modifica codec
- modifica firewall
- modifica numero

Se la chiamata comincia a funzionare, non sappiamo più quale modifica fosse necessaria.

Preferisco procedere così:

**trace → ipotesi → singola modifica → nuovo test**

Questo rende il troubleshooting ripetibile e documentabile.

---

## Utilizzare un test call identificabile

Quando vengono raccolti i log, la chiamata deve essere facilmente identificabile.

Registro sempre:

- timestamp preciso
- calling number
- called number
- direzione
- utente
- SBC coinvolto
- carrier
- esito osservato

Con queste informazioni trovare il Call-ID corretto diventa molto più semplice.

---

## Il Call-ID come riferimento

Il **Call-ID** è uno degli identificatori più utili nella correlazione dei messaggi SIP.

Permette di seguire una sessione attraverso numerosi messaggi.

In presenza di SBC, però, bisogna ricordare che i due leg possono essere rappresentati in modo differente e l'SBC può creare una separazione logica tra le sessioni.

Gli strumenti di tracing del vendor diventano quindi fondamentali per correlare correttamente il traffico.

---

## Capire chi chiude la chiamata

Quando una chiamata cade dopo 10, 20 o 30 secondi, guardo immediatamente:

**chi invia il BYE?**

Se è il carrier, l'indagine parte dal leg PSTN.

Se è l'SBC, bisogna capire quale evento locale ha generato la terminazione.

Se la terminazione viene dal lato Microsoft, va analizzato quel dominio.

Il BYE contiene spesso informazioni sufficienti per evitare ore di tentativi casuali.

---

## Un metodo operativo in dieci passaggi

Per una chiamata Direct Routing che non funziona utilizzo questa sequenza:

1. definire esattamente il sintomo
2. eseguire una singola test call
3. annotare timestamp e numeri
4. acquisire il trace SIP
5. identificare il primo INVITE
6. seguire tutte le risposte
7. individuare il primo comportamento anomalo
8. identificare il dominio che lo genera
9. analizzare SDP separatamente se il signaling funziona
10. modificare una sola variabile e ripetere il test

Il metodo è semplice.

La disciplina con cui viene applicato fa la differenza.

---

## Caso pratico: outbound senza ringing

Scenario:

**Teams → SBC → Carrier**

Teams genera l'INVITE.

AudioCodes lo riceve.

L'SBC inoltra correttamente la chiamata.

Il carrier risponde con un errore.

In questo scenario non ha senso iniziare modificando la Voice Routing Policy di Teams.

La chiamata ha già superato quella fase.

Il troubleshooting deve spostarsi sul leg:

**SBC ↔ Carrier**

e analizzare numero, header, autenticazione e requisiti del provider.

---

## Caso pratico: inbound con 404

Scenario:

**Carrier → SBC → Teams**

Il carrier consegna correttamente il numero.

AudioCodes invia l'INVITE a Microsoft.

Microsoft restituisce 404.

Il punto da verificare diventa la relazione tra numero presentato e destinatario configurato nel tenant.

Confronto quindi il Request-URI con la numerazione assegnata.

Se necessario correggo la normalizzazione sull'SBC, non il trunk del carrier che ha già consegnato correttamente la chiamata.

---

## Caso pratico: chiamata stabilita senza audio

Scenario:

- INVITE corretto
- 180 Ringing
- 200 OK
- ACK
- sessione attiva
- nessun audio

La segnalazione funziona.

Smetto quindi di concentrarmi su Voice Route e PSTN Usage e passo al media.

Confronto:

- SDP
- IP media
- porte
- NAT
- firewall
- SRTP
- Media Realm
- Media Bypass

Questo cambio di prospettiva è spesso ciò che riduce drasticamente il tempo di diagnosi.

---

## Monitoraggio dopo la risoluzione

Risolto il problema, salvo sempre una baseline della chiamata funzionante.

Una trace valida è estremamente utile perché consente di confrontare rapidamente un incidente futuro.

Documenterei almeno:

- call flow corretto
- formato numerazione
- header rilevanti
- codec
- percorso media
- response code attesi
- route applicata

Il troubleshooting diventa molto più veloce quando esiste un riferimento noto e funzionante.

---

## Conclusioni

Il troubleshooting di Microsoft Teams Direct Routing diventa molto più semplice quando la chiamata viene trattata come una sequenza di domini e transazioni osservabili.

Non bisogna chiedersi genericamente:

**"Perché Teams non chiama?"**

La domanda utile è:

**"Qual è l'ultimo messaggio corretto, quale elemento genera il primo comportamento anomalo e cosa cambia tra il leg Teams e il leg carrier?"**

Seguendo INVITE, response code, SDP e media path si passa da un troubleshooting per tentativi a un'analisi deterministica.

Ed è esattamente questo il vantaggio di leggere correttamente un call flow SIP.
