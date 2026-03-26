const Objet = require('../models/objet.model').model;


const list = async (req, res) => {
  try {
    const allObjet = await Objet.find();
    res.status(200).json(allObjet);
  } catch (err) {
    res.status(500).json(err);
  }
};


const create = async (req, res) => {
  try {
    const newallObjetData = { ...req.body };
    const createdallObjet = await Task.create(newallObjetData);
    res.status(201).json(createdallObjet);
  } catch (err) {
    res.status(400).json(err);
  }
};


const remove = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.ItemId);
    if (!deleted) {
      return res.status(404).json({ message: 'objet introuvable' });
    }
    res.status(200).json({ message: 'objet supprimee', task: deleted });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { list, create, remove };