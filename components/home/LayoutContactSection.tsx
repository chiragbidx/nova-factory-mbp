"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  agency: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(2).max(255),
  message: z.string(),
});

export const LayoutContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      agency: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const [status, setStatus] = useState<{ type: "idle" | "sending" | "ok" | "error"; msg?: string }>({ type: "idle" });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus({ type: "sending" });
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      if (resp.ok) {
        setStatus({ type: "ok" });
        form.reset();
      } else {
        const { error } = await resp.json();
        setStatus({ type: "error", msg: error || "Unknown error, try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Failed to send. Try again." });
    }
  }

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">Contact</h2>
            <h2 className="text-3xl md:text-4xl font-bold">
              Speak to the Marketiq team
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            Agencies, consultants, and growth teams: Get a tailored demo, pricing, or support. Marketiq is crafted for your success.
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">Find us</div>
              </div>
              <div>Remote-first • San Francisco, CA</div>
            </div>
            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">Call us</div>
              </div>
              <div>(No phone, email only)</div>
            </div>
            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">Email us</div>
              </div>
              <div>
                <a
                  href="mailto:hi@chirag.co"
                  className="underline text-primary"
                >
                  hi@chirag.co
                </a>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Business Hours</div>
              </div>
              <div>
                <div>Monday - Friday</div>
                <div>9AM - 6PM PT</div>
              </div>
            </div>
          </div>
        </div>
        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-primary text-2xl"> </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                <div className="flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="agency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency or Brand</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Acme Campaigns"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@agency.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="General Inquiry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Inquiry">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="Book a demo">
                              Book a demo
                            </SelectItem>
                            <SelectItem value="Support">
                              Support
                            </SelectItem>
                            <SelectItem value="Pricing">
                              Pricing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="How can we help your agency succeed?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="mt-4" disabled={status.type === "sending"}>
                  {status.type === "sending"
                    ? "Sending..."
                    : status.type === "ok"
                    ? "Sent!"
                    : "Send Inquiry"}
                </Button>
                {status.type === "error" && (
                  <div className="mt-2 text-sm text-destructive">
                    {status.msg}
                  </div>
                )}
                {status.type === "ok" && (
                  <div className="mt-2 text-sm text-primary">
                    Thank you! Our team will contact you soon.
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};