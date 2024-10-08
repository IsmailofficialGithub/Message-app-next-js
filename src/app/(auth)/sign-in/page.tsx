"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import {  useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // on submit
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
      setIsSubmitting(true)
     const result= await signIn('Credentials',{
        redirect:false,
        identifier:data.identifier,
        password:data.password,
      })
      if(result?.error){
        toast({
          title:'Login Failed',
          description:"Incorrect UserName or Password",
          variant:"destructive",
        })
      }
      else{
        router.replace('/dashboard')
      }
      setIsSubmitting(false)

  };

  return (
    <div className="flex justify-center items-center min-h-screed bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-500 rounded-lg shadow-md mt-5">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/UserName</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/UserName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                 Please Wait
              </>
               : "SignIn"}
            </Button>
          </form>
        </Form>
            <div className="text-center mt-4">
              <p>
                I Don't have any Account {''}
                <Link href={'/sign-up'} className="text-slate-50 hover:text-blue-800">
                  Sign up ?
                </Link>
              </p>
            </div>
      </div>
    </div>
  );
};

export default page;
