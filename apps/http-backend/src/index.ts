import express from "express";

const app = express();

app.listen(3001, () => {
  console.log("Server is up on http://localhost:3001");
});
