
// IMPRIMIR DATOS FORMULARIO

const form = document.querySelector("#form__norden");
const Buscar = document.getElementById("buscar");

form.addEventListener( "submit", barraProgreso);
form.addEventListener("reset", e=> {
    window.location.reload();
})

function barraProgreso(e){
    e.preventDefault();
    Buscar.disabled = true;
    Buscar.style.opacity = "0.5";

    const barra = document.getElementById("barra__progreso");
    const nombre = document.querySelector("#nombre").value;
    const codigo = document.querySelector("#codigo").value;

    const holanombre = document.getElementById("holanombre");
    const ordenN = document.getElementById("ordenN");

    holanombre.textContent = `Hola, ${nombre}!`;


    var archivoTxt = new XMLHttpRequest();
    var fileRuta = '../js/datos.txt';

    archivoTxt.open("GET",fileRuta,false);
    archivoTxt.send(null);
    var txt = archivoTxt.responseText;
    
    const lineas = txt.split('\r\n');

    function ListaDatos(){
        let LISTADATA = []
        for (let i=0; i< lineas.length;i++){
            let Lista = lineas[i].split(',');
            let DATA = {
                code : Lista[0],
                estado : Lista[1],
            };
            LISTADATA.push(DATA);
        }

        return LISTADATA;
    }
    const Datos = ListaDatos();


    function Activador() {
        let Errores = []

        for (i in Datos) {
            const Orden = Datos[i];
            const linea = document.getElementById('linea');
            linea.style.borderBottom = '1px Solid White';
            
            if (Orden.code == codigo) {
                ordenN.textContent = `Orden N° ${codigo}`;
                barra.style.display='flex';
        
                const uno = document.querySelector(".uno");
                const dos = document.querySelector(".dos");
                const tres = document.querySelector(".tres");
                const cuatro = document.querySelector(".cuatro");
    
                if (Orden.estado == '1'){
                    uno.classList.add("active");
                    dos.classList.remove("active");
                    tres.classList.remove("active");
                    cuatro.classList.remove("active");}
        
                if (Orden.estado == '2'){
                    uno.classList.add("active");
                    dos.classList.add("active");
                    tres.classList.remove("active");
                    cuatro.classList.remove("active");}
        
                if (Orden.estado == '3'){
                    uno.classList.add("active");
                    dos.classList.add("active");
                    tres.classList.add("active");
                    cuatro.classList.remove("active");}
    
                if (Orden.estado == '4'){
                    uno.classList.add("active");
                    dos.classList.add("active");
                    tres.classList.add("active");
                    cuatro.classList.add("active");}
                
            } else {
                Errores.push(Orden);
            }
        }
        return Errores;
    }
    const ErroresActivador = Activador();

    if (ErroresActivador.length == Datos.length){
        barra.style.display = "none";

        const error = document.getElementById("error");
        error.textContent = `El código ingresado es INCORRECTO`;
        error.style.display = "flex";
        error.style.justifyContent = "center";
        error.style.borderRadius = "8px";
        error.style.backgroundColor = "yellow";
    
    } 
       
}










