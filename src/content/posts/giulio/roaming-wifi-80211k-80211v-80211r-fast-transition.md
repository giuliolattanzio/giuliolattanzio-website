---
title: "Roaming Wi-Fi enterprise: 802.11k, 802.11v e 802.11r spiegati con scenari reali"
description: "Come funzionano 802.11k, 802.11v e 802.11r nel roaming Wi-Fi enterprise: Neighbor Report, BSS Transition, Fast BSS Transition, tempi di handoff, VoIP, Teams, compatibilità client, troubleshooting e best practice."
pubDatetime: 2026-09-24T10:24:00Z
draft: false
tags:
  - wifi
  - roaming
  - 80211k
  - 80211v
  - 80211r
  - enterprise-wifi
  - troubleshooting
ogImage: /images/articles/roaming-wifi-80211k-80211v-80211r-hero.webp
---
## Introduzione

Il **roaming Wi-Fi** è uno dei temi più importanti quando si progetta una WLAN enterprise destinata ad applicazioni real-time, mobilità continua e alta densità di client. Una rete può avere copertura eccellente, RSSI apparentemente buoni e capacità sufficiente, ma offrire comunque un'esperienza scadente se i client rimangono associati troppo a lungo all'Access Point sbagliato o impiegano troppo tempo a completare l'handoff verso un AP migliore.

La prima regola da ricordare è semplice: **nel Wi-Fi il roaming è una decisione del client**. L'infrastruttura può fornire informazioni, suggerimenti e meccanismi per rendere il passaggio più rapido, ma non può normalmente “spostare” un dispositivo come farebbe una rete cellulare.

Gli standard **802.11k**, **802.11v** e **802.11r** sono stati introdotti proprio per migliorare questo processo. Non svolgono lo stesso compito e non vanno considerati come tre versioni successive della stessa funzione: ciascuno interviene in una fase diversa del roaming.

![Roaming Wi-Fi enterprise con 802.11k, 802.11v e 802.11r](/images/articles/roaming-wifi-80211k-80211v-80211r-hero.webp)

In questo articolo vediamo come funzionano, quali problemi risolvono, quali limiti hanno e come interpretarli durante il [Wi-Fi design](/wifi/wifi-design/), la [site survey](/wifi/site-survey/) e il [troubleshooting](/wifi/troubleshooting/).

---

## Il roaming Wi-Fi: cosa succede realmente

Un client associato a un Access Point continua a misurare il collegamento corrente e, a seconda del proprio driver, chipset, sistema operativo e profilo energetico, può eseguire scansioni per cercare BSS alternativi.

Il processo classico comprende quattro fasi:

1. il client decide che il collegamento corrente non è più soddisfacente;
2. individua uno o più AP candidati;
3. sceglie il nuovo BSS;
4. esegue autenticazione, associazione e, quando previsto, le operazioni di sicurezza necessarie.

Senza ottimizzazioni, una parte importante del tempo può essere spesa nella **scansione dei canali** e nella ripetizione dell'autenticazione. Se il client sta trasportando traffico VoIP o una chiamata Teams, anche poche centinaia di millisecondi possono produrre audio interrotto, jitter o packet loss percepibile.

Il problema non è quindi soltanto “avere abbastanza segnale”, ma creare una rete nella quale il client possa **individuare rapidamente un AP migliore e completare il passaggio con il minimo downtime possibile**.

---

## Il client decide quando fare roaming

Ogni vendor implementa algoritmi differenti. Alcuni dispositivi iniziano a cercare alternative quando l'RSSI scende sotto una determinata soglia, altri combinano RSSI, SNR, retry, data rate, carico, movimento e altri parametri interni.

Per questo non esiste una soglia universale del tipo “a -67 dBm il client fa roaming”. -67 dBm può essere un obiettivo di design utile in certi scenari voice, ma non rappresenta una legge del protocollo.

Un client può comportarsi in modo **sticky**, mantenendo l'associazione con un AP anche quando è disponibile un BSS molto migliore. Al contrario, un dispositivo con roaming aggressivo può cambiare BSS frequentemente e creare instabilità se la sovrapposizione delle celle è eccessiva.

