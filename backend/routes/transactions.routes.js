const transactionsController = require("../controllers/transactions.controller");

const express = require("express");
const router = express.Router();
const multer = require("multer");
let storage = multer.memoryStorage();
router.post("/import", multer({ storage: storage }).single("csv"), transactionsController.import);
//router.get("/export", transactionsController.export);


module.exports = router;