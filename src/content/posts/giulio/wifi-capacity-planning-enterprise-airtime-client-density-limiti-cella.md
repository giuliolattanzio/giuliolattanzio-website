---
title: "Wi-Fi capacity planning enterprise: airtime, client density e limiti reali della cella"
description: "Capacity planning Wi-Fi enterprise: airtime, densità client, retry, channel utilization, MCS, channel width e limiti reali della cella. Un approccio progettuale con Ekahau AI Pro e Sidekick 2."
pubDatetime: 2026-10-28T09:30:00Z
draft: false
tags:
  - wifi
  - capacity-planning
  - wireless
  - airtime
  - ekahau
  - sidekick2
  - enterprise-wifi
  - rf
  - wlan-design
  - network-engineering
ogImage: /images/articles/wifi-capacity-planning-enterprise-hero.svg
---

## Introduzione

Nel progetto di una WLAN enterprise si tende ancora troppo spesso a partire da una domanda semplice: **il segnale arriva ovunque?**

È una domanda importante, ma non è sufficiente.

Una rete può avere copertura apparentemente perfetta e continuare a offrire prestazioni inconsistenti quando il numero di utenti cresce, quando aumenta il traffico simultaneo o quando i client cominciano a competere per la stessa risorsa radio.

È qui che il **capacity planning** diventa realmente importante.

Progettare per capacità significa smettere di considerare la WLAN come una semplice estensione della copertura e iniziare a ragionare in termini di **airtime disponibile, client contemporaneamente attivi, data rate sostenuti, retry, contention, channel utilization, riutilizzo dello spettro e profilo applicativo**.

La domanda quindi cambia.

Non è più soltanto:

**“C’è abbastanza segnale?”**

Diventa:

**“Quanta capacità reale resta disponibile quando la rete è sotto carico?”**

![Wi-Fi capacity planning enterprise](/images/articles/wifi-capacity-planning-enterprise-hero.svg)

---

## Coverage design e capacity design sono due problemi diversi

Il coverage design serve a garantire che il client riceva un livello di segnale adeguato, mantenga un buon margine rispetto al rumore e trovi celle sufficientemente sovrapposte per spostarsi senza perdere connettività.

Il capacity design parte da lì, ma va molto oltre.

Una rete ad alta densità può essere perfettamente coperta e avere comunque un'esperienza utente scarsa perché troppi dispositivi condividono lo stesso mezzo radio. In questi casi il problema non è l'assenza di segnale. È il modo in cui l'airtime viene distribuito.

Questo accade frequentemente in open space, sale riunioni, aule, strutture hospitality, ambienti sanitari, campus e aree dove molte persone utilizzano contemporaneamente collaboration, video, SaaS, voce e applicazioni cloud.

La copertura dice se il client può collegarsi.

La capacità dice **quanto bene continuerà a funzionare la cella quando molti client iniziano a usarla davvero**.

---

## L'airtime è la vera risorsa della WLAN

Nel Wi-Fi la risorsa più preziosa non è il throughput teorico dichiarato dall'access point.

È il **tempo disponibile sul canale**.

Ogni trasmissione occupa il mezzo radio per un certo intervallo. Durante quel periodo gli altri dispositivi che appartengono allo stesso contention domain devono attendere.

Questo significa che due client che trasferiscono la stessa quantità di dati possono avere un impatto completamente diverso sulla capacità della cella.

Un client che trasmette a un data rate elevato libera il mezzo rapidamente. Un client che lavora con modulazioni più conservative impiega più tempo a trasmettere gli stessi dati e quindi consuma più airtime.

Il punto centrale è questo:

**la capacità non dipende solo da quanti dati vengono trasferiti, ma da quanto tempo radio serve per trasferirli.**

![Airtime e densità client nella stessa cella Wi-Fi](/images/articles/wifi-airtime-client-density-diagram.svg)

---

## Airtime e throughput non sono la stessa cosa

Il throughput resta una metrica utile, ma spesso viene usato come se descrivesse da solo la salute della WLAN.

Non è così.

Due celle possono mostrare un buon throughput con pochi client e comportarsi in modo molto diverso quando il numero di dispositivi attivi aumenta.

Una parte dell'airtime viene infatti consumata da retry, contention, backoff, beacon, management frame, ACK, interframe spacing e altri meccanismi necessari al funzionamento del protocollo.

Il throughput applicativo è quindi soltanto il risultato finale di un sistema molto più complesso.

