# Pokedex App

<img src="https://github.com/cosmicalduck/pokedex-app/assets/43730688/259aa5aa-3d17-4da8-8fa3-e73e238f41be" alt="app view" width="200"/>

## Información del proyecto

La siguiente aplicación consiste en una Pokedex, en donde se muestra un listado filtrable y páginado de todos los Pokémons existentes, pudiendo seleccionar un Pokémon del listado para poder conocer sus detalles. Es posible ordenar los Pokémons que se muestran en la tabla en orden alfabético tanto creciente como decreciente. De igual modo, en la parte inferior de la página se posee una tabla que indica la cantidad de Pokémons que inician con cada letra del abecedario, la cual es expandibe, para conocer el nombre de todos los Pokémons que inician con una cierta letra.

De la misma forma, es posible seleccionar un Pokémon como favorito y visualizar su información rápidamente mediante el botón de "Pokémon favorito" que se encuentra en el header de la página. Dado que este proyecto hace uso de JSON Server, dicha información persistirá sin importar si el proyecto se despliega más de una vez.

Esta aplicación hace uso de PokéAPI[^1] para poder obtener la información de todos los Pokémons que muesta. 

[^1]: API RESTFul de Pokémon que entrega información sobre Pokémons de los juegos principales [Sitio](https://pokeapi.co/)


## Desplegar proyecto

### Requisitos

1. Tener Node.js instalado (versión 16 o superior)
   
   [Página oficial de Node.js para descargar](https://nodejs.org/en)

2. Tener Angular CLI instalado
   [Página oficial de Angular para instalar Angular CLI](https://angular.io/guide/setup-local)

### Desplegando aplicación de forma local

1. Descargar el archivo .zip del repositorio y extraerlo, o clonarlo[^2] utilizando el comando:
   
   `git clone https://github.com/cosmicalduck/pokedex-app.git`

[^2]: Para clonar el proyecto, es necesario tener instalado git en el equipo. [Página oficial de Git para descargar](https://git-scm.com/)

2. Abrir una terminal y posicionarse en la carpeta del repositorio

3. Instalar las dependencias del proyecto con el comando:
  `npm install`

4. Una vez que las dependencias se hayan instalado, iniciar JSON server con el comando:
  `json-server --watch db.json`

5. Abrir otra terminal y ejecutar el comando:
  `ng serve --o`
Este comando abrirá la aplicación en el navegador que se posea por defecto.
