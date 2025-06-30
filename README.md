# Frauenverein Homepage

Eine leichtgewichtige, benutzerfreundliche Homepage für einen Verein von älteren Frauen.

## Funktionen

- **Ausflüge-Galerie**: Zeigt Bilder und Beschreibungen von vergangenen Ausflügen
- **Kalender**: Übersicht über anstehende Termine wie Ausflüge, Geburtstage und Veranstaltungen
- **Einfache Verwaltung**: Neue Einträge können direkt über die Website hinzugefügt werden
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Smartphone
- **Seniorenfreundlich**: Große Schrift, klare Kontraste und einfache Navigation

## Installation

1. Alle Dateien in einen Webserver-Ordner kopieren
2. Die `index.html` im Browser öffnen
3. Für Bilder: Fotos in den `images/` Ordner legen

## Benutzung

### Neue Ausflüge hinzufügen
1. Auf "Neuen Ausflug hinzufügen" klicken
2. Titel, Datum und Beschreibung eingeben
3. Bild-Pfad eingeben (z.B. `images/mein-ausflug.jpg`)
4. Speichern

### Neue Termine hinzufügen
1. Auf "Neuen Termin hinzufügen" klicken
2. Titel, Datum und optional Uhrzeit eingeben
3. Art des Termins auswählen
4. Beschreibung hinzufügen
5. Speichern

### Bilder hinzufügen
1. Fotos in den `images/` Ordner kopieren
2. Beim Hinzufügen eines Ausflugs den Dateinamen als Bild-Pfad eingeben
   (z.B. `images/herbstspaziergang.jpg`)

## 🔒 Admin-Bereich

Die Website verfügt über einen geschützten Admin-Bereich für erweiterte Verwaltungsaufgaben.

### Admin-Zugang erhalten

1. **Admin-Button finden**: Scrollen Sie zum Footer der Website und klicken Sie auf den kleinen "Admin" Button
2. **Passwort eingeben**: Geben Sie das Admin-Passwort ein: `h4m-frauen-brücken`
3. **Anmeldung**: Nach erfolgreicher Anmeldung wechselt die Website in den Admin-Modus

### Admin-Modus erkennen

Im Admin-Modus sehen Sie:
- **Grüne Statusleiste** am oberen Bildschirmrand mit Timer
- **Sichtbare Admin-Buttons** (normalerweise versteckt)
- **Erweiterte Formulare** beim Hinzufügen neuer Inhalte
- **Lösch-Buttons** bei allen Einträgen

### Erweiterte Terminverwaltung im Admin-Modus

Beim Hinzufügen neuer Termine haben Sie Zugang zu detaillierten Feldern:

#### 📍 Ort & Anfahrt
- **Veranstaltungsort**: Name des Veranstaltungsortes
- **Adresse**: Vollständige Adresse mit PLZ und Ort
- **Treffpunkt**: Genauer Treffpunkt (z.B. "Haupteingang", "Bushaltestelle")
- **Abfahrtszeit**: Wann die Gruppe abfährt
- **Transport**: Art der Anreise (Bus, eigene Anreise, etc.)

#### 💰 Organisation
- **Kosten**: Teilnahmegebühr oder Kosten pro Person
- **Anmeldung**: Anmeldeinformationen und Fristen
- **Kontaktperson**: Verantwortliche Person mit Telefonnummer
- **Mitbringen**: Was die Teilnehmer mitbringen sollen

### Detailansicht für Besucher

Termine mit erweiterten Informationen sind für Besucher klickbar:
- **Erkennbar durch**: "📋 Klicken für Details" Hinweis
- **Beim Klick**: Detailliertes Modal mit allen Informationen
- **Nur für zukünftige Termine**: Vergangene Termine sind nicht klickbar

### Sicherheitsfeatures

#### Automatischer Logout
- **30-Minuten-Timer**: Admin-Sitzung läuft automatisch nach 30 Minuten ab
- **Countdown-Anzeige**: Verbleibende Zeit wird in der Statusleiste angezeigt
- **Warnung**: 5 Minuten vor Ablauf erscheint eine Warnung

