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
import { Shop } from './pages/shop/Shop';

const shopCategories = [
  {
    name: 'Karma',
    category: 'karma',
  },
  {
    name: 'Przysmaki',
    category: 'przysmaki',
  },
  {
    name: 'Zabawki',
    category: 'zabawki',
  },
  {
    name: 'Kosmetyki',
    category: 'kosmetyki',
  },
  {
    name: 'Suplementy',
    category: 'suplementy',
  },
  {
    name: 'Legowiska',
    category: 'legowiska',
  },
  {
    name: 'Psy',
    category: 'psy',
  },
  {
    name: 'Koty',
    category: 'koty',
  },
  {
    name: 'Rybki',
    category: 'rybki',
  },
  {
    name: 'Ptaki',
    category: 'ptaki',
  },
  {
    name: 'Gady i Płazy',
    category: 'gady-i-plazy',
  },
  {
    name: 'Gryzonie',
    category: 'gryzonie',
  },
  {
    name: 'Wszystkie produkty',
    category: 'wszystko',
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      {shopCategories.map((site) => {
        return (
          <Route
            path={`/${site.category}`}
            element={
              <Shop name={site.name} category={site.category} />
            }
            key={site.category}
          ></Route>
        );
      })}
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