Per il capacity planning è spesso più utile chiedersi **quanto traffico utile viene trasportato per unità di airtime consumato**.

Una cella efficiente riesce a trasferire dati rapidamente e a liberare il canale.

Una cella inefficiente può restare occupata molto a lungo pur trasferendo relativamente poco traffico utile.

---

## Client density: contare gli utenti non basta

La densità viene spesso descritta semplicemente come numero di persone presenti in un'area.

Dal punto di vista Wi-Fi è una semplificazione.

Ciò che conta realmente è quanti dispositivi sono presenti, quanti sono associati, quanti sono contemporaneamente attivi e soprattutto **che tipo di traffico stanno generando**.

Cento dispositivi quasi inattivi non hanno lo stesso impatto di trenta dispositivi impegnati contemporaneamente in video call, upload o traffico cloud intenso.

Per questo un capacity plan serio deve conoscere il profilo applicativo.

Un ambiente dominato da browsing leggero richiede un dimensionamento diverso rispetto a una sala dove decine di utenti utilizzano videoconferenza, condivisione schermo e sincronizzazione cloud nello stesso momento.

Il numero di client è quindi importante, ma non può essere analizzato senza il contesto del traffico.

---

## I client lenti consumano capacità anche per gli altri

Uno degli aspetti più importanti del Wi-Fi è che il mezzo è condiviso.

Quando un client opera con un data rate basso, non rallenta soltanto sé stesso.

Occupa il canale più a lungo.

Questo può accadere perché il client è lontano dall'access point, perché l'SNR è ridotto, perché esistono interferenze, perché il dispositivo ha caratteristiche radio limitate o perché il roaming avviene troppo tardi.

In tutti questi casi aumenta il tempo necessario per trasportare la stessa quantità di traffico.

Il risultato è una riduzione della capacità disponibile per l'intera cella.

Per questo una rete enterprise orientata alla capacità deve cercare di evitare che una quota significativa dei client trascorra troppo tempo a data rate inefficienti.

Il problema non è soltanto la velocità del singolo dispositivo.

È l'efficienza collettiva dell'airtime.

---

## MCS, SNR e capacità reale

Qui il legame con la modulazione diventa diretto.

Il **Modulation and Coding Scheme** determina quanta informazione può essere trasportata in ogni simbolo e con quale livello di ridondanza.

Quando il link radio è pulito e l'SNR è elevato, il client può utilizzare MCS più efficienti e completare la trasmissione più rapidamente.

Quando la qualità del collegamento peggiora, il sistema scende verso profili più robusti ma meno efficienti.

Questo significa che una rete che mantiene i client in condizioni RF favorevoli tende anche a utilizzare meglio l'airtime.

La capacità, quindi, non è separabile dal design RF.

La copertura deve essere sufficiente, ma soprattutto deve permettere ai client di lavorare per buona parte del tempo con condizioni coerenti con gli MCS necessari al servizio.

---

## Retry: capacità persa senza traffico utile

Ogni retry è airtime consumato per trasmettere nuovamente qualcosa che avrebbe dovuto arrivare al primo tentativo.

In ambienti molto densi questo può diventare uno dei principali fattori di perdita di capacità.

Le cause possono essere differenti: interferenze, collisioni, hidden node, SNR insufficiente, client sticky, rate adaptation aggressivo o semplicemente un dominio radio troppo congestionato.

La cosa importante è che una cella può mostrare utilization elevata senza che quell'airtime stia producendo altrettanto traffico utile.

Un alto numero di retry rende quindi il canale apparentemente molto occupato ma poco produttivo.

Nel capacity planning è fondamentale distinguere **airtime usato bene** da **airtime perso in inefficienza**.

---

## Channel utilization: un numero da interpretare

La channel utilization è una metrica importante, ma non va letta isolatamente.

Un canale molto utilizzato può essere perfettamente normale in un ambiente ad alta densità.

Il punto è capire come viene utilizzato.

Se la maggior parte delle trasmissioni avviene con MCS efficienti, pochi retry e client ben distribuiti, una utilization elevata può comunque produrre buone prestazioni.

Se invece l'occupazione nasce da retry, client lenti, overlapping cells o sorgenti interferenti, l'esperienza può degradare molto prima che il canale arrivi a un livello apparentemente estremo.

Per questo utilization, SNR, retry e data rate devono essere letti insieme.

---

## Channel width e capacity planning

