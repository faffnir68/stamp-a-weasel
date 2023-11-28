const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/addScan', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  let jsonData = [];
  try {
    const data = fs.readFileSync('scans.json', 'utf-8');
    jsonData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  const userIndex = jsonData.findIndex((user) => user.userId === userId);
  if (userIndex !== -1) {
    jsonData[userIndex].scanCount += 1;
  } else {
    jsonData.push({ userId, scanCount: 1 });
  }

  try {
    fs.writeFileSync('scans.json', JSON.stringify(jsonData, null, 2), 'utf-8');
    res.json({ success: true, message: 'Scan added successfully.' });
  } catch (error) {
    console.error('Error writing to JSON file:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
