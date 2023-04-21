import { Category } from "../../../components/category/Category"
import "./productcategory.css"
const categoryList = [
    {
      name: 'Karma',
      url: '/karma',
      img: 'karma.svg',
    },
    {
      name: 'Przysmaki',
      url: '/przysmaki',
      img: 'przysmaki.svg',
    },
    {
      name: 'Zabawki',
      url: '/zabawki',
      img: 'zabawki.svg',
    },
    {
      name: 'Kosmetyki',
      url: '/kosmetyki',
      img: 'kosmetyki.svg',
    },
    {
      name: 'Suplementy',
      url: '/suplementy',
      img: 'suplementy.svg',
    },
    {
      name: 'Legowiska',
      url: '/legowiska',
      img: 'legowiska.svg',
    },
  ];

export const ProductCategory = () => {
  return (
    <section className="product-category">
        <div className="container">
          <div className="product-category__header">
            <h1>Kup według kategorii</h1>
          </div>
          <div className="product-category__wrapper">
            {categoryList.map((i, idx) => (
              <Category
                name={i.name}
                url={i.url}
                img={i.img}
                key={`${i.name} ${idx}`}
              />
            ))}
          </div>
        </div>
      </section>
  )
}
