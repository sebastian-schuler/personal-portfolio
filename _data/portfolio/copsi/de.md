---
title: 'Copsi'
excerpt: "Copsi ist eine Desktop-Anwendung, die für Organisation, Kommunikation und den Austausch von Dokumenten zwischen Professoren, Assistenten und Studenten der Hochschule Kaiserslautern genutzt werden kann."
coverImage: '/images/portfolio/copsi-thumbnail.jpg'
date: '2020-03-13T05:35:07.322Z'
ogImage: 
  url: '/images/blog/opengraph/preview.png'
tags: 'Next.js,TypeScript,React,Mantine,Markdown'
---

## Beschreibung

Copsi ist eine Desktop-Applikation, die zur Kommunikation und zum Austausch von Dokumenten
zwischen Professoren, Assistenten und den Studierenden der Hochschule Kaiserslautern dient.
Der aktuelle Austausch von Informationen, Neuigkeiten oder relevanten Daten zu jeweiligen
Modulen sieht vor, dass die Studierenden auf verschiedene Plattformen wie das OLAT-System,
Google Drive, Studierenden E-Mails oder auch auf Instant-Messaging-Dienste wie WhatsApp
zurückgreifen müssen, um sich halbwegs einen Überblick verschaffen zu können. Informationen
werden schnell übersehen und die direkte Kommunikation mit Kommilitonen ist oftmals nicht
möglich, da hierfür die Studierenden gezielt im Campusboard nach jeweiligen Kommilitonen im
Personenverzeichnis suchen müssen, vorausgesetzt es besteht überhaupt Kontakt.

Aufgrund dieser Unzufriedenheit der verschiedenen Dienste, die im Studien-Alltag genutzt
werden müssen entstand die Idee eine Software zu kreieren, die die Kommunikation sowie den
Datenaustausch vereinfachen soll. Dies soll über einen zentralen Server in Verbindung mit einer
Datenbank erfolgen.

## Projektziel

Das Ziel dieses Studienprojektes ist ein Minimum Viable Product (MVP), das die Struktur von
Kursen, Channels und Nachrichten aus einer Datenbank lesen und darstellen kann. Zusätzliche
Funktionen wären zum Beispiel das Hoch- und Herunterladen von Dateien und User Rechte.

## Projektumfeld

Das Projekt wurde von Prof. Dr. Dieter Wallach als Dozent der Hochschule Kaiserslautern in
Auftrag gegeben. Unser Projektteam bestehend aus Caroline Miller, Sebastian Schuler und
Philipp Spandl hat als Studentisches Projektteam der Hochschule Kaiserslautern diesen Auftrag
angenommen. Interessengruppen waren Dozenten und Studierende der Hochschule Kaiserslautern.

## Planungsphase

### Ist-Analyse

Die OLAT-Lernplattform ist eine Web-Applikation, die bis auf wenige Ausnahmen von den
Professoren der Hochschule Kaiserslautern genutzt wird um ihre Kurse zu organisieren. Es ist
unter anderem möglich einen neuen Kurs anzulegen, Kurse im Verzeichnis zu suchen,
Studierende einzuladen, Dateien hoch- und runterzuladen, sogar die Möglichkeit für einen
Kurs-Chat und Diskussionsforum wird gegeben.

Die angebotenen Funktionen von OLAT werden nicht von den Studierenden angenommen, da
die Nutzung von OLAT zu kompliziert ist für den täglichen Gebrauch. Durch ein missglücktes
Interface fällt die Orientierung schwer, beispielsweise ist es nicht auf dem ersten Blick erkennbar,
dass das System überhaupt eine Such-Funktion besitzt. Es gibt keine allgemeine Startseite, bei
dem der Nutzer sich sicher sein kann, dass er an einen Orientierungspunkt zurück gelangt -
zumindest ist die “Startseite” nicht als solche gekennzeichnet.

Es wirkt schwerfällig und überladen mit Funktionen die scheinbar nicht nötig bzw relevant sind,
wie zum Beispiel dem eigenen Profil. Außerdem kann die aktuelle Sitzung ablaufen, was dazu
führt dass der Benutzer abgemeldet wird - ohne Warnung oder Benachrichtigung.

### Soll-Analyse

Aus Proto Personas und Interviews lassen sich die Zielgruppen definieren und die Ergebnisse für
die Anforderungen ableiten.

#### Interviews

Die Interview mit den Stakeholdern wurden benötigt um Ziele klar zu definieren. Es war wichtig
die Schwächen und Fehler des Konkurrenz Produktes herauszufinden um diese zu verbessern.

