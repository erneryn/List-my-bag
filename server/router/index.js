const express = require('express')
const router = express.Router()
const tripController = require('../controllers/tripController')
const itemController = require('../controllers/itemController')
router.get('/trip',tripController.getTrip)
router.post('/trip',tripController.postTrip)
router.put('/trip/:id',tripController.updateTrip)
router.delete('/trip/:id',tripController.deleteTrip)
router.get('/trip/:id',tripController.findOneTrip)


router.post('/item/:id',itemController.postItem)
router.get('/item',itemController.getItem)
router.get('/item/:id',itemController.getOneItem)
router.put('/item/:id',itemController.updateItem)
router.delete('/item/:id',itemController.deleteItem)





module.exports= router