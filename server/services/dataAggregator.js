const axios= require('axios');
require('dotenv').config();

const POLYGON_API_KEY= process.env.POLYGON_API_KEY;

async function fetchStockData(ticker) {
  const url= `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`;
  const response=await axios.get(url);
  return response.data.results[0];
}

async function fetchOptionsData(ticker) {
  const url= `https://api.polygon.io/v3/snapshot/options/${ticker}?apiKey=${POLYGON_API_KEY}`;
  const response= await axios.get(url);
  return response.data.results;
}

async function fetchNewsSentiment(ticker) {
  const url= `https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=${POLYGON_API_KEY}`;
  const response= await axios.get(url);
  return response.data.results;
}

function analyzeData(stockData, optionsData, newsData) {
  // Placeholder for analysis logic
  // Implement your analysis algorithms here
  return {
    stockAnalysis: stockData, // Replace with actual analysis
    optionsAnalysis: optionsData, // Replace with actual analysis
    newsAnalysis: newsData, // Replace with actual analysis
    recommendation: 'Hold' // Replace with actual recommendation logic
  };
}

async function getAggregatedData(ticker) {
  try {
    const [stockData, optionsData, newsData] = await Promise.all([
      fetchStockData(ticker),
      fetchOptionsData(ticker),
      fetchNewsSentiment(ticker)
    ]);

    const analysis = analyzeData(stockData, optionsData, newsData);
    return analysis;
  } catch (error) {
    console.error(`Error aggregating data for ${ticker}:`, error.message);
    throw error;
  }
}

module.exports = { getAggregatedData,
  analyzeData
};