module.exports = async (req, res) => {
  const subLink = process.env.SUB_LINK;
  
  if (!subLink) {
    return res.status(200).json({ 
      status: 'working',
      message: 'API is working but SUB_LINK is not set',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const upstream = await fetch(subLink, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    if (!upstream.ok) {
      return res.status(502).send(`Upstream error: ${upstream.status}`);
    }
    
    const body = await upstream.text();
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
