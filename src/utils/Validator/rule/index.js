export const DEFAULT_RULE = {
  isRequired: true,
};
export const USER_NAME_RULE = {
  isRequired: true,
  minLength: 10,
};
export const PASSWORD_RULE = {
  isRequired: true,
  minLength: 8,
};
export const OTP_RULE = {
  isRequired: true,
  minLength: 6,
};

export const NAME_RULE = {
  isRequired: true,
  minLength: 3,
  isName: true,
};
export const PHONE_RULE = {
  isRequired: true,
  maxLength: 10,
  minLength: 10,
  isPhone: true,
};
export const EMAIL_RULE = {
  isRequired: true,
  isEmail: true,
};
