const express = require('express');
const app = express();
const exceljs = require('exceljs');
const fs = require('fs');
const path = require('path');

app.use(express.json()); // JSON formatını desteklemek için

app.post('/api/lineuptoexcel', (req, res) => {
    const { lineups } = req.body;

  

    const testingo = generateExcel(lineups)
    
    if (!lineups) {
        return res.status(400).json({ error: 'Lineup not provided' });
    }

    res.status(200).json({ test: "hello", sonuc: testingo });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



function generateExcel(lineups) {
  

    const result = {
        file_base64: 1234
        team_names: 35352
    };


    return result; // Sonucu döndürüyoruz
}
