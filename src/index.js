import $ from "jquery"
import {getPokemon} from './api'

obtenerPokemon()

//boton

$('#buscar').on('click',()=>{
    let nombre= $('#input_pokemon').val()

    let pokemon = getPokemon(nombre)
    pokemon.then((res)=>res.json())
    .then((res2)=>{
        console.log(res2)
        let {id,name,weight,height,sprites}=res2
        llenarInfo(id,name,weight,height,sprites)
    })
    .catch((e)=>{
        alert('El pokemon no existe')
        window.locaction.reload()
    })

})

function obtenerPokemon(){
    let random = numeroAleatorio(150)+1


    let pokemon = getPokemon(random)
    pokemon.then((res)=>res.json())
    .then((res2)=>{
        console.log(res2)
        let {id,name,weight,height,sprites}=res2
        llenarInfo(id,name,weight,height,sprites)
    })
}
 
//funcion numero aleatorio
function numeroAleatorio(max){
    return Math.floor(Math.random()*max)
}

//lenar informacio

function llenarInfo(id,name,weight,height,sprites){
    let input = document.getElementById('input_pokemon')
    input.placeholder = 'Ejemplo: '+name
    let div=$('.datos')
    div.empty()

    let tabla2 = (`<table class="table"> <tr><td class="negrilla"> CARACTERISTICAS</td>`)
    tabla2+=('</tr> </table>')
    div.append(tabla2)

    let tabla3 = (`<table class="table"> <tr><td></td></tr>`)

    tabla3+=('<tr>')
    tabla3+=(`<td>NAME</td>`)
    tabla3+=(`<td></td>`)
    tabla3+=(`<td></td>`)
    tabla3+=(`<td>ID</td>`)
    tabla3+=(`<td>PESO</td>`)
    tabla3+=(`<td>ALTURA</td>`)
    tabla3+=('</tr>')
 
    tabla3+=('</table>')
    div.append(tabla3)

    let tabla = (`<table class="table"> <tr><td></td></tr>`)


    tabla+=('<tr>')
    tabla+=(`<td>${name}</td>`)
    tabla+=(`<td>${id}</td>`)
    tabla+=(`<td>${weight}</td>`)
    tabla+=(`<td>${height}</td>`)
    tabla+=('</tr>')
 
    tabla+=('</table>')
    div.append(tabla)
    
    
    

    let imagen= document.getElementById('img_pokemon')
    imagen.src=sprites.other.dream_world.front_default

}
const buscar = document.getElementById('buscar');

buscar.addEventListener('click', () => {

  const nombre = document.getElementById('input_pokemon').value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(response => response.json())
    .then(data => {

      const pokemon = {
        id: data.id,
        name: data.name,
        weight: data.weight,
        height: data.height
      };

      localStorage.setItem('pokemon', JSON.stringify(pokemon));

      console.log("id:",pokemon.id,
       "nombre:",pokemon.name,
        "peso:",pokemon.weight,
        "altura:",pokemon.height);
    });
});   



localStorage.clear();



