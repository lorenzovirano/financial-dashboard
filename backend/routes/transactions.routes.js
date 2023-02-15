const transactionsController = require("../controllers/transactions.controller");

const express = require("express");
const router = express.Router();
const multer = require("multer");
let storage = multer.memoryStorage();
router.post("/import", multer({ storage: storage }).single("csv"), transactionsController.import);
//router.get("/export", transactionsController.export);
router.get("/types", transactionsController.getTypes);
router.get("/categories", transactionsController.getCategories)
router.post("/create", transactionsController.createTransaction)
router.get("/show",transactionsController.showTransactions)
router.get("/show-positive",transactionsController.showTransactions)
router.get("/show-negative",transactionsController.showTransactions)
module.exports = router;