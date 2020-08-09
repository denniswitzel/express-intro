import express from 'express' // Importieren von express
import db from '../db.json' // Import der Datenbank
import { saveDb } from '../fsUtils' // Import der Funktion zum schreiben in die Datenbank
import { v4 as uuidv4 } from 'uuid' // Importieren von 'uuid' um eine zufllige ID zu vergeben

const router = express.Router() // Routing wird in eine Konstante gespeichert

router.get('/:studentId', (req, res) => {
  // GET-Request über den Pfad http://localhost:4000/energy/:studentId
  const { studentId } = req.params // Der Parameter ';studentId' wird der studentId aus der Datenbank zugeordnet

  const you = getStudentEnergyById(studentId) // Funnktion getStudentEnergyById wird mit dem Parameter studentId in einer Konstante gespeichert
  const students = getAverageEnergy() // Funktion getAverageEnergy wird inh einer Konstante gespeichert
  const timestamp = getEarliestTimestamp() // Funktion getEarliestTimestamp wird in einer Konstante gespeicherg

  res.json({
    // Als response auf den GET-Request, werden die Ergebnisse aus den Funktionen an den Browser/User gesendet
    you,
    students,
    timestamp,
  })
})

router.post('/', (req, res) => {
  // POST-Request über den Pfad http://localhost:4000/energy
  const date = new Date() // Aktuelles Datum wird in einer Konstante gespeichert
  const timestamp = date.toUTCString() // Das Datum wird in die UTC Zeitzone gewandelt
  const newEntry = { ...req.body, timestamp, id: uuidv4() } // Neue Konstante mit dem Inhalt des Request-Body, dem Datum als 'timestamp' und einer über uuid generierten ID
  db.energy.push(newEntry) // Der neue Eintrag wird in der Datenbank in das 'energy' Array geschrieben (noch nicht im Dateisystem)
  saveDb((error) => res.json(error ?? newEntry)) // Aufruf der Funktion zum speichern des neuen Eintrags in die 'db.json'
})

export default router // Export von Router. Wird dann in der server.js mit dem Namen energyRoute importiert

function getEarliestTimestamp() {
  // Funktion um den frühsten Timestamp in der Datenbank zu ermitteln
  const energyByTimestamp = db.energy
    .slice() // Eine Kopie von 'db.energy' wird erzeugt
    .sort((a, b) => a.timestamp - b.timestamp) // Die Timestamps werden miteinander verglichen und anschließend sortiert.
  const firstEnergy = energyByTimestamp[0] // Aus dem neu sortierten Array, wird der erste Eintrag in einer Konstante gespeichert
  return firstEnergy.timestamp // Dieser Eintrag wird returned
}

function getAverageEnergy() {
  // Funktion um den Durchschnitts-Energy-Level zu berechnen
  const sumOfEnergy = db.energy.reduce((acc, cur) => acc + cur.energy, 0) // Durch die .reduce Methode wird das Array auf einen einzigen Wert reduziert
  const averageEnergy = sumOfEnergy / db.energy.length // Der durch .reduce errechnete Wert wird durch die Anzahl der Einträge in db.energy dividiert
  return Math.round(averageEnergy) // Dieser Wert wird hier gerundet
}

function getStudentEnergyById(studentId) {
  // Funktion zum auslesen der Student ID
  const hasSameId = (entry) => entry.student === studentId // Prüft ob der Eintrag in der Datenbank unter energy => student mit der studentID übereinstimmt
  const student = db.energy.find(hasSameId) // Gibt den Value des ersten Elements aus, welches mit defr ID übereinstimmt
  return student.energy // Von diesem Element wird der Energy-Wert returned
}
