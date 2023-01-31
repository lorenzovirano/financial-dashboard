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

exports.getTypes = (req, res, next) => {
    transactionService.getTypes(req, (error, result) => {
        if(error){
            return next(error)
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    }); 
}

exports.getCategories = (req, res, next) => {
    transactionService.getCategories(req, (error, result) => {
        if(error){
            return next(error)
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}