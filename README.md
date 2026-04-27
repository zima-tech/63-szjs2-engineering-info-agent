# 工程信息智能体

**部门**: 市政建设第二指挥部

**序号**: 63

## 原需求描述

整合项目设计图纸、评估文本、政府批文、会议纪要等各类文档，构建项目专属知识库。用户可通过对话方式查询项目信息，系统自动检索并返回精确答案，支持多轮对话和上下文理解。

保留原始 PRD 文档：

- [63_市政建设第二指挥部_工程信息智能体_PRD.md](./63_市政建设第二指挥部_工程信息智能体_PRD.md)
- [63_市政建设第二指挥部_工程信息智能体_需求文档.md](./63_市政建设第二指挥部_工程信息智能体_需求文档.md)
- [63_工程信息智能体_MVP需求拆解.md](./63_工程信息智能体_MVP需求拆解.md)

## 应用定位

工程信息中枢 是一个独立的 Next.js App Router 管理后台，采用蓝白浅色 B 端风格，使用 Prisma + SQLite 提供本地持久化。核心模块包括：智能体首页、知识问答、文档检索、图纸查阅、答案溯源。

## 技术栈

- Next.js App Router + React Hooks + TypeScript strict
- Ant Design 基础组件与主题 token
- Ant Design X 的 Sender、Bubble、Conversations 用于 AI 问答交互
- Prisma + SQLite，开发库为 `prisma/dev.db`
- CSS 样式隔离在 `app/globals.css` 的控制台命名空间内

## 本地启动

1. 安装依赖：`npm install`
2. 初始化数据库：`npm run db:init`
3. 启动开发服务：`npm run dev`
4. 打开 `http://localhost:3000`

## 常用命令

- `npm run verify`：检查目录结构、Ant Design X 和业务文案约束
- `npm run typecheck`：TypeScript 严格检查
- `npm run build`：Next.js 构建检查
- `npm run db:seed`：重置并写入工程资料演示数据

## 数据闭环

- 首屏通过 `lib/service.ts` 读取 SQLite 数据；空库时自动写入工程资料、问答会话和审计数据。
- 文档新增、状态流转、删除确认和 AI 问答采纳均通过 Server Actions 写入 Prisma。
- 高风险删除操作使用 Ant Design Modal 二次确认。
- 文档资料、图纸参数、问答结论、来源页码均使用专业 Mock 数据，便于 MVP 演示。

## 部署说明

该目录可作为独立 Vercel 项目部署，构建命令为 `npm run build`。SQLite 适合本地演示和原型验证，生产环境建议上线前切换为托管数据库。
