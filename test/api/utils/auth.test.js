import expect from 'expect';
import { Either } from 'monet';

import { requiredFields, isEmail, passwordMatch, validateInput } from '../../../src/api/utils/auth';

describe('utils auth test', () => {
  describe('requiredFields test', () => {
    it('requiredFields should return Either Right', () => {
      const data = {
        email: 'email',
        password: 'pwd',
        passwordConfirm: 'p',
      };

      const result = requiredFields(['email', 'password', 'passwordConfirm'])(data);
      expect(result).toEqual(Either.Right(data));
    });

    it('requiredFields should return Either Left', () => {
      const data = {
        email: '',
        password: 'pwd',
        passwordConfirm: '',
      };

      const result = requiredFields(['email', 'password', 'passwordConfirm'])(data);
      expect(result).toEqual(Either.Left({
        email: 'email is required',
        passwordConfirm: 'passwordConfirm is required',
      }));
    });
  });

  describe('isEmail test', () => {
    it('isEmail should return Either Right for success', () => {
      const data = {
        email: 'test@test.com'
      };

      const result = isEmail(data);
      expect(result).toEqual(Either.Right(data));
    });

    it('isEmail should return Either Left for failure', () => {
      const data = {
        email: 'abcEmail'
      };

      const result = isEmail(data);
      expect(result).toEqual(Either.Left({
        email: 'email is invalid'
      }));
    });
  });

  describe('passwordMatch test', () => {
    it('passwordMatch should return Either Right for success', () => {
      const data = {
        password: 'pwd',
        passwordConfirm: 'pwd'
      };

      const result = passwordMatch(data);
      expect(result).toEqual(Either.Right(data));
    });

    it('passwordMatch should return Either Left for failure', () => {
      const data = {
        password: 'pwd',
        passwordConfirm: ''
      };

      const result = passwordMatch(data);
      expect(result).toEqual(Either.Left({
        passwordConfirm: 'passwords must mach'
      }));
    });
  });

  describe('validateInput', () => {
    it('validateInput should return Either Right for success', () => {
      const data = {
        email: 'rightEmail@gmail.com',
        password: 'pwd',
        passwordConfirm: 'pwd'
      };

      const result = validateInput(data);
      expect(result).toEqual(Either.Right(data));
    });

    it('validateInput should return Either Left for wrong email', () => {
      const data = {
        email: 'wrongEmail',
        password: 'pwd',
        passwordConfirm: 'pwd'
      };

      const result = validateInput(data);
      expect(result).toEqual(Either.Left({
        email: 'email is invalid'
      }));
    });

    it('validateInput should return Either Left for requiring fields', () => {
      const data = {
        email: '',
        password: 'pwd',
        passwordConfirm: ''
      };

      const result = validateInput(data);
      expect(result).toEqual(Either.Left({
        email: 'email is required',
        passwordConfirm: 'passwordConfirm is required',
      }));
    });

    it('validateInput should return Either Left for password matching', () => {
      const data = {
        email: 'rightEmail@gmail.com',
        password: 'pwd',
        passwordConfirm: 'pwd1'
      };

      const result = validateInput(data);
      expect(result).toEqual(Either.Left({
        passwordConfirm: 'passwords must mach',
      }));
    });
  });
});
