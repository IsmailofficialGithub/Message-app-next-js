import {z} from 'zod';


export const usernameValidation=z
     .string()
     .min(2,"User Name must be atleast 2 characters")
     .max(20,"userName is must not be more than 20 characters")
     .regex(/^[a-zA-Z0-9_]+$/,"Username must only contain letters, numbers, and underscores, with no spaces.")


export const signUpSchema=z.object({
     userName:usernameValidation,
     email:z.string().email({message:"Invalid email Address"}),
     password:z.string().min(6,{message:"Password must be atleast 6 characters"}),

})
