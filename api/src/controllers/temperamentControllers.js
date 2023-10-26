require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament } = require('../db')
const axios = require("axios");

const getAlltemperament = async () => {
    const temperamentDb = await Temperament.findAll();
    if (!temperamentDb.length) {
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dataClear = data.map(dC => {
            if (dC.temperament) {
                let newTemperament = dC.temperament.split(",").map(sp => sp.trim());
                return {
                    temperament: newTemperament,
                }
            } else {
                return {
                    temperament: [],
                }
            }
        })
        let arrayClear = []
        dataClear.forEach((nA) => {
            arrayClear = [...arrayClear, ...nA.temperament]

        })
        const miSet = new Set(arrayClear)
        const temperamentClear = [...miSet];
        temperamentClear.forEach(async (t) =>{
            
            await Temperament.findOrCreate({
                where: {name: t}
            })
        })
        return temperamentClear
    }
    return temperamentDb;
}

module.exports = {
    getAlltemperament,

}