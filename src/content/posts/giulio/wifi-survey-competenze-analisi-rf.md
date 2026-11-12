---
title: "Wi-Fi Survey: perché le competenze fanno la differenza tra una heatmap e una vera analisi RF"
description: "Una Wi-Fi survey non serve solo a misurare il segnale: richiede competenze RF, 802.11, roaming, capacity e troubleshooting per individuare problemi reali e definire remediation corrette."
pubDatetime: 2026-11-12T19:30:00Z
draft: false
tags:
  - wifi
  - site-survey
  - ekahau
  - sidekick2
  - wireless
  - rf
  - troubleshooting
  - network-engineering
  - enterprise-wifi
  - wlan-design
ogImage: /images/articles/wifi-survey-competenze-analisi-rf-hero.svg
---

## Introduzione

Una Wi-Fi survey non consiste semplicemente nel camminare all’interno di un edificio con uno strumento di misura e produrre alcune heatmap.

La raccolta dei dati è solo una parte del lavoro.

Il vero valore nasce dalla capacità di interpretare ciò che viene misurato e di collegare il comportamento RF con la configurazione della WLAN, il comportamento dei client, il channel plan, la capacità disponibile e i requisiti applicativi.

È proprio questo il punto centrale: una survey serve a individuare problemi che esistono già nella rete e a trasformarli in indicazioni tecniche utili.

Può evidenziare celle troppo grandi o troppo piccole, aree con SNR insufficiente, overlap eccessivo, channel reuse inefficiente, client che roamano troppo tardi, interferenze, capacità non adeguata o differenze tra progetto e installazione reale.

Ma questi dati, da soli, non bastano.

Serve esperienza per capire quale sia la causa e, soprattutto, quale intervento abbia realmente senso.

![Wi-Fi Survey: competenze e analisi RF](/images/articles/wifi-survey-competenze-analisi-rf-hero.svg)

---

## Una heatmap non è una diagnosi

Uno degli equivoci più comuni è considerare la heatmap come il risultato finale di una survey.

In realtà una heatmap è una rappresentazione visuale di una metrica.

Signal Strength, SNR, Secondary Coverage, Channel Utilization o Channel Interference mostrano aspetti differenti della WLAN, ma nessuno di questi valori, preso da solo, descrive l’intero comportamento della rete.

Una zona con RSSI elevato può comunque avere prestazioni scarse.

Un’area con copertura apparentemente sufficiente può non avere una secondary coverage adeguata per il roaming.

Una rete può essere ben coperta e, allo stesso tempo, avere un piano canali poco efficiente o un dominio di contention troppo ampio.

La competenza entra in gioco proprio qui.

Il dato misurato può essere perfettamente corretto, ma la conclusione può essere sbagliata se non viene interpretato nel contesto.

---

## Il problema di progettare solo per copertura

Una delle situazioni più frequenti nelle WLAN enterprise è la tendenza a ragionare quasi esclusivamente in termini di copertura.

Se il segnale arriva ovunque e i valori sembrano buoni, si tende a considerare la rete correttamente progettata.

In realtà la copertura è soltanto una delle condizioni necessarie.

Una survey può mostrare che il segnale è presente in modo uniforme e contemporaneamente evidenziare un SNR insufficiente, un’eccessiva sovrapposizione tra celle, channel reuse poco efficiente o client costretti a lavorare a data rate bassi.

È possibile quindi avere una rete “verde” sulle heatmap e comunque una WLAN poco efficiente.

Questo è uno dei motivi per cui la survey non deve limitarsi a dire se il segnale arriva, ma deve verificare se il comportamento radio è coerente con il servizio richiesto.

---

## Quando troppo segnale diventa un problema

Uno degli errori più interessanti che una survey può mettere in evidenza è l’utilizzo di potenze eccessive.

A prima vista può sembrare un vantaggio.

Più segnale significa apparentemente più copertura, quindi una rete migliore.

