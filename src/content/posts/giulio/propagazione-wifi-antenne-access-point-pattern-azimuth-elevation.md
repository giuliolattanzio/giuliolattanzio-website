---
title: "Propagazione Wi-Fi e antenne degli Access Point: pattern, azimuth ed elevation"
description: "Come cambia la propagazione Wi-Fi in base all'antenna dell'Access Point: omnidirezionali, panel/patch, settoriali, Yagi e narrow beam, con pattern di irradiazione, azimuth, elevation, gain e beamwidth."
pubDatetime: 2026-09-02T08:45:00Z
draft: false
tags:
  - wifi
  - radio-frequency
  - wifi-design
  - site-survey
  - analisi-wifi
  - troubleshooting
ogImage: /images/articles/propagazione-wifi-antenne-realistica.webp
---
## Introduzione

Quando si progetta una rete **Wi-Fi**, conoscere la potenza trasmessa dall'Access Point non è sufficiente. Una parte determinante del comportamento RF dipende dall'antenna: dal suo **radiation pattern**, dal gain, dalla polarizzazione, dal beamwidth e soprattutto dal modo in cui l'AP viene orientato e installato.

Due Access Point con una potenza radio simile possono produrre coperture molto differenti se utilizzano antenne con caratteristiche diverse. Un'antenna omnidirezionale tende a distribuire l'energia su 360° nel piano orizzontale, mentre una panel, una settoriale o una Yagi concentra una quota maggiore dell'energia in una determinata direzione.

Questo non significa semplicemente che un'antenna direzionale "arriva più lontano". Significa che **redistribuisce l'energia nello spazio**. Comprendere questa differenza è essenziale nel [Wi-Fi design](/wifi/wifi-design/), durante una [site survey](/wifi/site-survey/) e quando si analizzano problemi di copertura o interferenza.

![Propagazione Wi-Fi e antenne degli Access Point con pattern, azimuth ed elevation](/images/articles/propagazione-wifi-antenne-realistica.webp)

---

## Radiation pattern: come leggere realmente la copertura di un'antenna

Il radiation pattern descrive come un'antenna irradia o riceve energia nelle diverse direzioni. Nella documentazione tecnica viene normalmente rappresentato attraverso sezioni bidimensionali del comportamento tridimensionale dell'antenna.

Le due viste fondamentali sono **azimuth** ed **elevation**.

L'**azimuth** rappresenta il pattern osservato sul piano orizzontale, come se si guardasse l'antenna dall'alto. È la vista che permette di capire se la copertura è sostanzialmente circolare, a settore oppure concentrata in una determinata direzione.

L'**elevation** rappresenta invece il comportamento sul piano verticale. È indispensabile per capire quanto l'energia venga irradiata sopra e sotto il piano dell'antenna e diventa particolarmente importante quando cambiano altezza di installazione, inclinazione o orientamento dell'AP.

Un pattern dichiarato "omnidirezionale" non implica quindi una sfera uniforme. Un'antenna può essere quasi omnidirezionale in azimuth e avere contemporaneamente un beam molto più stretto in elevation. I datasheet professionali riportano infatti entrambi i piani.

---

## Antenne omnidirezionali: 360° non significa copertura sferica

Le antenne **omnidirezionali** sono estremamente comuni negli Access Point indoor e outdoor. Nel piano di azimuth sono progettate per distribuire l'energia sostanzialmente lungo tutti i 360°, rendendole adatte agli scenari nei quali gli utenti sono distribuiti attorno al punto di installazione.

![Pattern Wi-Fi di antenna omnidirezionale in azimuth ed elevation](/images/articles/antenna-omnidirezionale-azimuth-elevation.svg)

La rappresentazione tridimensionale viene spesso descritta, in modo semplificato, come una forma a **ciambella** attorno all'asse dell'antenna. Il concetto è importante: la copertura non è identica in tutte le direzioni e lungo l'asse possono esistere zone nelle quali il gain è sensibilmente inferiore.

