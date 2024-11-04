import mongoose from "mongoose"
const conectar = async()=>{
    await mongoose.connect(process.env.db)
    .then(() => {
      console.log('Conectado a la base de datos chat');
    })
    .catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
    })
}
conectar()

