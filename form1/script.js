document.addEventListener("DOMContentLoaded", function() {
    const formulario =document.getElementById("formGato");

    if (formulario){
        formulario.addEventListener("submit", function(event) {

            // Evita que el formulario se envíe
            event.preventDefault();

            // Obtener valores
            const color =
                document.getElementById("color").value.trim();

            const nombre =
                document.getElementById("nombre").value.trim();

            const edad =
                document.getElementById("edad").value.trim();

            // Limpiar mensajes
            document.getElementById("errorColor").textContent = "";
            document.getElementById("errorNombre").textContent = "";
            document.getElementById("errorEdad").textContent = "";
            document.getElementById("mensaje").textContent = "";

            let valido = true;

            // Validar color
            if (color === "") {

                document.getElementById("errorColor")
                    .textContent = "Debe ingresar el color.";

                valido = false;
            }

            // Validar nombre
            if (nombre === "") {

                document.getElementById("errorNombre")
                    .textContent = "Debe ingresar el nombre.";

                valido = false;
            }

            // Validar edad
            if (edad === "") {

                document.getElementById("errorEdad")
                    .textContent = "Debe ingresar la edad.";

                valido = false;
            }

            // Resultado
            if (valido) {

                const gatos = JSON.parse(localStorage.getItem("gatos")) || [];

                const gato = {
                    color: color,
                    nombre: nombre,
                    edad: edad
                };

                gatos.push(gato);

                localStorage.setItem("gatos", JSON.stringify(gatos));

                document.getElementById("mensaje")
                    .textContent =
                    "Gato agregado correctamente.";

                formulario.reset();
            }

        });
    }

    const cuerpoTabla = document.getElementById("cuerpoTabla");
    if(cuerpoTabla) {
        const mensajeVacio = document.getElementById("mensajeVacio");
        const gatos = JSON.parse(localStorage.getItem("gatos")) || [];

        if (gatos.length === 0) {
            mensajeVacio.textContent = "Aún no hay gatitos en el registro. ¡Agrega el primero!";
            const tabla = document.getElementById("tablaGatos");
            if (tabla) tabla.style.display = "none";
        } else {
            gatos.forEach(gato => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${gato.nombre}</td>
                    <td>${gato.color}</td>
                    <td>${gato.edad} ${gato.edad == 1 ? 'año' : 'años'}</td>
                `;
                cuerpoTabla.appendChild(fila);
            });
        }
    }
}
);