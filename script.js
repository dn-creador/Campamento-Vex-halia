import { db } from "./firebase/firebaseConfig.js";

import { auth } from "./firebase/firebaseConfig.js";

/*=========================================================
    CAMPAMENTO VEX'HALIA
    SCRIPT.JS V1.1
    BLOQUE 1
=========================================================*/

/*=========================================
 VARIABLES GLOBALES
=========================================*/

let usuarioActual = null;
let personajeActual = null;
let vistaActual = "inicio";

const APP = {

    version: "1.1",

    iniciada: false,

    contenido: null,

    menu: null

};

/*=========================================
 INICIO
=========================================*/

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

function iniciarAplicacion(){

    APP.contenido = document.getElementById("contenido");
    APP.menu = document.getElementById("menu");

    cargarSesion();
    cargarPersonajes();

    crearMenu();

    mostrarInicio();

    APP.iniciada = true;

    console.log("Campamento Vex'Halia V1.1 iniciado");

}

/*=========================================
 SESIÓN
=========================================*/

function cargarSesion(){

    const datos = localStorage.getItem("usuarioActual");

    if(datos){

        usuarioActual = JSON.parse(datos);

    }

}

function guardarSesion(){

    if(usuarioActual){

        localStorage.setItem(

            "usuarioActual",

            JSON.stringify(usuarioActual)

        );

    }

}

function cerrarSesion(){

    usuarioActual = null;

    personajeActual = null;

    localStorage.removeItem("usuarioActual");

    mostrarInicio();

}

function obtenerRol(){

    if(usuarioActual==null){

        return "Invitado";

    }

    return usuarioActual.rol;

}

/*=========================================
 PERSONAJES
=========================================*/

function cargarPersonajes(){

    const datos = localStorage.getItem("personajes");

    if(datos){

        PERSONAJES.splice(

            0,

            PERSONAJES.length,

            ...JSON.parse(datos)

        );

    }

}

function guardarPersonajes(){

    localStorage.setItem(

        "personajes",

        JSON.stringify(PERSONAJES)

    );

}

function generarIDPersonaje(){

    return "VXH-"+

    String(

        PERSONAJES.length+1

    ).padStart(4,"0");

}

/*=========================================
 CUENTAS
=========================================*/

function obtenerPersonajesUsuario(){

    if(usuarioActual==null){

        return [];

    }

    return PERSONAJES.filter(

        personaje=>{

            return usuarioActual.personajes.includes(

                personaje.id

            );

        }

    );

}

function personajesAprobados(){

    return obtenerPersonajesUsuario().filter(

        personaje=>{

            return personaje.estado==="Aprobado";

        }

    );

}

function limitePersonajes(){

    const rol = obtenerRol();

    switch(rol){

        case "Administrador":

            return CONFIG.personajes.maxAdmin;

        case "Fundador":

            return CONFIG.personajes.maxFundador;

        default:

            return CONFIG.personajes.maxCampista;

    }

}

function puedeCrearPersonaje(){

    return true;

}

function puedeAprobarOtro(){

    return personajesAprobados().length

        <

        limitePersonajes();

}

/*=========================================
 UTILIDADES
=========================================*/

function cambiarVista(nombre){

    vistaActual = nombre;

}

function limpiarContenido(){

    APP.contenido.innerHTML="";

}

function crearTarjeta(titulo,contenido){

    return `

    <div class="tarjeta">

        <h3>${titulo}</h3>

        <p>${contenido}</p>

    </div>

    `;

}

function crearBoton(

texto,

clase="btn",

id=""

){

    return `

    <button

    class="${clase}"

    id="${id}">

    ${texto}

    </button>

    `;

}

/*=========================================================
    CAMPAMENTO VEX'HALIA
    SCRIPT.JS V1.1
    BLOQUE 2
=========================================================*/

/*=========================================
 MENÚ PRINCIPAL
=========================================*/

