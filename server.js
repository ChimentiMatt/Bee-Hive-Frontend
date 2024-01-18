import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const express = require('express')
const serveStatic = require('serve-static')
const path = require ('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get(/.*/, function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/index.html"))
})

const port = process.env.PORT || 8080

app.listen(port);

console.log('Server started...')