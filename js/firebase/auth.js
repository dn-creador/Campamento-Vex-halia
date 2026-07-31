// ========================================
// CAMPAMENTO VEX'HALIA V3
// AUTH.JS
// ========================================

import {
    auth,
    db
} from "./firebaseConfig.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ===============================
// Usuario actual
// ===============================

export let usuarioActual = null;

export let datosUsuario = null;

// ===============================
// Registrar usuario
// ===============================

export async function registrarUsuario(nombre, correo, password){

    try{

        const credenciales =
            await createUserWithEmailAndPassword(
                auth,
                correo,
                password
            );

        const uid = credenciales.user.uid;

        await setDoc(
            doc(db,"usuarios",uid),
            {

                uid:uid,

                nombre:nombre,

                correo:correo,

                rol:"Campista",

                personajes:[],

                fechaRegistro:serverTimestamp(),

                ultimoIngreso:serverTimestamp()

            }

        );

        return {

            ok:true,

            uid:uid

        };

    }catch(error){

        return{

            ok:false,

            mensaje:error.message

        };

    }

}

// ===============================
// Iniciar sesión
// ===============================

export async function iniciarSesion(correo,password){

    try{

        await signInWithEmailAndPassword(

            auth,

            correo,

            password

        );

        return{

            ok:true

        };

    }catch(error){

        return{

            ok:false,

            mensaje:error.message

        };

    }

}

// ===============================
// Cerrar sesión
// ===============================

export async function cerrarSesion(){

    await signOut(auth);

}

// ===============================
// Recuperar contraseña
// ===============================

export async function recuperarPassword(correo){

    try{

        await sendPasswordResetEmail(

            auth,

            correo

        );

        return{

            ok:true

        };

    }catch(error){

        return{

            ok:false,

            mensaje:error.message

        };

    }

}

// ===============================
// Escuchar sesión
// ===============================

export function escucharSesion(callback){

    onAuthStateChanged(

        auth,

        async(usuario)=>{

            if(usuario){

                usuarioActual=usuario;

                const documento=await getDoc(

                    doc(

                        db,

                        "usuarios",

                        usuario.uid

                    )

                );

                if(documento.exists()){

                    datosUsuario=documento.data();

                }

            }else{

                usuarioActual=null;

                datosUsuario=null;

            }

            if(callback){

                callback(

                    usuarioActual,

                    datosUsuario

                );

            }

        }

    );

}

// ===============================
// Obtener rol
// ===============================

export function obtenerRol(){

    if(!datosUsuario){

        return "Invitado";

    }

    return datosUsuario.rol;

}

// ===============================
// Saber si hay sesión
// ===============================

export function haySesion(){

    return usuarioActual!=null;

}
