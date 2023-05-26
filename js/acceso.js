const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const boton = document.getElementById("acceder");
const form = document.getElementById("form__acceso");
const AccesoDenegado = document.getElementById("AccesoDenegado");

form.addEventListener("reset", e=> {
    window.location.reload();
})

boton.addEventListener("click", (e) => {
    e.preventDefault();
    boton.disabled = true;
    boton.style.opacity = "0.5";

    const Datos = {
        U: usuario.value,
        C: contraseña.value
    }
    console.log(Datos);

    if (Datos.C == "Empleado" && Datos.U == "UsuarioDeEmpleado" ){
        window.location = "../html/portal.html";


    }else{
        AccesoDenegado.textContent = `Usuario y/o contraseña INCORRECTOS`; 
        AccesoDenegado.style.backgroundColor = "yellow";

    }
    
})
