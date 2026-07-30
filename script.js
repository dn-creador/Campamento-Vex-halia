const contenido=document.getElementById("contenido");

function inicio(){

contenido.innerHTML=`

<h2>🏛️ Bienvenido</h2>

<p>

Bienvenido al Sistema Oficial del Campamento Vex'Halia.

</p>

`;

}

function mostrarCasas(){

let html="<h2>🏛️ Casas Divinas</h2>";

CASAS.forEach(c=>{

html+=`

<div class="tarjeta">

<h3>${c.icono} ${c.nombre}</h3>

<p><b>Dios:</b> ${c.dios}</p>

<p>${c.descripcion || "Próximamente..."}</p>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarBiblioteca(){

let html="<h2>📚 Biblioteca</h2>";

BIBLIOTECA.forEach(b=>{

html+=`

<div class="tarjeta">

<h3>${b.icono} ${b.titulo}</h3>

<p>${b.descripcion}</p>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarClases(){

let html="<h2>🎖️ Clases</h2>";

CLASES.forEach(c=>{

html+=`

<div class="tarjeta">

<h3>${c.nombre}</h3>

<p>${c.descripcion}</p>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarEconomia(){

let html="<h2>💰 Economía</h2>";

ECONOMIA.monedas.forEach(m=>{

html+=`

<div class="tarjeta">

<h3>${m.icono} ${m.nombre}</h3>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarGrupos(){

let html="<h2>🔗 Grupos</h2>";

GRUPOS.forEach(g=>{

html+=`

<div class="tarjeta">

<h3>${g.nombre}</h3>

<p>${g.descripcion}</p>

</div>

`;

});

contenido.innerHTML=html;

}

function mostrarRegistro(){

let html="<h2>📜 Registro</h2>";

REGISTRO.campos.forEach(campo=>{

html+=`<label>${campo.titulo}</label>`;

if(campo.tipo==="textarea"){

html+=`<textarea></textarea>`;

}

else if(campo.tipo==="select"){

html+="<select>";

campo.opciones.forEach(op=>{

html+=`<option>${op}</option>`;

});

html+="</select>";

}

else{

html+=`<input type="${campo.tipo}">`;

}

});

html+=`

<button>

Enviar Solicitud

</button>

`;

contenido.innerHTML=html;

}

document.querySelectorAll("#menu button").forEach(btn=>{

btn.onclick=()=>{

switch(btn.dataset.menu){

case"inicio":

inicio();

break;

case"registro":

mostrarRegistro();

break;

case"biblioteca":

mostrarBiblioteca();

break;

case"casas":

mostrarCasas();

break;

case"clases":

mostrarClases();

break;

case"economia":

mostrarEconomia();

break;

case"grupos":

mostrarGrupos();

break;

case"alexios":

contenido.innerHTML="<h2>🤖 Alexios llegará en la V2.0</h2>";

break;

}

};

});

inicio();
