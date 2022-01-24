require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const res = require('express/lib/response')
const Item = require('./models/item')
////////////////////////////////////////////////
//Cors
app.use(cors())
//Middlwares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
//Ruta para servir Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//////////////////////////////////////////////////

app.post('/api/items', async(req, res)=>{

    const {
        os,
        clasificacion,
        descripcion,
        bloque,
        columna,
        fila,
        lado} = req.body

    const item = new Item({os,
                            clasificacion,
                            descripcion,
                            bloque,
                            columna,
                            fila,
                            lado})

    await item.save()

    res.status(201).json({
        'Item registrado': item
    })
})

app.get('/api/items/:id', async(req, res)=>{
    const id = req.params.id

    const {
        os,
        clasificacion,
        descripcion,
        bloque,
        columna,
        fila,
        lado
    } = await Item.findOne({os: id})


    res.status(200).json({
        os,
        clasificacion,
        descripcion,
        bloque,
        columna,
        fila,
        lado
    })
})

app.delete('/api/items/:id', async(req, res)=>{

    const id = req.params.id
    const item = await Item.findOneAndDelete({os:id})

    res.status(200).json({
        'Item borrado': item
    })
})

app.put('/api/items/:id', async(req, res)=>{
    const id = req.params.id
    const {_id, __v, os, ...resto} = req.body

    const item = await Item.findOneAndUpdate({os:id},resto)

    res.status(200).json({
        'Item updated': item
    })
})






app.listen(process.env.PORT || 5000, () => {
    console.log('Your app is listening on port ' + process.env.PORT)
})