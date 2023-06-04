import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Root } from './components/root/Root';
import data from './data/data.json';
import './index.css';
import { Home } from './pages/home/Home';
import { ProductPage } from './pages/product-page/ProductPage';
import { Shop } from './pages/shop/Shop';
import { Cart } from './pages/cart/Cart';
import { Contact } from './pages/contact/Contact';
import { NotFound } from './pages/not-found/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      {data.categories.map((site) => (
        <Route
          path={`/${site.category}`}
          element={
            <Shop categoryName={site.name} category={site.category} />
          }
          key={site.category}
        />
      ))}
      {data.products.map((product) => {
        const productNameWithoutPolishChars = product['product-name']
          .replace('ł', 'l')
          .replace('Ł', 'L')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const productLink = productNameWithoutPolishChars
          .replace(/\W+/g, '-')
          .toLowerCase();

        return (
          <Route
            path={`/produkt/${productLink}`}
            element={<ProductPage id={product.id} />}
            key={`/produkt/${productLink}`}
          />
        );
      })}
      <Route path='/koszyk' element={<Cart />}/>
      <Route path='/kontakt' element={<Contact />}/>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
