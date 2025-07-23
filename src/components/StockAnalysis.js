import React, {useState} from 'react';

const stockAnalysis= ()=> {
  const [ticker,setTicker]= useState('');
  const [analysisData, setAnalysisData]= useState('');
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(null);

  const handleInputChange= (e)=> {
    setTicker(e.target.value.toUpperCase());
  };

  const fetchAnalysis= async ()=>{
    if(!ticker) return;
    setLoading(true);
    setError(null);
    try {
      const response= await fetch(`http://localhost:3000/api/analysis/${ticker}`);
      if (!response.ok){
        throw new Error('Failed to fetch analysis data');
      }
      const data= await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError(err.message);
      setAnalysisData(null);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div>
      <h2>Stock Analysis</h2>
      <input
        type="text"
        value={ticker}
        onChange={handleInputChange}
        placeholder="Enter stock ticker (e.g, AAPL)"
      />
      <button onClick={fetchAnalysis}> Analysis </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {analysisData && (
        <div>
          <h3>Analysis for {analysisData.ticker}</h3>
          <p><strong>Analysis:</strong> {analysisData.analysis}</p>
          <h4>Stock Data:</h4>
          <ul>
            <li>Open: {analysisData.stockData.o}</li>
            <li>Close: {analysisData.stockData.c}</li>
            <li>High: {analysisData.stockData.h}</li>
            <li>Low: {analysisData.stockData.l}</li>
            <li>Volume: {analysisData.stockData.v}</li>
          </ul>
          
      )
    </div>
  )
}