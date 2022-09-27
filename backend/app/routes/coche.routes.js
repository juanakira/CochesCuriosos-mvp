module.exports = app => {
    const coches = require("../controllers/coche.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", coches.create);
  
    // Retrieve all Tutorials
    router.get("/", coches.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", coches.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", coches.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", coches.delete);
  
    // Create a new Tutorial
    router.delete("/", coches.deleteAll);
  
    app.use('/api/coches', router);
  };