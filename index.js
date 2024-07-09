import express from 'express'
import { authUsuarios } from './middleware/auth.middlware.usuario.js';


const app = express()
export const __dirname = import.meta.dirname;
export const usuarios = { usuarios: ["juan", "jocelyn", "astrid", "maria", "ignacio", "javier", "brian"] }
//middleware
console.log(__dirname)
app.use('/abracadabra/juego/:usuario', authUsuarios, express.static(__dirname + '/public'));

//ENRUTAMIENTO

app.get('/abracadabra/usuarios', (req, res) => {
    return res.json(usuarios)
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numUsuario = parseInt(req.params.n)
    const numAleatorio = Math.floor(Math.random() * 4) + 1

    if (numUsuario === numAleatorio) {
        res.sendFile(__dirname + '/public/assets/img/conejito.jpg')
    } else {
        res.sendFile(__dirname + '/public/assets/img/voldemort.jpg')
    }
})

// error de peticion

app.get('/', (req, res) => {
    res.status(200).json({ method: "GET" })
})
app.post('/', (req, res) => {
    res.status(201).json({ method: "POST" })
})

app.use('*', (req, res) => {
    res.status(404).send('Esta Página no existe')
})

//LEVANTAR SERVIDOR
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`La aplicación esta en el puerto :  ${PORT}`)
})