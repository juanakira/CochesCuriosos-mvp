module.exports = mongoose => {
    const Coche = mongoose.model(
      "coche",
      mongoose.Schema(
        {
          Make: String,
          Model: String,
          "Notes EN": String,
            Link1: String
        }
      )
    );
  
    return Coche;
  };