# 周成业 - 个人简历网站

个人在线简历网站，展示基础信息、工作经历、个人项目和社团组织经历。

## 技术栈

- 纯静态页面：HTML + CSS + JavaScript
- 响应式设计，适配桌面端与移动端
- 使用 Google Fonts（Noto Sans SC / Noto Serif SC）

## 项目结构

```
personal-website/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # 交互脚本
├── img/
│   └── 1.0.jpg     # 头像图片
└── README.md
```

## 本地运行

直接用浏览器打开 `index.html`，或使用任意静态服务器：

```bash
# Python
python -m http.server 8080

# Node.js (需要安装 http-server)
npx http-server -p 8080
```

然后访问 `http://localhost:8080`。

## 部署

推送到 GitHub 后可通过 GitHub Pages 部署：

1. 仓库 Settings → Pages
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `main`，目录选择 `/ (root)`
4. 保存后等待部署完成
