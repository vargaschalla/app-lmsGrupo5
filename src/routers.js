import Vue from 'vue';
import Router from 'vue-router';
import Tareas_form from './components/Tareas_form.vue';
import Sesiones_form from './components/Sesiones_form.vue';
import Sesiones from './components/Sesiones.vue';
import Tareas from './components/Tareas.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';


import HelloWorld from './components/HelloWorld.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/tareas',
      name: 'Tareas',
      component: Tareas,
    },
    {
      path: '/tareas/new',
      name: 'Tareas_form',
      component: Tareas_form,
    },
    {
      path: '/tareas/new/:id',
      name: 'Tareas_form',
      component: Tareas_form,
    },
    {
      path: '/sesiones',
      name: 'Sesiones',
      component: Sesiones,
    },
    {
      path: '/sesiones/new',
      name: 'Sesiones_form',
      component: Sesiones_form,
    },
    {
      path: '/sesiones/new/:id',
      name: 'Sesiones_form',
      component: Sesiones_form,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
  ],
});

let whiteRoutes = [
  "LoginForm",
  "HelloWorld"
]

router.beforeEach((to, from, next) => {
  console.log(`${from.path} to ${to.path}`);
  let isAuthenticated = false;
  if (localStorage.getItem('user') != null) {
    isAuthenticated = true;
  }
  // if (to.name !== 'LoginForm' && to.name !== 'HelloWorld' && to.name !== 'Ping' && !isAuthenticated) {
  if (!whiteRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'LoginForm' });
  } else {
    next();
  }
});
//https://www.digitalocean.com/community/tutorials/vuejs-advanced-vue-routing
export default router