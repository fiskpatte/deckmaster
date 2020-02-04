const service = require('../services/voyageService');
const baseController = require('./baseController');

const voyageService = new service();

class voyageController extends baseController {
    constructor() {
        super(voyageService);
    }

    populateRoutes = () => {
        //Overriding/Non-base routes have to be defined first.
        //Example: this method will be reached from /api/voyage/vessel/:id
        this.router.get('/vessel/:id', async (req, res, next) => {
            try {
                const elems = await this.service.getAllByVessel(req.params.id);
                if (elems && elems.length > 0) {
                    return res.json(elems);
                }
                throw new BadRequestError(this.source, `getAllByVessel`, `No elements found.`);
            } catch (err) {
                next(err);
            }
        });
        //Get all base routes.
        super.populateRoutes();
    }
}

const controller = new voyageController();
controller.populateRoutes();

module.exports = controller.router;