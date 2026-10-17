---
title: "Voice over Wi-Fi: progettare e diagnosticare una WLAN per voce, roaming e qualità reale"
description: "Come progettare e testare una rete Wi-Fi per traffico voce: RSSI, SNR, jitter, latency, packet loss, QoS, WMM, roaming, 802.11k/v/r, networking, Ekahau AI Pro e Sidekick 2."
pubDatetime: 2026-10-17T20:20:00Z
draft: false
tags:
  - wifi
  - vowlan
  - voice-over-wifi
  - voip
  - qos
  - wmm
  - roaming
  - ekahau
  - sidekick2
  - troubleshooting
ogImage: /images/articles/voice-over-wifi-vowlan-ekahau-hero.svg
---
## Introduzione

La voce su Wi-Fi è uno degli scenari più delicati da progettare in una WLAN enterprise.

Un'applicazione dati tradizionale può tollerare variazioni temporanee di throughput, qualche ritrasmissione e piccoli rallentamenti. Una conversazione voce, invece, è un flusso real-time bidirezionale che richiede continuità, latenza contenuta e un comportamento radio prevedibile mentre l'utente si muove.

Per questo una rete che "naviga bene" non è necessariamente una rete adatta alla voce.

Una chiamata può partire correttamente, mantenere un buon livello RSSI e mostrare comunque audio metallico, micro-interruzioni, ritardi, one-way audio o cadute durante il roaming. In molti casi il problema non è un singolo elemento, ma l'interazione tra radiofrequenza, client, QoS, switching, routing e piattaforma VoIP.

L'approccio corretto è quindi end-to-end.

La voce su Wi-Fi non si progetta guardando soltanto la copertura. Si progetta osservando l'intero percorso:

**client → access point → rete cablata → gateway / controller → piattaforma voce → destinazione**

![Voice over Wi-Fi in ambiente enterprise](/images/articles/voice-over-wifi-vowlan-ekahau-hero.svg)

---

## Perché la voce è diversa dal traffico dati

Il traffico voce occupa relativamente poca banda, ma è estremamente sensibile al tempo.

Una pagina web può aspettare qualche centinaio di millisecondi senza che l'utente percepisca un problema rilevante. In una conversazione telefonica, invece, lo stesso ritardo può rendere il dialogo innaturale.

Il problema principale non è quindi il throughput massimo, ma la regolarità con cui i pacchetti arrivano.

Le metriche più importanti diventano **latency, jitter e packet loss**.

La latency rappresenta il tempo necessario affinché il pacchetto attraversi il percorso. Il jitter descrive la variazione di questo tempo tra pacchetti consecutivi. Il packet loss misura invece quanti pacchetti non arrivano correttamente a destinazione.

Per una WLAN voce, questi tre parametri devono essere letti insieme.

Un collegamento con 500 Mbps di throughput può offrire un'esperienza voce scadente se il traffico subisce ritardi variabili o perdite intermittenti.

## Il ruolo dell'RF design

La prima condizione per ottenere una voce stabile è un'infrastruttura radio progettata correttamente.

In molti design enterprise viene utilizzato come riferimento un livello di copertura intorno a **-67 dBm** per applicazioni voce, insieme a un **SNR nell'ordine dei 25 dB o superiore**. Non sono valori assoluti validi per ogni client, ma rappresentano target progettuali comunemente utilizzati e devono sempre essere verificati rispetto ai dispositivi reali.

Il punto più importante è che una cella voce non deve essere semplicemente "coperta".

Deve avere margine.

Se il client arriva al bordo cella con un RSSI appena sufficiente e un SNR ridotto, il rate adaptation inizierà a scendere verso modulazioni più conservative. Aumenteranno i tempi di trasmissione e potenzialmente le ritrasmissioni.

Per la voce questo può tradursi direttamente in jitter e perdita di pacchetti.

## Il problema delle celle troppo grandi

Un access point configurato con potenza elevata può far apparire la rete più coperta, ma non significa che il client riesca a comunicare altrettanto bene nella direzione opposta.

