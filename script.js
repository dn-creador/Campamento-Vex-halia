/*==========================================
 CAMPAMENTO VEX'HALIA
 SCRIPT.JS V0.3
==========================================*/

const contenido = document.getElementById("contenido");

const paginas = {

inicio:`
<h2>🏛️ Bienvenido</h2>

<p>Salve, semidiós.</p>

<p>Explora los Archivos del Campamento Vex'Halia utilizando el menú.</p>
`,

alexios:`
<h2>🤖 Alexios</h2>

<p>Soy Alexios, Guardián de los Archivos.</p>

<p>En futuras versiones responderé automáticamente todas tus dudas sobre el Campamento.</p>

<div class="proximamente">
🚧 Chat en desarrollo
</div>
`,

registro:`
<h2>📜 Registro Oficial</h2>

<p>Completa la siguiente información.</p>

<input id="nombre" placeholder="Nombre completo">

<input id="edad" placeholder="Edad">

<input id="pais" placeholder="País">

<select id="casa">

<option>Selecciona tu Casa Divina</option>

<option>Júpiter</option>

<option>Juno</option>

<option>Neptuno</option>

<option>Marte</option>

<option>Venus</option>

<option>Mercurio</option>

<option>Apolo</option>

<option>Diana</option>

<option>Minerva</option>

<option>Vulcano</option>

<option>Vesta</option>

<option>Plutón</option>

</select>

<button id="copiarFicha">

📋 Copiar ficha

</button>
`,

biblioteca:`
<h2>📚 Biblioteca</h2>

<p>Selecciona un tema.</p>

<div class="lista">

<button class="tema">📖 Historia</button>

<button class="tema">📜 Reglamento</button>

<button class="tema">🎖️ Clases</button>

<button class="tema">🏛️ Casas Divinas</button>

<button class="tema">⚔️ Poderes</button>

<button class="tema">💰 Economía</button>

<button class="tema">🏪 Mercado</button>

<button class="tema">🌍 Nueva Roma</button>

</div>
`,

casas:`
<h2>🏛️ Casas Divinas</h2>

<p>Aquí aparecerán las doce Casas con su historia y poderes.</p>
`,

clases:`
<h2>🎖️ Clases</h2>

<ul>

<li>Probati</li>

<li>Legionario</li>

<li>Centurión</li>

<li>Campeón Divino</li>

</ul>
`,

economia:`
<h2>💰 Economía</h2>

<p>Aquí aprenderás cómo ganar dinero y gastarlo dentro del Campamento.</p>
`,

mercado:`
<h2>🏪 Mercado</h2>

<p>Próximamente aparecerán todos los artículos disponibles.</p>
`,

roma:`
<h2>🌍 Nueva Roma</h2>

<p>Información sobre la ciudad donde viven los semidioses retirados.</p>
`,

reglamento:`
<h2>📖 Reglamento</h2>

<p>En la siguiente versión añadiremos el reglamento completo.</p>
`,

grupos:`
<h2>🔗 Grupos Oficiales</h2>

<p>Aquí aparecerán todos los enlaces de WhatsApp.</p>
`

};

function cargar(nombre){

contenido.innerHTML = paginas[nombre];

const copiar = document.getElementById("copiarFicha");

if(copiar){

copiar.onclick = function(){

const ficha =
`🏛️ CAMPAMENTO VEX'HALIA

Nombre: ${document.getElementById("nombre").value}

Edad: ${document.getElementById("edad").value}

País: ${document.getElementById("pais").value}

Casa: ${document.getElementById("casa").value}`;

navigator.clipboard.writeText(ficha);

copiar.innerHTML="✅ Ficha copiada";

};

}

}

document.querySelectorAll("#menu button").forEach(boton=>{

boton.addEventListener("click",()=>{

cargar(boton.getAttribute("data"));

});

});

document.getElementById("abrirAlexios").onclick=()=>{

cargar("alexios");

};

cargar("inicio");
