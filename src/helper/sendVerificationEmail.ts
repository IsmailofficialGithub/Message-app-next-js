import { resend } from "../lib/resend";
import VerificationEmail from "../../email/verificationEmail";
import { ApiResponse } from "@/types/apiResponce";

export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse>{
console.log(resend)
     try {
          await resend.emails.send({
               from: 'Acme <onboarding@resend.dev>',
               to: email,
               subject: 'Next-app || Verification Code ',
               react: VerificationEmail({username,otp:verifyCode}),
             });
             return {success:true,message:"Email Verification send SuccessFully"}

          
     } catch (error) {
          console.error("Error in Sending Verification Message",error)
          return {success:false,message:"Error in Sending Verification Message"}
          
     }
     
}