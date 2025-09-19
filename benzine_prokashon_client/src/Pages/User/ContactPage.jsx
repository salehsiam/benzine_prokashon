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
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send } from "lucide-react";

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

  const onSubmit = async (data) => {
    try {
      const serviceID = "service_g6z1es7";
      const templateID = "template_ate9qkn";
      const publicKey = "Ppv7Y2I8qYkD_tC9a";

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          reply_to: data.email,
        },
        publicKey
      );

      toast.success("Message sent successfully!");
      reset();
    } catch (err) {
      console.error("Email send error:", err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 mt-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to reach out using the form below or
          through our contact details.
        </p>
      </div>

      {/* Form + Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border"
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
                      <Textarea
                        placeholder="Write your message..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex justify-center">
                <Button
                  type="submit"
                  className="px-6 py-2 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Email</h3>
            </div>
            <p className="text-sm">benzeneprokashon@gmail.com</p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Phone</h3>
            </div>
            <p className="text-sm">০১৯১৯৫২৫১৪৩</p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Address</h3>
            </div>
            <p className="text-sm">
              ৩৮/এ, হাজী এ এন আলী টাওয়ার, বাংলাবাজার, ঢাকা-১১০০
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl shadow-lg border">
        <iframe
          title="Benzene Prokashon Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.123456!3d23.810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7dd3fdf1234%3A0xabcdef123456789!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1695000000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
