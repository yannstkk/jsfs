// Dernier article acheté — affiché uniquement en mémoire (pas en base)
// Réinitialisé à chaque rechargement de page comme demandé dans le sujet

export default function LastPurchase({ objet }) {
  if (!objet) return null;
  return (
    <div className="card last-purchase">
      <h3>🎉 Dernier achat</h3>
      {objet.imageUrl && (
        <img src={objet.imageUrl} alt={objet.description} className="item-img" />
      )}
      <p className="item-desc">{objet.description}</p>
      <p className="item-price">Payé : <strong>{objet.prix} €</strong></p>
    </div>
  );
}