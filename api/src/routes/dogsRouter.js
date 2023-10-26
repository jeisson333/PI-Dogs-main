const {Router} = require("express")
const {createDogHandler,dogHandler,dogDbHandler,dogApiHandler,dogIdHandler} = require("../handlers/dogsHandler")

const router = Router();

router.get('/', dogHandler)
.get('/db',dogDbHandler)
.get('/api',dogApiHandler)
.get('/:id',dogIdHandler)
.post("/", createDogHandler)



module.exports = router;