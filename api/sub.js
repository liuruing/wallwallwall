// api/sub.js
export default async function handler(req, res) {
  // 1. 从环境变量读取订阅链接
  const subLink = process.env.SUB_LINK;
  if (!subLink) {
    return res.status(500).send('Missing SUB_LINK');
  }

  // 2. 向订阅链接发起 GET 请求
  const upstream = await fetch(subLink, {
    method: 'GET',
    headers: { 'User-Agent': 'Vercel-Proxy' },
    redirect: 'follow'
  });
  if (!upstream.ok) {
    return res.status(502).send(`Upstream error ${upstream.status}`);
  }
  const body = await upstream.text();

  // 3. 设置边缘缓存和 CORS
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // s-maxage 控制 Vercel 边缘节点缓存 300 秒
  res.setHeader('Cache-Control', 'public, s-maxage=300');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 4. 返回订阅的 Base64 文本
  res.status(200).send(body);
}