In realtà celle troppo grandi possono generare effetti opposti: client sticky, roaming tardivo, MCS meno efficienti e un dominio di contention più esteso.

Il client continua a vedere l’access point precedente e rimane associato anche quando sarebbe più opportuno passare a una cella migliore.

Il risultato è una connessione formalmente attiva ma poco efficiente.

Una survey serve proprio a rendere visibile questo tipo di comportamento.

Ed è qui che l’esperienza conta: un valore di RSSI molto alto non deve essere automaticamente interpretato come un successo progettuale.

---

## Il lato opposto: coverage gap e installazioni non coerenti

Naturalmente esiste anche la situazione opposta.

Una rete può mostrare aree con segnale insufficiente a causa di attenuazioni non previste, materiali diversi da quelli modellati, access point installati in posizione errata o semplicemente un design iniziale non adeguato.

Ma anche in questo caso il lavoro non dovrebbe fermarsi alla constatazione che “manca segnale”.

Bisogna capire perché manca.

La causa potrebbe essere un AP montato più in alto del previsto, una parete che non era presente nella planimetria, una struttura metallica che modifica la propagazione oppure una configurazione di potenza differente rispetto al progetto.

La remediation corretta nasce dalla causa reale.

Aggiungere un access point in presenza di un errore di installazione può complicare ulteriormente il channel plan invece di risolvere il problema.

---

## Secondary coverage e roaming

Un’altra area dove la competenza fa una differenza enorme è il roaming.

Una WLAN può avere una copertura primaria eccellente e, allo stesso tempo, offrire un comportamento di roaming mediocre.

Questo succede perché il client non ha bisogno soltanto di vedere bene l’access point corrente.

Deve anche trovare una seconda cella valida nel momento giusto.

La secondary coverage diventa quindi un indicatore fondamentale soprattutto in ambienti con VoWiFi, Microsoft Teams, dispositivi mobili, terminali sanitari o scanner utilizzati in movimento.

Se il client arriva in una zona dove l’AP corrente è ormai debole ma il successivo non è ancora sufficientemente forte, la transizione può avvenire troppo tardi.

La survey consente di osservare questo scenario.

La competenza serve a capire se il problema è legato al design RF oppure al comportamento specifico del client.

![Dal dato RF alla remediation](/images/articles/wifi-survey-remediation-workflow.svg)

---

## Più access point non significa automaticamente più capacità

Un altro errore frequente è associare il numero di AP alla qualità della rete.

In alcune situazioni aumentare la densità degli access point migliora la capacità.

In altre, però, può semplicemente aumentare la quantità di celle che condividono gli stessi canali.

Se il frequency reuse non è progettato correttamente, il risultato può essere un dominio di contention più grande.

Il problema non è quindi quanti AP sono presenti, ma quanto airtime devono condividere.

Una survey ben interpretata permette di capire se la densità dell’infrastruttura sta realmente aumentando la capacità o se sta soltanto introducendo più interferenza co-channel.

Questo è particolarmente importante negli ambienti ad alta densità, dove aggiungere hardware senza ragionare sul comportamento RF può peggiorare la situazione.

---

## Channel width: più largo non significa necessariamente migliore

Lo stesso principio vale per la larghezza di canale.

È facile pensare che 80 MHz sia sempre meglio di 20 MHz perché consente PHY rate più elevati.

Ma in un ambiente enterprise con molti AP, canali più larghi riducono il numero di frequenze riutilizzabili.

Questo può aumentare la contention e ridurre la capacità aggregata della WLAN.

La survey permette di verificare se la scelta del channel width sia realmente coerente con l’ambiente.

La decisione non dovrebbe dipendere dalla massima capacità dichiarata dall’AP, ma dal miglior equilibrio tra capacità per cella e frequency reuse nell’intero edificio.

---

## Interferenza e spectrum analysis

Una parte importante del lavoro consiste anche nel capire quando il problema non è generato dalla WLAN stessa.

Non tutta l’energia presente sulle bande Wi-Fi deriva da dispositivi 802.11.

