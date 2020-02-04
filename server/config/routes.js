const voyageController = require('../controllers/voyageController');
const accountController = require('../controllers/accountController');
const vesselController = require('../controllers/vesselController');

const routes = async ({ app }) => {

    app.use('/api/voyage', voyageController);
    app.use('/api/vessel', vesselController);
    app.use('/api/account', accountController);

}

module.exports = routes;