"use client";

import React, { useState } from 'react';
import axios from 'axios';

export default function SubscriberForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await axios.post('https://cms-hoabl.devmaffia.in/api/subscribers', {
        data: {
          email,
        },
      });

      if (res.status === 200 || res.status === 201) {
        setStatus('Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('Something went wrong.');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="mail"
        id="mail"
        placeholder="YOUR EMAIL ADDRESS..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">
        <span className="db">SIGN UP</span>
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
