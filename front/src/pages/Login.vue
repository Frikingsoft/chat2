<template>
  <div class="login row justify-center">
    <div class="uno col-xs-12 col-md-5 row justify-center items-center row">
        <q-card class="tarjeta col-xs-10 col-sm-6 col-md-7">
        <q-card-section class="formulario row justify-center items-center">
            <q-form @submit="onSubmit" @reset="onReset" class="col-10">
            <q-input
                class="q-mb-md"
                v-for="(dato, id) in datos"
                :key="id"
                filled
                v-model="dato.valor"
                :label="dato.etiqueta"
                :type="dato.tipo"
                lazy-rules
                :rules="dato.reglas"
            />

            
            <h3 class="texto_registro flex flex-center q-mb-xl"> 
              Te olvidaste de la contraseña
              <router-link class="flex flex-center q-ml-md" to="/olvido"> Click aquí  </router-link>
            </h3>
      
            <div class="flex flex-center">
                <q-btn label="Enviar" type="submit" class="boton_enviar q-mr-md" @click.prevent="enviar"/>
                <q-btn label="Registro" type="submit" class="boton_enviar" @click="enviar_registro"/>
            
            </div>
            </q-form>
        </q-card-section>
     
        </q-card>
    </div>
    <div class="imagen col-7">

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { funciones } from "../composables/mis_funciones"
const  { enviar_registro,cambiar_estado,reglas_contra, reglas_usuario } = funciones()
const los_datos = ref({})
const licencia = ref(false)
const datos_finales = ref([])
const datos = ref([
  {
    id: 0,
    etiqueta: "Usuario",
    tipo: "text",
    valor: "",
    reglas: reglas_usuario,
  },
  {
    id: 1,
    etiqueta: "Contraseña",
    tipo: "password",
    valor: "",
    reglas: reglas_contra
  }
])

const enviar = async ()=>{
    datos.value.forEach(element => {
    let etiqueta = element.etiqueta
    let valor = element.valor
    let objeto = {
      etiqueta,
      valor
    }
    datos_finales.value.push(objeto)                         
    })
  await axios.post('http://localhost/login',{})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
       
}
</script>

<style scoped>
.formulario{
   height: 100%;
    
}
.login {
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  left: 0;
  z-index: 1;
 
}
.uno{
    background-image: url("/imagenes/mensaje.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
}
.tarjeta {
    height: 50%;
     backdrop-filter: blur(40px);
     background-color: rgba(255, 255, 255, 0.3);
     border-radius: 5%;
     box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(255, 255, 255),
    3px 3px 3px rgb(101, 101, 101),4px 4px 2px rgb(255, 255, 255),5px 5px 2px rgb(15, 15, 15);
}

.imagen{
   background-image: url("/imagenes/fondo.png");
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.boton_enviar{
    width: 40%;
    background-color: transparent;
    color: rgb(13, 50, 109);
    box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(255, 255, 255),
    3px 3px 3px rgb(101, 101, 101),4px 4px 2px rgb(255, 255, 255),5px 5px 2px rgb(15, 15, 15);
}
.boton_enviar:hover{
    transition: .5s;
    background-color: rgb(13, 50, 109);
    color: white;
}
.texto_registro{
  font-size: 1.5rem;
  color: rgb(13, 50, 109);
  display: flex;
  justify-content: baseline;
}

.texto_registro a{
  color: rgb(13, 50, 109);
  font-size: 1.2rem;
}
</style>
