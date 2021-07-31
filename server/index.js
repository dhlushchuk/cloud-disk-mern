const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const { filePathFiles, filePathStatic } = require('./middleware/filePath.middleware')

const app = express()
dotenv.config()
const path = require('path')

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cors())
app.use(filePathFiles(path.resolve(__dirname, 'files')))
app.use(filePathStatic(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api/user', require('./routes/user'))
app.use('/api/files', require('./routes/files'))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, {  
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((e) => console.log(e.message))