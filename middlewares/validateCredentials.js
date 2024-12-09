import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long.",
        "string.empty": "Password is required.",
    }),
    role: Joi.string().valid("admin", "regular").default("regular"),
});

export const validateCredentials = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).send({ errors: errorMessage });
    }
    next();
};