function crearMenu(){

    let html="";

    html+=botonMenu("🏛️","Inicio","inicio");
    html+=botonMenu("👤","Mi Perfil","perfil");
    html+=botonMenu("📜","Registro","registro");
    html+=botonMenu("📚","Biblioteca","biblioteca");
    html+=botonMenu("🏛️","Casas","casas");
    html+=botonMenu("🎖️","Clases","clases");
    html+=botonMenu("💰","Economía","economia");
    html+=botonMenu("🌍","Nueva Roma","roma");
    html+=botonMenu("🔗","Grupos","grupos");
    html+=botonMenu("🤖","Alexios","alexios");

    if(
        obtenerRol()=="Administrador" ||
        obtenerRol()=="Fundador"
    ){

        html+=botonMenu(
            "👑",
            "Panel Admin",
            "admin"
        );

    }

    APP.menu.innerHTML=html;

    document.querySelectorAll(".menu-btn").forEach(

        boton=>{

            boton.onclick=()=>{

                abrirVista(

                    boton.dataset.vista

                );

            };

        }

    );

}

function botonMenu(icono,texto,vista){

    return `

    <button

    class="menu-btn"

    data-vista="${vista}">

    ${icono} ${texto}

    </button>

    `;

}

/*=========================================
 NAVEGACIÓN
=========================================*/

function abrirVista(vista){

    cambiarVista(vista);

    switch(vista){

        case "inicio":

            mostrarInicio();

        break;

        case "perfil":

            mostrarPerfil();

        break;

        case "registro":

            mostrarRegistro();

        break;

        case "biblioteca":

            mostrarBiblioteca();

        break;

        case "casas":

            mostrarCasas();

        break;

        case "clases":

            mostrarClases();

        break;

        case "economia":

            mostrarEconomia();

        break;

        case "roma":

            mostrarNuevaRoma();

        break;

        case "grupos":

            mostrarGrupos();

        break;

        case "alexios":

            mostrarAlexios();

        break;

        case "admin":

            mostrarPanelAdmin();

        break;

    }

}

/*=========================================
 INICIO
=========================================*/

function mostrarInicio(){

    limpiarContenido();

    APP.contenido.innerHTML=`

    <div class="tarjeta">

        <h2>

        🏛️ Campamento Vex'Halia

        </h2>

        <p>

        Bienvenido al sistema oficial.

        </p>

    </div>

    <div class="grid">

        ${crearTarjeta(

            "📢 Noticias",

            "Próximamente aparecerán aquí los anuncios oficiales."

        )}

        ${crearTarjeta(

            "👥 Jugadores",

            PERSONAJES.length+" personajes registrados."

        )}

        ${crearTarjeta(

            "📚 Biblioteca",

            "Consulta reglas, clases, economía e historia."

        )}

        ${crearTarjeta(

            "🤖 Alexios",

            "Tu asistente del Campamento."

        )}

    </div>

    `;

}

/*=========================================
 PERFIL
=========================================*/

function mostrarPerfil(){

    limpiarContenido();

    if(usuarioActual==null){

        APP.contenido.innerHTML=`

        <div class="alerta alerta-info">

        Debes iniciar sesión para acceder a tu perfil.

        </div>

        `;

        return;

    }

    const lista=obtenerPersonajesUsuario();

    let html=`

    <div class="perfil">

    <div class="perfil-header">

    <div class="avatar">

    👤

    </div>

    <div class="info">

    <h2>${usuarioActual.nombre}</h2>

    <p>

    ${usuarioActual.correo}

    </p>

    <span class="badge oro">

    ${usuarioActual.rol}

    </span>

    </div>

    </div>

    <hr>

    <h3>

    Mis Personajes

    </h3>

    `;

    if(lista.length===0){

        html+=`

        <p>

        No tienes personajes todavía.

        </p>

        `;

    }else{

        lista.forEach(personaje=>{

            html+=`

            <div class="tarjeta">

            <h3>

            ${personaje.nombre}

            </h3>

            <p>

            Casa:

            ${personaje.casa}

            </p>

            <p>

            Nivel:

            ${personaje.nivel}

            </p>

            <p>

            Estado:

            ${personaje.estado}

            </p>

            </div>

            `;

        });

    }

    html+=`

    <br>

    <button

    class="btn"

    id="nuevoPersonaje">

    ➕ Crear Personaje

    </button>

    </div>

    `;

    APP.contenido.innerHTML=html;

    document.getElementById(

        "nuevoPersonaje"

    ).onclick=()=>{

        mostrarRegistro();

    };

}

