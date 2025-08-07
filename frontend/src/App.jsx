import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState('info');
  const [service, setService] = useState('frontend');
  const [status, setStatus] = useState('');

  const sendLog = async () => {
    try {
      const res = await axios.post('http://localhost:5000/log', {
        message,
        level,
        service,
      });
      setStatus('Log sent successfully!');
    } catch (err) {
      setStatus('Failed to send log.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Logify Dashboard</h1>
      <input
        placeholder="Log message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      /><br />
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select><br />
      <input
        placeholder="Service name"
        value={service}
        onChange={(e) => setService(e.target.value)}
      /><br />
      <button onClick={sendLog}>Send Log</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
