const Item = require('../models/item.model').model;
const Utilisateur = require('../models/utilisateur.model').model;

const listMine = async (req, res) => {
  try {
    const myItems = await Item.find({ id_utilisateur: req.userId });
    res.status(200).json(myItems);
  } catch (err) {
    res.status(500).json(err);
  }
};

const listOthers = async (req, res) => {
  try {
    const othersItems = await Item.find({ id_utilisateur: { $ne: req.userId } });
    res.status(200).json(othersItems);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  try {
    const newItemData = { ...req.body, id_utilisateur: req.userId };
    const createdItem = await Item.create(newItemData);
    res.status(201).json(createdItem);
  } catch (err) {
    res.status(400).json(err);
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.itemId);
    if (!deleted) {
      return res.status(404).json({ message: 'item introuvable' });
    }
    res.status(200).json({ message: 'item supprimé', item: deleted });
  } catch (err) {
    res.status(500).json(err);
  }
};

const buy = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'item introuvable' });

    const buyer = await Utilisateur.findById(req.userId);
    if (!buyer) return res.status(404).json({ message: 'acheteur introuvable' });

    if (buyer.somme < item.prix) {
      return res.status(400).json({ message: 'fonds insuffisants' });
    }

    const seller = await Utilisateur.findById(item.id_utilisateur);

    buyer.somme -= item.prix;
    await buyer.save();

    if (seller) {
      seller.somme += item.prix;
      await seller.save();
    }

    await Item.findByIdAndDelete(item._id);
    res.status(200).json({ message: 'achat effectué', item });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePrice = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemId, id_utilisateur: req.userId });
    if (!item) return res.status(404).json({ message: 'item introuvable ou non autorisé' });
    item.prix = req.body.prix;
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { listMine, listOthers, create, remove, buy, updatePrice };