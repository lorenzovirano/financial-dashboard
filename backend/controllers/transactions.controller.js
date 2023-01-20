const transactionService = require("../services/transactions.services");

exports.import = (req, res, next) => {
    transactionService.importCSV(req, (error, result) => {
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    }); 
}