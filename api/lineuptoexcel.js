const express = require('express');
const app = express();

app.use(express.json()); // JSON formatını desteklemek için

app.post('/api/lineuptoexcel', (req, res) => {
    const { lineups } = req.body;

    if (!lineup) {
        return res.status(400).json({ error: 'Lineup not provided' });
    }

    res.status(200).json({ lineups });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
