const service = require('../services/vesselService');
const baseController = require('./baseController');

const vesselService = new service();

class vesselController extends baseController {
    constructor() {
        super(vesselService);
    }

    populateRoutes = () => {
        //Overriding routes have to be defined first.

        //Get all base routes.
        super.populateRoutes();
    }
}

const controller = new vesselController();
controller.populateRoutes();

module.exports = controller.router;