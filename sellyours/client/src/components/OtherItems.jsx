import { useState, useEffect } from 'react';
import { getOtherItems, buyItem } from '../api/api';

const categLabel = (desc) => {
  if (!desc) return 'Objet';
  return desc.split(' ').slice(0, 2).join(' ');
};

export default function OtherItems({ user, refresh, onBought }) {
  const [items, setItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try { setItems(await getOtherItems()); }
      catch (err) { console.error(err.message); }
    };
    fetch();
  }, [refresh]);

  const handleBuy = async (item) => {
    setError('');
    setLoadingId(item._id);
    try {
      await buyItem(item._id);
      setItems(items.filter(i => i._id !== item._id));
      onBought(item);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="zone-market">
      <div className="market-ttl-row">
        <span>Marché</span>
        <span>{items.length} objet{items.length !== 1 ? 's' : ''}</span>
      </div>

      {error && <p className="error-msg" style={{ gridColumn: '1/-1' }}>{error}</p>}

      {items.length === 0 && (
        <p className="empty-msg" style={{ gridColumn: '1/-1' }}>Aucun objet disponible.</p>
      )}

      {items.map((item, index) => {
        const canAfford = user && user.somme >= item.prix;
        const isWide = index === 0;

        return (
          <div key={item._id} className={`market-item${isWide ? ' wide' : ''}`}>

            <div className="mthumb">
              {item.imageUrl
                ? <img src={item.imageUrl} alt={item.description} />
                : <span className="mthumb-cat">{categLabel(item.description)}</span>
              }
            </div>

            <div className="minfo">
              <div className="mdesc">{item.description}</div>
              <div className="mfooter">
                <span className="mprice">{Number(item.prix).toFixed(2)} €</span>
                {canAfford ? (
                  <button
                    className="btn-buy"
                    onClick={() => handleBuy(item)}
                    disabled={loadingId === item._id}
                  >
                    {loadingId === item._id ? '…' : 'Acheter'}
                  </button>
                ) : (
                  <button className="btn btn-disabled btn-sm" disabled>
                    Fonds insuff.
                  </button>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}