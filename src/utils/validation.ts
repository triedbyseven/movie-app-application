import Joi from '@hapi/joi';

async function validateUser(username: string, password: string) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(20)
      .required(),

    password: Joi.string().regex(/^[a-zA-Z0-9!@#]{0,30}$/)
  });

  return await schema.validate(
    { username: username, password: password },
    { abortEarly: false }
  );
}

async function validateRegisteredUser(
  username: string,
  email: string,
  password: string
) {
  const schema = Joi.object({
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

  return await schema.validate(
    { username: username, email: email, password: password },
    { abortEarly: false }
  );
}

export { validateUser, validateRegisteredUser };
