import Joi from "joi-browser";

const userSchema = {
  username: Joi.string().alphanum().min(3).max(30).required().label("username"),
  name: Joi.string().min(3).max(30).required().label("name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("email"),
  phone: Joi.number().required().label("phone"),
  address: Joi.string().min(3).required().label("address"),
};

const projectTextSchema = {
  projectTitle: Joi.string().min(3).max(30).required().label("projectTitle"),
  artist: Joi.string().min(3).max(30).required().label("artist"),
  description: Joi.string().min(50).required().label("description"),
};

export const validateField = (name, value, schema) => {
  let fieldSchema;
  switch (schema) {
    case "userSchema":
      fieldSchema = { [name]: userSchema[name] };
      break;
    case "projectTextSchema":
      fieldSchema = { [name]: projectTextSchema[name] };
      break;
  }

  const data = { [name]: value };
  const { error } = Joi.validate(data, fieldSchema);
  return error ? error.details[0].message : null;
};

export const validateUser = (user) => {
  const { error } = Joi.validate(user, userSchema);
  return error ? false : true;
};

export const validateProjectText = (text) => {
  const { error } = Joi.validate(text, projectTextSchema);
  return error ? false : true;
};
