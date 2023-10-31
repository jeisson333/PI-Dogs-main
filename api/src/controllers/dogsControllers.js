require('dotenv').config();
const { API_KEY } = process.env;
const { Dogs, Temperament } = require('../db')
const axios = require("axios");

const createDog = async (name,height,weight,life_span,temperament,image) =>{
    
    const newDog = await Dogs.create({name,height,weight,life_span,temperament,image})

    for (const t of temperament) {
        
        const temperamentDB = await Temperament.findOne({ where: { name: t } });
        if (temperamentDB) {
            await newDog.addTemperament(temperamentDB);
        } else {
            await Dogs.destroy({ where: { name,height,weight,life_span } })
            throw new Error(`${t} Temperament was not found in the database.`);

        }
    }


    return newDog;
}

const getdogsApi = async () => {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const dataClear = data.map(dC => {
        if (dC.temperament) {
            let newTemperament = dC.temperament.split(",").map(sp => sp.trim());
            
            return {
                id: dC.id,
                name: dC.name,
                height: dC.height,
                weight: dC.weight,
                life_span: dC.life_span,
                temperaments: newTemperament.join(", "),
                image: dC.image.url
            }
        } else {
            return {
                id: dC.id,
                name: dC.name,
                height: dC.height,
                weight: dC.weight,
                life_span: dC.life_span,
                temperament: [],
                image: dC.image.url
            }
        }
    })
    return dataClear;
}
const getdogsDb = async ()=>{
    const dataDB = await Dogs.findAll({include: {
        model: Temperament,
        attributes: ["name"],
        through: {
            attributes: []
        }
    }})
    const dataClear = dataDB.map((dC) =>{
        const tem = dC.Temperaments.map(t => t.name);
        return {
            id: dC.id,
            name: dC.name,
            height: dC.height,
            weight: dC.weight,
            life_span: dC.life_span,
            temperaments: tem.join(", "),
            image: dC.image
        }
    })
    return dataClear;

}


const getdogs = async (name) => {
    const dogsDb = await getdogsDb();
    const dogsApi = await getdogsApi();
    const allDogs = [...dogsDb,...dogsApi]
    if(name){
        const dogsFilter = allDogs.filter(fd => fd.name.toLowerCase().includes(name.toLowerCase()));
        if(!dogsFilter.length) throw Error("no breed found");
        return dogsFilter.splice(0,8);
    }
    return allDogs;

}
const getDogId = async (id) =>{
    if( id > 0){
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`) 
        let newTemperament = data.temperament.split(",").map(sp => sp.trim());
        return {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            life_span: data.life_span,
            temperament: newTemperament.join(", "),
            image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`
        }
    }

    const dogId = await Dogs.findOne({
        where: {id},
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: []
            }
        }
    });
    if (!dogId)throw new Error(`There is no breed with the id: "${id}.`);
    
    const temperamentDb = dogId.Temperaments.map(t => t.name);
    return {
        id: dogId.id,
        name: dogId.name,
        height: dogId.height,
        weight: dogId.weight,
        life_span: dogId.life_span,
        temperament: temperamentDb.join(", "),
        image: dogId.image
    }
}

module.exports = {
    getdogs,
    createDog,
    getdogsDb,
    getdogsApi,
    getDogId

}