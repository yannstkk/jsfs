import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserInfo from './components/UserInfo';
import MyItems from './components/MyItems';
import SellForm from './components/SellForm';
import OtherItems from './components/OtherItems';
import { getMe, logout } from './api/api';
import './index.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [lastPurchase, setLastPurchase] = useState(null);
  const [refreshMine, setRefreshMine] = useState(0);
  const [refreshOthers, setRefreshOthers] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();
        setUser(data);
        setPage('app');
      } catch {
        setPage('login');
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage('app');
  };

  const handleLogout = async () => {
    try { await logout(); } catch (err) { console.error(err.message); }
    finally {
      setUser(null);
      setLastPurchase(null);
      setPage('login');
    }
  };

  const handleBought = (objet) => {
    setLastPurchase(objet);
    setUser(u => ({ ...u, somme: u.somme - objet.prix }));
    setRefreshOthers(n => n + 1);
  };

  const handleItemCreated = () => setRefreshMine(n => n + 1);
  const handleItemDeleted = () => setRefreshMine(n => n + 1);
  const handleUserUpdate  = (u) => setUser(u);

  if (page === 'register') return (
    <RegisterPage onSuccess={() => setPage('login')} onGoLogin={() => setPage('login')} />
  );
  if (page === 'login') return (
    <LoginPage onSuccess={handleLoginSuccess} onGoRegister={() => setPage('register')} />
  );

  return (
    <div className="app-layout">

      <header className="app-header">

        <div className="header-account">
          <div>
            <div className="header-name">{user?.nom}</div>
            <div className="header-balance">
              {Number(user?.somme ?? 0).toFixed(2)} <em>€</em>
            </div>
          </div>
        </div>

        <div className="header-divider" />

        <div className="header-sell">
          <SellForm onCreated={handleItemCreated} />
        </div>

        <div className="header-divider" />

        <div className="header-logo">
          <h1>Sell Yours</h1>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>

      </header>

      {lastPurchase && (
        <div className="last-purchase-bar">
          <span className="lp-label">Dernier achat</span>
          <span className="lp-sep">·</span>
          <span className="lp-desc">{lastPurchase.description}</span>
          <span className="lp-price">{Number(lastPurchase.prix).toFixed(2)} €</span>
        </div>
      )}

      <div className="app-main">

        <MyItems refresh={refreshMine} onDeleted={handleItemDeleted} />

        <div className="main-divider" />

        <OtherItems user={user} refresh={refreshOthers} onBought={handleBought} />

      </div>
    </div>
  );
}