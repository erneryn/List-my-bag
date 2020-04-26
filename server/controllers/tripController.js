const Trip = require('../monggose/model/trip')

class tripController {

    static async getTrip(req,res,next){
        try {
            const allTrip =await Trip.find().populate('items')
            res.status(201).json(allTrip)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async findOneTrip(req,res,next){
        try {
            const { id }= req.params
            const trip = await Trip.findById(id).populated('item')
            if(trip){
                res.status(201).json(trip)
            }
                res(404).json({
                    message : "not found"
                })

        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    static async postTrip(req,res,next){
        try {
            const newTrip = new Trip ({
                tripName : req.body.tripName,
                dueDate : req.body.dueDate,
                items : req.body.items
            })
            const trip =  await Trip.create(newTrip)
            res.status(200).json(trip)
        } catch (error) {
            console.log(error.name)
            if(error.name == 'ValidationError'){
                res.status(400).json({message : error.errors})
            }
                res.status(500).json({message : 'internal server error'})
        }
    }

    static async updateTrip(req,res,next){
        const willUpdate = {
            tripName: req.body.tripName,
            dueDate: req.body.dueDate
        }
        await Trip.findOneAndUpdate({_id: req.params.id},willUpdate,{new:true, runValidators: true},(err,doc)=>{
            if(err) res.send(err)
            res.status(201).json(doc)
        })

    }

    static async deleteTrip(req,res,next){
        try {
            const willDeleted  = await Trip.findById({_id: req.params.id})
            await Trip.deleteOne({_id: willDeleted._id})

            res.status(200).json(willDeleted)
            
        } catch (error) {
            res.send(error)
        }
    }


}

module.exports = tripController