È qui che 802.11k e 802.11v aiutano il client a prendere decisioni migliori, mentre 802.11r riduce il costo temporale della transizione.

---

## 802.11k: Neighbor Report e scoperta più efficiente degli AP

**802.11k** introduce meccanismi di Radio Resource Measurement. Nel contesto del roaming, la funzione più conosciuta è il **Neighbor Report**.

Senza informazioni aggiuntive, un client che vuole trovare un AP alternativo può dover eseguire una scansione più ampia dei canali. In una rete moderna, soprattutto in 5 GHz o 6 GHz, questo può significare controllare molti canali e spendere tempo prezioso fuori dal canale di servizio.

Con un Neighbor Report, l'infrastruttura può comunicare al client quali BSS vicini sono candidati plausibili. Il dispositivo può quindi ridurre il numero di canali da esplorare e velocizzare la fase di discovery.

802.11k **non ordina al client di fare roaming** e non garantisce che venga scelto un determinato AP. Fornisce informazioni utili per rendere la ricerca più efficiente.

In una WLAN ben progettata, il vantaggio diventa particolarmente evidente quando:

- gli AP sono numerosi;
- i canali sono distribuiti su molte frequenze;
- il client è in movimento;
- il traffico real-time non tollera lunghe pause di scansione.

---

## 802.11v: BSS Transition Management

**802.11v** comprende diverse funzioni di network management; quella più interessante per il roaming è il **BSS Transition Management**.

L'Access Point può inviare al client un **BSS Transition Management Request**, suggerendo uno o più BSS candidati verso cui spostarsi. Il client resta però libero di accettare o ignorare il suggerimento.

Questo punto è fondamentale: 802.11v non trasforma la WLAN in una rete nella quale il controller decide autoritariamente la cella del dispositivo. È un meccanismo di cooperazione.

L'infrastruttura può utilizzare informazioni come carico, qualità del collegamento, policy e topologia per suggerire una transizione più appropriata. Un client compatibile può rispondere e accelerare la selezione del nuovo AP.

In ambienti enterprise 802.11v è utile per ridurre i casi di **sticky client**, ma il risultato dipende sempre dall'implementazione del client. Due dispositivi collegati alla stessa WLAN possono reagire in modo diverso allo stesso BSS Transition Request.

---

## 802.11r: Fast BSS Transition

**802.11r**, noto come **Fast BSS Transition (FT)**, interviene soprattutto sulla parte di autenticazione e key management durante il roaming.

In una WLAN enterprise con autenticazione 802.1X, ripetere l'intera procedura di autenticazione a ogni cambio AP può introdurre una latenza incompatibile con applicazioni voice. 802.11r permette di predisporre materiale crittografico e relazioni di fiducia che consentono al client di completare il passaggio in modo molto più rapido.

In termini pratici, l'obiettivo è ridurre il tempo nel quale il client non riesce a scambiare traffico utile durante la transizione tra BSS.

### FT over-the-air

Nel modello **FT over-the-air**, il client comunica direttamente con il nuovo AP durante la procedura di Fast Transition.

È il metodo più intuitivo dal punto di vista del flusso radio: il dispositivo prepara il passaggio e completa gli scambi necessari con il target AP.

### FT over-the-DS

Nel modello **FT over-the-DS**, parte degli scambi avviene attraverso il Distribution System, utilizzando l'AP corrente per preparare la transizione verso il target.

Il supporto pratico varia tra piattaforme e client. Per questo, nella progettazione reale, è importante verificare non soltanto che il controller o gli Access Point supportino 802.11r, ma anche quale modalità venga utilizzata e come si comportino i dispositivi presenti nell'ambiente.

---

## Come lavorano insieme 802.11k, 802.11v e 802.11r

I tre standard sono complementari:

- **802.11k** aiuta il client a capire **dove cercare**;
- **802.11v** aiuta l'infrastruttura a suggerire **dove sarebbe opportuno andare**;
- **802.11r** aiuta il client a completare **più rapidamente il passaggio**.

