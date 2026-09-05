---
title: "FortiGate SD-WAN: dual-WAN, Performance SLA e failover applicativo"
description: "Come progettare una SD-WAN FortiGate con due collegamenti WAN: Performance SLA, latency, jitter, packet loss, steering applicativo, load balancing, failover e troubleshooting."
pubDatetime: 2026-09-05T20:25:00Z
draft: false
tags:
  - networking
  - security
  - fortinet
  - fortigate
  - sd-wan
  - wan
  - routing
  - troubleshooting
ogImage: "/images/articles/infrastruttura-enterprise-fortigate-hero.webp"
---

## Introduzione

Avere due collegamenti Internet su un firewall non significa automaticamente avere una **SD-WAN**.

La differenza emerge quando il percorso del traffico non viene deciso soltanto dalla disponibilità fisica dell'interfaccia o da una route statica, ma anche dalla **qualità reale del collegamento e dal tipo di applicazione che deve attraversarlo**.

FortiGate integra le funzioni SD-WAN nel sistema di routing e sicurezza. Le **SD-WAN rules** identificano il traffico di interesse e ne determinano il percorso in funzione della strategia configurata e delle condizioni misurate sui link. I Performance SLA permettono inoltre di osservare parametri come **latenza, jitter e packet loss**.

In questo articolo considero uno scenario enterprise dual-WAN: una linea primaria ad alte prestazioni e un secondo accesso, ad esempio un altro ISP o un collegamento 5G, entrambi gestiti da FortiGate. L'obiettivo non è semplicemente ottenere un backup, ma costruire un comportamento prevedibile per traffico business, servizi cloud, collaboration e connettività ordinaria.

