export type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
};

export type RegisterErrorData = {
  email: null | string;
  firstName: null | string;
  lastName: null | string;
  password: null | string;
  repeatPassword: null | string;
};
