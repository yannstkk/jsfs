import { useState } from 'react';
import { createItem } from '../api/api';

export default function SellForm({ onCreated }) {
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createItem(description, parseFloat(prix));
      setDescription('');
      setPrix('');
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%' }}>
      <input
        className="input-desc"
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description de l'objet…"
        required
      />
      <input
        className="input-prix"
        type="number"
        value={prix}
        onChange={e => setPrix(e.target.value)}
        placeholder="Prix €"
        min="0"
        step="0.01"
        required
        style={{ width: '80px' }}
      />
      {error && <span className="error-msg">{error}</span>}
      <button className="btn-publish btn btn-primary btn-sm" disabled={loading}>
        {loading ? '…' : 'Publier'}
      </button>
    </form>
  );
}