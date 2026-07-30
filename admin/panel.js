const contenido=document.getElementById("contenido");

function pendientes(){

contenido.innerHTML="<h2>📜 Solicitudes Pendientes</h2>";

if(PERSONAJES.length===0){

contenido.innerHTML+=`

<div class="tarjeta">

No hay solicitudes.

</div>

`;

return;

}

PERSONAJES.forEach(p=>{

contenido.innerHTML+=`

<div class="tarjeta">

<h3>${p.nombre}</h3>

<p>${p.casa}</p>

<button>Aprobar</button>

<button>Rechazar</button>

</div>

`;

});

}

function jugadores(){

contenido.innerHTML=`

<h2>

👥 Jugadores

</h2>

`;

}

function economia(){

contenido.innerHTML=`

<h2>

💰 Economía

</h2>

`;

}

function noticias(){

contenido.innerHTML=`

<h2>

📢 Noticias

</h2>

`;

}

function alexios(){

contenido.innerHTML=`

<h2>

🤖 Conversaciones con Alexios

</h2>

`;

}

btnPendientes.onclick=pendientes;

btnJugadores.onclick=jugadores;

btnEconomia.onclick=economia;

btnNoticias.onclick=noticias;

btnAlexios.onclick=alexios;
