import express from "express"
import { config } from 'dotenv'
import { inicio } from "./rutas/get/inicio.js"
import { usuario } from "./rutas/get/usuario.js"
import { registro_post } from "./rutas/post/registro.js"

import  cors  from "cors"

config()
class serv {
    constructor() {
        this.servidor = express()
        this.PORT = process.env.PORT
        this.middlewares()
        this.rutas()
    }
    escuchando(){
        this.servidor.listen(this.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${this.PORT}`)
        })
    }
    middlewares(){
        this.servidor.use(express.json())
        this.servidor.use(cors())
    }
    rutas(){
        this.servidor
        .get("/",inicio)
        .get("/usuario/:id",usuario)
        .post("/registro", registro_post)
    }
     
}

export {
    serv
}