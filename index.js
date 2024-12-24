const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// let coins = [
//     {
//         "id": 1,
//         "name": "Canadian Beaver",
//         "type": "Commemorative",
//         "issuingCountry": "Canada",
//         "denomination": "5 cents",
//         "year": 1965,
//         "price": 45
//     }
// ];

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'CoinCollection'
});

connection.connect((err) => {
    if (!err) { 
      console.log("SUCCESS");
    }
    else {
      console.log(err)
    }
});

connection.query('SELECT name FROM coins', 
  (err, data) => {
    if (!err) {
      console.log(data);
    }
  }
);

app.get('/coins', (req, res) => {
    connection.query('SELECT * FROM coinDetails;', 
    (err, data) => {
      if (err) return res.status(500);
      res.json(data);
      console.log(data);
    })
});

app.get('/coins/:id', (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM coins WHERE coin_id = ?`;

  connection.query(query, [id], (err, rows) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Database error');
      }

      if (rows.length === 0) {
          return res.status(404).send('Coin not found');
      }

      res.status(200).json(rows[0]); 
  });
});


app.post('/coins', (req, res) => {
    const { name, description, obverseDetails, reverseDetails, issuingCountry, composition, quality, denomination, year, weight, price, image } = req.body;
    const query = `
        INSERT INTO coins (
            name, 
            description, 
            obverseDetails, 
            reverseDetails, 
            issuingCountry, 
            composition, 
            quality, 
            denomination, 
            year, 
            weight, 
            price,
            image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [name, description, obverseDetails, reverseDetails, issuingCountry, composition, quality, denomination, year, weight, price, image], (err, result) => {
      if (err) {
        return res.status(500);
      }
      res.status(201).send('Coin added successfully');
    });
});

app.put('/coins/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const selectQuery = `SELECT * FROM coins WHERE coin_id = ?`;

  connection.query(selectQuery, [id], (err, rows) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Database error');
      }
      if (rows.length === 0) {
          return res.status(404).send('Coin not found');
      }

      const currentValues = rows[0];

      const updatedValues = {
          name: updates.name || currentValues.name,
          description: updates.description || currentValues.description,
          obverseDetails: updates.obverseDetails || currentValues.obverseDetails,
          reverseDetails: updates.reverseDetails || currentValues.reverseDetails,
          issuingCountry: updates.issuingCountry || currentValues.issuingCountry,
          composition: updates.composition || currentValues.composition,
          quality: updates.quality || currentValues.quality,
          denomination: updates.denomination || currentValues.denomination,
          year: updates.year || currentValues.year,
          weight: updates.weight || currentValues.weight,
          price: updates.price || currentValues.price,
          image: updates.image || currentValues.image,
      };

      const updateQuery = `
          UPDATE coins
          SET 
              name = ?, 
              description = ?, 
              obverseDetails = ?, 
              reverseDetails = ?, 
              issuingCountry = ?, 
              composition = ?, 
              quality = ?, 
              denomination = ?, 
              year = ?, 
              weight = ?, 
              price = ?,
              image = ?
          WHERE coin_id = ?
      `;

      connection.query(updateQuery, [...Object.values(updatedValues), id], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Database error');
          }
          res.status(200).send('Coin updated successfully');
      });
  });
});



app.delete('/coins/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM coins WHERE coin_id = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).send('Error deleting coin');
      }
      res.send('Coin deleted successfully');
    });
});

app.listen(3000, () =>
    console.log("App listening at port 3000")
);