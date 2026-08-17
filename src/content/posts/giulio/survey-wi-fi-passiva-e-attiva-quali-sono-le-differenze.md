---
title: "Survey Wi-Fi passiva e attiva: quali sono le differenze?"
description: Una panoramica pratica sulle differenze tra site survey Wi-Fi
  passiva e attiva, su cosa misurano e in quali casi è utile utilizzare l’una,
  l’altra o entrambe.
pubDatetime: 2026-08-14T15:05:00Z
draft: false
tags:
  - wifi
  - site-survey
  - survey-wifi
  - analisi-wifi
  - ekahau
ogImage: /images/articles/survey-wi-fi-passiva-e-attiva-quali-sono-le-differenze.png
---
## Introduzione

Quando si analizza o si valida una rete Wi-Fi è importante distinguere tra **survey passiva** e **survey attiva**. Entrambe rientrano nel più ampio processo di [site survey Wi-Fi](/wifi/site-survey/), che permette di misurare e validare sul campo il comportamento reale di una rete wireless.

Entrambe vengono eseguite muovendosi fisicamente all'interno dell'ambiente da analizzare, ma osservano la rete da due punti di vista differenti.

La survey passiva è principalmente orientata all'analisi dell'ambiente radio e della copertura [RF](/wifi/radio-frequency/), mentre la survey attiva permette di verificare il comportamento della rete dal punto di vista di un client realmente associato.

Capire questa differenza è fondamentale per scegliere il metodo corretto in base all'obiettivo dell'analisi.

---

## Survey passiva

Durante una **survey passiva** il dispositivo utilizzato per la misurazione ascolta l'ambiente Wi-Fi senza associarsi agli Access Point.

Il client di survey osserva quindi ciò che viene trasmesso nell'ambiente radio e raccoglie informazioni sui diversi Access Point rilevati.

Questo tipo di survey permette di ottenere una rappresentazione molto dettagliata della copertura RF della rete.

Tra i parametri che possiamo analizzare troviamo, ad esempio:

- potenza del segnale ricevuto;

- rapporto segnale/rumore;

- copertura degli Access Point;

- sovrapposizione delle celle;

- canali utilizzati;

- presenza di reti Wi-Fi vicine;

- distribuzione della copertura nelle diverse bande;

- possibili aree con copertura insufficiente.

Uno dei principali vantaggi della survey passiva è che durante una singola passeggiata è possibile raccogliere informazioni relative a più Access Point e più SSID contemporaneamente.

È quindi particolarmente utile per ottenere una fotografia complessiva dell'ambiente RF.

## Cosa non misura direttamente una survey passiva

La survey passiva non rappresenta però completamente l'esperienza di un client collegato alla rete.

Il dispositivo di survey, infatti, non è associato all'Access Point e non sta realmente trasferendo traffico attraverso la WLAN.

Di conseguenza non possiamo utilizzare una survey passiva, da sola, per valutare in maniera completa aspetti come:

- throughput reale;

- perdita di pacchetti durante una comunicazione;

- prestazioni applicative;

- comportamento effettivo del client durante la trasmissione;

- qualità end-to-end della connessione.

Cisco evidenzia proprio questo limite: una survey passiva opera in modalità di sola ricezione e non fornisce alcune informazioni che richiedono uno scambio reale di dati tra client e Access Point.

---

## Survey attiva

Durante una **survey attiva**, invece, il dispositivo utilizzato per la misurazione si associa realmente alla rete Wi-Fi.

Il client si comporta quindi molto più vicino a un normale dispositivo aziendale: si collega a un SSID, comunica con l'Access Point e può generare traffico.

Questo permette di verificare non soltanto la presenza del segnale, ma anche il comportamento reale della connessione.

A seconda dello strumento utilizzato e del tipo di test, è possibile analizzare parametri come:

- throughput;

- packet loss;

- latenza;

- data rate;

- comportamento della connessione durante gli spostamenti;

- capacità del client di comunicare correttamente attraverso la rete.

Una survey attiva consente quindi di rispondere a una domanda diversa rispetto alla survey passiva:

**la rete non soltanto copre questa zona, ma funziona realmente come previsto per un client?**

Cisco descrive la survey attiva come una misurazione effettuata con il client associato agli Access Point, proprio per poter osservare parametri che dipendono dal traffico realmente scambiato.

---

## Un esempio pratico

Immaginiamo di avere un ufficio nel quale la survey passiva mostra una copertura apparentemente buona.

In una determinata area possiamo rilevare:

- segnale adeguato;

- buon rapporto segnale/rumore;

- presenza di più Access Point;

- nessun evidente buco di copertura.

Dal punto di vista RF la situazione potrebbe quindi sembrare corretta.

