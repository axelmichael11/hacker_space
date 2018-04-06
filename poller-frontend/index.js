const express = require('express')
const morgan = require('morgan')
require('dotenv').config();
const path = require('path');
var cors = require('cors')


const app = express()

app.use(cors())
app.use(morgan('common'))
const staticAssetsPath = path.join(__dirname, 'build');
app.use(express.static(staticAssetsPath));

app.get('*', (req, res) => res.sendFile(path.join(staticAssetsPath, "index.html")))

// app.use(express.static(`${__dirname}/src`))
// app.get('*', (req, res) => res.sendFile(`${__dirname}/src/index.html`))

app.listen(process.env.PORT, () => {
  console.log('__SERVER_RUNNING__', process.env.PORT)
})