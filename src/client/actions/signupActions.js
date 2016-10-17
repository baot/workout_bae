export function signupUser(user) {
  return dispatch => {
    return fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };
}