All'aumentare del gain di un'omnidirezionale, l'energia non viene creata dal nulla. Il pattern tende piuttosto a comprimersi sul piano verticale, aumentando la direttività sul piano utile. Per questo un'antenna omni ad alto gain può essere efficace in un'area estesa sullo stesso livello, ma non necessariamente essere la scelta migliore quando si vuole distribuire copertura su piani o altezze differenti.

Negli AP da soffitto con antenne integrate il concetto deve essere letto insieme al mounting previsto dal produttore: l'orientamento fisico dell'Access Point determina l'orientamento del pattern nello spazio.

---

## Panel e patch: concentrare la copertura verso un'area

Le antenne **panel** o **patch** appartengono alla famiglia delle direzionali. Invece di distribuire l'energia uniformemente attorno all'antenna, producono un **lobo principale** orientato verso la zona che si vuole servire.

Sono utili quando l'AP viene installato lungo il perimetro di un'area, su una parete, in un corridoio, in un magazzino o in tutti quei casi nei quali irradiare una quantità significativa di energia dietro l'antenna sarebbe poco utile o addirittura controproducente.

![Confronto azimuth di antenne Wi-Fi panel, settoriali e narrow beam](/images/articles/antenne-direzionali-panel-sector-yagi-azimuth.svg)

Il **beamwidth** definisce l'ampiezza angolare del lobo principale, normalmente facendo riferimento ai punti a -3 dB rispetto al massimo. Una panel con beam ampio può illuminare una porzione consistente dell'ambiente; un modello più direttivo concentra invece l'energia in un angolo inferiore.

Il pattern reale non è però un triangolo perfetto. Sono presenti attenuazioni laterali, possibili side lobes e un rapporto front-to-back che indica quanto l'antenna riesca effettivamente a privilegiare la direzione frontale rispetto a quella posteriore.

---

## Antenne settoriali: controllare un'area angolare precisa

Le antenne **settoriali** vengono utilizzate quando la copertura deve essere distribuita su un settore definito, per esempio 60°, 90° o 120° a seconda del modello.

Il principio è diverso dall'omnidirezionale: invece di utilizzare un singolo elemento per coprire tutte le direzioni, è possibile progettare più settori, ciascuno orientato verso una porzione precisa dell'area.

Questa soluzione è particolarmente interessante in ambienti outdoor, grandi spazi, aree industriali o scenari ad alta densità nei quali è necessario controllare maggiormente la geometria delle celle.

La maggiore direttività può aiutare a limitare l'energia irradiata verso zone non necessarie, ma richiede un design più accurato. Azimuth, altezza, tilt e sovrapposizione tra settori diventano parametri di progetto e un errore di orientamento può creare aree scoperte o sovrapposizioni RF indesiderate.

---

## Yagi: un fascio più stretto per collegamenti e coperture mirate

L'antenna **Yagi** è una direzionale caratterizzata da un lobo principale relativamente stretto e da una direttività superiore rispetto alle soluzioni pensate per coperture molto ampie.

Nel Wi-Fi può essere impiegata quando è necessario indirizzare l'energia verso una zona specifica o realizzare scenari nei quali la copertura deve svilupparsi prevalentemente lungo una direzione.

Più il beam si restringe, maggiore diventa l'importanza dell'allineamento. Una piccola variazione dell'azimuth o dell'elevation può spostare significativamente l'area nella quale viene ottenuto il massimo livello di segnale.

Per questo una Yagi non dovrebbe essere scelta semplicemente perché possiede più dBi. Il gain deve essere letto insieme a **beamwidth, distanza, geometria dell'ambiente, EIRP consentita e obiettivo della WLAN**.

---

## Antenne narrow-beam e paraboliche: massima direttività

Quando è necessario concentrare ulteriormente l'energia si entra nel campo delle antenne **narrow-beam**, incluse soluzioni paraboliche utilizzate soprattutto per collegamenti punto-punto o applicazioni outdoor molto specifiche.

Il pattern in azimuth e in elevation diventa molto stretto. Questo consente un gain elevato nella direzione desiderata, ma riduce fortemente la tolleranza agli errori di puntamento.

