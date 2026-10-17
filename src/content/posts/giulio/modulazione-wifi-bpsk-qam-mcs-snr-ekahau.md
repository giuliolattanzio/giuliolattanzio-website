---
title: "Modulazione nel Wi-Fi: da BPSK a 4096-QAM, MCS, SNR e prestazioni reali"
description: "Come funziona la modulazione nel Wi-Fi: BPSK, QPSK, QAM, OFDM, MCS, coding rate, SNR e data rate. Analisi pratica con Ekahau AI Pro e Sidekick 2."
pubDatetime: 2026-10-17T20:05:00Z
draft: false
tags:
  - wifi
  - rf
  - modulation
  - qam
  - mcs
  - snr
  - ekahau
  - sidekick2
  - wlan-design
  - enterprise-wifi
ogImage: /images/articles/wifi-modulazione-qam-mcs-ekahau-hero.svg
---
## Introduzione

Quando si parla di prestazioni Wi-Fi, l'attenzione cade spesso su elementi immediatamente visibili come RSSI, larghezza di canale, numero di spatial stream o velocità teorica dichiarata dall'access point. Dietro a tutti questi valori, però, esiste un meccanismo fondamentale che determina quanta informazione può essere trasportata in ogni intervallo di tempo: **la modulazione**.

La modulazione è il modo con cui l'informazione digitale viene rappresentata sul segnale radio. Non è un dettaglio accademico. È uno dei punti in cui qualità RF, rumore, interferenze e capacità del client si trasformano direttamente in prestazioni.

Quando le condizioni radio sono eccellenti, il sistema può utilizzare schemi di modulazione più densi e trasportare più bit per simbolo. Quando la qualità del collegamento peggiora, il Wi-Fi deve diventare più conservativo. Riduce il livello di modulazione, aumenta la robustezza e sacrifica velocità per mantenere la comunicazione affidabile.

Questo comportamento dinamico è una delle ragioni per cui due client associati allo stesso access point possono ottenere prestazioni molto differenti anche a pochi metri di distanza.

![Modulazione Wi-Fi, QAM, MCS e qualità RF](/images/articles/wifi-modulazione-qam-mcs-ekahau-hero.svg)

---

## Dall'informazione digitale al segnale radio

Un frame Wi-Fi nasce come informazione digitale. Prima che possa attraversare l'aria deve essere trasformato in una forma che possa essere trasmessa tramite onde elettromagnetiche.

La modulazione associa combinazioni di bit a differenti stati del segnale. Questi stati possono essere distinti attraverso variazioni di fase e ampiezza.

Negli schemi più semplici il numero di stati disponibili è ridotto. Questo rende ogni simbolo più facile da distinguere anche quando il segnale è debole o disturbato. Aumentando il numero di stati, invece, è possibile codificare più bit nello stesso simbolo, ma diventa necessario ricevere il segnale con maggiore precisione.

È il compromesso centrale della modulazione Wi-Fi:

**più informazione per simbolo significa maggiore efficienza, ma anche minore tolleranza a rumore e distorsione.**

Per questo il Wi-Fi non utilizza sempre lo schema di modulazione più elevato disponibile. Access point e client adattano continuamente il rate alle condizioni del collegamento.

## BPSK, QPSK e QAM

La progressione può essere letta come un aumento della quantità di informazione rappresentata da ciascun simbolo.

Con **BPSK** esistono due stati e ogni simbolo rappresenta un bit. Con **QPSK** gli stati diventano quattro e ogni simbolo può rappresentare due bit.

Quando si passa alla **Quadrature Amplitude Modulation**, o QAM, il numero di possibili combinazioni cresce rapidamente. 16-QAM rappresenta quattro bit per simbolo, 64-QAM ne rappresenta sei, 256-QAM otto, 1024-QAM dieci e 4096-QAM dodici.

Questa progressione spiega perché le generazioni Wi-Fi più recenti possono raggiungere data rate molto elevati senza limitarsi ad aumentare la potenza radio.

Wi-Fi 5 ha portato 256-QAM in primo piano. Wi-Fi 6 e 6E hanno introdotto 1024-QAM. Wi-Fi 7 può utilizzare 4096-QAM in condizioni adeguate.

Il salto da 1024-QAM a 4096-QAM non significa però che una rete Wi-Fi 7 sia sempre proporzionalmente più veloce. La costellazione diventa molto più densa e i punti che rappresentano i simboli sono più vicini tra loro. Per distinguerli correttamente, il ricevitore ha bisogno di un segnale pulito e di un rapporto segnale-rumore elevato.

