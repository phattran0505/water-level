const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())
let waterLevels = []; // Lưu trữ lịch sử dữ liệu

app.post('/api/level', (req, res) => {
  const { level } = req.body;
  console.log(level);
  
  if (level !== undefined) {
    const timestamp = new Date().toISOString();
    waterLevels.push({ level, timestamp });
    console.log(`Received level: ${level}`);
    res.status(200).send({ message: 'Data received successfully!' });
  } else {
    res.status(400).send({ message: 'Invalid data!' });
  }
});

// API để gửi dữ liệu cho frontend
app.get('/api/levels', (req, res) => {
  res.status(200).send(waterLevels);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