Interviews mit fünf Stakeholdern (Professoren und Studierende) bestätigten die Annahmen, die
durch die Proto Personas erstellt wurden. Hierbei gab es bei Vieren sehr viele Beschwerden über
OLAT, die größte Gemeinsame wäre die Unübersichtlichkeit. Dazu kommt noch wie sehr es mit
Funktionen überladen ist und dass es an manchen Stellen umständlicher ist als es sein müsste,
beispielsweise Dateien hoch- und runterladen - ein Doppelklick führt direkt dazu die Datei
runterzuladen, statt erstmal eine Vorschau zu erhalten.

### Anforderungen

Die herauszufilternde Zielgruppe ist für diese Anwendung recht offensichtlich. Die Anwendung
soll gezielt für Studierende und Dozenten entwickelt werden. Hierbei stellt sich dann die Frage,
welche Wünsche die Zielgruppe haben könnte um mit dem System zu interagieren.

#### Szenarien

Ein Student möchte dem Dozent eine Frage zur Übung stellen, ist sich jedoch nicht sicher, ob die
Frage eventuell “dumm” sein könnte. Es ist ihm peinlich und er unterlässt die Frage.

Ein Dozent möchte seinen Studierenden Dateien zukommen lassen. Das OLAT System ist ihm
jedoch zu kompliziert und er lädt sie an falscher Stelle hoch.

Ein Dozent ist krank und möchte seinen Studierenden noch am gleichen Tag benachrichtigen,
dass die Vorlesung ausfällt, jedoch bietet das OLAT System dafür keine Lösung und Studenten
schauen zu spät in ihr Email Postfach.

#### Funktional

- Das System soll das Managen von Kursen durch Professoren und Studierenden ermöglichen.
- Das System soll Kurse welche im Stundenplan im Campusboard eingetragen sind automatisch für
die Studierenden übernehmen.
- Das System soll den Studierenden ermöglichen Arbeitsgruppen zu bilden.
- Das System soll ermöglichen private Nachrichten zu verschicken.
- Das System soll für einen Kurs einen Gesamt-Chat bereit stellen.
- Das System soll ermöglichen Nachrichten anonym zu verschicken.
- Das System soll Professoren ermöglichen Dateien zu einem Kurs zur Verfügung zu stellen und
Dateien herunterzuladen.
- Das System soll Studenten ermöglichen Dateien (zum beispiel) Lösungen hochzuladen und
öffentliche Dateien herunterzuladen.
- Das System soll ein Rechtesystem für das Einsehen von Channels, Dateien etc. ermöglichen.
- Das System soll die Rechte der Professoren über die Rechte der Studierenden stellen.
- Das System soll eine Liste der beigetretenen Kurse bereitstellen.
- Das System soll eine Suche nach Kursen ermöglichen.
- Das System soll eine Suche innerhalb des Kurses ermöglichen.
- Das System soll es den Professoren ermöglichen zu einem Kurs Channels anzulegen.
- Das System soll ermöglichen den eigenen Account zu personalisieren (Prof. Dr. Zimmermann).
- Das System sollte für Professoren Templates für Kurse bereitstellen und Kurse aus alten System
übernehmen.
- Das System sollte intuitiv bedienbar sein.
- Das System soll eine Login-Funktion bieten, welche den Campusboard Account nutzt.
- Das System soll eine Option bieten das Profil minimal zu bearbeiten.
- Das System soll eine Drag-and-Drop Funktion bieten.
- Das System soll ermöglichen Benachrichtigungen von Kursen, Chats etc. stumm zu schalten.
- Das System soll ermöglichen Leute über einen Einladungslink zum Server einzuladen.
- Das System soll eine Vorschau von herunterladbaren Dateien ermöglichen.

#### Nicht-Funktional

- Das System soll nach 3 gescheiterten Anmelde Versuchen den Account für 5 Minuten sperren.
- Das System soll mindestens 4 Wochen ohne Unterbrechung laufen können.
- Das System soll Nachrichten innerhalb von maximal 100 ms an den Server geschickt haben.
- Das System sollte minimale Last auf die CPU haben.
- Das Versenden von Nachrichten sollte SSL-verschlüsselt erfolgen.
- Das System sollte nicht länger als 100 ms für den Wechsel zwischen Servern-Channeln
benötigen.
- Das Design des Systems sollte konsistent sein und sich am CI der HS Kaiserslautern orientieren.

## Planung

In der Entwurfsphase wird die Architektur und das vorläufige Design des Clients festgelegt,
basierend auf den folgenden Methoden der Entwurfsphase. Der Auftraggeber ließ einem hierbei
eine freie Gestaltungsmöglichkeit, mit der Bedingung, sich möglichst an der Corporate Identity
der Hochschule Kaiserslautern zu orientieren, hierbei wurde sich vor allem an den Farben der
einzelnen Studienbereiche orientiert, beispielsweise Blau für Informatik.

### Scribbles und Mockups

