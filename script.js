/* ==========================================
   CAMPAMENTO VEX'HALIA
   SCRIPT.JS - V0.2
========================================== */

const contenido = document.getElementById("contenido");

const paginas = {

alexios:`

<h2>🤖 Alexios</h2>

<p>
Salve, semidiós.
</p>

<p>
Soy Alexios, Guardián de los Archivos del Campamento Vex'Halia.
</p>

<p>
Muy pronto podrás hablar conmigo para resolver todas tus dudas.
</p>

<button disabled>💬 Chat (Próximamente)</button>

`,

registro:`

<h2>📜 Registro</h2>

<p>
Aquí podrás crear tu ficha oficial.
</p>

<p>
En la próxima versión aparecerá el formulario completo.
</p>

<button disabled>
📋 Crear ficha
</button>

`,

biblioteca:`

<h2>📚 Biblioteca</h2>

<p>Selecciona un tema.</p>

<ul>

<li>📖 Historia</li>

<li>📜 Reglamento</li>

<li>🎖️ Clases</li>

<li>🏛️ Casas Divinas</li>

<li>💰 Economía</li>

<li>🏪 Mercado</li>

<li>🌍 Nueva Roma</li>

<li>🔗 Grupos</li>

</ul>

`,

casas:`

<h2>🏛️ Casas Divinas</h2>

<p>

Aquí aparecerán las doce Casas Divinas con su historia, símbolos y poderes.

</p>

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

<p>

Aquí aprenderás cómo conseguir dinero y en qué gastarlo.

</p>

`,

mercado:`

<h2>🏪 Mercado</h2>

<p>

Aquí estarán todos los objetos disponibles para comprar.

</p>

`,

roma:`

<h2>🌍 Nueva Roma</h2>

<p>

La ciudad donde los semidioses retirados podrán vivir.

</p>

`,

reglamento:`

<h2>📖 Reglamento</h2>

<p>

Aquí aparecerá el reglamento completo del Campamento.

</p>

`,

grupos:`

<h2>🔗 Grupos Oficiales</h2>

<p>

Aquí aparecerán todos los enlaces de WhatsApp.

</p>

`

};

document.querySelectorAll("#menu button").forEach(boton=>{

boton.addEventListener("click",()=>{

const panel=boton.dataset.panel;

contenido.innerHTML=paginas[panel];

});

});
