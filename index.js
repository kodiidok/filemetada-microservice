const express = require('express');
const cors = require('cors');
const multer = require('multer');

require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({ dest: './public/data/uploads' });

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * {
 *  "fieldname":"upfile",
 *  "originalname":"newlogo.png",
 *  "encoding":"7bit",
 *  "mimetype":"image/png",
 *  "destination":"./public/data/uploads",
 *  "filename":"107fbe5dfa6f736f83f46eaa049eb6ee",
 *  "path":"public/data/uploads/107fbe5dfa6f736f83f46eaa049eb6ee",
 *  "size":4475
 * }
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
