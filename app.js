const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;3
const router = require('./router/index');
// const router = require('./router/index');
const errorHandler = require('./middleware/errorHandler');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// app.get("/", (req, res) => res.redirect("/products"))
app.use("/", router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server agan berjalan di port`, port);
})