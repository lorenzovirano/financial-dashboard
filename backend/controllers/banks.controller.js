const bankService = require('../services/banks.service');

exports.import = (req, res, next) => {
    bankService.insertBanks(req, (error, result) => {
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    }); 
}