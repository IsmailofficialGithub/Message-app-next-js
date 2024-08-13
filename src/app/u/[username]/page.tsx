"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import messages from "@/message.json";

interface InputData {
  messageToSend: string;
}

const MessagePage = () => {
  const params = useParams();
  const userName = decodeURIComponent(params.username.toString());
  const [loading, setLoading] = useState(false);
  const [clickSuggestMessage, setClickSuggestMessage] = useState("");
  const { watch, register, handleSubmit, setValue } = useForm();
  const [messageValid,setMessgeValid]=useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const message: string = watch("messageToSend");
  const onSubmit = async (data: any) => {
    setLoading(true);
    if(data.messageToSend.length<=10 ||data.messageToSend.length >300 ){
      setMessgeValid(true)
      setTimeout(()=>{
        setMessgeValid(false)
      },2000)
       toast({
        title:"Message is Not valid",
        description:"Message must be than 10 letter or less than 300 letter",
        variant:'destructive'
      })

     return setLoading(false) 
    }
    setMessgeValid(false)
    try {
      const sendMessage = await axios.post("/api/send-message", {
        userName,
        content: data.messageToSend,
      });
      if (sendMessage.data.success) {
        toast({
          title: "Success",
          description: sendMessage.data.message,
        });
        setClickSuggestMessage("");
      } else {
        toast({
          title: "ERROR",
          description: sendMessage.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const messageClick = (message: string) => {
    console.log(message);
    setClickSuggestMessage(message);
  };
  return (
    <>
      <div className=" my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl">
        <h1 className="font-bold text-4xl text-center mb-8">Public Profile Link</h1>
        <p className="text-red-500 font-bold">{messageValid? 'Message must be than 10 letter or less than 300 letter': ''}</p>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Add Message to send"
              {...register("messageToSend")}
              onChange={(e) => {
                setClickSuggestMessage(e.target.value);
              }}
              value={clickSuggestMessage}
            />

            <Button
              type="submit"
              onClick={() => {
                setValue("messageToSend", clickSuggestMessage);
              }}>
              {" "}
              {loading ? <Loader2 /> : ""}Send message
            </Button>
          </form>
        </Form>
        <div className="flex justify-center items-center flex-col">
          <Button>Sugguest Messages</Button>

          {/* // card */}
          <Card className="w-[100%]  ">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col item-center justify-center gap-3">
              {messages.map((message, index) => (
                <Button
                  className="bg-transparent border border-solid rounded-lg text-black hover:text-white"
                  onClick={() => {
                    messageClick(message.content);
                  }}>
                  {message.content}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
