import fs from 'fs' // File system wird importiert. Hiermit kann mit dem Datensystem des Computers interagiert werden.
import db from './db.json' // Import der Datenbank

export function saveDb(callback) {
  fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', callback)
}

/* Funktion zum schreiben der Daten in die db.json.
Über 'fs.writeFile' können Daten in eine Datei geschrienben werden.'
'db.json' gibt den Ort an. Mit 'JSON.stringify' werden die Daten in Strings gewandelt.
'utf8' beschreibt die Zeichenkodierung der Daten.
Es kann noch ein callback gesetzt werden, welcher in diesem Beispielen, unter Routes, auf einen Error gesetzt wird.
*/
