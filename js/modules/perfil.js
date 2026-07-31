// ==========================================
// CAMPAMENTO VEX'HALIA V3
// PERFIL.JS
// ==========================================

import {
    usuarioActual,
    datosUsuario
} from "../firebase/auth.js";

import {
    obtenerMisPersonajes
} from "./personajes.js";

/*==========================================
    MOSTRAR PERFIL
==========================================*/

export async function mostrarPerfil(){

    const contenido=document.getElementById("contenido");

    if(!usuarioActual){

        contenido.innerHTML=`

            <div class="card">

                <h2>🔒 Debes iniciar sesión</h2>

                <p>Inicia sesión para acceder a tu perfil.</p>

            </div>

        `;

        return;

    }

    const personajes=await obtenerMisPersonajes(usuarioActual.uid);

    contenido.innerHTML=`

        <div class="welcome-card">

            <h2>${datosUsuario.nombre}</h2>

            <p>${datosUsuario.correo}</p>

            <p><b>Rol:</b> ${datosUsuario.rol}</p>

        </div>

        <br>

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>📜 Mis Personajes</h2>

            <button
                class="btn"
                id="btnNuevoPersonaje">

                Crear personaje

            </button>

        </div>

        <br>

        <div
            id="listaPersonajes"
            class="dashboard-grid">

        </div>

    `;

    const lista=document.getElementById("listaPersonajes");

    if(personajes.length===0){

        lista.innerHTML=`

            <div class="card">

                <h3>No tienes personajes.</h3>

                <p>Pulsa "Crear personaje".</p>

            </div>

        `;

    }else{

        personajes.forEach(personaje=>{

            lista.innerHTML+=crearTarjeta(personaje);

        });

    }

    document

        .getElementById("btnNuevoPersonaje")

        .onclick=abrirFormularioPersonaje;

}

/*==========================================
    TARJETA
==========================================*/

function crearTarjeta(personaje){

    let color="#888";

    switch(personaje.estado){

        case "Aprobado":

            color="#2ecc71";

            break;

        case "Pendiente":

            color="#f1c40f";

            break;

        case "Rechazado":

            color="#e74c3c";

            break;

    }

    return `

        <div class="card">

            <img

                src="${
                    personaje.foto || "images/default-character.png"
                }"

                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                    border-radius:12px;
                "

            >

            <br><br>

            <h3>

                ${personaje.nombre}

                ${personaje.apellido}

            </h3>

            <p>

                <b>Código:</b>

                ${personaje.codigo}

            </p>

            <p>

                <b>Casa:</b>

                ${personaje.casa}

            </p>

            <p>

                <b>Clase:</b>

                ${personaje.clase}

            </p>

            <p>

                <b>Nivel:</b>

                ${personaje.nivel}

            </p>

            <p>

                <b>Estado:</b>

                <span style="color:${color};font-weight:bold;">

                    ${personaje.estado}

                </span>

            </p>

            <br>

            <button
                class="btn"
                onclick="alert('La ficha completa se añadirá en el siguiente módulo.')">

                Ver ficha

            </button>

        </div>

    `;

}

/*==========================================
    FORMULARIO
==========================================*/

function abrirFormularioPersonaje(){

    const modal=document.getElementById("modal");

    const body=document.getElementById("modalBody");

    body.innerHTML=`

        <h2>Nuevo Personaje</h2>

        <input id="nombrePJ" placeholder="Nombre">

        <input id="apellidoPJ" placeholder="Apellido">

        <input id="casaPJ" placeholder="Casa Divina">

        <input id="clasePJ" placeholder="Clase">

        <button
            class="btn"
            id="guardarPersonaje">

            Guardar

        </button>

    `;

    modal.classList.remove("oculto");

}
