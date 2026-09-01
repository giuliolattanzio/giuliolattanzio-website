---
title: "Ekahau per site survey Wi-Fi: AI Pro, Sidekick 2 e workflow"
description: "Come utilizzo la suite Ekahau nelle attività di site survey Wi-Fi: AI Pro, Sidekick 2, misure RF, analisi dello spettro, validazione e troubleshooting."
pubDatetime: 2026-09-01T14:55:00Z
draft: false
tags:
  - wifi
  - ekahau
  - site-survey
  - survey-wifi
  - analisi-wifi
  - troubleshooting
ogImage: /images/articles/ekahau-site-survey-ai-pro-sidekick-2-hero.svg
---
## Introduzione

Una **site survey Wi-Fi** efficace non consiste nel camminare su una planimetria e generare qualche heatmap. Il valore reale nasce dalla qualità del dato raccolto, dalla corretta interpretazione dell'ambiente RF e soprattutto dal modo in cui le misure vengono confrontate con i requisiti della WLAN.

Per le attività di survey utilizzo la **suite di strumenti Ekahau**, integrando software di progettazione e analisi con **Ekahau Sidekick 2**, così da mantenere coerente l'intero processo: preparazione della planimetria, raccolta sul campo, analisi radio, validazione post-installazione e troubleshooting.

Il mio approccio non parte dallo strumento, ma dall'obiettivo tecnico. Prima vengono definiti i requisiti della rete; poi si decide quali misure raccogliere, con quale metodo e con quale livello di dettaglio. Ekahau diventa quindi la piattaforma con cui trasformare le osservazioni RF in informazioni utilizzabili per prendere decisioni.

Questo articolo non vuole essere una scheda prodotto di Sidekick 2 o di AI Pro. L'obiettivo è descrivere **come inserisco questi strumenti in un workflow professionale di Wi-Fi engineering** e perché la combinazione tra raccolta dedicata e analisi strutturata è importante quando bisogna validare una rete reale.

![Workflow Ekahau per site survey Wi-Fi con AI Pro, Sidekick 2, analisi e reporting](/images/articles/ekahau-site-survey-ai-pro-sidekick-2-hero.svg)

---

## Il punto di partenza: requisiti, non heatmap

Prima di eseguire una survey è necessario capire cosa la rete deve realmente garantire.

Una WLAN destinata a normali attività d'ufficio ha requisiti differenti rispetto a una rete utilizzata per VoIP, terminali mobili, sistemi logistici, dispositivi industriali o ambienti ad alta densità. Anche due aree dello stesso edificio possono richiedere criteri diversi.

Per questo la domanda iniziale non dovrebbe essere:

**"Quanto segnale c'è?"**

ma piuttosto:

**"Quali condizioni radio e di connettività servono affinché i client previsti possano lavorare correttamente?"**

Da qui derivano i parametri da osservare durante la [site survey Wi-Fi](/wifi/site-survey/): livello del segnale, rapporto segnale/rumore, sovrapposizione delle celle, distribuzione dei canali, presenza di interferenze, capacità di roaming e, quando necessario, comportamento reale della connessione.

La suite Ekahau mi consente di mantenere questi elementi nello stesso processo di lavoro, dalla fase di preparazione fino all'analisi conclusiva.

---

## AI Pro come ambiente di progettazione e analisi

**Ekahau AI Pro** è il punto nel quale convergono planimetria, progetto RF, dati raccolti e analisi delle misure.

Lo utilizzo per organizzare il lavoro prima della survey e, soprattutto, per interpretare ciò che è stato misurato sul campo.

La planimetria non è un semplice sfondo grafico. Deve essere correttamente scalata e coerente con l'ambiente reale. Errori nella scala, nella posizione dei muri o nella rappresentazione degli spazi possono alterare la lettura delle distanze e rendere meno affidabile il confronto tra progetto e deployment.

Quando il contesto lo richiede, il lavoro parte dal [Wi-Fi Design](/wifi/wifi-design/), con l'obiettivo di definire una distribuzione degli Access Point compatibile con copertura, capacità e tipologia dei client. La survey serve poi a verificare quanto la situazione reale corrisponda al comportamento previsto.

AI Pro diventa quindi il punto di collegamento tra due mondi:

- **predizione**, cioè ciò che il modello progettuale prevede;
- **misura**, cioè ciò che l'ambiente reale restituisce.

La differenza tra questi due livelli è spesso la parte più interessante dell'analisi.

