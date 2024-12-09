import Joi from "joi";

const taskValidationSchema = Joi.object({
    name: Joi.string().min(3).optional(), // Name is optional for update and at least 3 characters long
    dueDate: Joi.date().greater(new Date()).optional(), // Optional dueDate, can be a future date
    completed: Joi.boolean().default(false), // Completed is optional and defaults to false
    priority: Joi.string().valid("Low", "Medium", "High").default("Low") // Priority must be one of the allowed values
});

export const validateTask = (req, res, next) => {
    const { error } = taskValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).send({ errors: errorMessage });
    }
    next();
};