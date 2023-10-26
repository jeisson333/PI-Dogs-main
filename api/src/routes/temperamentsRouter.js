const {Router} = require("express")
const {gettemperamentHandler} = require("../handlers/temperamentHandler")
const router = Router();

router.get("/", gettemperamentHandler);

module.exports = router;