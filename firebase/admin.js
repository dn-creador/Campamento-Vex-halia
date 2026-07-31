/*==================================================
    CAMPAMENTO VEX'HALIA
    FIREBASE ADMIN V2.0
==================================================*/

import { db } from "./firebaseConfig.js";

import { usuarioActual } from "./auth.js";

import {

    collection,

    getDocs,

    getDoc,

    doc,

    updateDoc,

    query,

    where,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/*=========================================
 COMPROBAR PERMISOS
=========================================*/

export function esAdministrador(){

    if(!usuarioActual){

        return false;

    }

    return (

        usuarioActual.rol==="Administrador"

        ||

        usuarioActual.rol==="Fundador"

    );

}

/*=========================================
 PERSONAJES PENDIENTES
=========================================*/

export async function obtenerSolicitudes(){

    if(!esAdministrador()){

        return [];

    }

    const consulta=query(

        collection(db,"personajes"),

        where("estado","==","Pendiente")

    );

    const resultado=await getDocs(consulta);

    const lista=[];

    resultado.forEach(docu=>{

        lista.push({

            uuid:docu.id,

            ...docu.data()

        });

    });

    return lista;

}

/*=========================================
 APROBAR PERSONAJE
=========================================*/

export async function aprobarPersonaje(uuid){

    if(!esAdministrador()){

        return{

            ok:false,

            mensaje:"No tienes permisos."

        };

    }

    const referencia=doc(

        db,

        "personajes",

        uuid

    );

    await updateDoc(

        referencia,

        {

            estado:"Aprobado",

            aprobadoPor:usuarioActual.uid,

            administrador:usuarioActual.nombre,

            fechaAprobacion:serverTimestamp()

        }

    );

    return{

        ok:true

    };

}

/*=========================================
 RECHAZAR PERSONAJE
=========================================*/

export async function rechazarPersonaje(

    uuid,

    motivo=""

){

    if(!esAdministrador()){

        return{

            ok:false,

            mensaje:"No tienes permisos."

        };

    }

    const referencia=doc(

        db,

        "personajes",

        uuid

    );

    await updateDoc(

        referencia,

        {

            estado:"Rechazado",

            motivoRechazo:motivo,

            revisadoPor:usuarioActual.uid,

            fechaRevision:serverTimestamp()

        }

    );

    return{

        ok:true

    };

}

/*=========================================
 CAMBIAR ROL
=========================================*/

export async function cambiarRol(

    uid,

    nuevoRol

){

    if(

        usuarioActual.rol!=="Fundador"

    ){

        return{

            ok:false,

            mensaje:"Solo el Fundador puede cambiar roles."

        };

    }

    await updateDoc(

        doc(db,"usuarios",uid),

        {

            rol:nuevoRol

        }

    );

    return{

        ok:true

    };

}

/*=========================================
 OBTENER TODOS LOS USUARIOS
=========================================*/

export async function obtenerUsuarios(){

    if(!esAdministrador()){

        return [];

    }

    const resultado=await getDocs(

        collection(db,"usuarios")

    );

    const lista=[];

    resultado.forEach(docu=>{

        lista.push({

            uid:docu.id,

            ...docu.data()

        });

    });

    return lista;

}

/*=========================================
 OBTENER TODOS LOS PERSONAJES
=========================================*/

export async function obtenerTodosLosPersonajes(){

    if(!esAdministrador()){

        return [];

    }

    const resultado=await getDocs(

        collection(db,"personajes")

    );

    const lista=[];

    resultado.forEach(docu=>{

        lista.push({

            uuid:docu.id,

            ...docu.data()

        });

    });

    return lista;

}

/*=========================================
 OBSERVACIONES ADMINISTRATIVAS
=========================================*/

export async function agregarObservacion(

    uuid,

    texto

){

    if(!esAdministrador()){

        return{

            ok:false

        };

    }

    const personaje=await getDoc(

        doc(db,"personajes",uuid)

    );

    if(!personaje.exists()){

        return{

            ok:false

        };

    }

    const datos=personaje.data();

    const historial=datos.observaciones || [];

    historial.push({

        administrador:usuarioActual.nombre,

        uid:usuarioActual.uid,

        fecha:new Date().toISOString(),

        texto:texto

    });

    await updateDoc(

        doc(db,"personajes",uuid),

        {

            observaciones:historial

        }

    );

    return{

        ok:true

    };

}
