import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client } from '@elastic/elasticsearch';

const app = express();
const port = process.env.PORT || 5000;

// Elasticsearch setup
const esClient = new Client({ node: 'http://localhost:9200' });

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => {
  res.send('Logify Backend is running.');
});

// POST /log — to send logs
app.post('/log', async (req, res) => {
  const { message, level, service } = req.body;
  try {
    await esClient.index({
      index: 'logs',
      body: {
        timestamp: new Date(),
        message,
        level,
        service,
      },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error indexing log:', error);
    res.status(500).json({ error: 'Elasticsearch indexing failed' });
  }
});

app.listen(port, () => {
  console.log(`Logify backend listening on port ${port}`);
});