Una delle decisioni progettuali più importanti riguarda la larghezza di canale.

Canali più ampi permettono PHY rate superiori, ma riducono il numero di canali disponibili e quindi la possibilità di riutilizzare lo spettro in modo efficiente.

In ambienti enterprise densi questo compromesso è decisivo.

Una cella a 80 MHz può offrire un picco di velocità elevato, ma se questo riduce troppo il frequency reuse nell'intero piano, la capacità aggregata può peggiorare.

Per questo 20 MHz rimane una scelta molto efficace in numerosi scenari ad alta densità.

Non perché sia sempre migliore, ma perché permette di costruire un piano canali più granulare e controllare meglio la contention tra celle.

La domanda corretta non è quindi:

**“quanto posso allargare il canale?”**

ma:

**“quale channel width massimizza la capacità complessiva dell'ambiente?”**

---

## Frequency reuse e dominio di contention

Quando due celle vicine utilizzano lo stesso canale, devono condividere il mezzo.

Più cresce il numero di dispositivi che possono sentirsi sullo stesso canale, più cresce il dominio di contention.

Questo non significa necessariamente che il progetto sia sbagliato. Il riuso dei canali è inevitabile.

Il problema è **quanto frequentemente e quanto vicino** lo stesso canale viene riutilizzato.

In un design ad alta densità, il frequency reuse è uno degli elementi centrali del capacity planning.

Una rete con molte celle ma con canali riutilizzati male può avere meno capacità di una rete con meno AP ma un piano RF più ordinato.

Questo è anche il motivo per cui aggiungere access point non risolve automaticamente un problema di capacità.

In alcuni casi può peggiorarlo.

---

## Più access point non significa automaticamente più capacità

È intuitivo pensare che aumentando il numero di AP aumenti sempre la capacità.

Ma se gli access point aggiunti creano più overlap, aumentano il riutilizzo degli stessi canali o generano celle eccessivamente piccole senza un reale beneficio, il risultato può essere opposto.

La densificazione ha senso quando crea più opportunità di frequency reuse e riduce il numero di client per cella senza aumentare eccessivamente la contention.

Per questo il numero di access point deve essere il risultato del progetto, non il suo obiettivo.

La domanda non deve essere “quanti AP possiamo installare?”, ma “quanti AP servono per ottenere il comportamento RF e la capacità richiesta?”.

---

## Overhead e numero di SSID

Una parte dell'airtime viene utilizzata anche dal traffico di management.

Ogni SSID aggiunge beacon e ulteriori elementi di overhead.

In ambienti molto densi, mantenere molti SSID può diventare un costo significativo.

Questo non significa che debba esistere un unico SSID in qualsiasi rete, ma che ogni nuovo SSID dovrebbe avere una ragione architetturale precisa.

Il capacity planning deve quindi considerare anche la struttura logica della WLAN.

Segmentazione e policy possono spesso essere gestite in modo più efficiente attraverso autenticazione, VLAN dinamiche e policy centralizzate, evitando di moltiplicare inutilmente gli SSID.

---

## Capacity planning per voce e collaboration

La voce e le applicazioni di collaboration mostrano rapidamente i limiti di una rete sottodimensionata.

Non richiedono necessariamente grandi quantità di banda per singolo flusso, ma sono molto sensibili alla disponibilità costante di airtime.

Se il canale alterna momenti di forte contention, retry elevati e variazioni rapide del data rate, jitter e latency possono aumentare anche quando il throughput medio sembra sufficiente.

Per questo una rete destinata a Teams, VoWiFi o videoconferenza deve essere progettata con margine.

Non basta calcolare il traffico medio.

Bisogna considerare la simultaneità e la stabilità del mezzo radio.

---

## Capacity planning e roaming

Il roaming ha un effetto diretto anche sulla capacità.

Un client che rimane associato troppo a lungo all'AP precedente tende a scendere progressivamente verso MCS meno efficienti.

Continua a funzionare, ma occupa più airtime.

Un buon design delle celle permette invece al client di trovare un AP migliore prima di entrare in una zona di forte inefficienza.

Questo non significa forzare artificialmente il roaming.

Significa costruire un ambiente RF nel quale il comportamento naturale del client porti a transizioni più sane.

Per questo secondary coverage, potenze radio e cell overlap devono essere considerati anche come elementi di capacity planning.

---

## Capacity planning con Ekahau AI Pro

Con **Ekahau AI Pro** il capacity planning deve essere letto come un'estensione del design RF.

