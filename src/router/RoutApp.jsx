import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";


const routes = [
    {
        path: '/home',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <Home/>
    }
]
export default routes;