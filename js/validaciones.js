export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }

    console.log(input.parentElement);

    if(input.validity.valid){
      input.parentElement.classList.remove("input-container--invalid"); 
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
      input.parentElement.classList.add("input-container--invalid"); 
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

  }

  const tiposDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError" 
  ]

  const mensajesError = {
    nombre : {
      valueMissing: "Este Campo no puede estar vacio, debe ir tu nombre",
    },

    email : {
      valueMissing: "Este Campo no puede estar vacio, debe ir tu correo electronico",
      typeMismatch: "El correo no es valido ",
    },

    contrasenia : {
      valueMissing: "Este Campo no puede estar vacio",
      patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    
    nacimiento : {
      valueMissing: "Este Campo no puede estar vacio",
      customError: "Debes tener al menos 18 años de edad"
    },
    
    numero: {
      valueMissing: "Este Campo no puede estar vacio",
      patternMismatch: "debe contener 10 numeros",
    },
    
    direccion: {
      valueMissing: "Este Campo no puede estar vacio",
      patternMismatch: "debe contener 10 numeros",
    },
    
    ciudad: {
      valueMissing: "Este Campo no puede estar vacio",
      patternMismatch: "debe contener 10 numeros",
    },
    
    estado: {
      valueMissing: "Este Campo no puede estar vacio",
      patternMismatch: "debe contener 10 numeros",
    }

  }
  
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

  function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "" ;
    tiposDeError.forEach((error) =>{
      if(input.validity[error]){

        mensaje = mensajesError[tipoDeInput][error];
      }
    });
    return mensaje;
  }

  
  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";

    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );

    return diferenciaFechas <= fechaActual;
  }