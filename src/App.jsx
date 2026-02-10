import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import SuccessView from './components/SuccessView';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [decisionType, setDecisionType] = useState(null); // 'yes' or 'caught'

  // Your Discord Webhook URL
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1470800395549937920/fSNeyg9KqZbPw4hnt58pK7npzFgAXSjrR6bn--tqQJR5-BsQJ0geVB9vAbDFUo8nXWwd";

  React.useEffect(() => {
    if (decisionType && DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL.startsWith("http")) {
      const message = decisionType === 'yes' 
        ? "💖 **SHE SAID YES!** 💖\n(Clicked the big pink button!)" 
        : "🥺 **SHE SAID NO (but got caught!)** 🥺\n(Caught the runaway button!)";

      console.log(`Sending Discord notification for: ${decisionType}`);
      
      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
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
