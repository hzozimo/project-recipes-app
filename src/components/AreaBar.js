import React, { useContext } from 'react';
// import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import { fetchFilterAreas } from '../api/fetchAreas';

function AreaBar() {
  const { areasFood, setData } = useContext(ContextRecipes);
  const { meals } = areasFood;

  async function handleChange({ target: { value } }) {
    const filteredArea = await fetchFilterAreas(value);
    setData(filteredArea);
  }

  return (
    <select
      name="area"
      data-testid="explore-by-area-dropdown"
      // value={  }
      onChange={ handleChange }
    >
      <option
        data-testid="All-option"
        value="All"
      >
        All
      </option>
      {meals && meals.map((area, index) => (
        <option
          data-testid={ `${area.strArea}-option` }
          key={ index }
          value={ `${area.strArea}` }
        >
          {area.strArea}
        </option>
      ))}
    </select>
  );
}

export default AreaBar;
