import { useState } from 'react';
import { updateMe } from '../api/api';

export default function UserInfo({ user, onUserUpdate }) {
  const [editing, setEditing] = useState(false);
  const [newSomme, setNewSomme] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const val = parseFloat(newSomme);
      if (isNaN(val) || val < 0) throw new Error('Montant invalide');
      const updated = await updateMe(val);
      onUserUpdate(updated);
      setEditing(false);
      setNewSomme('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="card user-info">
      <h3>Mon compte</h3>
      <p className="user-name">{user.nom}</p>
      <p className="user-balance">
         <strong>{Number(user.somme).toFixed(2)} €</strong>
      </p>
      {!editing ? (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => { setNewSomme(user.somme); setEditing(true); }}
        >
          Modifier ma somme
        </button>
      ) : (
        <form onSubmit={handleUpdate} className="inline-form">
          <input
            type="number"
            value={newSomme}
            onChange={e => setNewSomme(e.target.value)}
            min="0"
            step="0.01"
            autoFocus
          />
          {error && <p className="error-msg">{error}</p>}
          <div className="btn-row">
            <button className="btn btn-primary btn-sm" type="submit" disabled={loading}>
              {loading ? '...' : 'OK'}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => { setEditing(false); setError(''); }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}