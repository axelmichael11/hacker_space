const express = require('express')
const morgan = require('morgan')
require('dotenv').config();
const path = require('path');
var cors = require('cors')


const app = express()

app.use(cors({
  preflightContinue: false,
  origin: 'http://localhost:8080',
  credentials: true, 
  methods: ['GET', 'PUT', 'POST'],
}))
app.use(morgan('common'))
const staticAssetsPath = path.join(__dirname, 'build');
app.use(express.static(staticAssetsPath));

app.get('*', (req, res) => res.sendFile(path.join(staticAssetsPath, "index.html")))


app.listen(process.env.PORT, () => {
})