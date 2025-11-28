# Brave News MCP 在 ModelScope 部署指引

## 服务说明
- 名称：`brave-news-mcp`
- 传输：`HTTP (Streamable HTTP)`，端点路径：`/mcp`
- 健康检查：`GET /health` 返回 200
- 需要的环境变量：`BRAVE_NEWS_TOKEN`（Brave News 订阅令牌）
- 提供工具：`brave_news_search`，用于按查询参数拉取并汇总新闻

## 构建与推送镜像
- 构建镜像：
  - `docker build -t <registry>/<namespace>/brave-news-mcp:latest .`
- 推送镜像：
  - `docker push <registry>/<namespace>/brave-news-mcp:latest`

## 在 ModelScope MCP 创建服务
- 进入 `https://www.modelscope.cn/mcp`，选择创建新的 MCP 服务。
- 基本信息：
  - 名称：`brave-news-mcp`
  - 简介：`基于 Brave News API 搜索并汇总新闻`
  - 分类与标签：根据广场分类选择（如：搜索工具 / 开发者工具），标签包含 `news`、`brave`、`search`、`summarize`。
- 部署方式：容器镜像
  - 镜像：`<registry>/<namespace>/brave-news-mcp:latest`
  - 端口：`8000`
  - 启动命令：`node src/http-mcp.js`
  - 健康检查：`GET /health`
- 环境变量：
  - `BRAVE_NEWS_TOKEN`：填写你的 Brave News 订阅令牌

## 端点与验证
- MCP 端点：`https://<your-service-domain>/mcp`
- 健康检查：`https://<your-service-domain>/health`
- 验证（MCP Inspector）：
  - `npx -y @modelcontextprotocol/inspector`
  - 连接到 `https://<your-service-domain>/mcp`

## Cherry Studio 使用
- 添加 MCP（HTTP）：
  - 类型：`http`
  - URL：`https://<your-service-domain>/mcp`
  - 环境变量：在服务侧已配置，无需在客户端暴露令牌
- 调用工具：`brave_news_search`
  - 入参（常用）：`q`（必填）、`count`、`country`、`search_lang`、`safesearch`、`freshness` 等
  - 返回：`structuredContent.summary`（概览、来源、Breaking、items）与 `structuredContent.raw`

## 本地开发与测试
- 运行网页预览：
  - `BRAVE_NEWS_TOKEN=... npm run start:web`
  - 打开 `http://localhost:3344/`
- 运行 MCP（HTTP）：
  - `BRAVE_NEWS_TOKEN=... npm run start:http`
  - 端点 `http://localhost:8000/mcp`，健康检查 `http://localhost:8000/health`
- 运行测试：
  - `BRAVE_NEWS_TOKEN=... npm test`

## 安全与合规
- 令牌通过环境变量注入，服务端不打印、不回显令牌内容。
- 仅使用 Brave News API 所需的请求头，错误时返回必要的状态与文本，不包含敏感信息。