/*=========================================================
    SCRIPT.JS V1.1
    BLOQUE 3
=========================================================*/

/*=========================================
 SISTEMA DE MÓDULOS
=========================================*/

const Modulos={

    auth:null,

    personajes:null,

    admin:null,

    alexios:null,

    ui:null

};

/*=========================================
 REGISTRO DE MÓDULOS
=========================================*/

function registrarModulo(nombre,objeto){

    Modulos[nombre]=objeto;

}

/*=========================================
 PANEL ADMIN
=========================================*/

function mostrarPanelAdmin(){

    limpiarContenido();

    if(

        obtenerRol()!="Administrador"

        &&

        obtenerRol()!="Fundador"

    ){

        APP.contenido.innerHTML=`

        <div class="alerta alerta-error">

        No tienes permisos para acceder.

        </div>

        `;

        return;

    }

    APP.contenido.innerHTML=`

    <h2>

    👑 Panel Administrativo

    </h2>

    <div class="admin-panel">

        <div class="admin-card">

            <h3>📥 Solicitudes</h3>

            <p>

            Revisar personajes pendientes.

            </p>

            <button

            class="btn"

            onclick="mostrarSolicitudes()">

            Abrir

            </button>

        </div>

        <div class="admin-card">

            <h3>👥 Jugadores</h3>

            <p>

            Ver todas las cuentas.

            </p>

            <button

            class="btn"

            onclick="mostrarJugadores()">

            Abrir

            </button>

        </div>

        <div class="admin-card">

            <h3>🏛️ Casas</h3>

            <p>

            Administrar información.

            </p>

        </div>

        <div class="admin-card">

            <h3>📚 Biblioteca</h3>

            <p>

            Editar artículos.

            </p>

        </div>

        <div class="admin-card">

            <h3>🤖 Alexios</h3>

            <p>

            Configuración.

            </p>

        </div>

        <div class="admin-card">

            <h3>⚙️ Sistema</h3>

            <p>

            Configuración general.

            </p>

        </div>

    </div>

    `;

}

/*=========================================
 SOLICITUDES
=========================================*/

function mostrarSolicitudes(){

    limpiarContenido();

    const pendientes=PERSONAJES.filter(

        personaje=>personaje.estado=="Pendiente"

    );

    let html=`

    <h2>

    📥 Solicitudes

    </h2>

    `;

    if(pendientes.length===0){

        html+=`

        <div class="alerta alerta-ok">

        No existen solicitudes pendientes.

        </div>

        `;

    }

    pendientes.forEach(personaje=>{

        html+=`

        <div class="tarjeta">

            <h3>

            ${personaje.nombre}

            </h3>

            <p>

            Casa:

            ${personaje.casa}

            </p>

            <p>

            Propietario:

            ${personaje.propietario}

            </p>

            <br>

            <button

            class="btn-verde"

            onclick="aprobarPersonaje('${personaje.id}')">

            Aprobar

            </button>

            <button

            class="btn-rojo"

            onclick="rechazarPersonaje('${personaje.id}')">

            Rechazar

            </button>

        </div>

        `;

    });

    APP.contenido.innerHTML=html;

}

/*=========================================
 APROBACIONES
=========================================*/

function aprobarPersonaje(id){

    alert(

    "En el siguiente bloque se conectará con la base de datos."

    );

}

function rechazarPersonaje(id){

    alert(

    "En el siguiente bloque se conectará con la base de datos."

    );

}

/*=========================================
 CUENTAS
=========================================*/

function mostrarJugadores(){

    limpiarContenido();

    let html=`

    <h2>

    👥 Cuentas

    </h2>

    <table>

    <tr>

    <th>Nombre</th>

    <th>Correo</th>

    <th>Rol</th>

    <th>Personajes</th>

    </tr>

    `;

    USUARIOS.forEach(usuario=>{

        html+=`

        <tr>

        <td>${usuario.nombre}</td>

        <td>${usuario.correo}</td>

        <td>${usuario.rol}</td>

        <td>${usuario.personajes.length}</td>

        </tr>

        `;

    });

    html+=`

    </table>

    `;

    APP.contenido.innerHTML=html;

}

