import express from 'express'
import Student from '../models/Student'

const router = express.Router() 

router.get('/', (req, res) => {
  Student.find()
  .then(students => res.json(students))
  .catch ((error) => res.json(error))
})

router.get('/:id', (req, res) => {
  const { id } = req.params 
  Student.findById(id)
  .then(student => res.json(student))
  .catch ((error) => res.json(error))
})

router.post('/', (req, res) => {
  Student.create(req.body)
  .then(student => res.json(student))
  .catch((error) => res.json(error))
})

router.patch('/:id', (req, res) => {
  const { id } = req.params 
  Student.findOneAndUpdate({ _id: id }, { name: req.body.name }, { new: true })
  .then(student => res.json(student))
  .catch((error) => res.json(error))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params 
  Student.findByIdAndDelete(id)
  .then(student => res.json(`${id} wurde gelöscht`))
  .catch((error) => res.json(error))
})



export default router // Export von Router. Wird dann in der server.js mit dem Namen energyRoute importiert
