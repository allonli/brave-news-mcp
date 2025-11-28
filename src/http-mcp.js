import express from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { server } from './server.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.post('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ enableJsonResponse: true });
  res.on('close', () => { transport.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env.PORT || '8000');
app.listen(port);
