
import http from 'node:http';

const servidor = http.createServer((req, res) => {
    console.log(req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hola, mundo!');

});
servidor.listen(3000, () => {
  console.log(`Escuchando en http://localhost:3000`);
});
