import { mongoose, Schema } from "mongoose"
import  bcrypt from "bcryptjs"
let vuelta_llave=10

const usuarioSchema = new Schema({
    usuario: {type:String, required:true},
    correo:{type:String, required:true, unique:true},
    contra: {type:String, required:true},
    foto:String,
    estado:{type:Boolean, default:true},
    fechaRegistro:{type:Date, default:Date.now},
    id_chat:{type:String}
})
usuarioSchema.pre('save', async function (next) {
    if (this.isModified('contra')) {
        this.contra = await bcrypt.hash(this.contra, vuelta_llave);
    }
    next();
})
usuarioSchema.statics.comparar_contraseña = async function (contraIngresada, contraAlmacenada) {
    return await bcrypt.compare(contraIngresada, contraAlmacenada);
};
const registro_usuario = mongoose.model('usuario', usuarioSchema)

export{
    registro_usuario
}
