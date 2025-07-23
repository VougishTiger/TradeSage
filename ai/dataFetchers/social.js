async function fetchTrendingSocialSentiment() {
  return [
    { platform: 'Twitter', content: 'NVDA is on 🔥! Earnings look amazing.', symbol: 'NVDA' },
    { platform: 'Reddit', content: 'Lots of people buying AAPL calls today.', symbol: 'AAPL' },
    { platform: 'Twitter', content: 'TSLA might dip due to Elon’s latest tweet.', symbol: 'TSLA' }
  ];
}

module.exports= {fetchTrendingSocialSentiment};