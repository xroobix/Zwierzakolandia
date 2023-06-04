import { Category } from '../category/Category';
import './productcategory.css';
const categoryList = [
  {
    name: 'Karma',
    url: '/karma',
    img: '/assets/karma.svg',
  },
  {
    name: 'Przysmaki',
    url: '/przysmaki',
    img: '/assets/przysmaki.svg',
  },
  {
    name: 'Zabawki',
    url: '/zabawki',
    img: '/assets/zabawki.svg',
  },
  {
    name: 'Kosmetyki',
    url: '/kosmetyki',
    img: '/assets/kosmetyki.svg',
  },
  {
    name: 'Suplementy',
    url: '/suplementy',
    img: '/assets/suplementy.svg',
  },
  {
    name: 'Legowiska',
    url: '/legowiska',
    img: '/assets/legowiska.svg',
  },
];

export const ProductCategory = () => {
  return (
    <section className="product-category">
      <div className="container">
        <div className="product-category__header">
          <h1>Sprawdź kategorie</h1>
        </div>
        <div className="product-category__wrapper">
          {categoryList.map((i, idx) => (
            <Category name={i.name} url={i.url} img={i.img} key={`${i.name} ${idx}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
