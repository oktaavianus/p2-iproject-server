const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./router');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(router)

app.listen(port, () => {
  console.log(`Server agan berjalan di port`, port);
})