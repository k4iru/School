const http = require("http");
const fs = require("fs");
const port = 8888;

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  fs.createReadStream("./404.html").pipe(res);
  res.write("Error 404: File couldn't be found");
  res.end();
}

// routing
function onRequest(req, res) {
  if (req.method == "GET") {
    switch (req.url) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./index.html").pipe(res);
        break;
      case "/home":
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./index.html").pipe(res);
        break;
      case "/about":
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./about.html").pipe(res);
        break;
      case "/contact":
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./contact.html").pipe(res);
        break;
      default:
        send404(res);
    }
  }
}

http.createServer(onRequest).listen(port);
console.log(`server is listening on: ${port}`);
