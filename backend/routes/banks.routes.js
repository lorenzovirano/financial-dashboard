const banksController = require('../controllers/banks.controller');

const express = require("express");
const router = express.Router();

router.post("/import", banksController.import);
router.get("/get-bank", banksController.getBank);

module.exports = router;