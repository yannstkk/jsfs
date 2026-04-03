import { useState, useEffect } from 'react';
import { getMyItems, deleteItem, updateItemPrice } from '../api/api';

export default function MyItems({ refresh, onDeleted }) {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrix, setNewPrix] = useState('');
  const [error, setError] = useState('');

  // Rechargement à chaque fois que refresh change
  // Comme dans le cours : useEffect avec async dedans
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getMyItems();
        setItems(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchItems();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(i => i._id !== id));
      onDeleted();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdatePrice = async (id) => {
    setError('');
    try {
      const val = parseFloat(newPrix);
      if (isNaN(val) || val < 0) throw new Error('Prix invalide');
      const updated = await updateItemPrice(id, val);
      setItems(items.map(i => i._id === id ? updated : i));
      setEditingId(null);
      setNewPrix('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h3>📦 Mes objets en vente ({items.length})</h3>
      {items.length === 0 ? (
        <p className="empty-msg">Vous n'avez aucun objet en vente.</p>
      ) : (
        <ul className="item-list">
          {items.map(item => (
            <li key={item._id} className="item-card">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.description} className="item-img" />
              )}
              <div className="item-info">
                <span className="item-desc">{item.description}</span>
                {editingId === item._id ? (
                  <div className="inline-form">
                    <input
                      type="number"
                      value={newPrix}
                      onChange={e => setNewPrix(e.target.value)}
                      min="0"
                      step="0.01"
                      autoFocus
                    />
                    {error && <p className="error-msg">{error}</p>}
                    <div className="btn-row">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleUpdatePrice(item._id)}
                      >
                        OK
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => { setEditingId(null); setError(''); }}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="item-price">{item.prix} €</span>
                )}
              </div>
              <div className="item-actions">
                {editingId !== item._id && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => { setEditingId(item._id); setNewPrix(item.prix); }}
                  >
                    ✏️ Prix
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  🗑️ Retirer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}