Un progetto può essere teoricamente corretto, ma il comportamento reale può cambiare per effetto di materiali edilizi, arredi, scaffalature, strutture metalliche, porte, vetri, densità di persone o sorgenti RF non considerate inizialmente.

---

## Sidekick 2: perché utilizzo uno strumento dedicato

Durante la raccolta sul campo utilizzo **Ekahau Sidekick 2**, spesso abbreviato in SK2.

Il vantaggio principale di uno strumento dedicato è poter costruire la survey attorno a un sistema di misura pensato specificamente per il Wi-Fi professionale, invece di dipendere esclusivamente dalle caratteristiche della scheda wireless integrata in un notebook o in un dispositivo generico.

Questo aspetto è importante perché un client commerciale non nasce come strumento di misura. Driver, chipset, algoritmi di roaming, sensibilità della radio e comportamento del sistema operativo possono introdurre variabili che hanno senso dal punto di vista dell'utente finale, ma che sono meno adatte quando l'obiettivo è raccogliere dati RF comparabili e ripetibili.

Sidekick 2 permette di lavorare sulle bande Wi-Fi moderne, incluse **2,4 GHz, 5 GHz e 6 GHz**, e di affiancare alle informazioni Wi-Fi anche l'osservazione dello spettro radio. Questo è particolarmente utile quando un problema non è spiegabile soltanto guardando SSID, BSSID e canali.

![Sidekick 2 come riferimento di misura tra ambiente Wi-Fi e analisi Ekahau](/images/articles/ekahau-sidekick-2-measurement-stack.svg)

La misura, però, non deve diventare fine a se stessa. Il punto non è accumulare dati, ma raccogliere quelli necessari per spiegare il comportamento della rete.

---

## Survey passiva: leggere la struttura RF della WLAN

La **survey passiva** è una delle attività principali che eseguo con Ekahau.

Durante la survey il sistema osserva l'ambiente radio mentre mi muovo fisicamente negli spazi da analizzare. L'obiettivo è costruire una rappresentazione della copertura e delle relazioni tra gli Access Point presenti.

Tra gli elementi che considero troviamo:

- potenza del segnale ricevuto;
- rapporto segnale/rumore;
- copertura dei singoli Access Point;
- sovrapposizione tra celle;
- distribuzione dei canali;
- utilizzo delle diverse bande;
- presenza di reti vicine;
- aree con copertura insufficiente o eccessivamente sovrapposta.

Questa attività consente di capire **come è realmente costruita la WLAN dal punto di vista RF**.

La survey passiva è particolarmente utile nella validazione post-installazione, perché permette di confrontare la rete installata con gli obiettivi definiti in fase di design.

Non la considero però sufficiente per qualsiasi problema. Una rete può mostrare valori RF apparentemente corretti e continuare a offrire un'esperienza insoddisfacente a un client reale. Per questo, quando necessario, integro la lettura passiva con test attivi e attività di troubleshooting.

Per una trattazione specifica della differenza tra le due metodologie ho approfondito il tema nell'articolo [Survey Wi-Fi passiva e attiva: quali sono le differenze?](/posts/survey-wi-fi-passiva-e-attiva-quali-sono-le-differenze/).

---

## Spectrum analysis: quando il problema non è un altro Access Point

Non tutto ciò che degrada una WLAN è necessariamente traffico Wi-Fi.

L'ambiente radio può essere influenzato anche da sorgenti che occupano lo spettro senza presentarsi come normali reti 802.11. In queste condizioni limitarsi a osservare la lista degli Access Point non è sufficiente.

L'analisi dello spettro diventa utile per capire se in una determinata porzione di banda esistono segnali o attività RF che possono contribuire a ridurre la qualità del canale.

Nel troubleshooting considero sempre importante distinguere tra:

- **co-channel interference**, dovuta a più celle che condividono lo stesso canale;
- **adjacent-channel interference**, legata a sovrapposizioni indesiderate tra canali;
- **interferenza non Wi-Fi**, che richiede una lettura dello spettro e non può essere spiegata soltanto tramite gli elementi 802.11 visibili.

Sidekick 2 diventa particolarmente utile proprio perché la componente spectrum può essere correlata con il punto fisico nel quale sto effettuando la misura.

Questo consente di passare dalla semplice affermazione "qui il Wi-Fi funziona male" a un'analisi più strutturata del motivo per cui il canale radio sta offrendo prestazioni inferiori alle aspettative.

---

## Active survey e validazione dell'esperienza reale

Quando il problema riguarda il comportamento effettivo della connessione, la sola osservazione RF non basta.

