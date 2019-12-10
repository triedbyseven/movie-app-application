import Joi from '@hapi/joi';

async function validateUser(username: string, password: string) {
  return await validateUserSchema.validate(
    { username: username, password: password },
    { abortEarly: false }
  );
}

async function validateRegisteredUser(
  username: string,
  email: string,
  password: string
) {
  return await validateRegisteredUserSchema.validate(
    { username: username, email: email, password: password },
    { abortEarly: false }
  );
}

const validateUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),

  password: Joi.string().regex(/^[a-zA-Z0-9!@#]{0,30}$/)
});

const validateRegisteredUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }),

  password: Joi.string().regex(/^[a-zA-Z0-9!@#]{0,30}$/)
});

export { validateUser, validateRegisteredUser };
