import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Briefcase, Heart, Phone, Users, CheckCircle } from "lucide-react";

export default function Opportunities() {
  usePageMeta({
    title: "Career Opportunities - Jobs for Retired Professionals & Telecalling Roles | Skiline",
    description: "Explore flexible career opportunities at Skiline Recruitment: retired professionals (55+), housewives (35+), telecalling roles, and field executive positions. Find your perfect role today.",
    keywords: "career restart India, jobs for retired professionals, telecalling jobs, flexible field jobs, work for housewives after 35",
  });
  const opportunities = [
    {
      id: "retired",
      icon: Briefcase,
      title: "Retired Professionals (55+)",
      description: "Share your wisdom and continue contributing in flexible, dignified roles suited to your experience.",
      benefits: [
        "Flexible working hours",
        "Respect for your expertise",
        "Mentorship opportunities",
        "Work-life balance",
      ],
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      id: "housewife",
      icon: Heart,
      title: "Housewives (35+)",
      description: "Restart your career journey with part-time or flexible roles tailored for homemakers.",
      benefits: [
        "Part-time opportunities",
        "Flexible schedules",
        "Skill development support",
        "Supportive environment",
      ],
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
    {
      id: "telecalling",
      icon: Phone,
      title: "Tele Calling (Female, 20-25)",
      description: "Engage with clients over the phone, manage follow-ups, and assist our HR team.",
      benefits: [
        "Communication skills training",
        "Professional development",
        "Career growth path",
        "Supportive team culture",
      ],
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      id: "field",
      icon: Users,
      title: "Field Executives (20-30)",
      description: "Represent Skiline in the field, generate leads, and help us reach more professionals.",
      benefits: [
        "Travel opportunities",
        "Performance incentives",
        "Leadership training",
        "Networking growth",
      ],
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-accent py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
            Career Opportunities
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Find the perfect role that matches your skills, experience, and life stage.
          </p>
        </div>
      </section>

      {/* Opportunities List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-12">
          {opportunities.map((opp, index) => {
            const Icon = opp.icon;
            return (
              <Card
                key={opp.id}
                className={`hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-xl ${index % 2 === 0 ? '' : opp.bgColor}`}
                data-testid={`card-opportunity-${opp.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ${opp.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-3xl md:text-4xl mb-3">
                          {opp.title}
                        </CardTitle>
                        <CardDescription className="text-lg md:text-xl leading-relaxed">
                          {opp.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-xl text-foreground">What We Offer:</h4>
                      <ul className="space-y-2">
                        {opp.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3 text-lg text-muted-foreground">
                            <CheckCircle className={`h-5 w-5 flex-shrink-0 ${opp.color}`} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-center lg:justify-end">
                    <Link href="/join">
                      <Button size="lg" className="text-lg px-8 py-6 h-auto w-full lg:w-auto" data-testid={`button-apply-${opp.id}`}>
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join our community of professionals and start your journey today.
          </p>
          <Link href="/join">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-join-now">
              Join Us Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
