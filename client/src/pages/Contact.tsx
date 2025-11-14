import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/use-page-meta";
import { apiRequest } from "@/lib/queryClient";
import { contactSchema, type ContactForm } from "@shared/schema";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  usePageMeta({
    title: "Contact Skiline Recruitment - Jobs for Retired People & Career Assistance",
    description: "Get in touch with Skiline Recruitment for career opportunities, job inquiries, or assistance. Contact us via phone, email, or our online form. We'd love to hear from you.",
    keywords: "contact Skiline Recruitment, recruitment company India, jobs for retired people contact, career assistance",
  });

  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to Send",
        description: error.message || "Please try again later.",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    submitMutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <div className="flex-1 flex items-center justify-center py-16 md:py-24 px-6 md:px-8">
          <Card className="max-w-2xl w-full text-center">
            <CardHeader className="space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-secondary" />
              </div>
              <CardTitle className="font-serif text-4xl md:text-5xl">
                Message Sent!
              </CardTitle>
              <CardDescription className="text-xl leading-relaxed">
                Thank you for reaching out. Our team will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                onClick={() => setSubmitted(false)}
                className="text-lg"
                data-testid="button-send-another"
              >
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-accent py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            We'd love to hear from you. Reach out with any questions or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-3xl md:text-4xl">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Fill out the form below and we'll get back to you shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="text-lg py-6"
                                data-testid="input-contact-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Email <span className="text-muted-foreground text-sm">(Optional)</span></FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                className="text-lg py-6"
                                data-testid="input-contact-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">
                                  +91
                                </div>
                                <Input
                                  type="tel"
                                  placeholder="12345 67890"
                                  className="text-lg py-6 pl-12"
                                  data-testid="input-contact-phone"
                                  onChange={(e) => {
                                    // Remove any non-digit characters and limit to 10 digits
                                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    onChange(digits);
                                  }}
                                  value={field.value}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message..."
                                className="text-lg min-h-[150px] resize-none"
                                data-testid="input-contact-message"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full text-lg py-6"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {submitMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-3xl">
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4" data-testid="info-email">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Email</h3>
                      <a
                        href="mailto:info@skilinerecruitment.com"
                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                      >
                        skilinerecruitment360@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="info-phone">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Phone</h3>
                      <p className="text-lg text-muted-foreground">
                        +91 98410 02700<br />
                        +91 95510 87099
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="info-address">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">Address</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        No 8, 44th Street, Ashok Nagar<br />
                        Chennai - 600083<br />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden" data-testid="map-placeholder">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9483921937604!2d80.21093337490694!3d13.038956987282644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267fe22b84d3f%3A0x33204efb5e1fcbdf!2sSkiline%20Recruitment%20(Training%20%26%20Development%20Center%20of%20Kotak%20Insurance)!5e0!3m2!1sen!2sin!4v1762762519195!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Skiline Recruitment Office Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
