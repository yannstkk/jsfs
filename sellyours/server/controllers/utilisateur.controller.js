const Utilisateur = require('../models/utilisateur.model').model;

const me = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.userId).select('-password -login');
    if (!user) return res.status(404).json({ message: 'utilisateur introuvable' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'utilisateur introuvable' });
    user.somme = req.body.somme;
    await user.save();
    res.status(200).json({ _id: user._id, nom: user.nom, somme: user.somme });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { me, update };