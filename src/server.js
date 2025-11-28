import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod/v4';
import { searchNews } from './braveClient.js';
import { summarizeResults } from './summarize.js';

const server = new McpServer({
  name: 'brave-news-mcp',
  version: '1.0.0',
});

server.tool(
  'brave_news_search',
  'Search Brave News and summarize results',
  {
    q: z.string().describe('Query term'),
    count: z.number().int().min(1).max(50).optional().describe('Results per page'),
    country: z.string().optional().describe('2-letter country code'),
    search_lang: z.string().optional().describe('Search language code'),
    ui_lang: z.string().optional().describe('UI language'),
    offset: z.number().int().min(0).max(9).optional().describe('Page offset'),
    spellcheck: z.boolean().optional(),
    safesearch: z.enum(['off','moderate','strict']).optional(),
    freshness: z.string().optional().describe('pd|pw|pm|py or YYYY-MM-DDtoYYYY-MM-DD'),
    extra_snippets: z.boolean().optional(),
    goggles: z.array(z.string()).optional(),
    operators: z.boolean().optional(),
  },
  async (args) => {
    const raw = await searchNews(args);
    const summary = summarizeResults(raw);
    return {
      content: [
        { type: 'text', text: JSON.stringify(summary, null, 2) }
      ],
      structuredContent: { summary, raw }
    };
  }
);

export { server };

