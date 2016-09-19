export default function workoutReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_WORKOUT':
      return [...state, Object.assign({}, action.workout)];
    default:
      return state;
  }
}