Lo smartphone o il terminale voce ha una potenza trasmissiva limitata e può trovarsi in una situazione in cui riceve bene l'AP ma non viene ricevuto altrettanto bene.

Questo genera un collegamento asimmetrico.

In una WLAN voce è quindi importante bilanciare correttamente la potenza, evitare celle eccessivamente grandi e progettare la sovrapposizione in modo che il client possa trovare un nuovo AP prima che la qualità del link degradi troppo.

## Roaming: il punto in cui molte chiamate si rompono

Una chiamata voce mobile è un test estremamente severo del roaming.

Durante il passaggio da un AP al successivo, il client deve trovare una nuova cella, decidere quando abbandonare quella corrente, autenticarsi e riprendere il traffico con un'interruzione minima.

La decisione finale di roaming rimane client-driven.

L'infrastruttura può aiutare attraverso **802.11k, 802.11v e 802.11r**, ma non può obbligare ogni client a comportarsi nello stesso modo.

802.11k permette di fornire informazioni sui neighbor AP. 802.11v può suggerire transizioni verso BSSID più adatti. 802.11r riduce il tempo necessario per alcune fasi di autenticazione durante il Fast Transition.

Questi meccanismi diventano particolarmente importanti con la voce perché anche una breve interruzione può essere percepita dall'utente.

Per approfondire il comportamento del roaming ho dedicato un articolo specifico a [802.11k, 802.11v e 802.11r nel Wi-Fi enterprise](/posts/roaming-wifi-80211k-80211v-80211r-fast-transition/).

![Roaming VoWiFi tra access point e continuità del traffico voce](/images/articles/vowifi-roaming-call-flow.svg)

## QoS sul Wi-Fi: WMM non è opzionale

La qualità della voce non dipende soltanto dall'RF.

Quando più client condividono lo stesso canale, il traffico voce deve poter ottenere un trattamento coerente rispetto a flussi meno sensibili al ritardo.

Nel mondo 802.11 questo ruolo viene svolto da **WMM**, basato sui meccanismi di 802.11e.

WMM suddivide il traffico in differenti access category e assegna priorità diverse all'accesso al mezzo radio.

Il traffico voce viene normalmente associato alla categoria **AC_VO**.

Questo non significa che la voce "salti sempre davanti a tutto", ma che utilizza parametri di contention più favorevoli rispetto al best effort.

La QoS deve però essere coerente end-to-end.

Se il traffico è prioritizzato via radio ma perde la marcatura entrando nella rete cablata, il vantaggio si ferma all'access point.

Allo stesso modo, una rete LAN perfettamente configurata non può compensare un canale Wi-Fi congestionato.

## DSCP e coerenza tra wireless e LAN

Nella rete IP, il traffico voce viene spesso marcato con **DSCP EF 46**.

Questa marcatura può essere mappata verso la corretta access category WMM e mantenuta lungo gli switch e i router.

Il punto fondamentale è evitare che il trust boundary sia ambiguo.

Bisogna sapere chi assegna la marcatura, dove viene verificata e dove può essere riscritta.

In una rete enterprise il flusso può attraversare access point, controller, switch, firewall, SBC o piattaforme UC. Se uno di questi elementi tratta la coda voce come best effort, la qualità può degradare sotto carico.

Per questo la verifica QoS non deve limitarsi al controller Wi-Fi.

Deve seguire il pacchetto lungo l'intero percorso.

## VLAN voce e numero di SSID

Una scelta comune è dedicare una VLAN specifica ai dispositivi voce.

Questo può avere senso per applicare policy, QoS e sicurezza in modo più chiaro.

Non significa però che sia sempre necessario creare un SSID separato.

Ogni SSID aggiunge traffico di management e beacon overhead. In ambienti densi, moltiplicare gli SSID può ridurre l'efficienza dell'airtime.

La scelta corretta dipende dall'architettura.

