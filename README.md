# Brave News MCP

基于 Brave News API 的 MCP 服务器，支持 HTTP（Streamable HTTP）与 stdio 传输，提供工具 `brave_news_search` 用于按查询参数拉取并汇总新闻。

## ModelScope MCP 配置（自动解析）
```json
{
  "mcpServers": {
    "brave-news-mcp": {
      "displayName": "Brave News 汇总",
      "description": "基于 Brave News API 搜索并汇总新闻，支持多参数过滤与结果聚合。",
      "transport": "http",
      "entry": "node src/http-mcp.js",
      "endpoint": "/mcp",
      "health": "/health",
      "port": 8000,
      "env": ["BRAVE_NEWS_TOKEN"],
      "tools": ["brave_news_search"],
      "categories": ["搜索工具", "开发者工具"],
      "tags": ["news", "brave", "search", "summarize"],
      "license": "ISC"
    }
  }
}
```

```yaml
mcpServers:
  brave-news-mcp:
    displayName: Brave News 汇总
    description: 基于 Brave News API 搜索并汇总新闻，支持多参数过滤与结果聚合。
    transport: http
    entry: node src/http-mcp.js
    endpoint: /mcp
    health: /health
    port: 8000
    env:
      - BRAVE_NEWS_TOKEN
    tools:
      - brave_news_search
    categories:
      - 搜索工具
      - 开发者工具
    tags:
      - news
      - brave
      - search
      - summarize
    license: ISC
```

**MCP 服务配置（用于平台自动解析）**
- 名称：`brave-news-mcp`
- 传输：`http`
- 端点：`/mcp`
- 健康检查：`/health`
- 端口：`8000`
- 启动命令：`node src/http-mcp.js`
- 环境变量：`BRAVE_NEWS_TOKEN`
- 工具列表：`["brave_news_search"]`

JSON：

```json
{
  "mcp": {
    "name": "brave-news-mcp",
    "transport": "http",
    "endpoint": "/mcp",
    "health": "/health",
    "port": 8000,
    "start": "node src/http-mcp.js",
    "env": ["BRAVE_NEWS_TOKEN"],
    "tools": ["brave_news_search"]
  }
}
```

YAML：

```yaml
mcp:
  name: brave-news-mcp
  transport: http
  endpoint: /mcp
  health: /health
  port: 8000
  start: node src/http-mcp.js
  env:
    - BRAVE_NEWS_TOKEN
  tools:
    - brave_news_search
```

**运行与验证**
- 本地运行 HTTP MCP：`BRAVE_NEWS_TOKEN=... npm run start:http`（`/mcp`、`/health`）
- 网页预览：`BRAVE_NEWS_TOKEN=... npm run start:web`（`http://localhost:3344/`）
- 测试：`BRAVE_NEWS_TOKEN=... npm test`

**部署到 ModelScope**
- 容器镜像（可选）：使用项目根目录 `Dockerfile`，入口 `node src/http-mcp.js`，端口 `8000`
- 详细部署指引：见 `README-ModelScope.md`
