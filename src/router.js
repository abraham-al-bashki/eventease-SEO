import { createRouter, createWebHistory } from 'vue-router';
import Hem from './views/Hem.vue';
import HelloWorld from './components/HelloWorld.vue';
import Weather from './components/CalendarWeather.vue';
import Kalendar from './views/EventCalendar.vue';
import UserHome from './views/UserHome.vue';
import organisationen from './views/OrganisationEventAdder.vue';
import { useLoginStore } from './store.js';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/eventease-SEO',
      component: Hem,
      beforeEnter: (to, from, next) => {
        if (useLoginStore().getIsLoggedIn()) {
          next({
            path: `/user/${useLoginStore().getUserId()}`
          });
        } else {
          // Continue with navigation
          next();
        }
      }
    },

    { path: '/eventease-SEO/Calendarweather', component: Weather },
    { path: '/eventease-SEO/org', component: organisationen },
    {
      path: '/eventease-SEO/kalender/:kategori',
      component: Kalendar,
      beforeEnter: (to, from, next) => {
        if (useLoginStore().getIsLoggedIn()) {
          const kategori = to.params.kategori;
          next({
            path: `/eventease-SEO/user/${useLoginStore().getUserId()}/kalender/${kategori}`
          });
        } else {
          // Continue with navigation
          next();
        }
      }
    },
    { path: `/eventease-SEO/user/:id/kalender/:kategori`, component: Kalendar },
    // { path: '/user/:afterUser(.*)', component: UserHome },
    {
      path: '/eventease-SEO/user/:id',
      component: Hem,
      beforeEnter: (to, from, next) => {
        if (!useLoginStore().getIsLoggedIn()) {
          // Redirect to home
          next({ path: '/eventease-SEO/' });
        } else {
          // Continue with navigation
          next();
        }
      }
    }
  ]
});
