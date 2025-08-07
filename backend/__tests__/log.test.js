import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/log', (req, res) => {
  if (!req.body.message) return res.status(400).json({ error: 'Missing message' });
  res.status(200).json({ success: true });
});

describe('POST /log', () => {
  it('should log a message', async () => {
    const res = await request(app).post('/log').send({
      message: 'Test log',
      level: 'info',
      service: 'test-service'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
