const {getAlltemperament} = require('../controllers/temperamentControllers')



const gettemperamentHandler = async (req,res) =>{
    try {
        const response = await getAlltemperament();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    gettemperamentHandler,
}