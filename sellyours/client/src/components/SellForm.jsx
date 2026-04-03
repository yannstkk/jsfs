import { useState } from 'react';
import { createItem } from '../api/api';

export default function SellForm({ onCreated }) {
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    const response = await fetch('/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, prix: parseFloat(prix) })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur création objet');
    }
    setDescription('');
    setPrix('');
    setImage(null);
    setPreview(null);
    onCreated();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="card">
      <h3>➕ Mettre en vente</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Nom de l'objet"
            required
          />
        </div>
        <div className="form-group">
          <label>Prix (€)</label>
          <input
            type="number"
            value={prix}
            onChange={e => setPrix(e.target.value)}
            min="0"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>
        <div className="form-group">
          <label>Image (optionnel)</label>
          <input type="file" accept="image/*" onChange={handleImage} />
          {preview && (
            <img src={preview} alt="aperçu" className="img-preview" />
          )}
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button className="btn btn-primary full-width" disabled={loading}>
          {loading ? 'Publication...' : 'Mettre en vente'}
        </button>
      </form>
    </div>
  );
}