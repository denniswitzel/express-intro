import express from 'express'
import Journal from '../models/Journal'

const router = express.Router() 

router.get('/', (req, res) => {
  Journal.find()
  .then(entries => res.json(entries))
  .catch ((error) => res.json(error))
})

router.get('/:id', (req, res) => {
  const { id } = req.params 
  Journal.findById(id)
  .then(value => res.json(value))
  .catch ((error) => res.json(error))
})

router.post('/', (req, res) => {
  Journal.create({...req.body, timestamp: new Date()})
  .then(entry => res.json(entry))
  .catch((error) => res.json(error))
})

router.patch('/:id', (req, res) => {
  const { id } = req.params 
  Journal.findOneAndUpdate({ _id: id }, {...req.body, timestamp: new Date()}, { new: true })
  .then(entry => res.json(entry))
  .catch((error) => res.json(error))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params 
  Journal.findByIdAndDelete(id)
  .then(entry => res.json(`${id} wurde gelöscht`))
  .catch((error) => res.json(error))
})

export default router
