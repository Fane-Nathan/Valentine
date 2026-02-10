import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import SuccessView from './components/SuccessView';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [decisionType, setDecisionType] = useState(null); // 'yes' or 'caught'

  React.useEffect(() => {
    if (decisionType) {
      const message = decisionType === 'yes' 
        ? "💖 **SHE SAID YES!** 💖\n(Clicked the big pink button!)" 
        : "🥺 **SHE SAID NO (but got caught!)** 🥺\n(Caught the runaway button!)";

      console.log(`Sending Discord notification for: ${decisionType}`);
      
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      .then(response => {
        if (response.ok) {
          console.log("✅ Discord notification sent!");
        } else {
          console.error("❌ Failed:", response.status);
        }
      })
      .catch(err => console.error("❌ Network error:", err));
    }
  }, [decisionType]);

  const handleDecision = (type = 'yes') => {
    console.log(`Decision made: ${type}`);
    setDecisionType(type);
    if (type === 'yes') setAccepted(true);
  };

  return (
    <div className="App">
      {accepted ? (
        <SuccessView />
      ) : (
        <QuestionCard onYes={handleDecision} />
      )}
    </div>
  );
}

export default App;
