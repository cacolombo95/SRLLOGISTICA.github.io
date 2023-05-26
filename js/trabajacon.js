const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]+$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	numeros: /^\d{0,10}[^\s]$/ //numeros.
}

let hoy = new Date();
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

// objeto para ver si estan validados todos los campos
const validacion ={
	nombre: false,
	apellido: false,
	dni: false,
	fecha: false,
	correo: false
}

// funcion que valida los campos
// parametros input del campo que hay que validar,la expresion con la cual hay que comparar, nombre del campo o input, para su clase
function validarcampo (input,expresion,campo){
	if(expresion.test(input.value)){
		document.querySelector(`.${campo} p`).classList.remove("msj-error-activo");
		// el if es solo para los que tienen el icono en su input
		if(campo!="dni"){
			document.querySelector(`.${campo} i`).classList.remove("validacion-activo");
		}

		if(campo=="correo-electronico"){
			validacion.correo=true;
		}else{
			validacion[campo]=true;
		}
	}else{

		document.querySelector(`.${campo} p`).classList.add("msj-error-activo");

		if(campo!="dni"){
			document.querySelector(`.${campo} i`).classList.add("validacion-activo");
		}

		if(campo=="correo-electronico"){
			validacion.correo=false;
		}else{
			validacion[campo]=false;
		}
	}
};

function validarform (event) {
	switch(event.target.name){
		case "nombre":
			validarcampo(event.target,expresiones.nombre,"nombre");
		break
		case "apellido":
			validarcampo(event.target,expresiones.nombre,"apellido");
		break
		case "dni":
			validarcampo(event.target,expresiones.numeros,"dni");
		break
		case "correo-electronico":
			validarcampo(event.target,expresiones.correo,"correo-electronico");
		break
		case "fecha_de_nacimiento":
			if(event.target.valueAsDate>hoy){
				event.target.valueAsDate=hoy;
				document.querySelector(".fecha_de_nacimiento p").classList.add("msj-error-fecha-activo");
				validacion["fecha"]=true;
			}else{
				document.querySelector(".fecha_de_nacimiento p").classList.remove("msj-error-fecha-activo");
				validacion["fecha"]=true;
			};
			
		break
	}
}

inputs.forEach((input)=>{
	input.addEventListener('keyup',validarform);
	input.addEventListener('blur',validarform);
})

formulario.addEventListener('submit',async (event)=>{
	event.preventDefault();

	const form = new FormData(event.target);
	console.log(form);
	var mensaje_envio = document.getElementById("msj-envio");

	if(validacion.nombre && validacion.apellido && validacion.fecha && validacion.dni && validacion.correo){ 
		formulario.reset();	//borra el contenido de todos los campos

		// realiza una peticion y guarda la respuesta en "respuesta"
		const respuesta = await fetch(event.target.action, {
			method: formulario.method,
			body: form,
			headers: {
				'Accept': 'application/json'
			}
		})

		if(respuesta.ok){

			//cambia el contenido de la etiqueta p, le agrega la clase para visualizarlo y despues de un tiempo le saca la clase

			mensaje_envio.innerHTML = "El formularo se envio correctamente!";  
			mensaje_envio.classList.add("msj-envio-correcto");
			setTimeout(()=>{
				mensaje_envio.classList.remove("msj-envio-correcto");
			},4000);
		}

	}else{

		//cambia el contenido de la etiqueta p, le agrega la clase para visualizarlo y despues de un tiempo le saca la clase

		mensaje_envio.innerHTML = "Complete el formulario";
		mensaje_envio.classList.add("msj-envio-incorrecto");
		setTimeout(()=>{
			mensaje_envio.classList.remove("msj-envio-incorrecto");
		},3000);
	}
})