Um sich einen Überblick zu verschaffen, wie die einzelnen Seiten des Clients aussehen und
welche Funktionen angeboten werden sollen um dem Nutzer einen möglichst einfachen und
intuitiven Umgang mit dem System zu gewährleisten, wurden grobe Zeichnungen mit Bleistift
angefertigt. Diese sind einfach zu korrigieren und mit Post-Its ist es möglich, ein Szenario
abzulaufen und Unklarheiten im Vorfeld zu beseitigen oder erst gar nicht zu erschaffen.

Mithilfe der Scribbles war es möglich die Grundstruktur festzulegen und sich darauf zu einigen,
welche wiederkehrenden UI-Elemente verwendet werden.

![Scribbles](/images/portfolio/copsi/scribbles.jpg)

Die Scribbles konnten daraufhin grob mithilfe Balsamiq als Mockups visualisiert werden.

![Mockups](/images/portfolio/copsi/mockups.jpg)

### Wireframes und Prototyp

Mit Adobe XD wurden die Wireframes angefertigt, welche anschließend durch
Interaktionsmöglichkeiten verbunden wurden um als Prototyp zu dienen. Von jedem Wireframe
gab es zwei Versionen: einen “leeren” und einen ausgefüllten Screen, d.h. wie der Screen
aussehen würde, wenn Professoren und Assistenten regelmäßig Neuigkeiten verfassen und
Dateien hochladen und wie Screens aussehen könnten, wenn Teilnehmer miteinander chatten.

### Usability Tests

Mithilfe formativer Usability Tests wurde herausgefunden wo Optimierungspotenzial am Design
der Wireframes herrscht, nach jedem Durchlauf wurden die Wireframes verändert. Hierbei
wurden fünf Probanden befragt, diese bekamen zu Beginn ein kurzes Briefing worum es bei der
Anwendung geht und die Bitte, ihre Gedanken möglichst laut zu jedem Punkt, der ihnen auffällt,
wiederzugeben. Jeder Proband durchlief zwei Tests, ein Prototyp war hierbei nicht mit
Nachrichten oder Dateien gefüllt, der nächste gab den Anschein, man hätte die Anwendung über
das Semester hinweg ausführlich gepflegt und auf den aktuellsten Stand gehalten. Dabei
bekamen sie zu jedem Screen des Prototyps erst die Möglichkeit all ihre Gedanken zu allen
Punkten, die ihnen auffielen, zu äußern, anschließend erhielten sie einfache Anweisungen, was
sie mit der Anwendung tun sollen. Hierbei wurden im zweiten Durchlauf die Szenarien aus
Kapitel 4.3 durchlaufen. Zuletzt hatten sie die Möglichkeit nochmal ihr Feedback abzugeben,
Kritikpunkte anzusprechen und Vorschläge zu bringen.

### Vorläufiges Design

Der Login-Screen zeigt im Hintergrund einen Farbverlauf von zwei CI-Farben der Hochschule,
blau für Informatik und grün für BWL - bisher war es noch nicht möglich alle Farben der
Studienbereiche in einen harmonischen Farbverlauf zu bringen. In der Mitte gibt es ein einfaches
Login Formular, jeder Nutzer meldet sich hierzu mit seiner Hochschul-E-Mail und dem
dazugehörigen Passwort an. Sollte derjenige das Passwort vergessen haben, gibt es eine
Verlinkung zur Hochschule Kaiserslautern und einen Artikel zu den Passwörtern und
Hochschul-Accounts.

Farben der Hochschule:

- #69B22F grün
- #006C55 dunkelgrün
- #237D87 teal
- #0CB0D7 blau

Das vorläufige Design der Anwendung ist in erster Linie in weiß mit dunkelgrauer Schrift
gehalten, die Schriftart ist Rubik. Es ist eine sans-serif Schriftart, welche durch leicht-abgerundete
Ecken keinen harten Kontrast wirft und einfach zu lesen ist.

Die Struktur sieht vor, möglichst alle wichtigen Informationen immer im Blick zu haben, das
bedeutet, dass die Informationen, in welchem Modul und in welchem Channel sich der Nutzer
gerade aufhält sowie die Teilnehmer des Moduls, immer angezeigt werden.

Das Design besteht aus vier Spalten, die erste Spalte von links zeigt alle vorhandenen Module
an, die nächste Spalte bezieht sich auf das ausgewählte Modul, welches in der Akzentfarbe Blau hervorgehoben wird. Die Akzentfarbe Blau entspricht hierbei dem CI-Blau der Fakultät Informatik und Mikrosystemtechnik der Hochschule Kaiserslautern.

In der zweiten Spalte gibt es eine Auflistung von sogenannten Channels, der aktive Channel wird
hierbei ebenfalls in der Akzentfarbe hervorgehoben. Die jeweiligen Channels werden zusätzlich
mit einem assoziierbaren Icon dargestellt, so hat beispielsweise der Channels “Neuigkeiten” eine
Papierseite als Icon, welches man mit einer Seite von einer Zeitung für Neuigkeiten verbinden
könnte und der Channels “Anonym” einen Geist:
