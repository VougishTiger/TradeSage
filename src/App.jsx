import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('day');

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const res = await axios.get(`/api/advice/${tab}`);
        setAdvice(res.data);
      } catch (err) {
        console.error('Error fetching advice:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, [tab]);

  if (loading) return <div className="p-10 text-xl">Loading SirBigglesWorth's Wisdom...</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700">TradeSage</h1>
        <p className="text-sm text-gray-600">Advice powered by SirBigglesWorth</p>
      </header>

      <nav className="mb-6 flex space-x-4">
        {['day', 'options', 'futures'].map(type => (
          <button
            key={type}
            onClick={() => {
              setLoading(true);
              setTab(type);
            }}
            className={`px-4 py-2 rounded font-medium ${tab === type ? 'bg-blue-700 text-white' : 'bg-white border border-blue-700 text-blue-700'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Trading
          </button>
        ))}
      </nav>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📈 Top 5 {tab.charAt(0).toUpperCase() + tab.slice(1)} Picks Today</h2>
        <ul className="list-disc list-inside">
          {advice.recommendations.map((symbol, index) => (
            <li key={index} className="text-lg font-medium">{symbol}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📰 News Highlights</h2>
        {advice.newsSentiment.map((item, index) => (
          <div key={index} className="bg-white shadow rounded p-4 mb-3">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500">Sentiment: {item.sentiment}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">💬 Social Sentiment</h2>
        {advice.socialSentiment.map((post, index) => (
          <div key={index} className="bg-white shadow rounded p-4 mb-3">
            <p className="font-medium">{post.symbol}</p>
            <p className="text-sm">{post.platform} says: <em>{post.sentiment}</em></p>
          </div>
        ))}
      </section>
    </div>
  );
}

