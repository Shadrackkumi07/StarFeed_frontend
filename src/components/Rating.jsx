// src/components/Rating.jsx
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import api from '../api';
import { useAuth } from '../auth/AuthProvider';

export default function Rating({ itemId }) {
  const { currentUser } = useAuth();
  const [ratings, setRatings]           = useState([]);    // all ratings
  const [userRating, setUserRating]     = useState(0);     // value (1–5)
  const [userRatingId, setUserRatingId] = useState(null);  // Mongo _id for DELETE
  const [hover, setHover]               = useState(0);
  const [loading, setLoading]           = useState(true);

  // Fetch ratings and identify this user’s
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const resp = await api.get('/ratings', { params: { itemId } });
        const all = resp.data;
        setRatings(all);

        const mine = all.find(r => r.userId === currentUser.uid);
        if (mine) {
          setUserRating(mine.value);
          setUserRatingId(mine._id);
        } else {
          setUserRating(0);
          setUserRatingId(null);
        }

      } catch (err) {
        console.error('Could not load ratings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [itemId, currentUser.uid]);

  // Compute average
  const avg = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length).toFixed(1)
    : '—';

  // Click handler: upsert or delete
  const handleClick = async (value) => {
    try {
      const token = await currentUser.getIdToken();

      if (value === userRating && userRatingId) {
        // Delete existing rating
        await api.delete(`/ratings/${userRatingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create/update (upsert) rating
        const resp = await api.post('/ratings', { itemId, value }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserRatingId(resp.data._id);
      }

      // Refresh all ratings
      const refresh = await api.get('/ratings', {
        params: { itemId }
      });
      const all = refresh.data;
      setRatings(all);
      const mine = all.find(r => r.userId === currentUser.uid);
      setUserRating(mine?.value || 0);
      setUserRatingId(mine?._id || null);

    } catch (err) {
      console.error('Error updating rating', err);
    }
  };

  if (loading) return <p>Loading rating…</p>;

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex">
        {[1,2,3,4,5].map(star => (
          <FaStar
            key={star}
            size={20}
            className="cursor-pointer"
            color={
              hover >= star
                ? '#ffd700'
                : (!hover && userRating >= star)
                  ? '#ffc107'
                  : '#e4e5e9'
            }
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
      <div>
  Avg: {avg}{" "}
  {ratings.length > 0 && (
    <span>
      ({ratings.length} {ratings.length === 1 ? "review" : "reviews"})
    </span>
  )}
</div>
    </div>
  );
}