Sorgenti non-Wi-Fi possono occupare lo spettro e influenzare in modo significativo il comportamento della rete.

È qui che la spectrum analysis diventa fondamentale.

Con uno strumento come Sidekick 2 è possibile osservare ciò che sta accadendo realmente nel dominio RF e distinguere un problema di configurazione WLAN da un’interferenza esterna.

Questa distinzione è essenziale.

Se la causa è una sorgente non-Wi-Fi, modificare potenze e canali senza averla identificata può produrre soltanto un miglioramento temporaneo o nessun miglioramento.

---

## RSSI e SNR non raccontano la stessa cosa

Anche l’interpretazione del segnale richiede attenzione.

Un RSSI elevato non garantisce automaticamente una buona qualità del collegamento.

Conta anche la distanza rispetto al noise floor.

È l’SNR a descrivere realmente quanto il segnale utile sia distinguibile dal rumore.

Un client può ricevere un access point a un livello apparentemente buono e avere comunque un collegamento poco stabile se il rumore è elevato.

Questo influenza direttamente MCS, retry, throughput e stabilità della connessione.

Per questo una survey professionale non dovrebbe fermarsi alla domanda “quanto segnale arriva?”, ma dovrebbe cercare di capire “quanto è realmente utilizzabile quel segnale?”.

---

## MCS, retry e uso reale dell’airtime

Una WLAN può essere connessa e allo stesso tempo lavorare in modo poco efficiente.

Quando i client operano con MCS bassi o con retry elevati, consumano più airtime per trasportare la stessa quantità di traffico.

Questo può dipendere da SNR insufficiente, interferenze, contention, roaming tardivo o caratteristiche specifiche del client.

Una survey, combinata con un’analisi più ampia del comportamento della rete, permette di capire se la copertura misurata si traduca realmente in una connessione efficiente.

Ed è qui che il ruolo del wireless engineer diventa fondamentale.

Il problema non è trovare il valore più basso o più alto.

È capire il comportamento complessivo del sistema.

![Cosa può evidenziare una Wi-Fi survey](/images/articles/wifi-survey-rf-analysis-domains.svg)

---

## Capacity e densità reale degli utenti

Una delle verifiche più importanti riguarda la capacità.

Una rete può funzionare perfettamente durante un test con pochi dispositivi e degradare quando l’ambiente viene utilizzato realmente.

Questo perché la capacità non dipende soltanto dal numero di access point, ma anche dal numero di client attivi, dal tipo di traffico, dall’airtime, dagli MCS sostenuti e dal channel reuse.

Una sala meeting da cinquanta persone non può essere valutata nello stesso modo di un corridoio.

Allo stesso modo, un ambiente VoWiFi ha requisiti differenti rispetto a un’area utilizzata principalmente per browsing o applicazioni IoT.

La survey deve essere sempre collegata al servizio.

Senza conoscere il requisito, una misura può essere corretta ma difficile da interpretare.

---

## Survey passiva e survey attiva

Anche la scelta della metodologia dipende dalla domanda a cui si vuole rispondere.

La survey passiva descrive l’ambiente radio.

Permette di capire quali AP sono presenti, quali livelli di segnale vengono ricevuti, quali canali sono utilizzati e come le celle si sovrappongono.

La survey attiva aggiunge invece il comportamento di una connessione reale e permette di osservare parametri più vicini all’esperienza applicativa.

Il punto non è stabilire quale delle due sia migliore.

Servono a verificare aspetti diversi.

La competenza consiste nel sapere quale tipo di misura sia realmente necessario per dimostrare o escludere una determinata causa.

---

## Sapere quando il problema non è più Wi-Fi

Una delle competenze più importanti è anche capire quando smettere di intervenire sulla WLAN.

Se il dominio RF è corretto ma il client non riceve un indirizzo DHCP, il problema non si risolve aggiungendo un access point.

Se la copertura è buona ma il DNS è lento, modificare il channel plan non serve.

