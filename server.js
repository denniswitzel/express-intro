import express from 'express' // Import von express
import energyRoute from './routes/energy' // Import der Route /energy
import studentsRoute from './routes/students'
import journalRoute from './routes/journal'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/student-companion-app', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB ready'))
.catch((error) => console.log(error))


const server = express() // Die Express-Funktion wird in eine Konstante gespeichert
server.use(express.json()) // Middleware um den Body aus dem Request auszulesen

server.use(express.static('public')) //Das Verzeichnis zu den statischen Dateien wird an die Middleware-Funktion gegeben
server.use('/api/students', studentsRoute) // Aufruf der Route 'students' aus dem Ordner 'api'
server.use('/api/energy', energyRoute) // Aufruf der Route 'energy' aus dem Ordner 'api'
server.use('/api/journal', journalRoute)

const port = process.env.PORT ?? 4000 // Mit 'process.env.PORT' wird dem Browser der Port übergeben, auf dem er zuhören(listen) soll.
server.listen(port, () =>
  // Erstellt den Server mit dem angegebenen Port
  console.log(`Server started on http://localhost:${port}`)
)
