const express = require('express');
const path = require('path')
const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const app = express();

app.use(express.json());
app.use(express.static(DIST_DIR));

app.listen(PORT, () => {
    console.info(`Server listening at http://127.0.0.1:${PORT}`)
});
  