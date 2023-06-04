import { FC, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import data from '../../../../data/data.json';
import './filter-by.css';

interface Props {
  name: string;
  filteredData: string[];
}

export const FilterBy: FC<Props> = ({ name, filteredData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showViewMore, setShowViewMore] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const polishTitle = data.translations.flatMap((category) => (category.eng === name ? category.pl : []));

  const searchParamsArray = [...searchParams];

  return (
    <div className="filter-by">
      <div
        className="filter-by-header"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowViewMore(true);
        }}
      >
        <h3>{polishTitle[0].slice(0, 1).toUpperCase() + polishTitle[0].slice(1)}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          style={isOpen ? { transform: 'rotate(90deg)' } : {}}
        >
          <path
            d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"
            fill="#206ef6"
          ></path>
        </svg>
      </div>
      <ul
        style={{
          height: showViewMore && filteredData.length > 7 ? '210px' : 'auto',
          display: isOpen ? 'block' : 'none',
        }}
      >
        {filteredData.map((item) => {
          const filterParam = [name, item] as [string, string];
          let link = '';
          let isOn = false;
          const removeCurrentFilter = searchParamsArray.filter((param) => param[1] !== item);
          if (searchParamsArray.length === removeCurrentFilter.length) {
            link = [...removeCurrentFilter, filterParam]
              .map((param) => `${param[0]}=${param[1]}`)
              .sort()
              .join('&');
            isOn = true;
          } else {
            link = removeCurrentFilter
              .map((param) => `${param[0]}=${param[1]}`)
              .sort()
              .join('&');
          }

          return (
            <li key={`sort-by-${item}`}>
              <Link to={`?${link}`} className="filter-by-btn">
                {isOn ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5Z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                      fill="#206ef6"
                    ></path>
                  </svg>
                )}
                {item.slice(0, 1).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
      {isOpen && showViewMore && filteredData.length > 7 && (
        <button className="filter-by-vm-btn" onClick={() => setShowViewMore(false)}>
          Zobacz więcej
        </button>
      )}
    </div>
  );
};