In molti casi è preferibile mantenere pochi SSID e usare meccanismi di autenticazione e assegnazione dinamica della policy. In altri, terminali voce dedicati o requisiti legacy rendono più semplice una WLAN specifica.

L'importante è che la decisione sia progettuale e non automatica.

## Latenza, jitter e packet loss

Per la voce esistono target comunemente utilizzati come riferimento.

Una one-way latency inferiore a circa **150 ms** viene generalmente considerata un obiettivo ragionevole per una conversazione naturale. Il jitter dovrebbe rimanere basso e stabile, spesso nell'ordine di poche decine di millisecondi, mentre il packet loss dovrebbe idealmente restare molto vicino allo zero.

Un valore inferiore all'1% è spesso usato come target operativo, ma la reale tolleranza dipende da codec, jitter buffer, concealment e piattaforma.

Questi numeri non devono essere interpretati come soglie universali.

Servono per capire l'ordine di grandezza.

Il dato realmente importante è la stabilità.

Una rete che oscilla continuamente tra condizioni eccellenti e picchi di perdita può generare un'esperienza peggiore di una rete più lenta ma prevedibile.

## Retry e airtime

Un altro parametro spesso sottovalutato è il retry rate.

Una WLAN può avere RSSI adeguato e continuare a generare molte ritrasmissioni a causa di interferenze, collisioni o problemi di RF.

Ogni frame ritrasmesso consuma airtime aggiuntivo.

Per la voce questo è particolarmente pericoloso perché i pacchetti hanno una finestra temporale limitata. Un pacchetto arrivato troppo tardi può essere inutile anche se alla fine viene consegnato.

Da qui nasce una distinzione fondamentale:

**delivery non significa necessariamente quality.**

Il fatto che il pacchetto venga ricevuto non garantisce che sia arrivato nel momento giusto per essere riprodotto.

## Interferenze e canale occupato

La voce soffre particolarmente le variazioni imprevedibili del canale.

Un ambiente con elevata co-channel interference, adjacent-channel interference o sorgenti non-Wi-Fi può generare burst di ritrasmissioni e jitter.

Questo è uno dei casi in cui il **Sidekick 2** diventa particolarmente utile.

Con Ekahau AI Pro è possibile correlare la qualità della copertura con le condizioni reali dello spettro. Se una zona mostra RSSI adeguato ma comportamento instabile, una spectrum analysis può evidenziare energia o utilizzo del canale che la sola heatmap di copertura non mostra.

L'obiettivo non è soltanto trovare una sorgente interferente.

È capire se l'ambiente radio permette a un flusso real-time di mantenere un comportamento prevedibile.

![Workflow di troubleshooting VoWiFi con Ekahau AI Pro e Sidekick 2](/images/articles/vowifi-ekahau-sidekick-troubleshooting.svg)

## Come analizzerei una rete voce con Ekahau

Il primo passaggio è una survey RF completa.

Con Ekahau AI Pro partirei dalla Signal Strength heatmap e dalla copertura secondaria, perché per il roaming non basta vedere il segnale dell'AP principale. Serve sapere se esiste una seconda cella utile nel punto in cui il client dovrebbe effettuare la transizione.

Subito dopo confronterei SNR, channel overlap e utilization.

La copertura deve essere letta come un insieme di condizioni, non come una singola heatmap.

Una zona con -60 dBm può sembrare perfetta, ma se il canale è estremamente occupato o il rumore è elevato la qualità voce può comunque essere scarsa.

Con Sidekick 2 aggiungerei una spectrum survey nelle aree problematiche per verificare la presenza di interferenza non-Wi-Fi o pattern di utilizzo anomali.

## Active test e chiamate reali

La survey RF deve essere affiancata da test attivi.

Per la voce, la misura più significativa è una chiamata reale eseguita mentre il client attraversa le aree critiche.

Durante il test bisogna osservare contemporaneamente ciò che accade sul Wi-Fi e ciò che accade sull'applicazione voce.

