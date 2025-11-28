# Brave News MCP

基于 Brave News API 的 MCP 服务器，支持 HTTP（Streamable HTTP）与 stdio 传输，提供工具 `brave_news_search` 用于按查询参数拉取并汇总新闻。

## ModelScope MCP 配置（自动解析）
```json
{
  "mcpServers": {
    "brave-news-mcp": {
      "command": "npx",
      "args": ["brave-news-mcp@latest"],
      "env": {
        "BRAVE_NEWS_TOKEN": "your_token_here"
      }
    }
  }
}
```

```yaml
mcpServers:
  brave-news-mcp:
    command: npx
    args:
      - brave-news-mcp@latest
    env:
      BRAVE_NEWS_TOKEN: your_token_here
```

**MCP 服务命令配置（用于平台自动解析）**
- 顶层字段：`mcpServers`（对象）
- 服务键：`brave-news-mcp`
- 命令：`node`
- 参数：`["src/mcp.js"]`
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
- 本地运行 MCP（stdio）：`BRAVE_NEWS_TOKEN=... npm run start:mcp`
- 测试：`BRAVE_NEWS_TOKEN=... npm test`

**发布到 npm（自动化）**
- 在 GitHub 仓库中添加仓库密钥 `NPM_TOKEN`（npm 网站生成的发布令牌）
- 推送标签触发发布：
  - `npm version patch` 或 `npm version minor`
  - `git push --tags`
- 或手动触发工作流（Actions → Publish to npm → Run workflow）
- 发布后可通过 ModelScope 的托管检测：
  - `command: npx`, `args: ["brave-news-mcp@latest"]`

**部署到 ModelScope**
- 容器镜像（可选）：使用项目根目录 `Dockerfile`，入口 `node src/http-mcp.js`，端口 `8000`
- 详细部署指引：见 `README-ModelScope.md`
