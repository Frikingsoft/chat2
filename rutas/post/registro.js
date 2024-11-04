import { registro_usuario } from "../../bd/usuario.js"
const datos_usuario = { usuario:"", correo:"", contra:"" }

const registro_post = (req,res)=>{
  const  usuario_inicio =  req.body
  validar_usuario(usuario_inicio)
}

const validar_correo =(correo)=>{
    const validar = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let valido = validar.test(correo)
    return valido
}
const validar_contra =  (contra)=>{
    const validar_contra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valido = validar_contra.test(contra)
    return valido
}
const validar_usuario =(usuario_inicio)=>{
      usuario_inicio.entradas.forEach(resultado => {
        
        if(resultado.nombre === "usuario"){
            if(resultado.valor.length >6){
                datos_usuario.usuario = resultado.valor
            }
        }
        if(resultado.nombre === "correo"){
            if(validar_correo(resultado.valor)){
                datos_usuario.correo = resultado.valor
            }
        }   
        if(resultado.nombre === "contraseña"){
            if(validar_contra(resultado.valor)){
                datos_usuario.contra = resultado.valor
            }
        }
           
    })
    const guardar_usuario = new registro_usuario(datos_usuario)
    guardar_usuario.save()
    .then(console.log("usuario guardado"))
    .catch(()=> console.log("Error al guardar"))
    
}
export{
    registro_post
}