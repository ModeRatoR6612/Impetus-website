import {createRouter, createWebHistory} from 'vue-router'
import AppMain from './pages/AppMain.vue'
import AppApplication from './pages/AppApplication.vue'
import AppFest from './pages/AppFest.vue'
import AppNews from './pages/AppNews.vue'
import AppLogin from './pages/admin/AppLogin.vue'
import AppCreateFestival from './pages/admin/AppCreateFestival.vue'
import AppFeedbacks from './pages/AppFeedbacks.vue'
import AppCreateNews from './pages/admin/AppCreateNews.vue'
import App404 from './pages/server/App404.vue'
import AppAboutUs from './pages/AppAboutUs.vue'
import AppSeeApplications from './pages/admin/AppSeeApplications.vue'
import AppGallery from './pages/AppGallery.vue'
import AppContacts from './pages/AppContacts.vue'
import AppCreateFeedback from './pages/admin/AppCreateFeedback.vue'

const routes = [
    {name: 'main', path: '/main', component: AppMain, alias: '/'},
    {name: 'application', path: '/application', component: AppApplication},
    {name: 'festival', path: '/festival/:id', component: AppFest},
    {name: 'news', path: '/news', component: AppNews},
    {name: 'admin', path: '/admin', component: AppLogin},
    {name: 'createFestival', path: '/createFestival', component : AppCreateFestival},
    {name: 'feedbacks', path: '/feedbacks', component: AppFeedbacks},
    {name: 'createNews', path: '/createNews', component: AppCreateNews},
    {name: 'aboutUs', path: '/aboutUs', component: AppAboutUs},
    {name: 'seeApplications', path: '/seeApplications', component: AppSeeApplications},
    {name: 'gallery', path: '/gallery', component: AppGallery},
    {name: 'contacts', path: '/contacts', component: AppContacts},
    {name: 'createFeedback', path: '/createFeedback', component: AppCreateFeedback},

    {name: '404', path: '/:pathMatch(.*)*', component: App404},
]
const router  = createRouter({
  history: createWebHistory(),
  routes
})
export default router;