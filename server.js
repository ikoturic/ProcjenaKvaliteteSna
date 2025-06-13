// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // npm install node-fetch@2
const app = express();

app.use(cors());
app.use(express.json());

const AZURE_URL = "http://f2ffe6b0-de30-4704-ab56-52c823bcb9ce.westeurope.azurecontainer.io/score";
const API_KEY = "y11k9PZoXCxNiLnNl57BxWz60byJdD56";

app.post("/predict", async (req, res) => {
  try {
    const azureRes = await fetch(AZURE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await azureRes.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
