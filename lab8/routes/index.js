const routes = require('./marvel');


const constructorMethod = (app) => {

  app.use('/', routes);
  app.use('*', (req, res) => {
    res.status(404).render("marvel/error", { "title": "error", error: "No Page Found" });
    return;
  });

};


module.exports = constructorMethod;