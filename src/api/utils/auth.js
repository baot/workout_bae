import { curry, flip, has, reduce, isEmpty, compose } from 'ramda';
import { Either } from 'monet';
import validator from 'validator';

//  chain :: Monad m => (a -> m b) -> m a -> m b
const chain = curry((f, m) => {
  return m.map(f).join();
});

// requiredFields :: [field] -> DataObj -> Either(Right(DataObj), Left(errorObj))
const requiredFields = curry((fields, data) => {
  const predicate = (a, b) => {
    if (!flip(has)(data)(b) || isEmpty(data[b])) a[b] = `${b} is required`;
    return a;
  };

  const error = reduce(predicate, {}, fields);
  if (isEmpty(error)) return Either.Right(data);
  return Either.Left(error);
});

const isEmail = (data) => {
  if (!validator.isEmail(data.email)) {
    return Either.Left({
      email: 'email is invalid'
    });
  }
  return Either.Right(data);
};

const passwordMatch = (data) => {
  if (!validator.equals(data.password, data.passwordConfirm)) {
    return Either.Left({
      passwordConfirm: 'passwords must mach'
    });
  }

  return Either.Right(data);
};

const validateInput = compose(chain(passwordMatch), chain(isEmail), requiredFields(['email', 'password', 'passwordConfirm']));

export { requiredFields, isEmail, passwordMatch, validateInput };
