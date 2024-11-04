<template>
  <q-page class="row justify-center fondo_pagina">
    <div class="col-5 row formulario q-mb-xl flex flex-center">
      <q-card class="col-10 my-card">
        <q-card-section class="flex flex-center q-mb-xs">
            <q-icon name="fas fa-circle-user"  class="text-light-blue-10" size="96px"/>
        </q-card-section>
        <!-- Sección del input de usuario -->
        <div class="row justify-center">
          <q-input
            v-for="(entrada, index) in entradas"
            :key="index"
            color="light-blue-10"
            v-model="entrada.valor"
            filled
            label-color="light-blue-10"
            :label="entrada.nombre"
            class="col-8"
            style="color: white;" 
            input-class="text-light-blue-10"
            :type="entrada.tipo"
             lazy-rules
            :rules="entrada.reglas"
            
           
          >
            <template v-slot:prepend>
               <div>
                    <q-icon :name="entrada.icono" class="text-light-blue-10 q-mr-xs"/>
                </div>
            </template>
            <q-icon v-if="entrada.tipo === 'password' && !entrada.ver" 
                     name="fas fa-eye" 
                     class="ver" 
                     size="24px" 
                     @click="cambiar_estado(entrada)">
            </q-icon>
            <q-icon v-if="entrada.tipo === 'text' && entrada.ver" 
                     name="fas fa-eye-slash" 
                     class="ver" 
                     size="24px" 
                     @click="cambiar_estado(entrada)">
            </q-icon>
          </q-input>
        </div>
        <!-- Sección de "¿Te olvidaste de la contraseña?" -->
        <div class="coso">
          <h6 class="text-light-blue-10 flex flex-center  q-mb-md">
            ¿Ya tienes cuenta?
            <router-link class="olvidar flex flex-center q-ml-md text-light-blue-10" to="/login">Login</router-link>
          </h6>
        </div>

        <!-- Sección de botones -->
        <div class="flex flex-center q-mb-xl">
          <q-btn label="Enviar" class="q-mr-md botones" @click="validar_usuario(entradas)"/>
          <q-btn label="Login" class="botones" @click="enviar_login"/>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue"
import { funciones } from "../composables/mis_funciones"
const  { enviar_login,cambiar_estado,reglas_contra, reglas_repetir_contra,
reglas_correo,reglas_usuario, validar_usuario } = funciones()
const datos_usuario = ref([])
const entradas = ref([
    {nombre:"usuario", valor:"", icono:"fas fa-user", tipo:"text",reglas: reglas_usuario},
    {nombre:"correo", valor:"", icono:"fas fa-envelope", tipo:"email",reglas:reglas_correo},
    {nombre:"contraseña", valor:"", icono:"fas fa-lock", tipo:"password", ver:false,reglas:reglas_contra },
    {nombre:"repetir contraseña", valor:"", icono:"fas fa-lock", tipo:"password", ver:false,reglas:reglas_repetir_contra},
])

</script>

<style soped>
.fondo_pagina{
    background-image: url("./imagenes/fondo.png");
    background-size: 100% 100%;
}
.my-card {
    box-shadow: none;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(40px);
   box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(255, 255, 255),
    3px 3px 3px rgb(101, 101, 101),4px 4px 2px rgb(255, 255, 255),5px 5px 2px rgb(15, 15, 15);
}
.formulario {
    height: 90vh;
    
}
.titulo_login {
    font-size: 3rem;
}
.olvidar {
    color: white;
}
.botones {
    background-color: transparent;
    color: rgb(1,87,155);
    width: 200px;
    border-left: 2px solid rgb(101, 101, 101);
    border-top: 2px solid rgb(101, 101, 101);
    box-shadow: 1px 1px 1px rgb(73, 73, 73), 2px 2px 2px rgb(255, 255, 255),
    3px 3px 3px rgb(101, 101, 101), 4px 4px 2px rgb(255, 255, 255), 5px 5px 2px rgb(15, 15, 15); 
}
.botones:hover {
    background-color: rgb(13, 50, 109);
    color: rgb(255, 255, 255);
    transition: .4s;
}
.ver {
    height: 100%;
    width: 64px;
}



/* Cambiar el color del icono de error 
.q-field--error .q-icon {
  color: rgb(204, 94, 94) !important;  Color del icono de error 
}
.q-field--error .q-field__messages > div {
    color: rgb(204, 94, 94) !important;
}
.q-field--error .q-field__label {
  color: rgb(204, 94, 94) !important; /* Cambiar el color del label 
}*/
</style>
