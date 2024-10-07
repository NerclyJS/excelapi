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


  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Players');


  const boldStyle = { bold: true };
  const centerAlignment = { vertical: 'middle', horizontal: 'center' };
  const trebuchetMSFont = { name: 'Trebuchet MS', size: 11 };


  worksheet.getCell("A1").value = "Team Number";
  worksheet.getCell("B1").value = "Team";
  worksheet.getCell("C1").value = "In-Game Name";
  worksheet.getCell("D1").value = "User ID";
  worksheet.getCell("E1").value = "Subtotal Payout (credits)";
  worksheet.getCell("F1").value = "Subtotal Payout (event cases)";
  worksheet.getCell("G1").value = "Subtotal Payout (premium cases)";
  worksheet.getCell("H1").value = "Subtotal Payout (standard cases)";
  worksheet.getCell("I1").value = "Region";
  worksheet.getCell("J1").value = "Paid (date)";
  worksheet.getCell("K1").value = "Notes";

  const headerCells = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1"];
  headerCells.forEach((cell) => {
    const headerCell = worksheet.getCell(cell);
    headerCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF6D01" },
    };
    headerCell.alignment = centerAlignment;
    headerCell.font = { ...boldStyle, ...trebuchetMSFont };
  });

  const columnWidth = 25;
  worksheet.columns.forEach((column) => {
    column.width = columnWidth;
  });


  let currentRow = 2;
  let lastTeam = null;

  data.forEach((item) => {
    if (lastTeam !== item.team && lastTeam !== null) {
      currentRow++; 
    }

    worksheet.getCell(`A${currentRow}`).value = lastTeam === item.team ? "" : item.teamNumber;
    worksheet.getCell(`B${currentRow}`).value = item.team;
    worksheet.getCell(`C${currentRow}`).value = item.name;
    worksheet.getCell(`D${currentRow}`).value = item.value;

    worksheet.getCell(`A${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`B${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`C${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`D${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`E${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`F${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`G${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`H${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`I${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`J${currentRow}`).font = trebuchetMSFont;
    worksheet.getCell(`K${currentRow}`).font = trebuchetMSFont;

    worksheet.getCell(`A${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`B${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`C${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`D${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`E${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`F${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`G${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`H${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`I${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`J${currentRow}`).alignment = centerAlignment;
    worksheet.getCell(`K${currentRow}`).alignment = centerAlignment;

    currentRow++;
    lastTeam = item.team;
  });

  try {
    const filePath = path.join(__dirname, 'players.xlsx');
    await workbook.xlsx.writeFile(filePath);

    
    const teamNames = Array.from(
      new Set(
        data.filter((item) => item.team !== "").map((item) => item.team)
      )
    );

  
    const result = {
      file_base64: fs.readFileSync(filePath).toString('base64'),
      team_names: teamNames
    }


    fs.unlinkSync(filePath);
  } catch (err) {
    console.error('Error generating Excel:', err);

  }




    res.status(200).json({result});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


