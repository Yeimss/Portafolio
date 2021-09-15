let uri="https://accounts.spotify.com/api/token";

let dato1="grant_type=client_credentials";
let dato2="client_id=18e4ffd5175f42e798af35df81c4cd88";
let dato3="client_secret=a5a1668306c14cf1aae3148fd0f6685f";


let parametrosPOST={
    method:"POST",
    headers:{
        "Content-Type":'application/x-www-form-urlencoded'
    },
    body:dato1+"&"+dato2+"&"+dato3,
}

fetch(uri, parametrosPOST)
.then(function(respuesta){
    return(respuesta.json());
})
.then(function(respuesta){
    console.log(respuesta);
    generarToken(respuesta);
})
.catch(function(respuesta){
    console.log(respuesta);
})

function generarToken(rta){
    const token=rta.token_type+" "+rta.access_token;
    buscarCanciones(token);
}

function buscarCanciones(token){
    const uris=[
        "https://api.spotify.com/v1/artists/3AA28KZvwAUcZuOKwyblJQ/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/3ZHU5AKrUmIPnCFfr82QER/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/7jy3rLJdDQY21OgRLCZ9sD/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/6e3ekvKJm2Hs02OozwNQLp/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/1kjoxeQwJmoCfXT6j58MTm/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/2WgfkM8S11vg4kxLgDY3F5/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/7An4yvF7hDYDolN4m5zKBp/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/6IZ4ctovY9dl7bgHClAvKJ/top-tracks?market=US",
        "https://api.spotify.com/v1/artists/3ygJTpJJIK7eEeC2EFRl9D/top-tracks?market=US",
    ]
    let parametrosGET={
        method:"GET",
        headers:{
            Authorization: token,
        }
    }
    uris.forEach(function(urisiña){
        fetch(urisiña, parametrosGET)
        .then(function(respuesta){
            return(respuesta.json());
        })
        .then(function(respuesta){
            console.log(respuesta)
            pintarDatos(respuesta);
        }).catch (function(rta){
        console.log(rta);
        })
    })
    

    function pintarDatos(datos){
        let fila=document.getElementById("fila");
                let columna=document.createElement("div");
                columna.classList.add("col");
                columna.classList.add("mt-4");

                let tarjeta=document.createElement("div");
                tarjeta.classList.add("card");
                tarjeta.classList.add("h-100");
                tarjeta.classList.add("trans");
                tarjeta.classList.add("border");
                tarjeta.classList.add("border-2");
                tarjeta.classList.add("border-light");
                

                let imagen=document.createElement("img");
                imagen.classList.add("card-img-top");
                imagen.src=datos.tracks[0].album.images[0].url;

                let cardBody=document.createElement("div");
                cardBody.classList.add("card-body");

                let titulo=document.createElement("h5");
                titulo.textContent=datos.tracks[0].name;
                titulo.classList.add("text-center");
                titulo.classList.add("text-light");


                let tema=document.createElement("audio");
                tema.src=datos.tracks[0].preview_url;
                tema.setAttribute("controls","controls");
                tema.classList.add("mt-2");

                let popularidad=document.createElement("h5");
                popularidad.textContent="Popularidad: "+datos.tracks[0].popularity;
                popularidad.classList.add("text-center");
                popularidad.classList.add("mt-2");
                popularidad.classList.add("text-light");


                let album=document.createElement("h5");
                album.textContent="album: "+datos.tracks[0].album.name;
                album.classList.add("mt-2");
                album.classList.add("text-center");
                album.classList.add("text-light");
                //tema.classList.add("w-100")

                //padres e hijos

                //tarjeta.appendChild(imagen);
                tarjeta.appendChild(cardBody);
                cardBody.appendChild(imagen);
                cardBody.appendChild(tema);
                cardBody.appendChild(titulo);
                cardBody.appendChild(album);
                cardBody.appendChild(popularidad);
                columna.appendChild(tarjeta);
                fila.appendChild(columna);      
            
    }
}

