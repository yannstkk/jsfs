// Toutes les fonctions fetch centralisées
// Les chemins sont relatifs : pas de CORS car servi par Express

export const register = async (nom, login, password) => {
  const response = await fetch('/access/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, login, password })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur inscription');
  }
  return response.json();
};

export const login = async (login, password) => {
  const response = await fetch('/access/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur connexion');
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch('/access/logout', { method: 'POST' });
  if (!response.ok) throw new Error('Erreur déconnexion');
  return response.json();
};

export const getMe = async () => {
  const response = await fetch('/user/me');
  if (!response.ok) throw new Error('Non authentifié');
  return response.json();
};

export const updateMe = async (somme) => {
  const response = await fetch('/user/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ somme })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur mise à jour');
  }
  return response.json();
};

export const getMyItems = async () => {
  const response = await fetch('/item/mine');
  if (!response.ok) throw new Error('Erreur chargement mes objets');
  return response.json();
};

export const getOtherItems = async () => {
  const response = await fetch('/item/others');
  if (!response.ok) throw new Error('Erreur chargement objets');
  return response.json();
};

export const createItem = async (description, prix) => {
  const response = await fetch('/item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, prix })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur création objet');
  }
  return response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`/item/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erreur suppression objet');
  return response.json();
};

export const updateItemPrice = async (id, prix) => {
  const response = await fetch(`/item/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prix })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur mise à jour prix');
  }
  return response.json();
};

export const buyItem = async (id) => {
  const response = await fetch(`/item/buy/${id}`, { method: 'PUT' });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur achat');
  }
  return response.json();
};