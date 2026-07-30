/*=========================================
 CAMPAMENTO VEX'HALIA
 script.js V1.0
=========================================*/

const contenido = document.getElementById("contenido");

function inicio(){

contenido.innerHTML=`

<h2>🏛️ Bienvenido al Campamento Vex'Halia</h2>

<p>

Bienvenido a los Archivos del Imperio.

</p>

<p>

Selecciona una opción del menú para comenzar.

</p>

`;

}

function mostrarBiblioteca(){

let html=`

<h2>📚 Biblioteca</h2>

<p>

Selecciona un tema.

</p>

`;

DATOS.biblioteca.forEach(libro=>{

html+=`

<div class="tarjeta">

<h3>${libro.titulo}</h3>

<p>${libro.texto}</p>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarCasas(){

let html=`

<h2>🏛️ Casas Divinas</h2>

`;

DATOS.casas.forEach(casa=>{

html+=`

<div class="casa">

<h3>

${casa.icono} ${casa.nombre}

</h3>

<p>

<b>Dios:</b>

${casa.dios}

</p>

<p>

${casa.descripcion}

</p>

`;

if(casa.pasiva){

html+=`

<p>

<b>Pasiva:</b>

${casa.pasiva}

</p>

`;

}

if(casa.rango1){

html+=`

<ul>

<li>🟢 ${casa.rango1}</li>

<li>🔵 ${casa.rango2}</li>

<li>🟡 ${casa.rango3}</li>

<li>🔴 ${casa.rango4}</li>

</ul>

`;

}

html+=`

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarGrupos(){

let html=`

<h2>🔗 Grupos Oficiales</h2>

`;

DATOS.grupos.forEach(grupo=>{

html+=`

<div class="grupo">

<h3>${grupo.nombre}</h3>

<a href="${grupo.link}" target="_blank">

Entrar

</a>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarRegistro(){

contenido.innerHTML=`

<h2>📜 Registro Oficial</h2>

<input id="nombre" placeholder="Nombre completo">

<input id="edad" placeholder="Edad">

<input id="sexo" placeholder="Sexo">

<input id="orientacion" placeholder="Orientación sexual">

<input id="pais" placeholder="País">

<select id="casa">

${DATOS.casas.map(c=>`<option>${c.nombre}</option>`).join("")}

</select>

<textarea

id="personalidad"

placeholder="Personalidad"

></textarea>

<textarea

id="gustos"

placeholder="Gustos"

></textarea>

<textarea

id="disgustos"

placeholder="Disgustos"

></textarea>

<button id="copiar">

📋 Copiar ficha

</button>

`;

document.getElementById("copiar").onclick=()=>{

const texto=

`🏛️ CAMPAMENTO VEX'HALIA

Nombre: ${nombre.value}

Edad: ${edad.value}

Sexo: ${sexo.value}

Orientación: ${orientacion.value}

País: ${pais.value}

Casa: ${casa.value}

Personalidad:

${personalidad.value}

Gustos:

${gustos.value}

Disgustos:

${disgustos.value}

Lobby:

${DATOS.lobby}`;

navigator.clipboard.writeText(texto);

alert("Ficha copiada.");

};

}

document.querySelectorAll("#menu button").forEach(btn=>{

btn.onclick=()=>{

const s=btn.dataset.seccion;

switch(s){

case"inicio":

inicio();

break;

case"biblioteca":

mostrarBiblioteca();

break;

case"casas":

mostrarCasas();

break;

case"registro":

mostrarRegistro();

break;

case"grupos":

mostrarGrupos();

break;

default:

contenido.innerHTML="<h2>🚧 Próximamente</h2>";

}

};

});

inicio();
