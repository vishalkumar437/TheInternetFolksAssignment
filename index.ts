const http = require("http");
const port = process.env.PORT||3000;
const application = require("./app.ts");
const server = http.createServer(application);

server.listen(port,console.log("Server Started at Port : ",port));