![Densità crescente delle costellazioni Wi-Fi da BPSK a 4096-QAM](/images/articles/wifi-modulation-constellations.svg)

## La costellazione e il concetto di margine

Una costellazione QAM può essere immaginata come una mappa di punti. Ogni punto rappresenta una combinazione di bit.

Con pochi punti, come in BPSK o QPSK, la distanza tra uno stato e l'altro è ampia. Anche se il segnale ricevuto viene alterato da rumore o interferenza, il demodulatore ha ancora un buon margine per capire quale simbolo sia stato trasmesso.

Con 256-QAM, 1024-QAM o 4096-QAM, invece, i punti sono molto più ravvicinati. Una piccola variazione di ampiezza o fase può spostare il simbolo ricevuto verso la regione decisionale sbagliata.

Questo è il motivo per cui modulazioni più elevate richiedono condizioni RF migliori.

Non basta quindi chiedersi quanto sia forte il segnale. Bisogna chiedersi **quanto il segnale sia distinguibile dal rumore e dalle altre fonti di energia presenti sul canale**.

## RSSI e SNR non raccontano la stessa cosa

L'RSSI descrive il livello del segnale ricevuto. È una metrica fondamentale, ma non può essere letta da sola.

Un segnale a -58 dBm può sembrare molto buono. Se però il noise floor è a -65 dBm, il margine disponibile è estremamente ridotto. Lo stesso segnale a -58 dBm con un noise floor a -95 dBm rappresenta uno scenario completamente diverso.

È qui che entra in gioco il **Signal-to-Noise Ratio**, o SNR.

In forma semplificata:

**SNR = livello del segnale - livello del rumore**

Il valore non descrive semplicemente quanto "forte" sia il Wi-Fi, ma quanto spazio esista tra il segnale utile e ciò che può confonderne la ricezione.

Più la modulazione è complessa, maggiore deve essere la qualità del collegamento. Non esiste però una soglia universale valida per ogni client e ogni chipset. La scelta del rate è influenzata dall'implementazione, dal vendor, dalle condizioni istantanee e dagli algoritmi di rate adaptation.

Per questo associare rigidamente un singolo valore RSSI a un determinato MCS è una semplificazione eccessiva.

## OFDM: molti segnali più piccoli invece di uno solo

Per comprendere davvero la modulazione nel Wi-Fi moderno bisogna introdurre anche **OFDM**, Orthogonal Frequency Division Multiplexing.

Invece di trasmettere l'intero flusso dati su una singola portante molto veloce, OFDM suddivide il canale in numerose subcarrier ortogonali. Ogni subcarrier trasporta una parte dell'informazione.

Questo approccio rende la trasmissione molto più robusta in ambienti indoor, dove riflessioni e multipath sono inevitabili.

La modulazione viene quindi applicata alle subcarrier secondo lo schema previsto dal rate utilizzato. Il ricevitore ricostruisce il flusso complessivo analizzando l'insieme dei simboli ricevuti.

Con Wi-Fi 6 e Wi-Fi 7 entra inoltre in gioco OFDMA, che permette di suddividere le risorse del canale tra più utenti. Il principio di modulazione resta però fondamentale: anche quando lo spettro viene distribuito in Resource Unit, la quantità di informazione trasportabile dipende dalla qualità del link e dal profilo di modulazione e codifica utilizzato.

## MCS: dove modulazione e robustezza diventano data rate

Nel Wi-Fi moderno il parametro che riassume gran parte di questo comportamento è il **Modulation and Coding Scheme**, MCS.

Un indice MCS non rappresenta soltanto una modulazione. Combina principalmente il tipo di modulazione con il coding rate, cioè la quantità di informazione utile rispetto ai bit utilizzati per aggiungere ridondanza e correggere errori.

Due profili possono quindi usare la stessa modulazione ma avere livelli di robustezza differenti.

Un coding rate più conservativo introduce maggiore ridondanza. Questo riduce l'efficienza netta, ma aumenta la probabilità che il ricevitore riesca a ricostruire correttamente il frame.

Quando le condizioni migliorano, il sistema può passare a un MCS più elevato. Quando aumentano rumore, distanza, interferenze o errori, il rate adaptation può scendere rapidamente.

Il comportamento reale è quindi una scala dinamica, non uno stato fisso.

![Relazione tra qualità RF, MCS e data rate nel Wi-Fi](/images/articles/wifi-mcs-snr-ekahau-analysis.svg)