![Flusso di roaming tra tre Access Point con 802.11k, 802.11v e 802.11r](/images/articles/roaming-wifi-kvr-flow.svg)

Un roaming ottimizzato può quindi seguire un flusso simile:

1. il client è associato ad AP1;
2. riceve informazioni sui BSS vicini tramite 802.11k;
3. l'infrastruttura può suggerire AP2 tramite 802.11v;
4. il client valuta il candidato e decide di muoversi;
5. 802.11r riduce il tempo necessario per la transizione di sicurezza;
6. il traffico riprende su AP2 con una discontinuità minima.

---

## Roaming e soglie RSSI: progettare la sovrapposizione corretta

Gli standard di roaming non possono compensare un cattivo progetto RF.

Se tra due celle esiste una zona nella quale il client perde AP1 prima di riuscire a ricevere AP2 con qualità sufficiente, nessun Fast Transition potrà evitare il problema. Allo stesso modo, una sovrapposizione eccessiva con livelli molto alti provenienti da numerosi AP può rendere più difficile la selezione del BSS e aumentare la contesa co-channel.

La cell overlap va quindi progettata insieme a:

- RSSI target;
- SNR;
- minimum data rate;
- potenza trasmessa;
- channel plan;
- capacità e densità attesa;
- caratteristiche dei client reali.

Durante una [survey passiva e attiva](/posts/survey-wi-fi-passiva-e-attiva-quali-sono-le-differenze/) è importante non limitarsi alla heatmap del segnale. Per un progetto orientato al roaming servono anche analisi di SNR, channel overlap, retry, data rate, latenza e comportamento del client in movimento.

---

## VoIP, Teams e applicazioni real-time

Il roaming diventa critico soprattutto quando il traffico non può essere bufferizzato per lunghi periodi.

Una sessione web può tollerare una breve pausa senza che l'utente se ne accorga. Una conversazione VoIP o una riunione Teams è molto più sensibile a:

- packet loss consecutivo;
- jitter;
- variazioni improvvise di RTT;
- pause durante la riassociazione.

L'obiettivo non è semplicemente ottenere un “roaming riuscito”, ma contenere il **roaming interruption time** entro valori compatibili con l'applicazione.

In una rete voice-oriented bisogna misurare il comportamento reale durante il movimento: un client può completare correttamente il passaggio ma impiegare abbastanza tempo da produrre comunque un'interruzione audio percepibile.

---

## WPA2/WPA3 Enterprise e autenticazione

Le WLAN enterprise aggiungono complessità perché il roaming deve convivere con 802.1X, RADIUS e la gerarchia delle chiavi.

Con 802.11r il materiale necessario alla Fast Transition viene gestito in modo da ridurre la necessità di ripetere completamente l'autenticazione durante ogni handoff. Il beneficio può essere molto significativo negli ambienti con dispositivi in movimento continuo.

È però essenziale testare la compatibilità dei client. Alcuni dispositivi legacy, embedded o IoT possono avere implementazioni incomplete di 802.11r oppure comportarsi in modo anomalo quando FT è obbligatorio.

Per questo molte piattaforme enterprise consentono modalità di compatibilità nelle quali 802.11r viene utilizzato dai client che lo supportano senza escludere necessariamente tutti gli altri. La terminologia varia tra vendor e va verificata sulla piattaforma specifica.

---

## PMK caching, OKC e Fast Transition

Prima e oltre 802.11r esistono altri meccanismi che possono ridurre il costo dell'autenticazione durante il roaming, come **PMK caching** e implementazioni di **Opportunistic Key Caching (OKC)**.

Non sono equivalenti a 802.11r e non vanno confusi con FT. In un troubleshooting serio è importante capire quale meccanismo venga effettivamente utilizzato dal client e dall'infrastruttura.

Una cattura 802.11 permette di osservare i frame di reassociation e gli Information Element presenti negli scambi, evitando di dedurre il comportamento soltanto dalla configurazione del controller.

---

## Client legacy, IoT e compatibilità

