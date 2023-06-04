import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import './root.css';

export const Root = () => {
  return (
    <>
      <ToastContainer
        transition={Slide}
        rtl={false}
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
