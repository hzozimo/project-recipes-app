import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          className="mb-3"
          src={ drinkIcon }
          alt="Footer icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          className="mb-1"
          src={ exploreIcon }
          alt="Footer icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          className="mb-1"
          src={ mealIcon }
          alt="Footer icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
