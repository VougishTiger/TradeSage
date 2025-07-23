const { fetchFinancialNews } = require('./dataFetchers/news');
const { fetchTrendingSocialSentiment } = require('./dataFetchers/social');
const { analyzeSentiment } = require('./sentiment/analyzer');

async function getSmartAdvice() {
  const news = await fetchFinancialNews();
  const social = await fetchTrendingSocialSentiment();

  const newsInsights = news.map(n => ({
    title: n.title,
    sentiment: analyzeSentiment(n.content)
  }));

  const socialInsights = social.map(s => ({
    platform: s.platform,
    symbol: s.symbol,
    sentiment: analyzeSentiment(s.content)
  }));

  const topPositiveSymbols = socialInsights
    .filter(s => s.sentiment === 'positive')
    .map(s => s.symbol);

  const topPicks = [...new Set(topPositiveSymbols)].slice(0, 5);

  return {
    recommendations: topPicks,
    newsSentiment: newsInsights.slice(0, 3),
    socialSentiment: socialInsights.slice(0, 5)
  };
}

module.exports = {
  getSmartAdvice
};