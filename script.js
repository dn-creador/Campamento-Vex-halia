/* =======================================================
   CAMPAMENTO VEX'HALIA
   Versión 0.1
======================================================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:Georgia,serif;

    background:
    linear-gradient(rgba(30,20,10,.75),rgba(30,20,10,.75)),
    url("https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80");

    background-size:cover;
    background-position:center;
    background-attachment:fixed;

    color:#f5e8c8;

}

/* ================= HEADER ================= */

header{

    text-align:center;

    padding:50px 20px;

    background:rgba(0,0,0,.45);

    border-bottom:4px solid #c9a227;

}

header h1{

    font-size:clamp(2rem,5vw,4rem);

    letter-spacing:3px;

}

header p{

    margin-top:10px;

    color:#e7d7a5;

    font-size:1.2rem;

}

/* ================= CONTENIDO ================= */

main{

    width:90%;

    max-width:1200px;

    margin:auto;

}

/* ================= BIENVENIDA ================= */

#bienvenida{

    margin-top:40px;

    background:rgba(245,232,200,.95);

    color:#3d2d1f;

    padding:35px;

    border-radius:20px;

    text-align:center;

    box-shadow:0 0 20px rgba(0,0,0,.35);

}

#bienvenida h2{

    font-size:2rem;

    margin-bottom:15px;

}

#bienvenida p{

    line-height:1.8;

    margin-bottom:12px;

}

/* ================= BOTÓN ALEXIOS ================= */

#btnAlexios{

    margin-top:20px;

    background:#8b0000;

    color:white;

    border:none;

    padding:15px 35px;

    border-radius:12px;

    font-size:1rem;

    cursor:pointer;

    transition:.3s;

}

#btnAlexios:hover{

    background:#b8860b;

    transform:scale(1.05);

}

/* ================= MENÚ ================= */

#menu{

    margin:50px 0;

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(230px,1fr));

    gap:20px;

}

.opcion{

    background:rgba(245,232,200,.96);

    color:#3b2a1a;

    border:none;

    border-radius:15px;

    padding:25px;

    font-size:1.15rem;

    font-weight:bold;

    cursor:pointer;

    transition:.25s;

    box-shadow:0 8px 15px rgba(0,0,0,.25);

}

.opcion:hover{

    transform:translateY(-6px);

    background:#fff6d8;

}

/* ================= FOOTER ================= */

footer{

    text-align:center;

    padding:30px;

    background:rgba(0,0,0,.45);

    color:#e4d7b0;

}

/* ================= CELULAR ================= */

@media(max-width:700px){

    header{

        padding:35px 15px;

    }

    #bienvenida{

        padding:25px;

    }

    .opcion{

        font-size:1rem;

        padding:20px;

    }

}
