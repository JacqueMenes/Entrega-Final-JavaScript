const publicidadGral = document.querySelector('#publicidad')
const pedirPubli = async () => {
    const respuesta = await
   fetch('./datos.json')
    const buscaPubli = await respuesta.json()

    function elCajondeLosperfumes() {   
    buscaPubli.forEach((perfumes) => {
    const publicidad = document.createElement('publicidad')
    publicidad.innerHTML = `
    <div class="card img-publici">
    <img src="${perfumes.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h6 class="card-title publi-titulo">${perfumes.nombre}</h5>
      <p class="publi-descripcion">Aroma:${perfumes.aroma}</p>
      <p class="publi-descripcion">Notas:${perfumes.notas}</p>
      <p class="publi-descripcion">Precio Promo:${perfumes.precio}</p>
      <a class="btn btn-primary" href="${perfumes.link}" target="_blank" role="button">COMPRAR</a>
    </div>
    <div class="card-footer">
    <p>Marca: ${perfumes.marca}</p>
    <p>Año de Lanzamiento: ${perfumes.id}</p>
    </div>
  </div>
  `
    publicidadGral.append(publicidad)
    })
   }

      let botonMostrar = document.getElementById("botonMostrar")
      botonMostrar.addEventListener("click", ()=>{
        let losPerfumes = document.getElementById("losPerfumes")
        losPerfumes.innerHTML = `<div class="loader"></div>`
        setTimeout(()=>{
          losPerfumes.remove()
      const tituloInicial = document.getElementById("tituloInicial")
      tituloInicial.innerHTML = `  <h1>Los Mejores Perfumes</h1>`
      elCajondeLosperfumes()
    },3000 )
    })
   }

   pedirPubli()
 



