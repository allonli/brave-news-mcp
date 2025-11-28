# Brave News MCP

基于 Brave News API 的 MCP 服务器，支持 HTTP（Streamable HTTP）与 stdio 传输，提供工具 `brave_news_search` 用于按查询参数拉取并汇总新闻。

- HTTP 端点：`/mcp`
- 健康检查：`/health`
- 端口：`8000`
- 环境变量：`BRAVE_NEWS_TOKEN`

部署到 ModelScope 的详细说明参见 `README-ModelScope.md`。
