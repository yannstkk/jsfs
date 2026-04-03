import { useState } from 'react';
import { login } from '../api/api';

export default function LoginPage({ onSuccess, onGoRegister }) {
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form.login, form.password);
      // data contient userId, nom, somme (défini dans access.controller.js)
      onSuccess({ _id: data.userId, nom: data.nom, somme: data.somme });
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
        <p className="auth-subtitle">Connectez-vous pour continuer</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Login</label>
            <input
              type="text"
              value={form.login}
              onChange={e => setForm({ ...form, login: e.target.value })}
              required
              autoFocus
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
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="auth-switch">
          Pas encore de compte ?{' '}
          <button className="btn-link" onClick={onGoRegister}>
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}