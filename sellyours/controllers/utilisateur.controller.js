const Utilisatur = require('../models/utilisteur.model').model;




const me = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.userId).select('-password -login');
    if (!user) return res.status(404).json({ message: 'utilisateur introuvable' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { me   };