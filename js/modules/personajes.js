// ==========================================
// CAMPAMENTO VEX'HALIA V3
// PERSONAJES.JS
// ==========================================

import { db } from "../firebase/firebaseConfig.js";

import { datosUsuario } from "../firebase/auth.js";

import {

    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    doc,
    updateDoc

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

/*==========================================
    UUID
==========================================*/

function generarUUID(){

    return crypto.randomUUID();

}

/*==========================================
    CÓDIGO DEL PERSONAJE
==========================================*/

function generarCodigo(){

    const año=new Date().getFullYear();

    const random=Math.random()

        .toString(36)

        .substring(2,8)

        .toUpperCase();

    return `VXH-${año}-${random}`;

}

/*==========================================
    LÍMITE SEGÚN ROL
==========================================*/

function limitePersonajes(){

    if(!datosUsuario) return 0;

    switch(datosUsuario.rol){

        case "Fundador":

            return Infinity;

        case "Administrador":

            return 5;

        default:

            return 3;

    }

}

/*==========================================
    CONTAR PERSONAJES
==========================================*/

export async function contarPersonajes(uid){

    const consulta=query(

        collection(db,"personajes"),

        where("propietario","==",uid)

    );

    const resultado=await getDocs(consulta);

    return resultado.size;

}

/*==========================================
    CREAR PERSONAJE
==========================================*/

export async function crearPersonaje(usuario,nuevo){

    const cantidad=await contarPersonajes(usuario.uid);

    if(cantidad>=limitePersonajes()){

        return{

            ok:false,

            mensaje:"Has alcanzado el límite de personajes."

        };

    }

    const personaje={

        uuid:generarUUID(),

        codigo:generarCodigo(),

        propietario:usuario.uid,

        estado:"Pendiente",

        nombre:nuevo.nombre,

        apellido:nuevo.apellido,

        casa:nuevo.casa,

        clase:nuevo.clase,

        rango:"Campista",

        nivel:1,

        experiencia:0,

        monedas:0,

        foto:"",

        ficha:nuevo.ficha || {},

        inventario:[],

        habilidades:[],

        relaciones:[],

        historial:[

            {

                fecha:new Date().toISOString(),

                accion:"Personaje creado"

            }

        ],

        creado:serverTimestamp(),

        actualizado:serverTimestamp()

    };

    const documento=await addDoc(

        collection(db,"personajes"),

        personaje

    );

    if(datosUsuario){

        const personajesActuales=datosUsuario.personajes || [];

        personajesActuales.push(documento.id);

        await updateDoc(

            doc(db,"usuarios",usuario.uid),

            {

                personajes:personajesActuales

            }

        );

    }

    return{

        ok:true,

        id:documento.id,

        personaje

    };

}

/*==========================================
    OBTENER PERSONAJES
==========================================*/

export async function obtenerMisPersonajes(uid){

    const consulta=query(

        collection(db,"personajes"),

        where("propietario","==",uid)

    );

    const resultado=await getDocs(consulta);

    const lista=[];

    resultado.forEach(doc=>{

        lista.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return lista;

}

/*==========================================
    CAMBIAR ESTADO
==========================================*/

export async function cambiarEstado(

    id,

    estado

){

    await updateDoc(

        doc(db,"personajes",id),

        {

            estado,

            actualizado:serverTimestamp()

        }

    );

}

/*==========================================
    ELIMINAR
    (Se implementará en Admin)
==========================================*/

/*==========================================
    EDITAR
    (Se implementará en Admin)
==========================================*/