Il supporto a 802.11k/v/r è oggi molto diffuso su laptop e smartphone moderni, ma in una rete enterprise non bisogna assumere che tutti i dispositivi si comportino allo stesso modo.

Terminali industriali, telefoni Wi-Fi datati, stampanti, scanner, dispositivi medicali e IoT possono avere stack Wi-Fi conservativi o driver poco aggiornati.

Prima di rendere obbligatoria una funzione è utile costruire una matrice di compatibilità:

| Client | 802.11k | 802.11v | 802.11r | Note |
|---|---|---|---|---|
| Smartphone moderni | spesso sì | spesso sì | spesso sì | comportamento dipendente da OS/versione |
| Laptop enterprise | spesso sì | spesso sì | spesso sì | verificare driver WLAN |
| Voice handset Wi-Fi | variabile | variabile | spesso importante | testare con chiamata attiva |
| IoT/legacy | variabile | variabile | talvolta no | richiede test dedicato |

La compatibilità reale va verificata con i modelli effettivamente presenti, non soltanto con la famiglia di prodotto.

---

## Minimum data rate e sticky client

Uno dei parametri più efficaci nel controllare la dimensione pratica delle celle è il **minimum data rate**.

Mantenere attivi data rate legacy molto bassi può consentire a un client di restare associato a un AP lontano anche quando esistono alternative migliori. Questo non significa che aumentare indiscriminatamente il minimum rate sia sempre corretto: il valore deve essere coerente con copertura, densità e client capability.

Quando si alza il minimum data rate bisogna verificare che la copertura al bordo cella rimanga adeguata e che i client più deboli non vengano semplicemente espulsi senza avere un BSS alternativo valido.

Roaming e RF design devono quindi essere considerati insieme.

---

## Potenza degli AP e potenza dei client

Un errore frequente è progettare celle guardando soltanto la potenza dell'Access Point.

Un AP può trasmettere a potenza elevata e risultare visibile molto lontano, mentre un client portatile o uno smartphone potrebbe non avere la stessa capacità in uplink. Si crea così una cella apparentemente ampia in downlink ma sbilanciata dal punto di vista bidirezionale.

Ridurre correttamente la potenza, mantenere una geometria coerente delle celle e progettare in funzione dei client reali favorisce anche decisioni di roaming più sensate.

Questo principio è strettamente collegato alla [propagazione e ai radiation pattern delle antenne](/posts/propagazione-wifi-antenne-access-point-pattern-azimuth-elevation/).

---

## Come misurare il roaming

Per capire se un roaming è realmente buono bisogna misurarlo.

Un test utile prevede un client controllato che si sposta tra due o più celle mentre genera traffico continuo. A seconda dello scenario si possono utilizzare:

- ping con intervallo ridotto;
- flussi UDP;
- chiamata VoIP;
- sessione Teams;
- packet capture 802.11;
- log controller/AP;
- strumenti di survey professionali.

I parametri da osservare comprendono:

- timestamp del trigger di roaming;
- ultimo frame utile su AP1;
- authentication/reassociation verso AP2;
- primo frame dati utile su AP2;
- numero di pacchetti persi;
- massimo RTT durante il passaggio;
- eventuali retry o fallback.

Il valore più utile è spesso il tempo tra **ultimo pacchetto correttamente trasportato sul vecchio BSS e primo pacchetto utile sul nuovo BSS**.

---

## Packet capture: cosa cercare

Una cattura Wi-Fi consente di verificare se 802.11k/v/r vengono realmente utilizzati.

Per 802.11k si possono osservare richieste e risposte di measurement e Neighbor Report. Per 802.11v sono importanti i **BSS Transition Management Request/Response**. Per 802.11r bisogna analizzare gli elementi FT e la sequenza di authentication/reassociation.

Questo permette di distinguere problemi molto diversi:

- l'infrastruttura non invia il Neighbor Report;
- il client riceve 802.11v ma ignora il suggerimento;
- FT non viene negoziato;
- il client sceglie un AP non previsto;
- il roaming è veloce a livello 802.11 ma il traffico IP riprende tardi per un problema a livello superiore.

