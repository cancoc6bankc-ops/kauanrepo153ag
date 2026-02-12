const socket = io();
const terminal = document.getElementById('terminal');
const results = document.getElementById('results');

function log(msg) {
  terminal.innerHTML += msg + '<br>';
  terminal.scrollTop = terminal.scrollHeight;
}
socket.on('log', log);

async function scan() {
  const url = document.getElementById('url').value;
  if (!url) return alert('URL obrigatória');
  results.innerHTML = '';
  log('[*] Enviando URL...');
  const res = await fetch('/api/scan', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({url}) });
  const data = await res.json();
  if (data.status === 'owned') {
    log(`[+] SUCESSO – ${data.ccs} CCs`);
    results.innerHTML = `<pre>${JSON.stringify(data.users,null,2)}</pre>
    <a href="/api/dump/${data.uuid}.csv" download>Baixar CSV</a>`;
  } else {
    log(`[-] FALHA – ${data.error}`);
  }
}
