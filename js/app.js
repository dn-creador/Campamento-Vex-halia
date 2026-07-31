/*==================================================
    CAMPAMENTO VEX'HALIA V3
    APP.JS
==================================================*/

const APP = {

    nombre: "Campamento Vex'Halia",

    version: "3.0",

    usuario: null,

    rol: "Invitado",

    vistaActual: "inicio"

};

/*==================================================
    MENÚ PRINCIPAL
==================================================*/

const MENU = [

{
    id:"inicio",
    icono:"🏠",
    texto:"Inicio"
},

{
    id:"perfil",
    icono:"👤",
    texto:"Mi Perfil"
},

{
    id:"personajes",
    icono:"📜",
    texto:"Personajes"
},

{
    id:"biblioteca",
    icono:"📚",
    texto:"Biblioteca"
},

{
    id:"casas",
    icono:"🏛️",
    texto:"Casas Divinas"
},

{
    id:"clases",
    icono:"⚔️",
    texto:"Clases"
},

{
    id:"eventos",
    icono:"📅",
    texto:"Eventos"
},

{
    id:"economia",
    icono:"💰",
    texto:"Economía"
},

{
    id:"inventario",
    icono:"🎒",
    texto:"Inventario"
},

{
    id:"alexios",
    icono:"🤖",
    texto:"Alexios"
}

];

/*==================================================
    INICIO
==================================================*/

window.addEventListener(

    "DOMContentLoaded",

    iniciarApp

);

function iniciarApp(){

    crearMenu();

    abrirVista("inicio");

    activarBotones();

}

/*==================================================
    MENÚ
==================================================*/

function crearMenu(){

    const menu=document.getElementById("menu");

    menu.innerHTML="";

    MENU.forEach(item=>{

        const boton=document.createElement("button");

        boton.className="menu-item";

        boton.dataset.vista=item.id;

        boton.innerHTML=`

            <span>${item.icono}</span>

            <span>${item.texto}</span>

        `;

        boton.onclick=()=>{

            abrirVista(item.id);

        };

        menu.appendChild(boton);

    });

}

/*==================================================
    NAVEGACIÓN
==================================================*/

function abrirVista(vista){

    APP.vistaActual=vista;

    document

    .querySelectorAll(".menu-item")

    .forEach(btn=>{

        btn.classList.remove("active");

        if(btn.dataset.vista==vista){

            btn.classList.add("active");

        }

    });

    cambiarTitulo(vista);

    cargarVista(vista);

}

/*==================================================
    TÍTULO
==================================================*/

function cambiarTitulo(vista){

    const nombres={

        inicio:"Inicio",

        perfil:"Mi Perfil",

        personajes:"Personajes",

        biblioteca:"Biblioteca",

        casas:"Casas Divinas",

        clases:"Clases",

        eventos:"Eventos",

        economia:"Economía",

        inventario:"Inventario",

        alexios:"Alexios"

    };

    document.getElementById("tituloPagina").textContent=nombres[vista];

}

/*==================================================
    CONTENIDO
==================================================*/

function cargarVista(vista){

    const contenido=document.getElementById("contenido");

    switch(vista){

        case "inicio":

            contenido.innerHTML=`

                <div class="welcome-card">

                    <h2>

                        Bienvenido a Vex'Halia

                    </h2>

                    <p>

                        Sistema Oficial del Campamento.

                    </p>

                </div>

            `;

        break;

        case "perfil":

            contenido.innerHTML=`

                <h2>

                    👤 Perfil

                </h2>

                <p>

                    Próximamente.

                </p>

            `;

        break;

        case "personajes":

            contenido.innerHTML=`

                <h2>

                    📜 Personajes

                </h2>

                <button class="btn">

                    Crear Personaje

                </button>

            `;

        break;

        case "biblioteca":

            contenido.innerHTML=`

                <h2>

                    📚 Biblioteca

                </h2>

                <p>

                    Aquí aparecerán los documentos oficiales.

                </p>

            `;

        break;

        case "casas":

            contenido.innerHTML=`

                <h2>

                    🏛️ Casas Divinas

                </h2>

                <p>

                    Próximamente.

                </p>

            `;

        break;

        case "clases":

            contenido.innerHTML=`

                <h2>

                    ⚔️ Clases

                </h2>

            `;

        break;

        case "eventos":

            contenido.innerHTML=`

                <h2>

                    📅 Eventos

                </h2>

            `;

        break;

        case "economia":

            contenido.innerHTML=`

                <h2>

                    💰 Economía

                </h2>

            `;

        break;

        case "inventario":

            contenido.innerHTML=`

                <h2>

                    🎒 Inventario

                </h2>

            `;

        break;

        case "alexios":

            contenido.innerHTML=`

                <h2>

                    🤖 Alexios

                </h2>

                <div class="card">

                    <p>

                        Hola.

                        Soy Alexios.

                        Muy pronto podré ayudarte con el Campamento.

                    </p>

                </div>

            `;

        break;

    }

}

/*==================================================
    BOTONES SUPERIORES
==================================================*/

function activarBotones(){

    document

    .getElementById("btnMenu")

    .onclick=()=>{

        document

        .querySelector(".sidebar")

        .classList.toggle("open");

    };

    document

    .getElementById("cerrarModal")

    .onclick=()=>{

        document

        .getElementById("modal")

        .classList.add("oculto");

    };

}

/*==================================================
    UTILIDADES
==================================================*/

export function abrirModal(html){

    document

    .getElementById("modalBody")

    .innerHTML=html;

    document

    .getElementById("modal")

    .classList.remove("oculto");

}

export function cerrarModal(){

    document

    .getElementById("modal")

    .classList.add("oculto");

}

export function mostrarLoader(){

    document

    .getElementById("loader")

    .classList.remove("oculto");

}

export function ocultarLoader(){

    document

    .getElementById("loader")

    .classList.add("oculto");

      }