Sono antenne molto diverse da quelle normalmente utilizzate per fornire accesso Wi-Fi general purpose agli utenti di un ufficio. Il loro scopo è creare una geometria RF fortemente controllata.

Anche in questo caso è fondamentale ricordare che un elevato gain non equivale automaticamente a una rete migliore: la scelta dell'antenna dipende dal problema da risolvere.

---

## Antenne integrate e array MIMO

Negli Access Point enterprise moderni è frequente trovare **antenne integrate** e sistemi con più elementi radianti utilizzati dalle diverse catene radio MIMO.

In questi casi parlare dell'antenna come di un singolo dipolo è spesso una semplificazione. Il comportamento complessivo può derivare da più elementi, polarizzazioni differenti e geometrie progettate specificamente per il mounting dell'AP.

Per questo, durante il design, non considero sufficiente sapere che un Access Point possiede "antenne interne". È necessario verificare il datasheet e osservare i radiation pattern forniti dal costruttore per le bande interessate.

Un AP può infatti presentare pattern differenti a **2,4 GHz, 5 GHz e 6 GHz**. Anche quando la forma generale rimane simile, gain, beamwidth e irregolarità del pattern possono cambiare con la frequenza.

---

## Azimuth: il piano orizzontale della cella Wi-Fi

In fase di progettazione l'azimuth aiuta a capire **dove verrà indirizzata la cella sul piano orizzontale**.

Con un'omnidirezionale ci si aspetta una distribuzione approssimativamente circolare attorno all'antenna. Con una panel, una settoriale o una Yagi diventa invece necessario rappresentare anche l'orientamento dell'antenna sulla planimetria.

Questo è particolarmente importante nelle simulazioni predictive. Posizionare una direzionale senza impostarne correttamente l'azimuth può produrre un modello formalmente completo ma RF concettualmente errato.

Durante la validazione sul campo, la [site survey Wi-Fi](/wifi/site-survey/) permette poi di verificare quanto il pattern reale, influenzato dall'ambiente, corrisponda alla previsione.

---

## Elevation, altezza e tilt

L'elevation viene spesso sottovalutata perché le planimetrie sono rappresentazioni bidimensionali. La propagazione RF, però, avviene in tre dimensioni.

Un Access Point installato a 3 metri e lo stesso AP installato a 10 metri non producono necessariamente la stessa esperienza nell'area utenti, anche mantenendo invariata la potenza radio.

Con antenne direzionali entra inoltre in gioco il **downtilt** o uptilt. Inclinare fisicamente l'antenna modifica la direzione nella quale il lobo principale interseca l'area da servire.

Negli ambienti con soffitti elevati, scaffalature, passerelle, tribune o più livelli, leggere soltanto il pattern in azimuth può quindi portare a conclusioni incomplete.

---

## Gain, dBi e beamwidth: perché più non significa sempre meglio

Il **gain**, espresso normalmente in dBi, indica la capacità dell'antenna di concentrare l'energia in determinate direzioni rispetto a un radiatore isotropico ideale.

Non è un amplificatore che genera potenza aggiuntiva.

Aumentare il gain significa generalmente aumentare la direttività. In un'omnidirezionale questo può tradursi in un pattern verticale più compresso; in una direzionale può significare un lobo principale più concentrato.

È quindi sbagliato scegliere un'antenna guardando esclusivamente il valore in dBi. Un gain maggiore può essere perfetto per un collegamento mirato e contemporaneamente peggiorare un progetto che richiede copertura verticale più ampia o maggiore tolleranza geometrica.

Va inoltre considerata l'**EIRP**, cioè il risultato della potenza trasmessa, delle perdite del sistema e del gain dell'antenna, nel rispetto dei limiti regolamentari applicabili alla banda e al dominio geografico.

---

## Polarizzazione e orientamento

La **polarizzazione** descrive l'orientamento del campo elettrico irradiato dall'antenna. Nei sistemi Wi-Fi moderni sono comuni configurazioni con elementi a polarizzazione differente o dual-polarized, soprattutto per supportare le catene MIMO e rendere il sistema più robusto rispetto all'orientamento dei client.