## Perché il client non rimane sempre sull'MCS più alto

Un errore frequente è pensare che un client Wi-Fi 6 o Wi-Fi 7 debba utilizzare costantemente gli MCS più elevati.

In realtà sarebbe inefficiente.

Se il ricevitore non riesce a distinguere correttamente una costellazione molto densa, aumenta il numero di frame corrotti e quindi delle ritrasmissioni. Un rate nominalmente più alto può produrre un throughput effettivo peggiore se genera troppi retry.

Il sistema cerca quindi un equilibrio tra velocità e affidabilità.

Da questo punto di vista il rate adaptation è uno dei meccanismi più importanti dell'intera WLAN. AP e client cercano continuamente il profilo più aggressivo che possa essere sostenuto con un livello di errore accettabile.

Questo spiega anche perché il data rate può oscillare mentre un utente cammina, anche quando l'RSSI varia solo di pochi dB.

## Channel width e spatial stream

La modulazione è soltanto una delle variabili che contribuiscono al PHY rate.

Il data rate complessivo dipende anche dalla larghezza del canale, dal numero di spatial stream, dal guard interval e dalla generazione 802.11 utilizzata.

Un client 2x2 con un canale da 80 MHz può raggiungere un rate molto diverso da un client 1x1 sullo stesso access point anche se entrambi utilizzano lo stesso MCS.

Allo stesso modo, raddoppiare la larghezza del canale aumenta la capacità potenziale, ma può rendere più difficile il frequency reuse e aumentare l'esposizione a interferenze.

Per questo non considero corretto analizzare la modulazione isolandola dal resto del design RF.

La vera domanda non è "qual è il massimo MCS supportato?", ma:

**per quanto tempo e in quali aree della rete il client riesce realmente a sostenere MCS efficienti senza aumentare retry e consumo di airtime?**

## Airtime: il costo nascosto di una modulazione bassa

Quando un client scende a un rate molto basso, non rallenta soltanto sé stesso.

Un frame che richiede più tempo per essere trasmesso occupa il mezzo radio più a lungo. In una WLAN condivisa questo significa consumare più airtime.

È qui che la modulazione diventa un problema di capacità e non soltanto di velocità del singolo utente.

Un client lontano dall'AP, disturbato o con caratteristiche radio limitate può utilizzare più airtime per trasportare la stessa quantità di dati rispetto a un client che opera con un MCS elevato.

In ambienti ad alta densità, la conseguenza può essere significativa. La rete può avere un segnale apparentemente sufficiente in tutta l'area e soffrire comunque di capacità ridotta perché una parte importante del traffico viene trasmessa con rate inefficienti.

## Come analizzare il problema con Ekahau

In un progetto reale partirei da **Ekahau AI Pro** per mettere in relazione copertura, SNR e data rate.

La prima osservazione riguarda la Signal Strength heatmap. Serve a capire se esistono aree dove il client entra già con un margine RF insufficiente.

Subito dopo confronterei la stessa zona con la heatmap SNR. Questo passaggio è importante perché permette di individuare situazioni in cui il segnale sembra adeguato ma il margine rispetto al rumore è ridotto.

A quel punto la visualizzazione del data rate e delle condizioni di interference aiuta a costruire un quadro coerente.

L'analisi non deve cercare un singolo numero perfetto. Deve individuare una relazione.

Se un corridoio mostra buon RSSI ma SNR degradato e data rate più basso, il problema non è necessariamente la copertura. Potrebbe esserci una sorgente di interferenza, un'eccessiva sovrapposizione tra celle o un livello di rumore anomalo.

Ekahau permette quindi di leggere la modulazione indirettamente attraverso le condizioni che la rendono sostenibile.

## Quando entra in gioco Sidekick 2

Quando il problema non è spiegabile soltanto osservando il livello del segnale, il **Sidekick 2** diventa particolarmente utile.

Con una spectrum survey è possibile analizzare l'energia realmente presente sul canale e distinguere meglio la componente Wi-Fi da quella non Wi-Fi. Questo aiuta a capire perché un client possa ridurre il proprio rate anche in una zona dove la copertura appare buona.

Il punto chiave è che una heatmap RSSI fotografa la potenza del segnale desiderato. Lo spectrum analysis mostra invece che cosa sta succedendo nello spettro attorno a quel segnale.

Un caso tipico è una sala riunioni vicina a una sorgente di interferenza. La copertura dell'AP può essere eccellente, ma l'SNR può peggiorare e il client può essere costretto a scegliere modulazioni più conservative. Il risultato sarà un data rate inferiore e un maggior consumo di airtime.

