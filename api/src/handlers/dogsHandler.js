const {getdogs,createDog,getdogsApi,getdogsDb,getDogId} = require('../controllers/dogsControllers')



const dogDbHandler = async (req,res) =>{
    try {
        const response = await getdogsDb();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const dogApiHandler = async (req,res) =>{
    try {
        const response = await getdogsApi();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createDogHandler = async (req,res) =>{
    try {
        const {name,height,weight,life_span,temperament,image} = req.body;
        const response = await createDog(name,height,weight,life_span,temperament,image);
        res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const dogHandler = async (req, res) => {
    try {
        const { name} = req.query;
        const response = await getdogs(name);
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}
const dogIdHandler = async (req,res) =>{
    try {
        const { id } = req.params;
        const response = await getDogId(id);
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    dogHandler,
    createDogHandler,
    dogDbHandler,
    dogApiHandler,
    dogIdHandler
}