Signal Strength, SNR, Secondary Coverage e Channel Overlap aiutano a capire se la struttura delle celle permette ai client di mantenere collegamenti efficienti.

La vera utilità arriva però dalla correlazione.

Una zona può avere un RSSI eccellente e allo stesso tempo presentare un riutilizzo dei canali troppo aggressivo.

Un'altra può avere un livello di segnale leggermente inferiore ma una distribuzione RF molto più pulita.

Il progetto deve quindi essere interpretato come sistema.

Non basta raggiungere una soglia di RSSI.

Bisogna verificare che la struttura delle celle permetta un buon frequency reuse e mantenga condizioni radio coerenti con la capacità attesa.

![Workflow di capacity planning con Ekahau AI Pro e Sidekick 2](/images/articles/wifi-capacity-planning-ekahau-workflow.svg)

---

## Quando Sidekick 2 diventa importante

Un predictive design può stimare il comportamento della WLAN, ma sul campo entra in gioco l'ambiente reale.

Qui **Sidekick 2** diventa particolarmente utile.

La spectrum analysis permette di osservare energia non-Wi-Fi, pattern di occupazione e condizioni che possono ridurre la capacità senza apparire direttamente nelle sole metriche di copertura.

Una WLAN teoricamente dimensionata correttamente può perdere una parte importante dell'airtime a causa di sorgenti interferenti o di un ambiente spettrale più complesso del previsto.

Per questo, quando il capacity planning deve essere validato sul campo, la combinazione tra Ekahau AI Pro e Sidekick 2 permette di passare dal modello alla misura.

---

## La validazione sul campo è parte del capacity planning

La capacità non dovrebbe essere considerata verificata solo perché il predictive design è corretto.

Una rete enterprise va osservata in esercizio.

Bisogna capire quanti client sono realmente attivi, quali data rate utilizzano, quanto airtime consumano, quale retry rate mostrano e come cambia il comportamento nei momenti di maggiore carico.

L'obiettivo non è trovare un singolo valore perfetto.

È verificare che la rete mantenga prestazioni coerenti quando il profilo di utilizzo si avvicina allo scenario previsto dal progetto.

Una WLAN progettata per cento utenti che viene validata con tre dispositivi non è stata realmente validata dal punto di vista della capacità.

---

## Il limite reale della cella

La domanda più difficile è anche quella più importante:

**quanti client può sostenere una singola cella?**

Non esiste un numero universale.

Dipende dal traffico, dai data rate sostenuti, dalla qualità RF, dalla channel width, dal numero di spatial stream, dal retry rate, dal livello di contention e dal comportamento dei dispositivi.

Per questo i valori generici del tipo “un AP supporta X client” hanno poco valore progettuale.

Un access point può permettere tecnicamente l'associazione di moltissimi dispositivi.

Questo non significa che possa offrire loro contemporaneamente l'esperienza richiesta.

La capacità utile è un concetto applicativo, non un semplice limite di associazione.

---

## Il capacity planning è un problema end-to-end

Infine, non bisogna dimenticare la rete cablata.

Aumentare la capacità RF senza dimensionare uplink, switching, PoE, routing e servizi a monte significa semplicemente spostare il collo di bottiglia.

Con access point moderni, più radio e client ad alte prestazioni, uplink multigigabit e architettura switching diventano parte integrante del progetto.

La capacità Wi-Fi deve quindi essere coerente con la capacità della rete che la sostiene.

Una WLAN non termina all'antenna dell'access point.

---

## Conclusioni

Il capacity planning Wi-Fi enterprise richiede un cambio di prospettiva.

Una rete non è ben progettata semplicemente perché il segnale arriva ovunque.

Deve continuare a funzionare in modo prevedibile quando molti client utilizzano contemporaneamente la stessa infrastruttura.

L'airtime è la risorsa centrale.

MCS bassi, retry, contention, channel width non coerenti, frequency reuse inefficiente, troppi SSID e celle progettate male possono ridurre la capacità reale molto prima che la rete sembri formalmente satura.

Ekahau AI Pro permette di costruire e validare la struttura RF che sostiene la capacità. Sidekick 2 aiuta a verificare se lo spettro reale consente alla WLAN di comportarsi come previsto.

La regola finale è semplice:

**una WLAN enterprise non è davvero ben progettata quando arriva ovunque. È ben progettata quando continua a funzionare bene anche quando molte persone la usano contemporaneamente.**
