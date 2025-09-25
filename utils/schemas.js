import z from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address.")
    .min(1, "Email is required."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password cannot exceed 20 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .min(1, "Password is required."),
});

export const mealSchema = z.object({
  type: z
    .enum(["breakfast", "lunch", "dinner", "sehri", "iftaar"], {
      invalid_type_error:
        "Meal type must be one of ['breakfast', 'lunch', 'dinner', 'sehri', 'iftaar']",
    })
    .transform((value) => value.toLowerCase())
    .refine(
      (value) =>
        ["breakfast", "lunch", "dinner", "sehri", "iftaar"].includes(value),
      "Meal type must be one of ['breakfast', 'lunch', 'dinner', 'sehri', 'iftaar']"
    ),
  numberOfPeople: z
    .number({
      invalid_type_error: "Number of people must be a valid number",
    })
    .int("Number of people must be an integer")
    .positive("Number of people must be a positive number")
    .refine((val) => val !== undefined, "Number of people is required"),
  image: z.string().optional(),
  isFoodLeft: z
    .boolean({
      invalid_type_error: "Is food left must be a boolean value",
    })
    .refine((val) => val !== undefined, "Is food left is required"),
});
