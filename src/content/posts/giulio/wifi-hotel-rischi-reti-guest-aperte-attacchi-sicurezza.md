---
title: "Wi-Fi in hotel: rischi reali delle reti guest e aperte, attacchi possibili e come difendersi"
description: "Wi-Fi in hotel e reti guest: rischi reali di evil twin, rogue AP, captive portal contraffatti, MITM, ARP spoofing, DNS spoofing e buone pratiche per utenti e infrastrutture."
pubDatetime: 2026-10-11T16:35:00Z
draft: false
tags:
  - wifi
  - wireless-security
  - guest-network
  - hotel-wifi
  - cybersecurity
  - network-security
  - captive-portal
  - enterprise-wifi
ogImage: /images/articles/wifi-hotel-guest-security-hero.svg
---
## Introduzione

Collegarsi al **Wi-Fi di un hotel** è ormai un gesto automatico. Si arriva in camera, si cerca il nome della rete, si inserisce una password oppure si completa un captive portal e, nel giro di pochi secondi, notebook e smartphone sono online.

È comodo, ma dal punto di vista della sicurezza non tutte le reti guest sono uguali. Una rete aperta, una rete protetta con una password condivisa e una rete con captive portal possono sembrare molto simili all'utente, ma dal punto di vista tecnico hanno caratteristiche differenti.

Il problema è che, in molti casi, l'utente tende a fidarsi della rete semplicemente perché appartiene a un hotel. Se il nome dell'SSID è plausibile e il captive portal ha un aspetto professionale, la percezione di sicurezza aumenta. In realtà, proprio questa fiducia implicita può essere sfruttata da un attaccante.

In questo articolo analizzo i rischi più concreti delle reti Wi-Fi in hotel e delle WLAN guest, cercando di distinguere tra scenari realistici, falsi miti e misure di protezione realmente utili.

![Wi-Fi in hotel e sicurezza delle reti guest](/images/articles/wifi-hotel-guest-security-hero.svg)

---

## Perché il Wi-Fi di un hotel è un ambiente particolare

Una rete alberghiera mette insieme utenti sconosciuti tra loro, dispositivi molto diversi e permanenze brevi. Nello stesso momento possono essere connessi notebook aziendali, smartphone personali, tablet, smart TV, telefoni IP, dispositivi IoT e sistemi di building automation.

Questa eterogeneità aumenta la superficie di attacco. A differenza di una rete aziendale tradizionale, dove identità e policy possono essere controllate con maggiore precisione, una rete guest deve accogliere dispositivi che non appartengono all'organizzazione e sui quali l'hotel non ha alcun controllo.

Per questo la sicurezza non può dipendere soltanto dalla password del Wi-Fi. Deve essere costruita attraverso segmentazione, isolamento, filtraggio e monitoraggio.

Una rete aperta consente al client di associarsi senza una chiave WPA2 o WPA3. Una rete guest protetta con password condivisa offre invece una protezione maggiore sul collegamento radio, ma questo non significa automaticamente che i client siano isolati tra loro o che l'infrastruttura a monte sia correttamente segmentata.

Anche il captive portal viene spesso interpretato come una garanzia di sicurezza. In realtà il suo scopo principale è gestire l'accesso, raccogliere informazioni o far accettare le condizioni d'uso. La presenza di una pagina di login non dice nulla, da sola, sulla qualità della segmentazione, sull'isolamento tra client o sulla protezione end-to-end del traffico.

## Il rischio più concreto: collegarsi alla rete sbagliata

Uno degli scenari più interessanti in un hotel è quello dell'**evil twin**.

L'attaccante crea un access point con un nome molto simile alla rete legittima. Se la rete ufficiale si chiama `Hotel_Guest`, potrebbe comparire una seconda rete chiamata `Hotel-Guest`, `Hotel WiFi` oppure `Free Hotel WiFi`.

Per un utente che arriva in una struttura che non conosce, distinguere la rete legittima da quella falsa può essere difficile. Il fatto che il segnale sia forte o che venga presentato un captive portal credibile non costituisce una prova di autenticità.

Se il dispositivo si collega all'access point malevolo, l'attaccante può presentare una pagina di accesso contraffatta, imitare il portale dell'hotel o cercare di ottenere informazioni personali e credenziali. In questo caso il problema non è soltanto intercettare il traffico. Spesso l'attacco più efficace consiste nel convincere l'utente che la rete sia autentica.

Un **rogue access point** non deve necessariamente essere installato da un attaccante esterno. Può essere anche un dispositivo collegato impropriamente alla rete dell'hotel, un piccolo router consumer oppure un access point configurato fuori dal controllo centrale. In un ambiente complesso, una rete non autorizzata può diventare un punto di ingresso che aggira le policy previste dall'infrastruttura.

