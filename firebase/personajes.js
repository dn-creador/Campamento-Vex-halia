/*==================================================
    CAMPAMENTO VEX'HALIA
    FIREBASE PERSONAJES V2.0
==================================================*/

import { db } from "./firebaseConfig.js";
import { usuarioActual } from "./auth.js";

import {
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    query,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/*=========================================
 GENERAR CÓDIGO VISIBLE
=========================================*/

export async function generarCodigoPersonaje(){

    const personajes = await getDocs(
        collection(db,"personajes")
    );

    const numero = personajes.size + 1;

    return "VXH-" + numero.toString().padStart(6,"0");

}

/*=========================================
 PERSONAJES APROBADOS
=========================================*/

export async function contarPersonajesAprobados(uid){

    const consulta = query(

        collection(db,"personajes"),

        where("propietario","==",uid),

        where("estado","==","Aprobado")

    );

    const resultado = await getDocs(consulta);

    return resultado.size;

}

/*=========================================
 LÍMITE SEGÚN ROL
=========================================*/

export function limitePersonajes(){

    if(!usuarioActual){

        return 0;

    }

    switch(usuarioActual.rol){

        case "Administrador":
            return 5;

        case "Fundador":
            return 999;

        default:
            return 3;

    }

}

/*=========================================
 CREAR PERSONAJE
=========================================*/

export async function crearPersonaje(datos){

    if(!usuarioActual){

        return{

            ok:false,

            mensaje:"No existe una sesión."

        };

    }

    const aprobados = await contarPersonajesAprobados(

        usuarioActual.uid

    );

    if(aprobados >= limitePersonajes()){

        return{

            ok:false,

            mensaje:"Has alcanzado el máximo de personajes aprobados."

        };

    }

    const codigo = await generarCodigoPersonaje();

    const documento = await addDoc(

        collection(db,"personajes"),

        {

            codigo:codigo,

            propietario:usuarioActual.uid,

            nombre:datos.nombre,

            apellido:datos.apellido,

            casa:datos.casa,

            clase:datos.clase,

            edad:datos.edad,

            genero:datos.genero,

            procedencia:datos.procedencia,

            descripcion:datos.descripcion,

            historia:datos.historia,

            imagen:datos.imagen || "",

            rango:"Probati",

            nivel:1,

            experiencia:0,

            denarios:0,

            aureos:0,

            estado:"Pendiente",

            inventario:[],

            habilidades:[],

            pasivas:[],

            misiones:[],

            logros:[],

            fechaCreacion:serverTimestamp(),

            fechaAprobacion:null,

            aprobadoPor:null

        }

    );

    await updateDoc(

        doc(db,"usuarios",usuarioActual.uid),

        {

            personajes:[

                ...(usuarioActual.personajes || []),

                documento.id

            ]

        }

    );

    return{

        ok:true,

        uuid:documento.id,

        codigo:codigo

    };

}

/*=========================================
 OBTENER MIS PERSONAJES
=========================================*/

export async function obtenerMisPersonajes(){

    if(!usuarioActual){

        return[];

    }

    const consulta = query(

        collection(db,"personajes"),

        where("propietario","==",usuarioActual.uid)

    );

    const resultado = await getDocs(consulta);

    const personajes=[];

    resultado.forEach(docu=>{

        personajes.push({

            uuid:docu.id,

            ...docu.data()

        });

    });

    return personajes;

}

/*=========================================
 OBTENER PERSONAJE
=========================================*/

export async function obtenerPersonaje(uuid){

    const documento = await getDoc(

        doc(db,"personajes",uuid)

    );

    if(!documento.exists()){

        return null;

    }

    return{

        uuid:documento.id,

        ...documento.data()

    };

}
