const Utilisatur = require('../models/utilisteur.model').model;



const utilisatur = async (req, res) => {
  try {
    const allUtilisateur = await this.Utilisatur.find();
    res.status(200).json(allUtilisateur);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { utilisatur };