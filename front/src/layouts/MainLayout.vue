<template>
  <q-layout>
    <q-page-container class="row justify-center">
      <router-view class="col-12"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
//import { io } from 'socket.io-client'

const el_mensaje = ref(null)
const socket = ref(null)  // Para almacenar la conexión de Socket.IO

defineOptions({
  name: 'MainLayout'
})
/*
// Conectar a Socket.IO cuando el componente se monta
onMounted(() => {
  socket.value = io('http://localhost:80') // Ajusta la URL si es necesario
  el_mensaje.value = localStorage.getItem("id")
  // Escuchar mensajes del servidor
     if(el_mensaje.value === null){
       socket.value.on('generar_id', (mensaje) => {
          localStorage.setItem("id", mensaje)
          //socket.value.emit('id', el_mensaje.value)
          el_mensaje.value = localStorage.getItem("id")
       })
     }
     

  // Enviar un mensaje al servidor después de la conexión
  
})

// Desconectar de Socket.IO cuando el componente se desmonta
/*onBeforeUnmount(() => {
 /* if (socket.value) {
    socket.value.disconnect()
    console.log('Desconectado de Socket.IO')
  }
})*/

</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
 
  
</style>
