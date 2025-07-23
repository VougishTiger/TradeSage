const express= require('express');
const {verifyToken}= require('../middleware/auth');
const router= express.Router();
const { getSmartAdvice } = require('../ai/sirBigglesWorth');

const {
  getDayTradingAdvice,
  getOptionsAdvice,
  getFuturesAdvice
}= require('../ai/sirBigglesWorth');

router.get('/day', verifyToken, (req,res)=> {
  res.json({type: "Day Trading", top_trades: getDayTradingAdvice() });
});

router.get('/options', verifyToken, (req, res) => {
  res.json({ type: "Options Trading", strategies: getOptionsAdvice() });
});

router.get('/futures', verifyToken, (req, res) => {
  res.json({ type: "Futures Trading", picks: getFuturesAdvice() });
});

router.get('/smart', verifyToken, async (req, res) => {
  const advice = await getSmartAdvice();
  res.json({ engine: 'SirBigglesWorth', ...advice });
});

module.exports= router;

