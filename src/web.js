import express from 'express';
import { searchNews } from './braveClient.js';
import { summarizeResults } from './summarize.js';

const app = express();

app.get('/', (req, res) => {
  res.type('html').send(`
    <html>
      <head>
        <title>Brave News MCP Preview</title>
        <style>
          body{font-family:system-ui,Segoe UI,Arial;padding:24px;max-width:900px;margin:auto}
          h1{margin:0 0 12px}
          form{margin-bottom:16px}
          input,select{padding:8px;margin-right:8px}
          .item{border-bottom:1px solid #eee;padding:12px 0}
          .source{font-size:12px;color:#666}
          img.thumb{max-height:64px;max-width:128px;margin-right:8px;vertical-align:middle}
        </style>
      </head>
      <body>
        <h1>Brave News MCP Preview</h1>
        <form action="/search" method="get">
          <input type="text" name="q" placeholder="Query" required />
          <input type="number" name="count" value="10" min="1" max="50" />
          <select name="safesearch">
            <option value="">safesearch (default)</option>
            <option>off</option>
            <option selected>moderate</option>
            <option>strict</option>
          </select>
          <select name="freshness">
            <option value="">freshness</option>
            <option value="pd">24h</option>
            <option value="pw">7d</option>
            <option value="pm">31d</option>
            <option value="py">365d</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </body>
    </html>
  `);
});

app.get('/search', async (req, res) => {
  try {
    const params = {
      q: String(req.query.q || ''),
      count: req.query.count ? Number(req.query.count) : undefined,
      safesearch: req.query.safesearch || undefined,
      freshness: req.query.freshness || undefined,
    };
    const raw = await searchNews(params);
    const summary = summarizeResults(raw);
    const itemsHtml = summary.items.map(it => `
      <div class="item">
        ${it.thumbnail ? `<img class="thumb" src="${it.thumbnail}" />` : ''}
        <a href="${it.url}" target="_blank">${it.title || it.url}</a>
        ${it.description ? `<div>${it.description}</div>` : ''}
        <div class="source">${it.host || ''} ${it.age ? `• ${it.age}` : ''} ${it.breaking ? '• breaking' : ''}</div>
      </div>
    `).join('');
    const sourcesHtml = summary.sources.map(s => `<li>${s.host}: ${s.count}</li>`).join('');
    res.type('html').send(`
      <html><head><title>Results</title></head><body>
      <a href="/">← Back</a>
      <h2>Overview</h2>
      <p>${summary.overview}</p>
      <h3>Top Sources</h3>
      <ul>${sourcesHtml}</ul>
      <h3>Results</h3>
      ${itemsHtml}
      </body></html>
    `);
  } catch (e) {
    res.status(500).send(String(e?.message || e));
  }
});

const port = process.env.PORT || 3344;
app.listen(port, () => {
  // Avoid stdout logging to not interfere with MCP usage; minimal server.
});

