import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = (data) => {
    // You can integrate with backend API here
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 mt-28">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      {/* <p className="text-center text-muted-foreground">
        We'd love to hear from you! Reach out to us using the form below or
        through our contact info.
      </p> */}

      {/* Contact Form */}
      {/* <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="subject"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2 text-center">
            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </div>
        </form>
      </Form> */}

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="p-4 border rounded-lg shadow-sm bg-blue-400 text-white">
          <h3 className="font-semibold mb-2">Email</h3>
          <p>benzeneprokashon@gmail.com</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm bg-blue-400 text-white">
          <h3 className="font-semibold mb-2">Phone</h3>
          <p>০১৯১৯৫২৫১৪৩</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm bg-blue-400 text-white">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>64, 65 Hazi Mohammad Ali Tower</p>
          <p>66 K B Rudro Rd, Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Optional Map */}
      <div className="mt-8 w-full h-64 md:h-96">
        <iframe
          title="Benzene Prokashon Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.123456!3d23.810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7dd3fdf1234%3A0xabcdef123456789!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1695000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          className="border-0 rounded-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
