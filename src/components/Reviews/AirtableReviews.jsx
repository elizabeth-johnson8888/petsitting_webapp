import React, { useEffect, useState } from 'react';

function AirtableReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://petsitting-backend.onrender.com/reviews')
      .then((res) => res.json())
      .then(setReviews)
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <section>
      <h2>Client Reviews</h2>
      <ul>
        {reviews.map((r, i) => (
          <li key={i}><strong>{r.name}</strong>: {r.review}</li>
        ))}
      </ul>
    </section>
  );
}

export default AirtableReviews;