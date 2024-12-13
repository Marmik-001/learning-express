import Joi from "joi";
export const patchUserSchema = Joi.object({
    name: Joi.string().min(1).min(3).max(10).optional(), // Ensures the string is not empty and has a length between 3 and 10
    username: Joi.string().min(3).max(10).optional()
  }).min(1);

export default patchUserSchema