#### Passwort-Schutz
- **Eingabe-Sicherheit**: Falsches Passwort löst Shake-Animation aus
- **Keine Speicherung**: Passwort wird nicht im Browser gespeichert
- **Session-basiert**: Muss bei jedem Besuch neu eingegeben werden

### Admin-Funktionen im Detail

#### Inhalte löschen
- **Bestätigungsdialog**: Sicherheitsabfrage vor dem Löschen
- **Sofortige Aktualisierung**: Gelöschte Inhalte verschwinden sofort
- **Keine Wiederherstellung**: Gelöschte Inhalte können nicht wiederhergestellt werden

#### Bilder-Upload Hilfe
- **Hilfe-Modal**: Klicken Sie auf "Bilder-Upload Hilfe" für detaillierte Anweisungen
- **GitHub Pages Anleitung**: Step-by-Step Anleitung für GitHub Pages
- **Bild-Pfade**: Korrekte Pfadangaben für Bilder

### Manueller Logout

So beenden Sie die Admin-Sitzung manuell:
1. Klicken Sie auf "Logout" in der grünen Statusleiste
2. Bestätigen Sie den Logout
3. Die Website wechselt zurück in den normalen Modus

### Datenmanagement

#### Datenspeicherung
- **Lokaler Speicher**: Alle Daten werden im Browser gespeichert
- **Automatische Speicherung**: Änderungen werden sofort gespeichert
- **Backup-Empfehlung**: Regelmäßige Backups der Daten empfohlen

#### Daten-Backup (Erweitert)
Für technisch versierte Benutzer:
1. Browser-Entwicklertools öffnen (F12)
2. Zu "Application" → "Local Storage" navigieren
3. Schlüssel "galleryItems" und "calendarEvents" kopieren
4. In einer Textdatei speichern

### Troubleshooting

#### Häufige Probleme

**Admin-Button nicht sichtbar**
- Scrollen Sie ganz nach unten zum Footer
- Der Button ist bewusst klein und unauffällig gehalten

**Passwort wird nicht akzeptiert**
- Achten Sie auf Groß-/Kleinschreibung
- Passwort: `h4m-frauen-brücken` (mit Bindestrichen)
- Keine Leerzeichen vor oder nach dem Passwort

**Timer läuft ab**
- Bewegung auf der Seite verlängert nicht den Timer
- Rechtzeitig vor Ablauf neue Aktionen durchführen
- Bei Bedarf neu anmelden

**Daten sind verschwunden**
- Browser-Cache wurde möglicherweise geleert
- Backup aus Sicherungsdatei wiederherstellen
- Beispieldaten werden automatisch geladen, wenn keine Daten vorhanden sind

### Sicherheitshinweise

1. **Passwort geheim halten**: Admin-Passwort nur mit vertrauenswürdigen Personen teilen
2. **Öffentliche Computer**: Immer ausloggen nach der Benutzung
3. **Regelmäßige Backups**: Wichtige Daten regelmäßig sichern
4. **Browserwarnung**: Bei Browserupdate/Neueinstallation Daten vorher sichern

## Technische Details

- Reine HTML/CSS/JavaScript (keine Server-Anforderungen)
- Daten werden im Browser-Speicher (localStorage) gespeichert
- Moderne, responsive Gestaltung
- Optimiert für ältere Benutzer

## Anpassungen

### Kontaktdaten ändern
In der `index.html` im Kontakt-Bereich die Platzhalter ersetzen:
- `[Name einfügen]` - Name der Vereinsleitung
- `[Telefonnummer einfügen]` - Telefonnummer
- `[E-Mail einfügen]` - E-Mail-Adresse

### Farben anpassen
In der `styles.css` können die Farben geändert werden:
- `#6b46c1` - Hauptfarbe (Lila)
- `#667eea` - Verlaufsfarbe 1
- `#764ba2` - Verlaufsfarbe 2

## Browser-Kompatibilität

Funktioniert mit allen modernen Browsern:
- Chrome, Firefox, Safari, Edge
- Internet Explorer 11+

## Support

Die Website speichert alle Daten lokal im Browser. Bei einem Browserwechsel oder -update gehen die Daten nicht verloren, solange der Browser-Cache nicht geleert wird.

Für Backups können die Daten exportiert werden (Entwickler-Tools → Application → Local Storage). 