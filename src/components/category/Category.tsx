import { FC } from 'react';
import { Link } from 'react-router-dom';
import './category.css';
interface Props {
  name: string;
  url: string;
  img: string;
}

export const Category: FC<Props> = ({ name, url, img }) => {
  return (
    <Link to={url} className="category__item">
      <img src={img} alt='category' className='item__image'/>
      <p className='item__header'>{name}</p>
    </Link>
  );
};
