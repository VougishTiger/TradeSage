import React, {usestate} from 'react';
import axios from 'axios';

function Analysis() {
  const [ticker, setTicker]= useState('');
  const [analysis, setAnalysis]= useState(null);

  const fetchAnalysis= async()=> {
    try{
      const response= await axios.get(`/api/analysis/${ticker}`);
      setAnalysis(response.data);
    } catch(error) {
      console.error('Error fetching analysis:', error.message);
    }
  };

  return (
    <div>
      <h2>SirBigglesWorth Analysis</h2>
      <input 
        type="text"
        value={ticker}
        onChange= {(e)=> setTicker(e.target.value.toUpperCase())}
        placeholder= "Enter Ticker Symbol"
      />
      <button onClick= {fetchAnalysis}>Analyze</button>

      {analysis && (
        <div>
          <h3>Recommendation: {analysis.recommendation}</h3>
        </div>
      )}
    </div>
  );
}

export default Analysis;