In Ekahau AI Pro, i dati raccolti con Sidekick 2 permettono di correlare spectrum channel power e utilization con le altre metriche del progetto.

È questo tipo di correlazione che rende l'analisi molto più utile rispetto a un semplice speed test.

## Un esempio di lettura corretta

Immaginiamo due aree dello stesso piano.

Nella prima zona il segnale è forte e il rumore è basso. La distanza tra signal e noise è ampia, i retry sono contenuti e il client riesce a mantenere modulazioni elevate per buona parte del tempo.

Nella seconda zona l'RSSI è ancora accettabile, ma il rumore è sensibilmente più alto. Dal punto di vista dell'utente il numero delle tacche Wi-Fi può sembrare quasi identico.

Le prestazioni, però, cambiano.

Con Ekahau la differenza emerge confrontando Signal Strength e SNR. Se serve approfondire, una spectrum survey con Sidekick 2 può mostrare energia non Wi-Fi o un livello di occupazione del canale che giustifica la riduzione del rate.

Questa è la ragione per cui considero pericoloso valutare una WLAN soltanto dal valore RSSI.

Il client non modula in base alle "tacche". Modula in base alla qualità effettiva del collegamento radio.

## Modulazione e roaming

Anche il roaming è strettamente collegato a questo tema.

Un client che resta associato troppo a lungo a un AP distante tende a ridurre progressivamente il proprio rate. La comunicazione continua a funzionare, ma ogni frame occupa più airtime e la qualità dell'esperienza peggiora.

Un buon design WLAN non deve quindi limitarsi a garantire che esista segnale ovunque. Deve creare celle con dimensioni coerenti, potenze bilanciate e sovrapposizioni controllate, in modo che il client possa spostarsi verso un AP migliore prima di trascorrere troppo tempo con modulazioni inefficienti.

Le funzioni 802.11k, 802.11v e 802.11r possono migliorare il processo di roaming, ma non sostituiscono il design RF. Su questo tema ho approfondito il comportamento del client nell'articolo dedicato a [802.11k, 802.11v e 802.11r nel roaming Wi-Fi enterprise](/posts/roaming-wifi-80211k-80211v-80211r-fast-transition/).

## 4096-QAM non trasforma automaticamente una rete in Wi-Fi ad alte prestazioni

Wi-Fi 7 rende questo argomento ancora più interessante perché porta la costellazione fino a 4096-QAM.

Dodici bit per simbolo sono un risultato notevole, ma il beneficio si manifesta soprattutto nelle aree in cui il link radio è realmente pulito.

Se la rete soffre di interferenza, celle eccessivamente grandi, channel reuse poco efficace o client lontani dagli AP, la disponibilità teorica di 4096-QAM cambia poco.

Al contrario, una WLAN progettata bene permette ai client di trascorrere più tempo su MCS efficienti e di liberare il canale più rapidamente.

È questo, molto più del picco di velocità, il valore reale di una buona progettazione.

Per chi vuole approfondire le novità della nuova generazione, ho trattato MLO, 320 MHz e 4K-QAM anche nell'articolo [Wi-Fi 7 enterprise: cosa cambia davvero nella progettazione WLAN](/posts/wifi-7-enterprise-mlo-320mhz-4k-qam-progettazione-wlan/).

## Conclusioni

La modulazione è uno dei meccanismi più importanti e meno visibili del Wi-Fi.

BPSK, QPSK, 16-QAM, 64-QAM, 256-QAM, 1024-QAM e 4096-QAM non sono semplicemente livelli successivi di velocità. Rappresentano differenti compromessi tra quantità di informazione trasportata e robustezza del collegamento.

Il parametro MCS porta questo concetto nel funzionamento reale della WLAN combinando modulazione e coding rate. Il sistema sale e scende lungo questa scala continuamente, cercando il miglior equilibrio possibile tra efficienza e affidabilità.

Per questo il data rate non deve essere letto come un valore indipendente.

Dietro un MCS basso possono esserci distanza, rumore, interferenze, multipath, comportamento del client o un design RF non ottimale.

Ed è proprio qui che strumenti come **Ekahau AI Pro** e, quando serve osservare direttamente lo spettro, **Sidekick 2** permettono di passare dalla supposizione alla misura.

Una WLAN efficiente non è quella che dichiara il data rate massimo più alto.

È quella che crea le condizioni radio affinché i client possano utilizzare modulazioni efficienti in modo stabile, prevedibile e sostenibile.
