import express from 'express' // Import von express
import db from '../db.json' // Import der Datenbank
import { saveDb } from '../fsUtils' // // Import der Funktion zum schreiben in die Datenbank
import { v4 as uuidv4 } from 'uuid' // Importieren von 'uuid' um eine zufllige ID zu vergeben

const router = express.Router() // Routing wird in eine Konstante gespeichert

router.get('/', (req, res) => {
  // GET-Request über den Pfad http://localhost:4000/students
  res.json(db.students) // Als response erhalten wir die Einträge unter students aus der db.json
})

router.post('/', (req, res) => {
  // POST-Request über den Pfad http://localhost:4000/students
  const student = { ...req.body, id: uuidv4() } // Neue Konstante mit dem Inhalt des Request-Body und einer über uuid generierten ID
  db.students.push(student) // Der neue Eintrag wird in der Datenbank in das 'students' Array geschrieben (noch nicht im Dateisystem)
  saveDb((error) => res.json(error ?? student)) // Aufruf der Funktion zum speichern des neuen Eintrags in die 'db.json'
})

export default router // Export von Router. Wird dann in der server.js mit dem Namen energyRoute importiert
