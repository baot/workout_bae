import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import workouts from './workoutReducer';

const rootReducer = combineReducers({
  workouts,
  routing: routerReducer,
});

export default rootReducer;
