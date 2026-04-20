const http = require("http");

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      message: "Backend is running",
      path: req.url,
    })
  );
});

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