Una survey attiva potrebbe però evidenziare un problema differente.

Ad esempio, il client potrebbe mostrare:

- throughput inferiore alle aspettative;

- perdita di pacchetti;

- variazioni importanti delle prestazioni;

- difficoltà durante il passaggio tra celle, un comportamento che va interpretato anche nel contesto del [roaming Wi-Fi](/wifi/roaming/).

Questo esempio mostra perché **copertura RF e qualità reale della connessione non sono necessariamente la stessa cosa**.

---

## Passiva e attiva non sono concorrenti

Non considero survey passiva e survey attiva come due tecniche alternative tra cui sceglierne necessariamente una.

In molti casi sono invece **complementari**.

La survey passiva permette di capire come è strutturato l'ambiente radio.

La survey attiva permette di verificare come quella stessa infrastruttura viene realmente utilizzata da un client.

Possiamo quindi semplificare il concetto in questo modo:

| Survey passiva | Survey attiva |
| --- | --- |
| Il client ascolta la rete | Il client si associa alla rete |
| Analizza principalmente l'ambiente RF | Analizza il comportamento della connessione |
| Può osservare più AP contemporaneamente | Il test riguarda la connessione utilizzata dal client |
| Utile per copertura e progettazione RF | Utile per validazione e troubleshooting |
| Non genera il normale traffico di un client associato | Può generare traffico reale |
| Non misura direttamente il throughput end-to-end | Può essere utilizzata per misurare le prestazioni |

---

## Quando utilizzo una survey passiva

Una survey passiva è particolarmente utile quando voglio:

- verificare la copertura RF;

- controllare la sovrapposizione tra celle;

- analizzare la distribuzione degli Access Point;

- individuare aree con segnale insufficiente;

- osservare l'ambiente Wi-Fi circostante;

- validare un deployment dopo l'installazione;

- raccogliere una fotografia complessiva della WLAN.

È quindi uno degli strumenti principali durante una **post-deployment validation** e permette di confrontare ciò che è stato realmente installato con gli obiettivi definiti durante il [Wi-Fi Design](/wifi/wifi-design/).

---

## Quando utilizzo una survey attiva

Una survey attiva diventa particolarmente interessante quando voglio verificare:

- prestazioni reali della rete;

- throughput;

- perdita di pacchetti;

- comportamento di uno specifico SSID;

- esperienza del client;

- problemi che compaiono soltanto durante una comunicazione reale.

Può essere quindi molto utile anche durante attività di [troubleshooting Wi-Fi](/wifi/troubleshooting/).

---

## Il ruolo di Ekahau

Strumenti professionali come [Ekahau](/wifi/ekahau/) permettono di raccogliere e rappresentare graficamente le misurazioni effettuate durante una site survey.

Le heatmap consentono poi di correlare i dati raccolti con la planimetria dell'ambiente e di individuare rapidamente aree che richiedono ulteriori verifiche.

È importante, però, non limitarsi a osservare una singola heatmap.

Un buon risultato di survey nasce dall'analisi combinata di più parametri e soprattutto dalla conoscenza dei requisiti della rete che stiamo verificando.

Una rete progettata per dispositivi IoT, ad esempio, può avere requisiti molto diversi da una WLAN destinata a servizi voce, applicazioni real-time o ambienti ad alta densità.

---

## Un terzo elemento: la spectrum analysis

Survey passiva e survey attiva riguardano principalmente il mondo 802.11.

Esiste però un altro elemento molto importante durante l'analisi di un ambiente wireless: la **spectrum analysis**.

Non tutte le interferenze presenti nelle bande utilizzate dal Wi-Fi sono necessariamente generate da dispositivi Wi-Fi.

L'analisi dello spettro può aiutare a individuare sorgenti RF non 802.11 che una normale analisi Wi-Fi potrebbe non descrivere completamente. Questo tipo di verifica completa l'analisi dei principi di [radiofrequenza nel Wi-Fi](/wifi/radio-frequency/).

Per questo motivo, in situazioni complesse, una verifica completa può comprendere:

1. survey passiva;

2. survey attiva;

3. spectrum analysis.

---

## Conclusioni

La differenza fondamentale può essere riassunta in una frase:

**la survey passiva osserva la rete, la survey attiva la utilizza.**

La prima è fondamentale per comprendere copertura e comportamento RF.

La seconda aggiunge il punto di vista del client e permette di verificare come la rete si comporta durante una comunicazione reale.

Nella pratica, utilizzarle insieme permette di ottenere una visione molto più completa della WLAN rispetto all'utilizzo di una sola metodologia.

Per un quadro più ampio del processo di misura e validazione, puoi continuare con la guida dedicata alla [Site Survey Wi-Fi](/wifi/site-survey/).