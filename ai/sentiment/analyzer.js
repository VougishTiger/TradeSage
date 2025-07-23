const positiveWords = ['great', 'amazing', '🔥', 'profit', 'buy', 'strong', 'bullish', 'rise', 'up'];
const negativeWords = ['bad', 'sell', 'bearish', 'dip', 'drop', 'crash', 'risk'];

function analyzeSentiment(text) {
  let score = 0;
  const words = text.toLowerCase().split(/\W+/);

  words.forEach(word => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });

  return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
}

module.exports = { analyzeSentiment };