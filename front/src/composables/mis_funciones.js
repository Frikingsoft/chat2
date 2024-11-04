import { useRouter } from "vue-router";
import { ref } from "vue";

export const funciones = () => {
  const router = useRouter();
  const contraseña = ref(''); // Almacena el valor de la contraseña original
  
    
  const enviar_login = () => {
    router.push("/login");
  };
  const enviar_registro = () => {
    router.push("/registro");
  };
  const enviar_datos = () => {
    alert("coso");
  };
  const cambiar_estado = (entrada) => {
    entrada.ver = !entrada.ver; // Cambia el estado de 'ver'
    entrada.tipo = entrada.ver ? "text" : "password"; // Cambia el tipo de input
  };

  const reglas_usuario = [
    (val) => (val && val.length > 6 ) || "Ingrese un nombre de usuario con al menos  6 caracteres",
            
  ];

  const reglas_correo = [
    (val) => (val && /.+@.+\..+/.test(val)) || "Correo inválido"
   ]

  const reglas_contra = [
    (val) => {
      contraseña.value = val; // Almacena el valor de la contraseña
      return (val && val.length >= 8) || "La contraseña debe tener al menos 8 caracteres"; // Verifica la longitud
    },
    (val) => (val && /[A-Z]/.test(val)) || "Debe incluir al menos una letra mayúscula",
    (val) => (val && /[a-z]/.test(val)) || "Debe incluir al menos una letra minúscula",
    (val) => (val && /\d/.test(val)) || "Debe incluir al menos un número",
    (val) => (val && /[!@#$%^&*(),.?":{}|<>]/.test(val)) || "Debe incluir al menos un carácter especial"
   
  ];

  const reglas_repetir_contra = [
    (val) => (val && val.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
    (val) => (val && /[A-Z]/.test(val)) || "Debe incluir al menos una letra mayúscula",
    (val) => (val && /[a-z]/.test(val)) || "Debe incluir al menos una letra minúscula",
    (val) => (val && /\d/.test(val)) || "Debe incluir al menos un número",
    (val) => (val && /[!@#$%^&*(),.?":{}|<>]/.test(val)) || "Debe incluir al menos un carácter especial",
    (val) => (val === contraseña.value) || "Las contraseñas no coinciden" // Comparar con el campo de Contraseña
  ];

  const validar_usuario = async(entradas) => {
    let valido = true
    entradas.forEach((entrada) => {
      // Aplica cada regla a la entrada
      entrada.reglas.forEach((regla) => {
        const resultado = regla(entrada.valor);
        if (resultado !== true) {
          //console.log(`Error en ${entrada.nombre}: ${resultado}`);
          valido = false; // Si alguna regla falla, la validación no es válida
        }
      });
    });
  
    if (valido) {
      await fetch("http://localhost/registro", {
        method: "POST", // Método POST para enviar datos
        headers: {
          "Content-Type": "application/json", // Indica que envías datos en formato JSON
        },
        body: JSON.stringify({
          entradas
        }),
      })
    } else {
      console.log("Formulario inválido, revisa los errores.");
    }
  };
  return {
    enviar_login,
    enviar_registro,
    cambiar_estado,
    enviar_datos,
    reglas_usuario,
    reglas_correo,
    reglas_contra,
    reglas_repetir_contra,
    validar_usuario
  };
};