![Evil twin, captive portal falso e percorso del traffico in una rete Wi-Fi hotel](/images/articles/wifi-hotel-evil-twin-mitm.svg)

Dal punto di vista del gestore, monitorare lo spettro radio e individuare SSID o BSSID non appartenenti all'infrastruttura autorizzata diventa quindi parte della sicurezza operativa, non soltanto del troubleshooting wireless.

## Man-in-the-Middle, ARP spoofing e manipolazione del traffico

Un altro scenario tipico è il **Man-in-the-Middle**, spesso abbreviato in MITM.

L'obiettivo dell'attaccante è inserirsi logicamente tra il client e la destinazione. Questo può avvenire in diversi modi, per esempio controllando direttamente l'access point, il gateway oppure cercando di manipolare il traffico locale su una rete guest configurata male.

È importante però contestualizzare il rischio. Oggi gran parte del traffico web utilizza HTTPS e TLS, quindi leggere in chiaro password e contenuti di servizi moderni è molto più difficile rispetto al passato.

Questo non rende il MITM irrilevante. Rimangono esposti scenari in cui sono presenti applicazioni legacy, siti HTTP, dispositivi IoT, software che non valida correttamente i certificati o utenti che ignorano gli avvisi del browser.

Se inoltre la rete guest non separa correttamente i dispositivi, un client può tentare di interagire con gli altri sistemi presenti nella stessa subnet. Tecniche come **ARP spoofing** possono essere utilizzate per alterare il traffico locale e tentare di posizionarsi nel percorso tra un dispositivo e il gateway.

È qui che emerge l'importanza del **client isolation**. In una rete guest ben progettata, due ospiti collegati allo stesso SSID non dovrebbero poter comunicare liberamente tra loro. Il traffico dovrebbe essere confinato verso Internet e verso i soli servizi realmente necessari.

## DNS spoofing, captive portal falsi e fiducia implicita

Anche il DNS può diventare un punto di attacco.

Se un aggressore controlla il resolver utilizzato dal client o il gateway attraverso il quale passa il traffico, può tentare di reindirizzare una richiesta verso una destinazione differente. Questo tipo di attacco diventa particolarmente credibile quando viene combinato con phishing e captive portal contraffatti.

Il problema principale è che l'utente raramente dispone di strumenti per verificare con certezza che l'access point sia legittimo. Spesso si fida perché il nome della rete è plausibile, la password è riportata in camera o il portale ha il logo dell'hotel.

Questa fiducia implicita è una delle debolezze più importanti dell'intero scenario.

Il captive portal, in particolare, può diventare un ottimo elemento di social engineering. Una pagina graficamente convincente può chiedere un indirizzo email, il numero della camera, il cognome oppure credenziali che l'utente associa erroneamente a un accesso aziendale o a un servizio cloud.

La sicurezza tecnica dell'applicazione e la consapevolezza dell'utente devono quindi lavorare insieme.

## Deauthentication, disconnessioni e riconnessioni

Nel mondo Wi-Fi esistono anche attacchi che puntano a disturbare la connessione legittima.

Una disconnessione forzata può essere utilizzata semplicemente per creare un denial of service, ma può anche diventare parte di uno scenario più articolato. Se la rete ufficiale sembra instabile e accanto compare un SSID quasi identico che appare più affidabile, l'utente può essere indotto a scegliere la rete sbagliata.

Le implementazioni moderne introducono protezioni migliori rispetto al passato, ma la lezione progettuale rimane valida: la sicurezza wireless non dipende da un singolo controllo e gli attacchi più credibili sono spesso quelli che combinano più elementi tecnici con il comportamento dell'utente.

## Quanto è realmente possibile sniffare oggi

Il tema dello **sniffing** viene spesso semplificato troppo.

Essere collegati a una rete Wi-Fi pubblica non significa che un altro utente possa automaticamente leggere qualsiasi password, messaggio o contenuto. L'adozione diffusa di TLS ha cambiato radicalmente questo scenario.

Resta però possibile osservare parte dei metadati, individuare protocolli non cifrati, identificare servizi locali esposti e sfruttare applicazioni o dispositivi progettati male.

Inoltre, quando l'attaccante controlla direttamente l'access point o il gateway, aumenta la possibilità di manipolare il contesto di navigazione e costruire scenari di phishing molto convincenti.

Il rischio moderno è quindi spesso meno simile a "leggo tutto quello che fai" e più vicino a "controllo l'ambiente in cui stai comunicando e provo a farti fidare della destinazione sbagliata".

## Notebook aziendali e utenti business

Il problema diventa particolarmente rilevante per chi viaggia per lavoro.

