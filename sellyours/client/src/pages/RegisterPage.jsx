import { useState } from 'react';
import { register } from '../api/api';

export default function RegisterPage({ onSuccess, onGoLogin }) {
  const [form, setForm] = useState({ nom: '', login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.nom, form.login, form.password);
      // Inscription réussie → redirection vers login
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🛒 Sell Yours</h2>
        <p className="auth-subtitle">Créez votre compte</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'affichage</label>
            <input
              type="text"
              value={form.nom}
              onChange={e => setForm({ ...form, nom: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Login</label>
            <input
              type="text"
              value={form.login}
              onChange={e => setForm({ ...form, login: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-primary full-width" disabled={loading}>
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>
        <p className="auth-switch">
          Déjà un compte ?{' '}
          <button className="btn-link" onClick={onGoLogin}>
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}