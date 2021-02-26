const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Post Overflow Rest API" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`API http://localhost:${PORT} adresinde çalışmaya başladı`)
);
