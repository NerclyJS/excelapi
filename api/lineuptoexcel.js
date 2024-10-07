const express = require('express');
const app = express();
const exceljs = require('exceljs');
const fs = require('fs');
const path = require('path');

app.use(express.json()); // JSON formatını desteklemek için

app.post('/api/lineuptoexcel', (req, res) => {
    const { lineups } = req.body;
    
    if (!lineups) {
        return res.status(400).json({ error: 'Lineup not provided' });
    }


  const rawData = linedata.split("\n").map((satir) => satir.trim());
  const data = [];
  let currentTeam = "";
  let teamCounter = 1;

  rawData.forEach((item) => {
    if (item === "") return;

    if (item.startsWith("/")) {
      currentTeam = item.substring(1);
      teamCounter++; 
    } else {
      const [name, value] = item.split("+");
      if (name && value) {
        data.push({ team: currentTeam, teamNumber: teamCounter - 1, name, value: Number(value) });
      }
    }
  });





    res.status(200).json({okingo: "ok"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


