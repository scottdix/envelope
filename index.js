import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Button } from '@shadcn/ui';

const EnvelopeChallenge = () => {
  const [envelopes, setEnvelopes] = useState([]);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch envelope data (e.g., from an API or database) and update the state
    fetch('/api/envelopes')
      .then(response => response.json())
      .then(data => setEnvelopes(data));
  }, []);

  const handleEnvelopeClick = (envelope) => {
    setSelectedEnvelope(envelope);
  };

  const handleSubmit = () => {
    // Send the sponsorship data to the server (e.g., via an API call)
    fetch('/api/sponsorships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        envelopeNumber: selectedEnvelope.number,
        name,
        email,
        address
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Thank you for your sponsorship!');
          setSelectedEnvelope(null);
          setName('');
          setEmail('');
          setAddress('');
        } else {
          alert('There was an error sponsoring the envelope. Please try again.');
        }
      })
      .catch(error => {
        alert('There was an error sponsoring the envelope. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rotary Envelope Challenge</h1>
        <p className="text-gray-600">Help support our community initiatives!</p>
      </header>

      <main>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Available Envelopes</h2>
          <div className="grid grid-cols-5 gap-4">
            {envelopes.map(envelope => (
              <Card
                key={envelope.number}
                className={`bg-gray-200 p-4 rounded-md text-center cursor-pointer ${
                  selectedEnvelope?.number === envelope.number ? 'border-2 border-indigo-500' : ''
                }`}
                onClick={() => handleEnvelopeClick(envelope)}
              >
                <CardHeader>Envelope #{envelope.number}</CardHeader>
                <CardContent>$ {envelope.amount}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {selectedEnvelope && (
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Sponsor Envelope #{selectedEnvelope.number}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium text-gray-700 mb-2">
                  Mailing Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                  rows={3}
                  required
                />
              </div>
              <Button type="submit" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Sponsor Envelope
              </Button>
            </form>
          </section>
        )}
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; 2023 Rotary Club. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EnvelopeChallenge;
