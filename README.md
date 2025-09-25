# wallwallwall

## 功能  
- 通过自带域名 `*.vercel.app/api/sub` 返回环境变量中 `SUB_LINK` 指定的订阅链接内容（Base64 文本）。  
- 自动设置 Vercel 边缘缓存 300 秒，无需跨境多次拉取。

## 环境变量  
在 Vercel 仪表盘 → 项目设置 → Environment Variables 中添加：  
- **Name**: `SUB_LINK`  
- **Value**: 你的订阅链接（如 `https://.../sub=3&extend=1`）  
- **Environments**: 选择 `Production` 和 `Preview`  

## 本地开发  