![FortiGate utilizzato come edge firewall in un'infrastruttura enterprise](/images/articles/infrastruttura-enterprise-fortigate-hero.webp)

---

## Dual-WAN e SD-WAN non sono la stessa cosa

In un'architettura dual-WAN tradizionale si può configurare una route primaria e una secondaria con distanza o priorità differente. Se la prima diventa indisponibile, il traffico passa sulla seconda.

È un meccanismo utile, ma risponde soprattutto alla domanda: **il link è raggiungibile oppure no?**

Una SD-WAN deve rispondere anche a domande più interessanti:

- il link è tecnicamente up ma sta perdendo pacchetti?
- la latenza è ancora accettabile per una sessione interattiva?
- il jitter sta degradando VoIP e collaboration?
- quale WAN è più adatta a un determinato servizio?
- entrambe le linee rispettano gli SLA e possono essere utilizzate?
- quando è opportuno spostare le nuove sessioni sul percorso alternativo?

Il punto progettuale è quindi passare dal semplice **link failover** al **path selection**.

---

## Architettura di riferimento

Lo scenario può essere rappresentato con due underlay WAN collegati allo stesso FortiGate. Le interfacce vengono inserite nella SD-WAN e il firewall diventa il punto in cui convergono routing, policy e misurazione della qualità.

![Architettura FortiGate SD-WAN dual-WAN con Performance SLA e instradamento applicativo](/images/articles/fortigate-sdwan-dual-wan-architecture.svg)

A valle del FortiGate possono esserci utenti, telefoni IP, access point, server e VLAN differenti. A monte, le due WAN possono raggiungere Internet direttamente oppure trasportare overlay IPsec verso datacenter e altre sedi.

Questa distinzione tra **underlay** e **overlay** è importante. Il circuito WAN è il trasporto; il tunnel IPsec è un livello logico costruito sopra quel trasporto. Nel troubleshooting conviene mantenere i due livelli separati, perché un problema dell'underlay può manifestarsi come instabilità dell'overlay senza che la configurazione IPsec sia la causa primaria.

---

## I membri SD-WAN

Le interfacce WAN che partecipano alla soluzione diventano membri della SD-WAN. Ogni membro può avere caratteristiche differenti: capacità, costo, ISP, tecnologia di accesso e comportamento operativo.

Un esempio tipico può essere:

**WAN1 — fibra business**  
Percorso preferenziale per applicazioni sensibili a latenza e jitter.

**WAN2 — secondo ISP o 5G**  
Percorso alternativo, utilizzabile per failover oppure per specifiche classi di traffico.

Non è necessario che i due collegamenti siano identici. Anzi, la diversità tecnologica e di operatore può aumentare la resilienza, purché la progettazione tenga conto delle differenze reali tra i circuiti.

---

## Performance SLA: misurare il link, non soltanto la porta

Una porta Ethernet può risultare up anche quando il servizio Internet a monte è degradato o inutilizzabile.

Per questo FortiGate utilizza i **Performance SLA**, associando health check ai membri SD-WAN. Le metriche fondamentali sono:

- **latency**, cioè il tempo necessario per raggiungere la destinazione di misura;
- **jitter**, cioè la variazione della latenza nel tempo;
- **packet loss**, cioè la percentuale di pacchetti persi.

Queste metriche devono essere interpretate in relazione all'applicazione. Un trasferimento dati può tollerare condizioni che sarebbero molto più problematiche per una conversazione VoIP o una riunione Microsoft Teams.

Per questo non imposterei un unico SLA generico per qualsiasi traffico. È più corretto definire criteri coerenti con le applicazioni realmente importanti e scegliere probe target rappresentativi del percorso che si vuole valutare.

---

## Scegliere correttamente il target del health check

Il server utilizzato dal Performance SLA non dovrebbe essere scelto casualmente.

Se si monitora soltanto il gateway immediatamente a monte, si può verificare che il CPE dell'operatore sia raggiungibile senza sapere nulla sul resto del percorso Internet.

All'estremo opposto, affidarsi a un'unica destinazione remota può far interpretare come guasto WAN un problema specifico di quella destinazione.

Una progettazione robusta deve quindi chiedersi **che cosa vogliamo realmente misurare**.

Per un accesso Internet può essere utile osservare destinazioni stabili e significative. Per un overlay tra sedi, invece, può essere più interessante misurare la qualità del percorso effettivamente utilizzato dal servizio aziendale.

---

## SD-WAN rules: il traffico non è tutto uguale

Le SD-WAN rules, chiamate anche service rules, permettono di identificare traffico e applicare una strategia di selezione del percorso.

È qui che la SD-WAN diventa realmente application-aware.

Una rete può, per esempio, stabilire che:

- traffico VoIP e collaboration utilizzi il link con qualità migliore;
- Microsoft 365 utilizzi i membri che rispettano uno specifico SLA;
- navigazione web ordinaria possa essere distribuita sui due link;
- backup e aggiornamenti preferiscano il circuito meno costoso;
- un'applicazione critica utilizzi WAN1 finché rispetta i requisiti e passi a WAN2 quando li supera.

L'obiettivo non è creare regole per ogni singolo dominio Internet. È definire poche classi di traffico realmente significative e associarle a criteri comprensibili.

---

## Best Quality e Lowest Cost (SLA)

Due concetti particolarmente utili sono **Best Quality** e **Lowest Cost (SLA)**.

Con una strategia orientata alla qualità, il FortiGate può confrontare i membri sulla base del criterio configurato e preferire il percorso che offre il comportamento migliore per quella regola.

Con **Lowest Cost (SLA)**, invece, il firewall sceglie il collegamento con costo più basso tra quelli che rispettano lo SLA. Se il link economicamente preferibile non soddisfa più i requisiti, un membro alternativo che rispetta lo SLA può diventare il percorso utilizzato.

Questo consente di separare due concetti che spesso vengono confusi: **qualità** e **costo**.

Il link migliore in assoluto non deve necessariamente essere utilizzato per ogni flusso. Per traffico non critico può avere senso privilegiare un circuito meno costoso, lasciando capacità sul percorso premium per i servizi sensibili.

---

## Load balancing: usare entrambi i link con criterio

Il load balancing non dovrebbe essere interpretato come “somma automatica” della banda delle due WAN per ogni singola sessione.

La distribuzione avviene secondo la strategia e l'algoritmo configurati. Nelle versioni recenti di FortiOS il load balancing può essere abilitato anche all'interno della strategia Lowest Cost (SLA): quando più link soddisfano gli SLA, il traffico può essere distribuito tra i membri idonei.

Tra i metodi disponibili esistono approcci round-robin e criteri basati su source IP, source/destination IP o banda disponibile.

La scelta deve tenere conto della persistenza delle sessioni. Alcune applicazioni tollerano bene la distribuzione; altre funzionano meglio quando il comportamento di uscita rimane stabile e prevedibile.

---

## Failover: “WAN up” non significa “servizio sano”

Il caso più interessante è una WAN che non cade fisicamente ma peggiora.

Immaginiamo WAN1 con link Ethernet attivo ma con packet loss crescente. Un failover basato soltanto sullo stato dell'interfaccia continuerebbe a considerarla disponibile.

Un Performance SLA può invece rilevare che la qualità non soddisfa più le soglie previste. Le SD-WAN rules possono quindi evitare quel membro per il traffico interessato e selezionare WAN2.

È questo il passaggio dal **failover fisico** al **failover prestazionale**.

Per applicazioni real-time la differenza è sostanziale: non è necessario aspettare che la linea sia completamente morta per reagire a una degradazione evidente.

---

## Fallback e stabilità: evitare il ping-pong tra le WAN

Anche il ritorno al percorso primario deve essere progettato.

Se un link oscilla continuamente attorno alla soglia dello SLA, una configurazione troppo aggressiva può generare cambi frequenti di percorso. Questo comportamento può essere peggiore di una breve permanenza sul link secondario.

Per questo soglie, intervalli e criteri di recovery devono essere coerenti con il servizio. La stabilità della rete è più importante della ricerca ossessiva del link teoricamente migliore in ogni istante.

Una buona SD-WAN deve reagire ai problemi senza diventare essa stessa una fonte di instabilità.

---

## Policy firewall e SD-WAN

La selezione del percorso non sostituisce la sicurezza.

Il traffico deve comunque attraversare policy firewall coerenti con sorgente, destinazione, servizi e profili di sicurezza. In un progetto FortiGate bisogna quindi verificare insieme:

**routing → SD-WAN rule → membro selezionato → firewall policy → NAT → sessione**.

Concentrarsi soltanto sulla pagina SD-WAN può portare a diagnosi sbagliate. Un flusso può utilizzare il membro corretto ma essere bloccato da una policy, oppure può essere autorizzato dalla policy ma non corrispondere alla SD-WAN rule prevista.

---

## SD-WAN e VPN IPsec tra sedi

La SD-WAN diventa ancora più interessante quando i collegamenti Internet trasportano tunnel IPsec.

Una sede può avere due underlay e uno o più overlay verso hub o datacenter. In questo scenario la qualità del trasporto influenza direttamente quella del tunnel.

È quindi utile distinguere:

**Underlay** — ISP, accesso fisico, routing Internet, latenza e perdita del circuito.

**Overlay** — tunnel IPsec, routing tra sedi, eventuale BGP, policy e reachability delle reti private.

Quando un'applicazione remota ha problemi, bisogna capire se la causa si trova nel circuito, nella VPN, nel routing o nella policy. La SD-WAN fornisce visibilità e strumenti di steering, ma non elimina la necessità di una metodologia di troubleshooting ordinata.

---

## Microsoft 365, Teams e traffico real-time

Servizi cloud e collaboration sono un caso d'uso naturale per una SD-WAN perché dipendono fortemente dalla qualità del percorso Internet.

Per Microsoft Teams, VoIP e traffico interattivo, latenza, jitter e packet loss sono molto più significativi della semplice disponibilità del link.

Questo non significa impostare soglie arbitrarie e instradare tutto verso la WAN più veloce. Significa costruire Performance SLA coerenti con le applicazioni, osservare il comportamento reale e verificare che il percorso alternativo sia effettivamente migliore quando avviene il failover.

---

## Bandwidth estimation e capacità reale

FortiGate può utilizzare valori di banda upstream e downstream nelle strategie che tengono conto della capacità disponibile. Questi valori possono essere configurati manualmente e, nei contesti supportati, popolati attraverso gli strumenti di speed test dell'interfaccia.

È importante che i valori rappresentino realisticamente il circuito.

Una linea nominalmente da 1 Gbit/s che attraversa un accesso con capacità effettiva molto inferiore non dovrebbe essere trattata come se disponesse sempre dell'intera banda commerciale dichiarata.

La SD-WAN prende decisioni sulla base delle informazioni che le forniamo: metriche sbagliate producono decisioni formalmente corrette ma operativamente sbagliate.

---

## Un esempio di logica dual-WAN

Consideriamo una sede con:

- WAN1 fibra business;
- WAN2 secondo ISP/5G;
- traffico Teams e VoIP;
- Microsoft 365 e SaaS;
- navigazione web;
- backup cloud.

Una strategia ragionevole potrebbe utilizzare WAN1 come percorso preferenziale per real-time finché soddisfa lo SLA, consentire a SaaS e web di utilizzare entrambi i collegamenti secondo la policy scelta e spostare i backup sul percorso meno pregiato.

Se WAN1 supera le soglie definite per il traffico real-time, le nuove sessioni interessate possono essere indirizzate verso WAN2.

Il valore della soluzione non è il fatto che esistano due WAN. È che **ogni classe di traffico ha un comportamento esplicito e verificabile**.

---

## Troubleshooting: partire dai dati

Quando la SD-WAN non si comporta come previsto, eviterei di modificare immediatamente le regole.

La prima verifica è lo stato dei Performance SLA. FortiOS mette a disposizione comandi diagnostici specifici, tra cui:

```text
diagnose sys sdwan health-check status
```

L'output permette di osservare lo stato dei membri e metriche come packet loss, latency e jitter.

Successivamente bisogna verificare quale SD-WAN service sta intercettando il traffico e quale membro viene selezionato. La diagnostica delle service rules, la routing table, le sessioni e il debug flow completano l'analisi.

La sequenza che utilizzo concettualmente è:

**health-check → SLA → SD-WAN rule → route → policy → session → packet flow**.

Questo evita di attribuire alla SD-WAN un problema che in realtà appartiene al routing, al NAT o alla firewall policy.

---

## Errori progettuali frequenti

Un primo errore è considerare la seconda WAN soltanto come backup e poi aspettarsi comportamento application-aware senza aver definito Performance SLA e service rules.

Un secondo errore è utilizzare soglie identiche per qualsiasi applicazione. Il traffico real-time e un download massivo hanno requisiti differenti.

Un terzo errore è scegliere health-check target poco rappresentativi.

Un quarto errore è creare troppe regole sovrapposte. L'ordine e i criteri di matching devono essere leggibili, altrimenti diventa difficile capire quale regola stia realmente governando una sessione.

Infine, è un errore trascurare il percorso di ritorno. Come in qualsiasi progetto di routing, la simmetria e il comportamento delle sessioni devono essere considerati nel disegno complessivo.

---

## Best practice operative

Una SD-WAN efficace nasce da un modello semplice prima di diventare sofisticata.

Partirei da pochi membri ben documentati, Performance SLA realmente significativi e un numero limitato di classi applicative. Solo dopo aver osservato il comportamento reale aggiungerei criteri più granulari.

Documenterei inoltre per ogni regola:

- traffico interessato;
- percorso preferito;
- percorso alternativo;
- SLA richiesto;
- comportamento quando nessun membro rispetta lo SLA;
- motivazione tecnica della scelta.

Questo rende la configurazione comprensibile anche mesi dopo e accelera enormemente il troubleshooting.

---

## Conclusioni

La SD-WAN di FortiGate non dovrebbe essere vista come un semplice meccanismo per mettere due connessioni Internet nello stesso firewall.

Il valore reale sta nell'unire **routing, misurazione della qualità, classificazione del traffico e sicurezza** in un unico punto decisionale.

In un progetto dual-WAN ben costruito, il FortiGate non chiede soltanto se WAN1 e WAN2 siano attive. Valuta quale percorso sia adatto al traffico che deve trasportare e può reagire quando la qualità cambia.

Performance SLA, SD-WAN rules e una corretta strategia di failover permettono così di ottenere una rete più resiliente e soprattutto più prevedibile.

La parte più importante rimane però il progetto: **misurare ciò che conta, definire soglie coerenti con le applicazioni e mantenere il comportamento della rete leggibile e verificabile**.