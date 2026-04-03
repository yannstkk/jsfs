const Objet = require('../models/objet.model').model;
const Utilisateur = require('../models/utilisateur.model').model;


const listMine = async (req, res) => {
  try {
    const myObjets = await Objet.find({ id_utilisateur: req.userId });
    res.status(200).json(myObjets);
  } catch (err) {
    res.status(500).json(err);
  }
};


const listOthers = async (req, res) => {
  try {
    const othersObjets = await Objet.find({ id_utilisateur: { $ne: req.userId } });
    res.status(200).json(othersObjets);
  } catch (err) {
    res.status(500).json(err);
  }
};


const create = async (req, res) => {
  try {
    const newObjetData = { ...req.body, id_utilisateur: req.userId };
    const createdObjet = await Objet.create(newObjetData);
    res.status(201).json(createdObjet);
  } catch (err) {
    res.status(400).json(err);
  }
};


const remove = async (req, res) => {
  try {
    const deleted = await Objet.findByIdAndDelete(req.params.itemId);
    if (!deleted) {
      return res.status(404).json({ message: 'objet introuvable' });
    }
    res.status(200).json({ message: 'objet supprimé', objet: deleted });
  } catch (err) {
    res.status(500).json(err);
  }
};


const buy = async (req, res) => {
  try {
    const objet = await Objet.findById(req.params.itemId);
    if (!objet) return res.status(404).json({ message: 'objet introuvable' });

    const buyer = await Utilisateur.findById(req.userId);
    if (!buyer) return res.status(404).json({ message: 'acheteur introuvable' });

    if (buyer.somme < objet.prix) {
      return res.status(400).json({ message: 'fonds insuffisants' });
    }

    const seller = await Utilisateur.findById(objet.id_utilisateur);

    buyer.somme -= objet.prix;
    await buyer.save();

    if (seller) {
      seller.somme += objet.prix;
      await seller.save();
    }

    await Objet.findByIdAndDelete(objet._id);

    res.status(200).json({ message: 'achat effectué', objet });
  } catch (err) {
    res.status(500).json(err);
  }
};




const updatePrice = async (req, res) => {
  try {
    // Vérifier que l'objet appartient bien à l'utilisateur courant
    const objet = await Objet.findOne({ _id: req.params.itemId, id_utilisateur: req.userId });
    if (!objet) return res.status(404).json({ message: 'objet introuvable ou non autorisé' });

    objet.prix = req.body.prix;
    await objet.save();

    res.status(200).json(objet);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { listMine, listOthers, create, remove, buy, updatePrice };