Se una chiamata Teams degrada, bisogna capire se l’evento coincide con un roaming, con perdita IP, jitter, QoS o con un problema applicativo.

Una survey verifica il dominio RF.

Un troubleshooting completo deve invece correlare RF, 802.11, comportamento del client, rete IP e applicazione.

Il valore della competenza sta anche nel riconoscere il confine tra questi domini.

---

## La planimetria e l’ambiente reale

Anche la qualità del modello di partenza influisce enormemente sul risultato.

Una planimetria con scala errata, muri mancanti o materiali non coerenti può compromettere il predictive design e rendere più difficile l’interpretazione della survey.

Edifici reali cambiano.

Vengono aggiunte pareti, scaffalature, vetri trattati, arredi e strutture metalliche.

La survey serve anche a verificare quanto l’ambiente reale sia rimasto coerente con il modello progettuale.

Il rapporto tra ambiente fisico, modello RF e misura reale deve rimanere sempre allineato.

---

## Verificare l’installazione, non solo il progetto

Una post-installation survey è anche uno strumento fondamentale per verificare che il progetto sia stato realmente implementato come previsto.

Un AP può essere installato nella posizione sbagliata, ad altezza diversa, sopra un controsoffitto o con un orientamento non corretto.

Può inoltre essere configurato con potenza, canale o antenna differenti rispetto al progetto.

In questi casi la rete reale non corrisponde al predictive design.

La survey permette di scoprire queste discrepanze.

E spesso la remediation migliore non consiste nell’aggiungere nuovi access point, ma nel correggere ciò che è già stato installato.

---

## Ekahau non sostituisce la competenza

Strumenti come Ekahau AI Pro e Sidekick 2 sono estremamente potenti.

Permettono di raccogliere dati, visualizzare heatmap, analizzare lo spettro e costruire modelli sofisticati.

Ma lo strumento non prende automaticamente tutte le decisioni progettuali.

Può mostrare un RSSI di -62 dBm.

Non può stabilire da solo se quel valore sia sufficiente per il servizio richiesto.

Può mostrare overlap tra celle.

Serve esperienza per capire se quell’overlap favorisca il roaming oppure stia aumentando inutilmente la contention.

Può mostrare channel utilization elevata.

Serve competenza per capire se la causa sia traffico legittimo, retry, interferenza o comportamento anomalo dei client.

Il principio è semplice:

**lo strumento misura. Il wireless engineer interpreta.**

---

## Dalla misura alla remediation

Una survey professionale non dovrebbe concludersi con una frase generica come “serve un altro access point”.

La conclusione dovrebbe spiegare quale problema è stato individuato, perché si verifica e quale modifica dovrebbe risolverlo.

La remediation deve essere il risultato di una catena logica.

Prima si osserva il comportamento.

Poi si identifica la causa più probabile.

Successivamente si definisce l’intervento.

Infine si valida nuovamente la rete per verificare se il problema sia realmente stato risolto.

Questo approccio evita di modificare la WLAN per tentativi.

Ed è proprio qui che emerge la differenza tra una semplice raccolta di misure e un’attività di wireless engineering.

---

## Conclusioni

Una Wi-Fi survey non è una raccolta di screenshot o heatmap.

È un processo di verifica tecnica che serve a capire se una WLAN soddisfa realmente i requisiti per cui è stata progettata.

Il valore non nasce dalla quantità di dati raccolti.

Nasce dalla capacità di collegare RF, 802.11, comportamento dei client, capacity e requisiti applicativi.

Ekahau AI Pro e Sidekick 2 forniscono strumenti estremamente potenti per osservare la rete.

Ma la qualità del risultato continua a dipendere dal metodo e dalle competenze di chi interpreta quei dati.

Una survey non serve semplicemente a dimostrare che il Wi-Fi funziona.

Serve a dimostrare **dove, come e perché la WLAN rispetta — oppure non rispetta — i requisiti del progetto**.

Ed è proprio per questo che l’esperienza del wireless engineer continua a fare la differenza.
