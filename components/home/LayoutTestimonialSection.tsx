"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "/demo-img.jpg",
    name: "Ashley Tran",
    userName: "Partner, Slate Agency",
    comment:
      "Marketiq streamlined our client management and made reporting effortless. Our team loves the AI agents for campaign execution.",
    rating: 5.0,
  },
  {
    image: "/demo-img.jpg",
    name: "Lucas Márquez",
    userName: "Growth Lead, EightOwl",
    comment:
      "The onboarding was incredibly smooth. We left our stitched-together spreadsheets for a modern dashboard—finally!",
    rating: 4.9,
  },
  {
    image: "/demo-img.jpg",
    name: "Priya Sharma",
    userName: "Founder, CurveMark",
    comment:
      "MarketIQ’s asset library and analytics have saved us hours each week—clients get clear, branded reports in minutes.",
    rating: 4.8,
  },
  {
    image: "/demo-img.jpg",
    name: "Jake Oberlin",
    userName: "Director, SixPoint Labs",
    comment:
      "We now manage campaigns for 15+ brands from one place. Marketiq is indispensable for modern agencies.",
    rating: 5.0,
  },
  {
    image: "/demo-img.jpg",
    name: "Hannah Liu",
    userName: "Consultant, Campaign Hive",
    comment:
      "Client communications and deliverables stay within Marketiq—no more email flooding, happier clients.",
    rating: 5.0,
  },
  {
    image: "/demo-img.jpg",
    name: "Emmanuel Petit",
    userName: "Agency Owner, The Brand Room",
    comment:
      "The demo sold us: team permissions plus branded exports, all with top-tier support. Highly recommend!",
    rating: 4.9,
  },
];

export const LayoutTestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Agencies love Marketiq
        </h2>
      </div>

      <Carousel
        opts={{ align: "start" }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    {Array.from({ length: Math.round(review.rating) }).map((_, idx) => (
                      <Star key={idx} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};