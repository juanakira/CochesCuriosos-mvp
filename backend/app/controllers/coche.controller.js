const db = require("../models");
const Coche = db.coches;

// Create and Save a new Coche
exports.create = (req, res) => {
   // Validate request
   console.log(req)
   console.log(req.body)
  // Create a Coche
  const coche = new Coche({
    Make: req.body.Make,
    Model: req.body.Model,
    Notes: req.body.Notes,
    Link1: req.body.Link1
  });

  // Save Coche in the database
  coche
    .save(coche)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the car."
      });
    });
};

// Retrieve all Coches from a given the database.
exports.findAll = (req, res) => {
    const make = req.query.make;
    var condition = make ? { make: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Coche.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Coche with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Coche.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };
  

// Update a Coche by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Coche.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Coche with id=${id}. Maybe Coche was not found!`
          });
        } else res.send({ message: "Coche was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Coche with id=" + id
        });
      });
  };

// Delete a Coche with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Coche.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete item with id=${id}. Maybe item was not found!`
          });
        } else {
          res.send({
            message: "item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete item with id=" + id
        });
      });
  };

// Delete all Coches from the database.
exports.deleteAll = (req, res) => {
    Coche.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Items were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all items."
        });
      });
  };

