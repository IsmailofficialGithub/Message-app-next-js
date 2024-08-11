"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import messages from '@/message.json'
import Autoplay from 'embla-carousel-autoplay'
export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      <section className="text-center mb-8 md:mb-12 ">
        <h1 className="text-3xl md:text-5xl font-bold">Dive into the World of Anonymous Conversation</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Mystery Message - Where your identify remains a secret..</p>
      </section>
      <Carousel className="w-full max-w-xs"  
       plugins={[Autoplay({ delay: 2000 })]}>
       
      <CarouselContent>
       {
       messages.map((message,index)=>(
        <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader className="md:basis-1/2 lg:basis-1/3">{message?.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{message?.content}</span>
                </CardContent>
                <CardFooter>{message?.received ||'hello'}</CardFooter>
              </Card>
            </div>
          </CarouselItem>
       ))
       
       }
      </CarouselContent>
    </Carousel>
      </main>
       {/* Footer */}
       <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </>
  );
}
 