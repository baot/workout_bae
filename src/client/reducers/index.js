import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import workouts from './workoutReducer';

const rootReducer = combineReducers({
  workouts,
  form: formReducer,
  routing: routerReducer,
});

export default rootReducer;
