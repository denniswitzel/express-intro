import express from 'express'
import Energy from '../models/Energy'

const router = express.Router() 

router.get('/', (req, res) => {
  Energy.find()
  .then(values => res.json(values))
  .catch ((error) => res.json(error))
})

router.get('/:id', (req, res) => {
  const { id } = req.params 
  Energy.findById(id)
  .then(value => res.json(value))
  .catch ((error) => res.json(error))
})

router.post('/', (req, res) => {
  Energy.create({...req.body, timestamp: new Date()})
  .then(value => res.json(value))
  .catch((error) => res.json(error))
})

router.patch('/:id', (req, res) => {
  const { id } = req.params 
  Energy.findOneAndUpdate({ _id: id }, { value: req.body.value }, { new: true })
  .then(value => res.json(value))
  .catch((error) => res.json(error))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params 
  Energy.findByIdAndDelete(id)
  .then(value => res.json(`${id} wurde gelöscht`))
  .catch((error) => res.json(error))
})

export default router

/*router.get('/:studentId', (req, res) => {
  const { studentId } = req.params 

  const you = getStudentEnergyById(studentId)
  const students = getAverageEnergy() 
  const timestamp = getEarliestTimestamp() 

  res.json({
    you,
    students,
    timestamp,
  })
})

router.post('/', (req, res) => {
  const date = new Date() 
  const timestamp = date.toUTCString()
  const newEntry = { ...req.body, timestamp, id: uuidv4() }
  db.energy.push(newEntry)
  saveDb((error) => res.json(error ?? newEntry))
})

export default router

function getEarliestTimestamp() {
  const energyByTimestamp = db.energy
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
  const firstEnergy = energyByTimestamp[0]
  return firstEnergy.timestamp 
}

function getAverageEnergy() {
  const sumOfEnergy = db.energy.reduce((acc, cur) => acc + cur.energy, 0)
  const averageEnergy = sumOfEnergy / db.energy.length 
  return Math.round(averageEnergy)
}

function getStudentEnergyById(studentId) {
  const hasSameId = (entry) => entry.student === studentId 
  const student = db.energy.find(hasSameId)
  return student.energy
}*/
