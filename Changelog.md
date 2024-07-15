# Changelog Cranach Artefacts

## v0.6.0
Mit dieser Version werden folgende Fehler behoben/ Funktionen/ Inhalte bereit gestellt:
- Permalinks sind jetzt klickbar
- "Erhaltungszustand" umbenannt in "Zustand / Auflage“ (State/ Edition) 
- Information "Druckgrafik" wurde entfernt und die restliche Informationen wird nun mit Komma getrennt angezeigt
- neues Feld "Datierung" wurde integriert
- Nutzerinteraktionen werden gespeichert und beim Reload wieder hergestellt.
- Folgende Abbildungen/ Metadaten wurden aktualisiert:
  - CH_MAS_A1950_FR-none
  - DE_HSBBW_Ia20_FR-none
  - DE_LHW_G163_FR-none
  - DE_LHW_G16_FR-none
  - DE_SAOH_2000-3a_FR-none
  - DE_WSE_M0065
  - DE_smbGG_637_FR190A
  - PRIVATE_NONE-P411_FR-none
  - SE_NMS_5016_FR189-190B
  - US_MMANY_55-220-2_FR314F
## v0.5.2
Mit dieser Version werden folgende Fehler behoben/ Funktionen/ Inhalte bereit gestellt:
- Sprachwähler Icon wird jetzt auf allen Systemen korrekt angezeigt.
- Werke des KKL Anhangs werden jetzt als solche ausgezeichnet.
- Falsche Overalls gefixt, geprüft für:
  - https://lucascranach.org/de/DE_LHW_G163/
  - https://lucascranach.org/de/PRIVATE_NONE-P409/
  - https://lucascranach.org/de/I_MPP_1036/
  - https://lucascranach.org/de/I_MPP_1035/
  - https://lucascranach.org/de/CH_MAS_A1950/
  - https://lucascranach.org/de/DE_AGGD_440/
- Folgende Datensätze sind wieder da, aber noch nicht über die Suche erreichbar:
  - https://lucascranach.org/de/DE_GNMN_Gm1570/
  - https://lucascranach.org/de/DE_MdbKL_946/
  - https://lucascranach.org/de/DE_KSW_G9/
  - https://lucascranach.org/de/DE_smbGG_637/
  - https://lucascranach.org/de/DE_LHW-Lost_NONE-002/
  - https://lucascranach.org/de/PRIVATE_NONE-P404/
  - https://lucascranach.org/de/DE_KSW_G560/
  - https://lucascranach.org/de/DE_NLMH_PAM973/
  - https://lucascranach.org/de/DE_NLMH_PAM974/
- BUs aus Exif Import verbessert. Getest entlang der Tabelle "Zuordnung Exif" (https://www.icloud.com/numbers/0ZnUgCwR_ajwPvn4lz5J39oUA#editlist-update)

## v0.5.1
Mit dieser Version werden folgende Fehler behoben/ Funktionen/ Inhalte bereit gestellt:
- TMS Update vom 12.05.2022 wurde integriert


## v0.5.0

Mit dieser Version werden folgende Fehler behoben/ Funktionen/ Inhalte bereit gestellt:
- Pfeil bei den Untersuchungen verhält sich nun erwartungskonform. Gleiches gilt für die dahinter liegenden Inhalte.
- Artfakte können jetzt auf den «Bild vergleichen» Stapel gelegt werden.
- «Bild vergleichen» Funktion kann jetzt gestartet werden.
- korrigierte Version der Bildunterschriften (via Exif) ist enthalten. Dies wurde anhand folgender Objekte verifiziert:
  - https://lucascranach.org/de/PRIVATE_NONE-P201/
  - https://lucascranach.org/de/CH_KMB_177

- kleinere Layoutoptimierungen

https://lucascranach.org/de/DE_MdbKL_946/

## v0.4.0
Mit dieser Version werden folgende Fehler behoben/ Funktionen/ Inhalte bereit gestellt:
- Sprachwähler erlaubt das wechseln zwischen den Sprachen (WIP)
- Permlink für reale Objekte bei den Grafiken eingeführt
- Neuer Text für Zitierweise, inkl. Ersetzung einiger Platzhalter durch Inhalte
- Im neuen Feld "Quellen" wurden die Spalten "Katalognummer" und "Tafel" entfernt. Die erste Spalte heißt nun statt "Erwähnt auf Seite" in "Position im Band". *Hier fehlt die englische Übersetzung*.
- Funktionen wie "Inventor" und "Drucker" werden wieder beim virtuellen Objekt angezeigt, aber nicht mehr bei den Gemälden.
- Inhalte für DE_SKD_GG1934 sind jetzt integriert.
- *Illustrations* werden jetzt mit *Images* übersetzt.
- Interaktion für's Ein- und Ausklappen auf der Objektebene vereinheitlich. Damit wird folgender Bug korrigiert: "Wenn ich auf die Überschrift "Kunsttechnologische Untersuchung" klicke, öffnet sich darunter "8.4.2013: Naturwissenschaftliche Materialanalyse" Das ist gut und richtig so, aber wenn ich auf "8.4.2013: Naturwissenschaftliche Materialanalyse" klicke, dann öffnet sich nicht der darunter verborgene Textinhalt. Um diesen zu öffnen, muss ich erst zu dem gelben Pfeil navigieren und exakt darauf klicken. Könntet Ihr die Bereiche der Unterüberschriften, wie z.B. "8.4.2013: Naturwissenschaftliche Materialanalyse Holzartenbestimmung / Dendrochronologie" vielleicht auch aktiv setzen, so dass bei einem Klick darauf, sich auch der verborgene Inhalt öffnet, so wie bei der Ebene darüber??" 
- Bilder für folgendes Objekt sind nun verfügbar: https://lucascranach.org/de/UK_RCL_RCIN402656/
- Doppelte(leere) Tracing Bilder sind entfernt, z.B. https://lucascranach.org/de/DE_MdbKL_946
- Bei PDFs wird nun auch der Dateiname angezeigt.
- Integritätscheck bei PDFs eingebaut