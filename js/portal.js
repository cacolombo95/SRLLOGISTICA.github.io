const FormBuscador = document.getElementById("form1");
const BotonBuscar = document.getElementById("buscar");


FormBuscador.addEventListener("submit", Buscador);
FormBuscador.addEventListener("reset", e=> {
    window.location.reload();
});



function Buscador(e) {
    e.preventDefault();

    BotonBuscar.disabled = true;
    BotonBuscar.style.opacity = "0.5";

    const CodeBuscar = document.querySelector('#code').value;



    //PRIMERO LISTA DE DATOS DE ARCHIVO DATOS.TXT
    
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
                apellido : Lista[2],
                mes: Lista[3]

            };
            LISTADATA.push(DATA);
        }

        return LISTADATA;
    }
    const Datos = ListaDatos();

    // BUSCADOR

    function Busqueda() {
        let Errores = []
        for (i in Datos) {
            let Orden = Datos[i];
            
            if (Orden.code == CodeBuscar  || CodeBuscar == "") {
                const TablaName = document.getElementById("TablaName");
                const TablaNum = document.getElementById("TablaNum");
                const TablaEstado = document.getElementById("TablaEstado");
                const TablaMes = document.getElementById("TablaMes");
    
                TablaName.textContent = `${Orden.apellido}`;
                TablaNum.textContent = `${Orden.code}`;
                TablaEstado.textContent = `${Orden.estado}`;
                TablaMes.textContent = `${Orden.mes}`;
    
            }else {
                Errores.push(Orden);
            }
        }
        return Errores
    }
    const ErroresBuscador = Busqueda();

    if (ErroresBuscador.length == Datos.length) {
        const MensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = `Código INCORRECTO.`;
        
        MensajeError.style.backgroundColor = "yellow";
        MensajeError.style.color = "black";
        MensajeError.style.borderRadius = "10px";
        MensajeError.style.width = "200px";
        MensajeError.style.textAlign = "center";

    }
    return CodeBuscar;

}







