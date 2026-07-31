/*=========================================================
    CAMPAMENTO VEX'HALIA
    SCRIPT.JS V2.0
    BLOQUE 1
=========================================================*/

/*=========================================
 IMPORTACIONES
=========================================*/

import {

    escucharSesion,

    cerrarSesion,

    usuarioActual,

    obtenerRol,

    haySesion

} from "./firebase/auth.js";

import {

    obtenerMisPersonajes

} from "./firebase/personajes.js";

/*=========================================
 VARIABLES GLOBALES
=========================================*/

let personajeActual = null;

const APP = {

    version: "2.0",

    iniciada: false,

    vista: "inicio",

    contenido: null,

    menu: null,

    titulo: null

};

/*=========================================
 INICIO
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarAplicacion

);

function iniciarAplicacion(){

    APP.contenido=document.getElementById("contenido");

    APP.menu=document.getElementById("menu");

    APP.titulo=document.getElementById("titulo");

    escucharSesion(

        actualizarAplicacion

    );

}

/*=========================================
 ACTUALIZAR APP
=========================================*/

async function actualizarAplicacion(){

    crearMenu();

    mostrarInicio();

    APP.iniciada=true;

}

/*=========================================
 MENÚ
=========================================*/

function crearMenu(){

    let html="";

    html+=crearBotonMenu(

        "🏛️",

        "Inicio",

        "inicio"

    );

    html+=crearBotonMenu(

        "📚",

        "Biblioteca",

        "biblioteca"

    );

    html+=crearBotonMenu(

        "🏛️",

        "Casas",

        "casas"

    );

    html+=crearBotonMenu(

        "⚔️",

        "Clases",

        "clases"

    );

    html+=crearBotonMenu(

        "🌍",

        "Nueva Roma",

        "roma"

    );

    html+=crearBotonMenu(

        "🤖",

        "Alexios",

        "alexios"

    );

    if(haySesion()){

        html+=crearBotonMenu(

            "👤",

            "Mi Perfil",

            "perfil"

        );

    }

    if(

        obtenerRol()=="Administrador"

        ||

        obtenerRol()=="Fundador"

    ){

        html+=crearBotonMenu(

            "👑",

            "Administración",

            "admin"

        );

    }

    if(haySesion()){

        html+=`

        <button

        class="menu-btn"

        id="btnCerrarSesion">

        🚪 Cerrar sesión

        </button>

        `;

    }

    APP.menu.innerHTML=html;

    activarEventosMenu();

}

/*=========================================
 BOTONES MENÚ
=========================================*/

function crearBotonMenu(

    icono,

    texto,

    vista

){

    return `

    <button

    class="menu-btn"

    data-vista="${vista}">

    ${icono} ${texto}

    </button>

    `;

}

/*=========================================
 EVENTOS
=========================================*/

function activarEventosMenu(){

    document

    .querySelectorAll(".menu-btn")

    .forEach(

        boton=>{

            if(

                boton.dataset.vista

            ){

                boton.onclick=()=>{

                    abrirVista(

                        boton.dataset.vista

                    );

                };

            }

        }

    );

    const salir=

    document.getElementById(

        "btnCerrarSesion"

    );

    if(salir){

        salir.onclick=async()=>{

            await cerrarSesion();

        };

    }

}

/*=========================================
 NAVEGACIÓN
=========================================*/

