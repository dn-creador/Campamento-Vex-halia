import {
    escucharSesion,
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    usuarioActual,
    datosUsuario
} from "./firebase/auth.js";

import {
    mostrarPerfil
} from "./modules/perfil.js";

/*==========================================
    INICIO
==========================================*/

window.addEventListener("DOMContentLoaded", iniciar);

function iniciar(){

    escucharSesion(cambiarEstadoSesion);

}

/*==========================================
    CAMBIO DE SESIÓN
==========================================*/

async function cambiarEstadoSesion(usuario,datos){

    if(usuario){

        document.getElementById("usuarioPanel").textContent=datos.nombre;

        await mostrarPerfil();

    }else{

        mostrarLogin();

    }

}

/*==========================================
    LOGIN
==========================================*/

function mostrarLogin(){

    const contenido=document.getElementById("contenido");

    contenido.innerHTML=`

    <div class="card" style="max-width:500px;margin:auto;">

        <h2>Campamento Vex'Halia</h2>

        <br>

        <input
            id="correo"
            placeholder="Correo">

        <input
            id="password"
            type="password"
            placeholder="Contraseña">

        <button
            class="btn"
            id="btnLogin">

            Iniciar sesión

        </button>

        <br><br>

        <button
            class="btn"
            id="btnRegistro">

            Crear cuenta

        </button>

    </div>

    `;

    document
    .getElementById("btnLogin")
    .onclick=login;

    document
    .getElementById("btnRegistro")
    .onclick=registro;

}

/*==========================================
    LOGIN
==========================================*/

async function login(){

    const correo=document.getElementById("correo").value;

    const password=document.getElementById("password").value;

    const resultado=await iniciarSesion(

        correo,

        password

    );

    if(!resultado.ok){

        alert(resultado.mensaje);

    }

}

/*==========================================
    REGISTRO
==========================================*/

async function registro(){

    const nombre=prompt("Nombre:");

    if(!nombre)return;

    const correo=document.getElementById("correo").value;

    const password=document.getElementById("password").value;

    const resultado=await registrarUsuario(

        nombre,

        correo,

        password

    );

    if(resultado.ok){

        alert("Cuenta creada correctamente.");

    }else{

        alert(resultado.mensaje);

    }

}
