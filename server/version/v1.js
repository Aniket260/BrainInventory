const userRoutes = require('../routes/user.routes');
const productRoute = require('../routes/product.route');

module.exports = function (app) {
  app.use('/v0.1/', [
    userRoutes,
    productRoute
  ]);
};
