<template>
     <div class="app">
       <div class="contenedor-nav">
         <a>
         <!-- use router-link component for navigation. -->
         <!-- specify the link by passing the `to` prop. -->
         <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
           <router-link to="/">INICIO</router-link>
           <router-link to="/tareas">TAREAS</router-link>
           <router-link to="/sesiones">SESIONES</router-link>
           <router-link to="/login">INICIAR SESIÓN</router-link>
           <router-link to="/logout">SALIR</router-link>
         </a>
       </div>
       <router-view/>
     </div>   
</template>

<style>

.app {
  font-family: 'Montserrat';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-bottom: 100px;
  background: #134E5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #71B280, #134E5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #71B280, #134E5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100%;
  width: 100%;
  margin: auto;
  position: center;
  max-width:700px;
}

nav{
  width: 100%;
  position: fixed;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
}


.app .contenedor-nav{
  display: flex;
  margin: auto;
  margin-top: 100px;
  width: 100%;
  align-items: center;
  max-width:500px;
  height:inherit;
  overflow: hidden;
  background: rgb(255, 255, 255);
  height: 60px;
  color:rgb(0, 0, 0);
}

.app .contenedor-nav a{
  padding: 5px 0;
  margin-right: 4px;
  margin-left: 23px;
  font-size: 17px;
  font-weight: 100;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  color: rgb(0, 0, 0);
}

.app .contenedor-nav a:hover{
  border-bottom: 3px solid #046d27;
  transition: 0.6s;
}

</style>
