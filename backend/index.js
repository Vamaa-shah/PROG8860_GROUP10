const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

app.post('/submit-feedback', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await dynamo.put({
      TableName: 'FeedbackTable',
      Item: {
        id: Date.now().toString(),
        name,
        email,
        message
      }
    }).promise();
    res.status(200).send("Feedback submitted.");
  } catch (err) {
    res.status(500).send("Error saving feedback.");
  }
});

app.listen(3001, () => console.log('API running on port 3001'));
