import Joi from '@hapi/joi';

async function validateUser(username: string, password: string) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required(),

    password: Joi.string().regex(/^[a-zA-Z0-9!@#]{0,30}$/)
  });

  return await schema.validate(
    { username: username, password: password },
    { abortEarly: false }
  );
}

export default validateUser;
