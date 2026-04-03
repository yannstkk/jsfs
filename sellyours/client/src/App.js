import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserInfo from './components/UserInfo';
import MyItems from './components/MyItems';
import SellForm from './components/SellForm';
import OtherItems from './components/OtherItems';
import LastPurchase from './components/LastPurchase';
import { getMe, logout } from './api/api';
import './index.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [lastPurchase, setLastPurchase] = useState(null);
  const [refreshMine, setRefreshMine] = useState(0);
  const [refreshOthers, setRefreshOthers] = useState(0);

  // Au montage : on vérifie si le cookie JWT est encore valide
  // Comme dans le cours : useEffect avec async dedans
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();
        setUser(data);
        setPage('app');
      } catch {
        // pas connecté, on reste sur login
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
    try {
      await logout();
    } catch (err) {
      console.error(err.message);
    } finally {
      setUser(null);
      setLastPurchase(null);
      setPage('login');
    }
  };

  const handleBought = (objet) => {
    // Mémorisation du dernier achat (pas en base, juste en state)
    setLastPurchase(objet);
    // Mise à jour immédiate côté client du solde
    setUser(u => ({ ...u, somme: u.somme - objet.prix }));
    // Rafraîchir la liste des autres objets
    setRefreshOthers(n => n + 1);
  };

  const handleItemCreated = () => setRefreshMine(n => n + 1);
  const handleItemDeleted = () => setRefreshMine(n => n + 1);
  const handleUserUpdate = (updatedUser) => setUser(updatedUser);

  if (page === 'register') {
    return (
      <RegisterPage
        onSuccess={() => setPage('login')}
        onGoLogin={() => setPage('login')}
      />
    );
  }

  if (page === 'login') {
    return (
      <LoginPage
        onSuccess={handleLoginSuccess}
        onGoRegister={() => setPage('register')}
      />
    );
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>🛒 Sell Yours</h1>
        <button className="btn btn-outline" onClick={handleLogout}>
          Déconnexion
        </button>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <UserInfo user={user} onUserUpdate={handleUserUpdate} />
          <SellForm onCreated={handleItemCreated} />
          {lastPurchase && <LastPurchase objet={lastPurchase} />}
        </aside>

        <section className="content">
          <MyItems
            refresh={refreshMine}
            onDeleted={handleItemDeleted}
          />
          <OtherItems
            user={user}
            refresh={refreshOthers}
            onBought={handleBought}
          />
        </section>
      </main>
    </div>
  );
}