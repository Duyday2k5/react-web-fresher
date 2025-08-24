import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import ContactPage from './components/Contact/contact';
import BookPage from './components/Book/book';
import { Outlet } from 'react-router-dom';
import HomePage from './components/Home/home';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import LoginPage from './pages/login/login-page';
import RegisterPage from './pages/register/register-page';
import { useEffect } from 'react';
import { callFetchAccount } from './services/api';
import { doGetAccountAction } from './redux/account/accountSlice';
import { useDispatch } from 'react-redux';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import AdminPage from './pages/admin';
import { ProtectedRoute } from './components/ProtectedRoute';

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const getAccount = async () => {
    if (window.location.pathname === '/login' || window.location.pathname === '/admin') return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }
  useEffect(() => { //Get user info
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "contact",
          element: <ContactPage />
        },
        {
          path: "book",
          element: <BookPage />
        },
      ]
    },
    {
      path: "/admin",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element: <ContactPage />
        },
        {
          path: "book",
          element: <BookPage />
        },
      ]
    },
    {
      path: "register",
      element: <RegisterPage />
    },
    {
      path: "login",
      element: <LoginPage />
    },
  ]);

  return (
    (isAuthenticated === true || window.location.pathname === "/login" || window.location.pathname === "/admin") ? <RouterProvider router={router} /> : <Loading />
  );
}




