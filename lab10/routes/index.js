const routes = require('./users');


const constructorMethod = (app) => {

  app.use('/', routes);

  
  app.use('*', (req, res) => {
    res.status(404).render("users/err", { "title": "error", error: "No Page Found" });
    return;
  });

};


module.exports = constructorMethod;