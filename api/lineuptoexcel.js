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

    res.status(200).json({ lineups });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