Ekahau può aiutare a validare la rete dal punto di vista RF e a raccogliere dati di connettività e performance. Per misure applicative specifiche come MOS, RTP loss o jitter misurato dalla piattaforma voce, bisogna invece utilizzare i dati del sistema VoIP, del client o degli strumenti di monitoring dedicati.

È importante non dedurre la qualità voce da una sola heatmap.

Una rete può apparire perfetta in Ekahau e avere un problema di QoS o routing nella LAN.

Allo stesso modo, una piattaforma VoIP può mostrare packet loss senza che il problema sia nel cloud. Potrebbe essere iniziato sul primo hop wireless.

## Packet capture durante il roaming

Quando una chiamata cade durante il movimento, la packet capture diventa estremamente utile.

Il primo obiettivo è capire il timing.

Bisogna identificare quando il client decide di lasciare il vecchio AP, quanto tempo impiega a completare il passaggio e quando riprende il traffico dati.

Se il roaming radio avviene rapidamente ma la voce si interrompe per diversi secondi, il problema può trovarsi più avanti, per esempio nella rete IP, nel reauthentication flow o nella piattaforma voce.

Se invece il client rimane associato troppo a lungo all'AP precedente, il problema è più probabilmente legato a RF design o comportamento del client.

La correlazione temporale è quindi essenziale.

## 802.1X e tempo di autenticazione

In reti enterprise con WPA2-Enterprise o WPA3-Enterprise, il processo di autenticazione può influire direttamente sul roaming.

Se ogni passaggio richiede un'autenticazione completa lunga, la voce può risentirne.

Fast Transition, PMK caching e meccanismi equivalenti possono ridurre il tempo necessario, ma devono essere compatibili con infrastruttura e client.

È importante testare i dispositivi reali.

Non basta sapere che il controller supporta 802.11r. Il terminale deve supportarlo correttamente e il comportamento deve essere verificato nel contesto specifico.

## DHCP, DNS e servizi di rete

Quando una chiamata non parte o cade dopo un roaming, il problema non è sempre radio.

DHCP, DNS, routing e policy firewall possono introdurre anomalie difficili da distinguere da un problema Wi-Fi.

Un client che cambia subnet può dover ottenere un nuovo indirizzo IP. Un'architettura che non supporta correttamente il mobility domain può interrompere le sessioni.

Anche DNS lento o instabile può ritardare la registrazione del client o la risoluzione dei servizi voce.

Per questo il troubleshooting deve sempre verificare se il problema coincide con un cambio di Layer 2, Layer 3 oppure solo di BSSID.

## SIP e RTP

Nelle architetture VoIP classiche bisogna separare signaling e media.

Il SIP gestisce instaurazione, modifica e terminazione della chiamata. RTP o SRTP trasporta la voce.

Una chiamata può essere perfettamente registrata a livello SIP e avere media scadente.

Al contrario, un problema di signaling può impedire completamente l'avvio della sessione anche se il Wi-Fi è eccellente.

Durante il troubleshooting è quindi importante distinguere:

**la chiamata non si instaura**

da

**la chiamata si instaura ma la qualità è cattiva**

Sono due problemi diversi e richiedono analisi differenti.

## SIP ALG e firewall

In alcune infrastrutture il SIP ALG può modificare i messaggi SIP in modo non desiderato.

Non è sempre problematico, ma quando esistono NAT, SBC e piattaforme UC moderne può introdurre manipolazioni difficili da diagnosticare.

Se la chiamata presenta one-way audio, timeout o problemi intermittenti, la verifica del percorso firewall e delle eventuali funzioni ALG deve far parte dell'analisi.

Anche in questo caso è fondamentale non attribuire automaticamente il problema al Wi-Fi solo perché il client è wireless.

## 2,4 GHz, 5 GHz e 6 GHz

Per la voce mobile enterprise, il 5 GHz è storicamente la banda più interessante per capacità e disponibilità di canali.

Il 2,4 GHz ha meno spettro, maggiore probabilità di interferenza e minori possibilità di frequency reuse.