In una **survey attiva** il dispositivo partecipa realmente alla WLAN e consente di osservare il comportamento della rete con traffico e associazione attivi.

Questo permette di verificare aspetti come latenza, perdita di pacchetti, throughput e continuità della comunicazione lungo il percorso.

La distinzione è importante:

**la survey passiva descrive principalmente l'ambiente RF; la survey attiva verifica ciò che succede a una connessione realmente utilizzata.**

Le due tecniche non sono concorrenti. Le utilizzo come strumenti complementari, scegliendo il livello di verifica in base al problema da risolvere.

Una WLAN con buona copertura può comunque avere problemi di roaming, congestione, configurazione, uplink o servizi di rete. Viceversa, un problema apparentemente applicativo può avere origine in una zona RF non adeguatamente coperta.

La correlazione tra più tipi di misura è quindi più importante della singola heatmap.

---

## Il workflow che utilizzo durante una survey

Organizzo normalmente l'attività in una sequenza precisa.

![Workflow tecnico della site survey Wi-Fi: requisiti, raccolta, analisi, validazione e report](/images/articles/ekahau-workflow-site-survey.svg)

### 1. Definizione dell'obiettivo

Prima di iniziare stabilisco cosa deve essere verificato: copertura, validazione di un nuovo deployment, analisi di un problema, comportamento di una specifica area oppure confronto con un progetto esistente.

Senza un obiettivo chiaro si rischia di raccogliere una grande quantità di dati senza sapere quali siano realmente rilevanti.

### 2. Preparazione della planimetria

La mappa deve essere utilizzabile, scalata correttamente e coerente con gli spazi reali. Durante questa fase verifico anche che eventuali modifiche architettoniche rispetto alla documentazione disponibile non compromettano la qualità della survey.

### 3. Raccolta sul campo con Sidekick 2

Il percorso viene eseguito mantenendo attenzione alla continuità della misura e alla corretta posizione sulla planimetria.

Una survey non deve essere troppo veloce né troppo approssimativa. La qualità della raccolta dipende anche da quanto accuratamente viene rappresentato il percorso reale all'interno dell'edificio.

### 4. Analisi in AI Pro

Terminata la raccolta, analizzo i dati su più livelli. Non mi fermo alla heatmap del segnale.

Confronto, tra gli altri elementi:

- signal strength;
- SNR;
- secondary signal / overlap;
- distribuzione dei canali;
- copertura per banda;
- comportamento delle celle;
- presenza di interferenze;
- aree che non rispettano gli obiettivi del progetto.

### 5. Correlazione con il problema reale

Una criticità osservata sulla mappa deve essere confrontata con ciò che accade realmente alla rete.

Se l'utente segnala disconnessioni, ad esempio, non è sufficiente trovare un'area con RSSI più basso. Bisogna capire se quel valore è realmente correlato al problema, se il client esegue roaming correttamente, se il canale è congestionato o se il problema è a monte della radio.

### 6. Output e azioni correttive

Il risultato finale deve portare a decisioni tecniche concrete: riposizionamento o aggiunta di Access Point, modifica della potenza trasmissiva, revisione del channel plan, controllo delle larghezze di canale, verifica della configurazione oppure ulteriori test mirati.

Il report ha valore quando collega una misura a una causa probabile e a una possibile azione.

---

## Heatmap: utili, ma non devono diventare il risultato della survey

Le heatmap sono uno degli elementi più riconoscibili di Ekahau e sono estremamente utili per visualizzare rapidamente grandi quantità di dati.

Il rischio è però considerare la mappa colorata come il risultato finale.

Una heatmap è una **rappresentazione di un parametro**. Non è automaticamente una diagnosi.

Per esempio, una mappa del signal strength può mostrare una copertura apparentemente uniforme, ma non dice da sola:

- quanti Access Point sono udibili contemporaneamente;
- se i client stanno utilizzando la banda desiderata;
- se il canale è congestionato;
- se esistono interferenze esterne;
- se il roaming avviene nel momento corretto;
- se la rete cablata o i servizi IP stanno introducendo problemi.

Per questo considero più utile correlare più viste della stessa area e interpretarle alla luce del comportamento reale della rete.

---

## Sidekick 2 e AI Pro nel troubleshooting

La stessa piattaforma utilizzata per una survey di validazione può essere molto efficace durante il [troubleshooting Wi-Fi](/wifi/troubleshooting/).

