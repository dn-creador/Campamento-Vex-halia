/*=========================================
 CAMPAMENTO VEX'HALIA
 data/registro.js
=========================================*/

const REGISTRO = {

campos:[

{
id:"nombre",
titulo:"Nombre del Personaje",
tipo:"text",
obligatorio:true
},

{
id:"edad",
titulo:"Edad",
tipo:"number",
obligatorio:true
},

{
id:"genero",
titulo:"Género",
tipo:"text",
obligatorio:true
},

{
id:"orientacion",
titulo:"Orientación",
tipo:"text",
obligatorio:true
},

{
id:"pais",
titulo:"País",
tipo:"text",
obligatorio:true
},

{
id:"casa",
titulo:"Casa Divina",
tipo:"select",
opciones:[
"Júpiter",
"Juno",
"Neptuno",
"Marte",
"Venus",
"Mercurio",
"Apolo",
"Diana",
"Minerva",
"Vulcano",
"Vesta",
"Plutón"
]
},

{
id:"personalidad",
titulo:"Personalidad",
tipo:"textarea"
},

{
id:"gustos",
titulo:"Gustos",
tipo:"textarea"
},

{
id:"disgustos",
titulo:"Disgustos",
tipo:"textarea"
},

{
id:"historia",
titulo:"Historia del personaje",
tipo:"textarea"
}

]

};
