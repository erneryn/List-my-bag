const Trip = require('../monggose/model/trip')
const Item = require('../monggose/model/item')

class itemController{

    static async getItem(req,res,next){
        try {
            const allItem = await Item.find()
            res.status(200).json(allItem)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getOneItem(req,res,next){
        try {
            const findOne = await Item.findOne({_id: req.params.id})
            res.status(201).json(findOne)
        } catch (error) {
            res.send(error)
        }
    }

    static async postItem (req,res,next){
        try {
            const tripID = req.params.id
            const { itemName , category } = req.body
            const newItem = await Item.create({
                itemName,
                category
            })
            await Trip.findByIdAndUpdate(tripID,{
                $push: {
                   items: newItem._id
                }
            })
            res.status(201).json(newItem)
        } catch (error) {
            res.status(500).json(error)

        }
    }

    static async updateItem(req,res,next){
        try {
            const itemId = req.params.id
            const { itemName, category, status } =req.body
            const updateItem = await Item.findOneAndUpdate({_id: itemId},{itemName,category,status},{new: true})
            res.status(201).json(updateItem)
        } catch (error) {
            res.status(500).json({message : 'internal server error'})
        }
    }

    static async deleteItem(req,res,next){
        try {
            const itemId = req.params.id
            const willDeleted = await Item.findOneAndDelete({_id: itemId})
            res.status(201).json(willDeleted)
        } catch (error) {
            res.status(500).json({message : 'internal server error'})
        }
    }

}

module.exports = itemController