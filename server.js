import express from "express";
import cors from "cors";
import chokidar from "chokidar";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const START_PORT = 1981;

function startServer(port) {
  const app = express();
  app.use(cors());

  const publicPath = path.join(__dirname, "./");
  app.use(express.static(publicPath));

  app.get("/style.css", (req, res) => {
    res.sendFile(path.join(publicPath, "style.css"));
  });

  const server = app.listen(port, () => {
    console.log("✅ Server running at http://localhost:1981");
    setupWebSocket(server);
    watchCSS();
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn("⚠️ Port 1981 already in use.");
    } else {
      console.error("❌ Server error:", err);
    }
  });
}

function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("🔌 WebSocket client connected");
  });
  globalThis.__wss__ = wss;
}

function watchCSS() {
  const cssPath = path.join(__dirname, "style.css");
  const watcher = chokidar.watch(cssPath, { persistent: true });

  watcher.on("change", () => {
    console.log(`🎨 CSS changed: ${cssPath}`);
    if (globalThis.__wss__) {
      globalThis.__wss__.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send("css-updated");
        }
      });
    }
  });
}

startServer(START_PORT);
