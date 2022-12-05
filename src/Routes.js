import Home from './pages/Home'
import Login from './components/Login/'
import Bookmarks from './pages/Bookmarks'
const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        private: true
    },
    {
        path: '/bookmarks',
        component: Bookmarks,
        private: true,
    },
    {
        path:'/login',
        component: Login,
        private: false
    }
]
export default routes