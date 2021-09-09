import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname : 파일명을 제외한 절대 경로

app.use("public", express.static(__dirname + '/public'));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
//app.listen(3000, handleListen);

// 아래와 같이 해서 http, webSocket 둘다 같은 포트에서 작동된다
// http://localhost:3000, ws://localhost:3000 둘다 OK

// http server create(이 서버에서 webSocket을 만들수 있게 됐다)
const server = http.createServer(app);

// http 서버 위에 webSocket server를 만든다
const wss = new WebSocket.Server({ server })

wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.on("close", () => console.log(" Disconnected from the Browser "));
    socket.on("message", message => {
        console.log(message);
    })
    socket.send("hello!!!");
});

server.listen(3000, handleListen);



