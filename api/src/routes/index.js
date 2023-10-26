const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const temperamentsRouter = require('./temperamentsRouter')
const dogsRouter = require ('./dogsRouter')
const temperamentsRouter = require ('./temperamentsRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/temperaments",temperamentsRouter)
router.use("/dogs",dogsRouter)
router.use("/temperament",temperamentsRouter)



module.exports = router;
