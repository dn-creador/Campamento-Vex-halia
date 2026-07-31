/*==================================================
    CAMPAMENTO VEX'HALIA
    FIREBASE AUTH V2.0
==================================================*/

import {

    auth,

    db

} from "./firebaseConfig.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

    doc,

    setDoc,

    getDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/*=========================================
 USUARIO ACTUAL
=========================================*/

export let usuarioActual = null;

/*=========================================
 CREAR CUENTA
=========================================*/

export async function registrarUsuario(datos){

    try{

        const credencial = await createUserWithEmailAndPassword(

            auth,

            datos.correo,

            datos.password

        );

        const uid = credencial.user.uid;

        await setDoc(

            doc(db,"usuarios",uid),

            {

                uid:uid,

                nombre:datos.nombre,

                correo:datos.correo,

                rol:"Campista",

                personajes:[],

                fechaRegistro:serverTimestamp(),

                ultimoAcceso:serverTimestamp(),

                activo:true

            }

        );

        return{

            ok:true,

            uid:uid

        };

    }

    catch(error){

        return{

            ok:false,

            error:error.message

        };

    }

}

/*=========================================
 INICIAR SESIÓN
=========================================*/

export async function iniciarSesion(

    correo,

    password

){

    try{

        await signInWithEmailAndPassword(

            auth,

            correo,

            password

        );

        return{

            ok:true

        };

    }

    catch(error){

        return{

            ok:false,

            error:error.message

        };

    }

}

/*=========================================
 CERRAR SESIÓN
=========================================*/

export async function cerrarSesion(){

    await signOut(auth);

}

/*=========================================
 OBSERVADOR
=========================================*/

export function escucharSesion(callback){

    onAuthStateChanged(

        auth,

        async(usuario)=>{

            if(usuario){

                const documento = await getDoc(

                    doc(

                        db,

                        "usuarios",

                        usuario.uid

                    )

                );

                if(documento.exists()){

                    usuarioActual=documento.data();

                }

            }else{

                usuarioActual=null;

            }

            if(callback){

                callback(usuarioActual);

            }

        }

    );

}

/*=========================================
 UTILIDADES
=========================================*/

export function haySesion(){

    return usuarioActual!==null;

}

export function obtenerRol(){

    if(usuarioActual==null){

        return "Invitado";

    }

    return usuarioActual.rol;

}

export function obtenerUID(){

    if(usuarioActual==null){

        return null;

    }

    return usuarioActual.uid;

}
