import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/use-page-meta";
import { apiRequest } from "@/lib/queryClient";
import {
  retiredProfessionalSchema,
  housewifeSchema,
  telecallingSchema,
  fieldExecutiveSchema,
  type OpportunityCategory,
  type ApplicationForm,
} from "@shared/schema";
import { Briefcase, Heart, Phone, Users, CheckCircle, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Reusable component for required field indicator
const RequiredField = () => (
  <span className="text-red-500 ml-1">*</span>
);

export default function JoinUs() {
  usePageMeta({
    title: "Join Skiline Recruitment - Apply for Flexible Jobs & Career Opportunities",
    description: "Apply now for career opportunities at Skiline Recruitment. Join our team as a retired professional, housewife looking to restart your career, telecaller, or field executive. Submit your application today.",
    keywords: "join Skiline Recruitment, apply for flexible jobs, career for retired professionals, job application form India",
  });

  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const categories = [
    {
      id: "retired" as const,
      icon: Briefcase,
      title: "Retired Professionals",
      description: "Share your wisdom in flexible, dignified roles",
      color: "text-primary",
      benefits: [
        "Flexible working hours",
        "Respect for your expertise",
        "Mentorship opportunities",
        "Work-life balance"
      ]
    },
    {
      id: "housewife" as const,
      icon: Heart,
      title: "Housewives (35+)",
      description: "Restart your career with flexible opportunities",
      color: "text-green-500",
      benefits: [
        "Part-time opportunities",
        "Flexible schedules",
        "Skill development support",
        "Supportive environment"
      ]
    },
    {
      id: "telecalling" as const,
      icon: Phone,
      title: "Tele Calling (Female, 20-25)",
      description: "Build communication skills and career growth",
      color: "text-green-500",
      benefits: [
        "Communication skills training",
        "Professional development",
        "Career growth path",
        "Supportive team culture"
      ]
    },
    {
      id: "field" as const,
      icon: Users,
      title: "Field Executives (20-30)",
      description: "Represent us in the field and grow your network",
      color: "text-primary",
      benefits: [
        "Travel opportunities",
        "Performance incentives",
        "Leadership training",
        "Networking growth"
      ]
    },
  ];

  const getSchema = (category: OpportunityCategory) => {
    switch (category) {
      case "retired":
        return retiredProfessionalSchema;
      case "housewife":
        return housewifeSchema;
      case "telecalling":
        return telecallingSchema;
      case "field":
        return fieldExecutiveSchema;
    }
  };

  const form = useForm<ApplicationForm>({
    resolver: selectedCategory ? zodResolver(getSchema(selectedCategory)) : undefined,
    defaultValues: {
      category: selectedCategory || "retired",
      name: "",
      dateOfBirth: "",
      contactNumber: "",
      email: "",
      educationQualification: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ApplicationForm) => {
      return await apiRequest("POST", "/api/join-us", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you! Our team will reach out soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Please try again later.",
      });
    },
  });

  const onSubmit = (data: ApplicationForm) => {
    submitMutation.mutate(data);
  };

  const handleCategorySelect = (category: OpportunityCategory) => {
    setSelectedCategory(category);
    // Clear all form errors and reset to default values for the new category
    form.clearErrors();
    const baseDefaults: any = {
      category,
      name: "",
      dateOfBirth: "",
      contactNumber: "",
      email: "",
      educationQualification: "",
    };
    // Add retired-specific fields if applicable
    if (category === "retired") {
      baseDefaults.lastDesignationTitle = "";
      baseDefaults.yearsOfExperience = undefined;
    }
    form.reset(baseDefaults);
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
                Thank You!
              </CardTitle>
              <CardDescription className="text-xl leading-relaxed">
                Your application has been successfully submitted. Our team will review your details and reach out to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                We appreciate your interest in joining Skiline Recruitment.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedCategory(null);
                  form.reset();
                }}
                className="text-lg"
                data-testid="button-submit-another"
              >
                Submit Another Application
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
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Take the first step towards a meaningful career opportunity.
          </p>
        </div>
      </section>

      {!selectedCategory ? (
        /* Category Selection */
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Choose Your Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover-elevate active-elevate-2 transition-all duration-300 h-full flex flex-col"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold text-foreground mb-3">What We Offer:</h4>
                        <ul className="space-y-2">
                          {category.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${category.color || 'text-primary'}`} />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* Application Form */
        <section className="py-16 md:py-24 bg-accent/50">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <Card>
              <CardHeader className="space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  className="w-fit text-lg"
                  data-testid="button-change-category"
                >
                  ← Change Category
                </Button>
                <CardTitle className="font-serif text-3xl md:text-4xl">
                  {categories.find((c) => c.id === selectedCategory)?.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  Please fill out the form below to apply for this position.
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
                          <FormLabel className="text-lg">
                            Full Name <RequiredField />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="text-lg py-6"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => {
                        const dateValue = field.value ? new Date(field.value) : null;
                        return (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-lg">
                              Date of Birth <RequiredField />
                            </FormLabel>
                            <div className="relative">
                              <DatePicker
                                selected={dateValue}
                                onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date of birth"
                                className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                maxDate={new Date()}
                                showMonthDropdown
                                dropdownMode="select"
                                data-testid="input-dob"
                              />
                              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Contact Number <RequiredField />
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">
                                +91
                              </div>
                              <Input
                                type="tel"
                                placeholder="98765 43210"
                                className="text-lg py-6 pl-12"
                                data-testid="input-phone"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Email Address <span className="text-muted-foreground text-sm">(Optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="text-lg py-6"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="educationQualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Education Qualification <RequiredField />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Bachelor's in Business Administration"
                              className="text-lg py-6"
                              data-testid="input-education"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedCategory === "retired" && (
                      <>
                        <FormField
                          control={form.control}
                          name="lastDesignationTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">
                                Last Designation Title <RequiredField />
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Senior Manager"
                                  className="text-lg py-6"
                                  data-testid="input-designation"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yearsOfExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">
                                Years of Experience <RequiredField />
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="text-lg py-6" data-testid="select-experience">
                                    <SelectValue placeholder="Select your experience" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="5+" className="text-lg">5+ years</SelectItem>
                                  <SelectItem value="10+" className="text-lg">10+ years</SelectItem>
                                  <SelectItem value="15+" className="text-lg">15+ years</SelectItem>
                                  <SelectItem value="25+" className="text-lg">25+ years</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-lg py-6"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-application"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