---

## Roaming tra AP dello stesso controller e tra domini differenti

Nel caso più semplice gli AP appartengono alla stessa infrastruttura di controllo e condividono SSID, policy, VLAN e contesto di sicurezza.

Scenari più complessi possono includere controller differenti, domini di mobilità, architetture distribuite o tunneling centralizzato. In questi casi il tempo di roaming non dipende soltanto dalla radio: entra in gioco anche il modo in cui l'infrastruttura conserva o trasferisce sessione, policy e forwarding state.

È quindi importante separare sempre due domande:

1. **quanto velocemente il client completa la transizione 802.11?**
2. **quanto velocemente il traffico end-to-end riprende realmente?**

Una WLAN può mostrare un reassociation rapido e comunque avere una pausa applicativa causata da forwarding, DHCP, ARP, NAC o policy.

---

## Errori frequenti di configurazione

### Abilitare tutto senza testare i client

Attivare 802.11k/v/r perché “migliorano il roaming” senza una matrice client può creare incompatibilità difficili da diagnosticare.

### Celle troppo grandi

Una copertura eccessiva favorisce sticky client e aumenta il numero di BSS udibili contemporaneamente.

### Celle troppo piccole

Se la rete costringe il client a cambiare AP continuamente, il risultato può essere un'eccessiva frequenza di roaming.

### Potenze incoerenti

AP vicini con livelli di trasmissione molto diversi possono creare geometrie di cella imprevedibili.

### Fidarsi solo delle heatmap RSSI

Una heatmap verde non dimostra che il roaming sia rapido. Serve un test dinamico con il client in movimento.

---

## Workflow pratico di validazione

Per validare una WLAN orientata al roaming utilizzo un processo progressivo:

1. verificare il design RF e la sovrapposizione delle celle;
2. controllare channel plan e potenze;
3. confermare minimum data rate e SSID configuration;
4. verificare il supporto 802.11k/v/r dell'infrastruttura;
5. definire un set rappresentativo di client;
6. eseguire test in movimento con traffico continuo;
7. raccogliere packet capture e log;
8. misurare packet loss e interruption time;
9. correlare il punto fisico del roaming con RSSI/SNR e BSS disponibili;
10. correggere RF o configurazione e ripetere il test.

Questo approccio evita di attribuire automaticamente a 802.11r un problema che potrebbe essere causato, per esempio, da un client sticky o da una copertura mal bilanciata.

---

## Best practice

Per un ambiente enterprise orientato alla mobilità considero fondamentali questi principi:

- progettare prima la **radio**, poi ottimizzare il roaming;
- mantenere SSID e policy coerenti tra gli AP interessati;
- usare 802.11k e 802.11v quando supportati e validati sui client;
- valutare 802.11r soprattutto per voice, collaboration e mobilità continua;
- verificare la compatibilità dei dispositivi legacy;
- evitare potenze eccessive;
- definire minimum data rate coerenti con il design;
- misurare il roaming con traffico reale;
- usare packet capture quando il comportamento del client non è chiaro;
- validare dopo ogni modifica significativa alla WLAN.

---

## Conclusioni

Un buon roaming Wi-Fi non nasce dall'attivazione di una singola checkbox. È il risultato dell'interazione tra **RF design, comportamento del client, sicurezza, configurazione degli AP e supporto degli standard 802.11k, 802.11v e 802.11r**.

802.11k riduce il lavoro necessario per trovare AP candidati, 802.11v permette all'infrastruttura di suggerire una transizione e 802.11r riduce il costo temporale dell'handoff. Insieme possono migliorare notevolmente l'esperienza, ma soltanto se le celle sono progettate correttamente e i client utilizzati nell'ambiente supportano realmente le funzioni configurate.

Per questo, in una rete enterprise, il roaming va **progettato, misurato e validato sul campo**. La combinazione di survey, analisi RF, packet capture e test applicativi è ciò che permette di distinguere una WLAN semplicemente “coperta” da una WLAN realmente adatta alla mobilità.
