const service = require('../services/accountService');
const baseController = require('./baseController');

const accountService = new service();

class accountController extends baseController {
    constructor() {
        super(accountService);
    }

    populateRoutes = () => {
        //Overriding routes have to be defined first.

        //Get all base routes.
        super.populateRoutes();
    }
}

const controller = new accountController();
controller.populateRoutes();

module.exports = controller.router;