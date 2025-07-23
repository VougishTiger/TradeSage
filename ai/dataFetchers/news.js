const axios= require('axios');
const apiKey= 'fb8b18cac60c2ae0a6abc5597402ea9c';

async function fetchFinancialNews() {
  try {
    const res = await axios.get(`https://gnews.io/api/v4/search?q=stocks OR investing&lang=en&token=${fb8b18cac60c2ae0a6abc5597402ea9c}`);
    return res.data.articles.map(article => ({
      title: article.title,
      content: article.description || '',
      url: article.url
    }));
  } catch (err) {
    console.error('Error fetching news:', err.message);
    return [];
  }
}

module.exports= {fetchFinancialNews};