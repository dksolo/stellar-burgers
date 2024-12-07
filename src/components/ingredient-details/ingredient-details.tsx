import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientByID } from '../../services/slices/ingredients/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientData = useSelector(getIngredientByID(params.id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