L'orientamento fisico dell'antenna rimane comunque importante. Ruotare o installare un dispositivo in modo diverso da quanto previsto dal produttore significa ruotare anche il suo sistema di irradiazione.

Per questo il mounting non è un dettaglio estetico. Un AP progettato per essere montato orizzontalmente a soffitto non dovrebbe essere considerato automaticamente equivalente quando viene installato verticalmente a parete senza aver verificato i pattern del modello specifico.

---

## L'ambiente modifica il pattern teorico

I diagrammi di antenna sono fondamentali, ma non rappresentano una fotografia esatta della copertura che verrà ottenuta in un edificio reale.

Pareti, vetri, strutture metalliche, scaffalature, macchinari, persone e arredi introducono **attenuazione, riflessione, diffrazione e multipath**. Il pattern dell'antenna descrive quindi il punto di partenza; l'ambiente determina come quell'energia si propaga realmente.

È il motivo per cui predictive design e misurazione sul campo devono essere considerati parti dello stesso processo.

Nel [design Wi-Fi](/wifi/wifi-design/) utilizzo il modello per prevedere il comportamento della rete. Con la survey verifico poi la copertura reale e, quando necessario, utilizzo l'analisi RF per capire perché una determinata area si comporti diversamente dalla previsione.

---

## Scegliere l'antenna in funzione dello scenario

Non esiste un tipo di antenna universalmente migliore.

Un'omnidirezionale può essere ideale quando l'Access Point è al centro dell'area da servire. Una panel può essere più appropriata lungo il bordo di una zona. Una settoriale permette di costruire celle orientate in grandi spazi. Una Yagi o una soluzione narrow-beam può essere indicata quando il collegamento deve essere fortemente direzionale.

La scelta deve partire da alcune domande: **dove sono i client, quale volume deve essere coperto, quali ostacoli sono presenti, quale altezza di installazione è disponibile e dove non voglio irradiare energia?**

Solo dopo queste valutazioni ha senso confrontare gain, beamwidth, polarizzazione e caratteristiche del singolo modello.

---

## Dalla teoria alla site survey

Durante una survey, conoscere il pattern previsto aiuta a interpretare ciò che viene misurato.

Se un'antenna direzionale produce copertura significativa dietro il punto di installazione, per esempio, è necessario capire se il comportamento deriva dai side/back lobes previsti oppure dalle riflessioni dell'ambiente. Se una omni ad alto gain mostra una copertura verticale inferiore alle aspettative, il dato va confrontato con il suo elevation pattern e con l'altezza di installazione.

È qui che la lettura del datasheet diventa parte dell'analisi RF e non un'attività separata.

Per le attività di survey utilizzo la suite **Ekahau**, correlando planimetria, misure sul campo e comportamento della WLAN. Ho descritto questo workflow nell'articolo [Ekahau per site survey Wi-Fi: AI Pro, Sidekick 2 e workflow](/posts/ekahau-site-survey-wifi-ai-pro-sidekick-2-workflow/).

Per approfondire gli aspetti generali della propagazione e della radiofrequenza è disponibile anche la guida [Radio Frequency e propagazione Wi-Fi](/wifi/radio-frequency/).

---

## Conclusioni

Il pattern di un'antenna è uno degli elementi che definiscono la geometria reale di una cella Wi-Fi.

**Omnidirezionale, panel, patch, settoriale, Yagi e narrow-beam non sono semplicemente forme diverse della stessa antenna:** rappresentano modi differenti di distribuire l'energia RF nello spazio.

Per interpretarli correttamente è necessario leggere insieme **azimuth, elevation, gain, beamwidth, polarizzazione, mounting e frequenza**, senza dimenticare che l'ambiente reale modificherà ulteriormente il risultato attraverso attenuazioni e riflessioni.

Una buona progettazione non parte quindi dalla domanda "quale antenna arriva più lontano?", ma da una domanda molto più utile:

**"Quale pattern permette di distribuire l'energia dove serve, limitandola dove non serve?"**

È questo passaggio che trasforma la scelta dell'antenna da semplice specifica hardware a vera decisione di **Wi-Fi engineering**.