Il 6 GHz offre ulteriore capacità e uno spettro molto più pulito, ma richiede client compatibili e un design specifico.

Le caratteristiche di propagazione cambiano e la copertura non deve essere data per scontata.

Con Wi-Fi 6E e Wi-Fi 7, la voce può beneficiare di un ambiente radio molto efficiente, ma solo se il terminale supporta correttamente la banda e se il roaming tra celle è stato validato.

## Channel width e voce

Per applicazioni voce ad alta densità, canali eccessivamente larghi non sono sempre la scelta migliore.

20 MHz può offrire un frequency reuse molto efficace e ridurre la probabilità di sovrapposizione tra celle.

40, 80 o 160 MHz possono essere utili in altri scenari, ma la voce non richiede enormi quantità di throughput per singolo client.

È spesso più importante avere molti canali riutilizzabili e celle prevedibili.

La larghezza di canale va quindi scelta in funzione del progetto, non del massimo supportato dall'access point.

## Capacity planning

Una WLAN voce deve essere dimensionata anche in termini di airtime.

Non basta contare quanti dispositivi sono associati.

Bisogna stimare quanti client parleranno contemporaneamente, quali codec useranno, quali rate medi saranno sostenuti e quanto overhead introdurranno.

Un numero elevato di client che trasmettono piccoli pacchetti frequenti può generare una pressione significativa sul mezzo radio.

La voce, inoltre, deve convivere con traffico dati molto più aggressivo.

Il capacity planning deve quindi considerare il mix reale di applicazioni.

## Un metodo pratico di troubleshooting

Quando una chiamata Wi-Fi presenta problemi, partirei sempre dal sintomo preciso.

Se il problema è audio intermittente, guarderei subito retry, SNR, utilization e packet loss.

Se la chiamata cade durante il movimento, concentrerei l'analisi su roaming, BSSID transition e autenticazione.

Se il problema avviene anche da client fermi, allargherei l'analisi a QoS, LAN, firewall e piattaforma VoIP.

Se il problema appare soltanto in una determinata area, Ekahau e Sidekick 2 diventano il punto di partenza naturale.

Se invece coinvolge tutti gli utenti indipendentemente dalla posizione, è meno probabile che si tratti di un problema puramente RF.

Questo approccio evita di modificare configurazioni a tentativi.

## Cosa misurare durante una validazione

Una validazione voce completa dovrebbe mettere in relazione copertura RF, SNR, roaming, retry, utilization e comportamento applicativo.

Il valore più utile non è una singola misura.

È la correlazione tra gli eventi.

Se durante una chiamata la qualità degrada esattamente quando il client attraversa una certa zona e nello stesso momento aumentano retry e channel utilization, abbiamo un'indicazione concreta.

Se invece il Wi-Fi rimane stabile ma il jitter cresce nella piattaforma voce, bisogna seguire il traffico più avanti nella rete.

Il troubleshooting efficace nasce proprio da questa capacità di separare i domini.

## Conclusioni

La voce su Wi-Fi è uno dei migliori indicatori della qualità reale di una WLAN.

Una rete può funzionare bene per browsing, posta elettronica e applicazioni cloud e mostrare immediatamente i propri limiti quando deve sostenere chiamate real-time in movimento.

Per ottenere una VoWLAN stabile servono celle progettate correttamente, roaming rapido, SNR adeguato, retry contenuti e una gestione coerente della QoS.

Ma serve anche una rete cablata all'altezza.

Switching, routing, VLAN, DSCP, firewall, autenticazione e piattaforma VoIP fanno parte dello stesso sistema.

Ekahau AI Pro consente di validare il design RF e individuare le aree in cui copertura, SNR o utilization possono compromettere la voce. Sidekick 2 diventa particolarmente utile quando bisogna osservare lo spettro e capire perché un'area apparentemente ben coperta continua a generare problemi.

La regola più importante è semplice:

**una chiamata stabile non dipende da un solo parametro, ma dalla continuità dell'intero percorso end-to-end.**
