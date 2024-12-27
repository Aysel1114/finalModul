const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.get('/lists', (req, res) => {
  const { page = 1, limit = 4 } = req.query; 
  const offset = (page - 1) * limit;

  connection.query('SELECT * FROM coins LIMIT ? OFFSET ?', [+limit, +offset], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    connection.query('SELECT COUNT(*) as count FROM coins', (err, totalPageData) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

      res.setHeader('Content-Type', 'application/json'); 
      res.json({
        data: data,
        pagination: {
          page: +page,
          limit: +limit,
          totalPage: totalPage,
        },
      });
    });
  });
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

app.get('/coinTypes', (req, res) => {
  const query = 'SELECT * FROM coinTypes';
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Xəta baş verdi', error: err });
    } else {
      res.json(result);
    }
  });
});

app.post('/coins', (req, res) => {
  const { name, description, obverseDetails, reverseDetails,issuingCountry,composition,quality,denomination,year,weight,price,imageFront,imageBack, type_id } = req.body;

  const query = 'INSERT INTO coins (name, description, obverseDetails, reverseDetails,issuingCountry,composition,quality,denomination,year,weight,price,imageFront,imageBack, type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)';
  connection.query(query, [name, description, obverseDetails, reverseDetails,issuingCountry,composition,quality,denomination,year,weight,price,imageFront,imageBack, type_id ], (err, result) => {
      if (err) {
          res.status(500).json({ message: "xeta", error: err });
      } else {
          res.json({ message: 'post olundu', coinId: result.insertId });
      }
  });
});

app.put('/coins/:coin_id', (req, res) => {
  console.log('name:', req.params.name);
  const { coin_id } = req.params;
  const {
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
    imageFront,
    imageBack,
    type_id,
  } = req.body;

  const query = `
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
      imageFront = ?, 
      imageBack = ?, 
      type_id = ?
    WHERE coin_id = ?`;

  connection.query(
    query,
    [
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
      imageFront,
      imageBack,
      type_id,
      coin_id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Xəta baş verdi', error: err });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Sikkə tapılmadı' });
      } else {
        res.json({ message: 'Sikkə məlumatları uğurla yeniləndi' });
      }
    }
  );
});

app.delete('/coins/:coin_id', (req, res) => {
  const { coin_id } = req.params;

  const query = 'DELETE FROM coins WHERE coin_id = ?';
  connection.query(query, [coin_id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Xəta baş verdi', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Sikkə tapılmadı' });
    } else {
      res.json({ message: 'Sikkə uğurla silindi' });
    }
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

// ADMIN
app.get('/admin', (req, res) => {
  connection.query('SELECT * FROM admin;', 
  (err, data) => {
    if (err) return res.status(500);
    res.json(data);
    console.log(data);
  })
});

// Sign in
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const query = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
  connection.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Verilənlər bazasına əlavə edərkən səhv baş verdi: ", err);
      return res.status(500).json({ message: "Qeydiyyat uğursuz oldu." });
    }
    res.status(201).json({ message: "Qeydiyyat uğurla tamamlandı!" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM admin WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Verilənlər bazasında səhv baş verdi: ", err);
      return res.status(500).json({ message: "Daxil olma zamanı səhv baş verdi." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }

    const admin = results[0];
    if (password !== admin.password) {
      return res.status(401).json({ message: "Şifrə səhvdir." });
    }

    res.status(200).json({ message: "Daxil olma uğurla tamamlandı!" });
  });
});

app.listen(3000, () =>
    console.log("App listening at port 3000")
);