function abrirVista(

    vista

){

    APP.vista=vista;

    switch(vista){

        case "inicio":

            mostrarInicio();

        break;

        case "perfil":

            mostrarPerfil();

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

        case "roma":

            mostrarNuevaRoma();

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

    APP.contenido.innerHTML=`

    <div class="tarjeta">

        <h2>

        🏛️ Campamento Vex'Halia

        </h2>

        <p>

        Sistema Oficial V${APP.version}

        </p>

    </div>

    <div class="grid">

        <div class="tarjeta">

            <h3>

            👤 Cuenta

            </h3>

            <p>

            ${

                haySesion()

                ?

                usuarioActual.nombre

                :

                "Invitado"

            }

            </p>

        </div>

        <div class="tarjeta">

            <h3>

            🛡️ Rol

            </h3>

            <p>

            ${obtenerRol()}

            </p>

        </div>

        <div class="tarjeta">

            <h3>

            🤖 Alexios

            </h3>

            <p>

            Disponible próximamente.

            </p>

        </div>

        <div class="tarjeta">

            <h3>

            📢 Noticias

            </h3>

            <p>

            Sin noticias nuevas.

            </p>

        </div>

    </div>

    `;

}

/*=========================================
 PERFIL
=========================================*/

async function mostrarPerfil(){

    if(!haySesion()){

        APP.contenido.innerHTML=`

        <div class="alerta">

        Debes iniciar sesión.

        </div>

        `;

        return;

    }

    const personajes=

    await obtenerMisPersonajes();

    let html=`

    <h2>

    👤 Mi Perfil

    </h2>

    <p>

    ${usuarioActual.nombre}

    </p>

    <p>

    ${usuarioActual.correo}

    </p>

    <hr>

    <h3>

    Mis personajes

    </h3>

    `;

    personajes.forEach(

        personaje=>{

            html+=`

            <div class="tarjeta">

                <h3>

                ${personaje.nombre}

                </h3>

                <p>

                ${personaje.codigo}

                </p>

                <p>

                ${personaje.estado}

                </p>

            </div>

            `;

        }

    );

    html+=`

    <button

    class="btn"

    id="crearPersonaje">

    ➕ Crear personaje

    </button>

    `;

    APP.contenido.innerHTML=html;

                }

/*=========================================================
    SCRIPT.JS V2.0
    BLOQUE 2.1
    LOGIN Y REGISTRO
=========================================================*/

import {

    registrarUsuario,

    iniciarSesion

} from "./firebase/auth.js";

/*=========================================
 LOGIN
=========================================*/

function mostrarLogin(){

    APP.contenido.innerHTML=`

    <div class="login-box">

        <h2>

        🔐 Iniciar sesión

        </h2>

        <input
            id="loginCorreo"
            type="email"
            placeholder="Correo electrónico"
        >

        <input
            id="loginPassword"
            type="password"
            placeholder="Contraseña"
        >

        <button
            class="btn"
            id="btnLogin">

            Entrar

        </button>

        <hr>

        <button
            class="btn-secundario"
            id="btnIrRegistro">

            Crear cuenta

        </button>

    </div>

    `;

    document
    .getElementById("btnLogin")
    .onclick=loginUsuario;

    document
    .getElementById("btnIrRegistro")
    .onclick=mostrarRegistro;

}

/*=========================================
 REGISTRO
=========================================*/

function mostrarRegistro(){

    APP.contenido.innerHTML=`

    <div class="login-box">

        <h2>

        👤 Crear cuenta

        </h2>

        <input
            id="registroNombre"
            placeholder="Nombre completo"
        >

        <input
            id="registroCorreo"
            type="email"
            placeholder="Correo electrónico"
        >

        <input
            id="registroPassword"
            type="password"
            placeholder="Contraseña"
        >

        <input
            id="registroPassword2"
            type="password"
            placeholder="Confirmar contraseña"
        >

        <button
            class="btn"
            id="btnRegistrar">

            Crear cuenta

        </button>

        <hr>

        <button
            class="btn-secundario"
            id="btnVolverLogin">

            Ya tengo cuenta

        </button>

    </div>

    `;

    document
    .getElementById("btnRegistrar")
    .onclick=crearCuenta;

    document
    .getElementById("btnVolverLogin")
    .onclick=mostrarLogin;

}

/*=========================================
 CREAR CUENTA
=========================================*/

async function crearCuenta(){

    const nombre=document
    .getElementById("registroNombre")
    .value.trim();

    const correo=document
    .getElementById("registroCorreo")
    .value.trim();

    const password=document
    .getElementById("registroPassword")
    .value;

    const password2=document
    .getElementById("registroPassword2")
    .value;

    if(nombre==""){

        alert("Escribe tu nombre.");

        return;

    }

    if(correo==""){

        alert("Escribe un correo.");

        return;

    }

    if(password.length<6){

        alert("La contraseña debe tener mínimo 6 caracteres.");

        return;

    }

    if(password!=password2){

        alert("Las contraseñas no coinciden.");

        return;

    }

    const respuesta=await registrarUsuario({

        nombre:nombre,

        correo:correo,

        password:password

    });

    if(respuesta.ok){

        alert(

            "Cuenta creada correctamente."

        );

        mostrarLogin();

    }else{

        alert(respuesta.error);

    }

}

/*=========================================
 LOGIN
=========================================*/

async function loginUsuario(){

    const correo=document
    .getElementById("loginCorreo")
    .value.trim();

    const password=document
    .getElementById("loginPassword")
    .value;

    if(correo==""){

        alert("Escribe tu correo.");

        return;

    }

    if(password==""){

        alert("Escribe tu contraseña.");

        return;

    }

    const respuesta=await iniciarSesion(

        correo,

        password

    );

    if(respuesta.ok){

        alert(

            "Bienvenido a Vex'Halia."

        );

    }else{

        alert(

            respuesta.error

        );

    }

    }
