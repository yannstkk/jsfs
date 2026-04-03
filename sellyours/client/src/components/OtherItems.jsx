import { useState, useEffect } from 'react';
import { getOtherItems, buyItem } from '../api/api';

export default function OtherItems({ user, refresh, onBought }) {
  const [items, setItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getOtherItems();
        setItems(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchItems();
  }, [refresh]);

  const handleBuy = async (item) => {
    setError('');
    setLoadingId(item._id);
    try {
      await buyItem(item._id);
      // Suppression immédiate de l'objet acheté de la liste
      setItems(items.filter(i => i._id !== item._id));
      onBought(item);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="card">
      <h3>🏪 Objets en vente ({items.length})</h3>
      {error && <p className="error-msg">{error}</p>}
      {items.length === 0 ? (
        <p className="empty-msg">Aucun objet en vente pour le moment.</p>
      ) : (
        <ul className="item-list">
          {items.map(item => {
            const canAfford = user && user.somme >= item.prix;
            return (
              <li key={item._id} className="item-card">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.description} className="item-img" />
                )}
                <div className="item-info">
                  <span className="item-desc">{item.description}</span>
                  <span className="item-price">{item.prix} €</span>
                </div>
                <button
                  className={`btn btn-sm ${canAfford ? 'btn-success' : 'btn-disabled'}`}
                  onClick={() => handleBuy(item)}
                  disabled={!canAfford || loadingId === item._id}
                  title={!canAfford ? 'Fonds insuffisants' : 'Acheter cet objet'}
                >
                  {loadingId === item._id ? '...' : '🛒 Acheter'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}