Un notebook aziendale connesso al Wi-Fi di un hotel può avere accesso a VPN, posta elettronica, applicazioni cloud e sistemi aziendali. Se il dispositivo espone servizi locali, utilizza software non aggiornato o considera erroneamente la rete come trusted, può diventare un bersaglio interessante.

Una rete guest dovrebbe essere trattata come un ambiente non attendibile. Dal lato endpoint questo significa limitare le condivisioni, mantenere aggiornati sistema operativo e applicazioni, utilizzare firewall host e non ignorare errori di certificato.

Una **VPN affidabile** aggiunge un ulteriore livello di protezione perché crea un tunnel cifrato tra il dispositivo e un endpoint remoto. Riduce l'esposizione del traffico verso la rete locale e limita l'efficacia di diversi scenari di intercettazione.

Non risolve però tutto. Se l'utente inserisce le proprie credenziali in un captive portal falso o accetta un certificato fraudolento, la VPN non annulla automaticamente l'errore. La sicurezza rimane una combinazione di tecnologia, configurazione e comportamento.

## Come dovrebbe essere progettata una rete guest in hotel

Dal punto di vista infrastrutturale, la rete guest dovrebbe essere completamente separata dai sistemi interni dell'hotel.

La segmentazione deve impedire che un ospite possa raggiungere sistemi amministrativi, dispositivi IoT, telefoni IP, telecamere, sistemi POS o piattaforme di building automation.

Anche i client guest dovrebbero essere isolati tra loro. Il traffico dovrebbe essere filtrato da firewall e policy coerenti, mentre il monitoraggio dell'infrastruttura dovrebbe consentire di identificare access point non autorizzati e comportamenti anomali nell'ambiente radio.

Una guest WLAN ben progettata viene considerata **non trusted fin dall'origine**. Non si presume che il client sia affidabile e non si concede visibilità verso la rete interna solo perché l'utente ha completato il captive portal.

Dal punto di vista architetturale è questo il passaggio fondamentale: il Wi-Fi guest non deve essere una semplice VLAN aggiunta alla rete esistente, ma un dominio con policy e confini chiaramente definiti.

## Cosa può fare l'utente

Dal lato dell'utente, la prima regola è verificare il nome esatto della rete con la struttura e non collegarsi a SSID simili o ambigui.

È importante non ignorare errori di certificato, mantenere il dispositivo aggiornato e disabilitare condivisioni o servizi di discovery non necessari. Anche la connessione automatica alle reti pubbliche merita attenzione, perché l'auto-join può trasformare una comodità in un rischio quando un dispositivo riconosce un nome già utilizzato in passato.

Per attività particolarmente sensibili, soprattutto in ambito lavorativo, una VPN o un hotspot personale possono offrire un ambiente più controllabile.

Ci sono inoltre situazioni in cui la scelta più prudente è semplicemente non utilizzare il Wi-Fi dell'hotel. Un captive portal anomalo, un SSID ambiguo, ripetuti errori di certificato o un comportamento incoerente della rete sono tutti segnali che meritano attenzione.

## Il punto non è demonizzare il Wi-Fi pubblico

Il Wi-Fi di un hotel non è necessariamente insicuro.

Una rete moderna, ben segmentata, monitorata e configurata correttamente può offrire un livello di sicurezza adeguato per moltissimi utilizzi.

Il problema nasce quando l'utente non ha modo di conoscere la qualità dell'infrastruttura e tende a considerare affidabile qualsiasi rete che abbia un nome plausibile.

Per questo bisogna ragionare in termini di rischio.

Una rete guest è un ambiente condiviso, con dispositivi sconosciuti e con un livello di controllo inferiore rispetto a una rete privata. La strategia corretta non è evitarla sempre, ma utilizzarla con consapevolezza.

## Conclusioni

Le reti Wi-Fi di hotel e strutture pubbliche sono diventate molto più sicure rispetto al passato grazie alla diffusione di HTTPS, TLS, sistemi di autenticazione moderni e migliori meccanismi di protezione lato client.

Rimangono però scenari di attacco concreti.

**Evil twin, rogue access point, captive portal contraffatti, MITM, ARP spoofing, DNS spoofing e lateral movement** continuano a essere tecniche rilevanti soprattutto quando la rete guest è progettata male o l'utente si fida troppo facilmente dell'ambiente.

La sicurezza reale non dipende da un solo elemento. Dipende dalla qualità della WLAN, dalla segmentazione della rete, dalle protezioni applicative e dal comportamento dell'utente.

In un hotel, quindi, la domanda corretta non è semplicemente:

**"Il Wi-Fi ha una password?"**

La domanda dovrebbe essere:

**"Quanto posso realmente fidarmi di questa rete e quali controlli sono presenti dietro l'SSID che vedo sul mio dispositivo?"**
