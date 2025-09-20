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
import { LayoutAdmin } from './components/Admin/LayoutAdmin';
import { ManageOrderPage } from './pages/admin/order';

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
  const isLoading = useSelector(state => state.account.isLoading);
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const getAccount = async () => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') return;
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
      element: <LayoutAdmin />,
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
        {
          path: "order",
          element: <ManageOrderPage />
        }
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
    (isLoading === false || isAuthenticated === true || window.location.pathname === "/login" || window.location.pathname === "/register") ? <RouterProvider router={router} /> : <Loading />
  );
}




