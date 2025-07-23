const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const app = express();
const { getAggregatedData } = require('./services/dataAggregator');
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to SirBigglesWorth!');
});

app.get('/api/analysis/:ticker', async (req, res) => {
  const { ticker } = req.params;
  try {
    const analysis = await getAggregatedData(ticker);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze data' });
  }
});


app.get('/api/advice/:type', async (req, res) => {
  const { type } = req.params;
  const validTypes = ['day', 'options', 'futures'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid advice type' });
  }

  const apiKey = process.env.POLYGON_API_KEY;
  const ticker = 'AAPL'; 
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      res.json({
        recommendations: [ticker],
        newsSentiment: [],
        socialSentiment: [],
        previousClose: data.results[0].c,
      });
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('api/options/:ticker', async (req,res) =>{
  const {ticker}= req.params;
  const apiKey= process.env.POLYGON_API_KEY;
  const url= `https://api.polygon.io/v3/snapshot/options/${ticker}?apiKey=${apiKey}`;

  try {
    const response= await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching options data for ${ticker}:', error.message);
    res.status(500).json({error: 'Failed to fetch options data'});
  }
 });

 app.get('/api/news/:ticker', async(req,res)=> {
  const {ticker}= req.params;
  const apiKey= process.env.POLYGON_API_KEY;
  const url= `https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=${apiKey}`;

  try{
    const response= await axios.get(url);
    res.json(response.data);
  } catch(error){
    console.error(`Error fetching news for ${ticker}:`, error.message);
    res.status(500).json({error: 'Failed to fetch news data' });
  }
 });

 app.listen(PORT, () => {
  console.log(`TradeSage backend running at http://localhost:${PORT}`);
});
 