In questo caso il workflow cambia leggermente: non parto da una verifica generale dell'edificio, ma da una domanda tecnica specifica.

Un problema di prestazioni, ad esempio, può richiedere di distinguere tra:

- segnale insufficiente;
- SNR degradato;
- eccessiva sovrapposizione tra celle;
- channel utilization elevata;
- interferenza non Wi-Fi;
- roaming non coerente con il profilo del client;
- problema non radio, come DHCP, DNS, autenticazione o uplink.

La misura RF è quindi uno degli strati dell'analisi, non l'unico.

Questo è uno dei motivi per cui preferisco utilizzare una suite coerente: i dati raccolti sul campo possono essere riportati rapidamente sulla planimetria e confrontati con il punto fisico nel quale il problema viene osservato.

---

## 6 GHz e reti Wi-Fi moderne

La diffusione della banda **6 GHz** rende ancora più importante lavorare con strumenti capaci di osservare in modo coerente le diverse bande utilizzate dalla WLAN.

2,4 GHz, 5 GHz e 6 GHz non devono essere trattate come semplici copie dello stesso ambiente radio.

Hanno caratteristiche di propagazione, disponibilità di spettro e comportamenti dei client differenti. Una buona progettazione deve quindi tenere conto della popolazione reale dei dispositivi e della strategia con cui la rete distribuisce i client tra le bande.

Durante una survey questo significa verificare non soltanto se un Access Point è visibile, ma **quale banda sta fornendo la copertura utile, con quale livello e con quale continuità nell'area di interesse**.

Sidekick 2 e l'ambiente di analisi Ekahau permettono di mantenere questa lettura all'interno dello stesso workflow di misura.

---

## Non esiste un valore RF corretto in assoluto

Un errore frequente nell'analisi Wi-Fi è trasformare una soglia in una regola universale.

RSSI, SNR, overlap e channel utilization devono sempre essere interpretati rispetto al tipo di applicazione e ai client presenti.

Una soglia adatta a un dispositivo può non essere sufficiente per un altro. Una rete destinata a traffico voce richiede particolare attenzione alla continuità della copertura e al [roaming](/wifi/roaming/), mentre un ambiente con dispositivi IoT può avere caratteristiche radio e comportamenti completamente differenti.

Per questo, quando utilizzo Ekahau, considero le soglie come **criteri di validazione definiti a partire dai requisiti**, non come valori da applicare automaticamente a qualsiasi progetto.

Il software rende semplice visualizzare se una zona rispetta o meno un requisito; il lavoro tecnico consiste nel decidere quale requisito abbia realmente senso.

---

## Approfondimento su Ekahau Wi-Fi Sidekick 2 e AI Pro

Per chi vuole approfondire in modo più specifico la combinazione tra hardware e software Ekahau, segnalo anche questa risorsa esterna dedicata a **[Ekahau Wi-Fi Sidekick 2 + AI Pro](https://surveywifi.it/ekahau-wifi-sidekick-2-ai-pro/)**.

Il contenuto esterno è focalizzato sul prodotto e sulla soluzione. In questo articolo ho invece scelto un taglio differente: **il metodo di lavoro**, cioè il modo in cui utilizzo gli strumenti Ekahau all'interno di una site survey, dalla definizione dei requisiti fino alla validazione e al troubleshooting.

Questa distinzione è importante anche dal punto di vista tecnico: conoscere le funzioni di uno strumento non equivale automaticamente a costruire una buona survey. Il risultato dipende dal processo con cui quelle funzioni vengono utilizzate.

---

## Conclusioni

Per le mie attività di **site survey e analisi Wi-Fi utilizzo la suite Ekahau**, con **AI Pro e Sidekick 2** come strumenti centrali nel processo di raccolta e interpretazione dei dati.

Il valore che cerco non è semplicemente la produzione di una heatmap, ma la possibilità di seguire un workflow coerente:

**requisito → misura → analisi → correlazione → decisione tecnica**.

Sidekick 2 permette di raccogliere dati RF con uno strumento dedicato; AI Pro permette di riportarli sulla planimetria, confrontarli con il progetto e analizzare il comportamento della WLAN da più punti di vista.

Questo approccio è utile sia durante una validazione post-deployment sia quando occorre individuare la causa di un problema reale.

Una buona survey, in definitiva, non deve limitarsi a descrivere dove arriva il segnale. Deve spiegare **se la rete sta funzionando secondo i requisiti per cui è stata progettata e, quando non lo fa, fornire elementi tecnici sufficienti per capire dove intervenire**.
