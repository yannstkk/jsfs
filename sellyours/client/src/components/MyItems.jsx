import { useState, useEffect } from 'react';
import { getMyItems, deleteItem, updateItemPrice } from '../api/api';

const abbrev = (str) => str ? str.slice(0, 3).toUpperCase() : '---';

export default function MyItems({ refresh, onDeleted }) {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrix, setNewPrix] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try { setItems(await getMyItems()); }
      catch (err) { console.error(err.message); }
    };
    fetch();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(i => i._id !== id));
      onDeleted();
    } catch (err) { console.error(err.message); }
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
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="zone-mine">
      <div className="zone-ttl">
        <span>Mes objets</span>
        <span>{items.length}</span>
      </div>

      {items.length === 0 && (
        <p className="empty-msg">Aucun objet en vente.</p>
      )}

      {items.map(item => (
        <div key={item._id} className="mine-item">

          {item.imageUrl
            ? <img src={item.imageUrl} alt={item.description} className="item-img" />
            : (
              <div className="thumb-sq">
                <span>{abbrev(item.description)}</span>
              </div>
            )
          }

          <div className="item-info">
            <span className="item-desc">{item.description}</span>
            {editingId === item._id ? (
              <div className="inline-form" style={{ marginTop: '0.25rem' }}>
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
                  <button className="btn btn-primary btn-sm" onClick={() => handleUpdatePrice(item._id)}>OK</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setEditingId(null); setError(''); }}>Annuler</button>
                </div>
              </div>
            ) : (
              <span className="item-price">{Number(item.prix).toFixed(2)} €</span>
            )}
          </div>

          {editingId !== item._id && (
            <div className="item-actions">
              <button
                className="btn-icon"
                onClick={() => { setEditingId(item._id); setNewPrix(item.prix); }}
                title="Modifier le prix"
              >
                <svg viewBox="0 0 12 12"><path d="M8 2l2 2-6 6H2V8l6-6z"/></svg>
              </button>
              <button
                className="btn-icon-del"
                onClick={() => handleDelete(item._id)}
                title="Retirer"
              >
                <svg viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8"/></svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}