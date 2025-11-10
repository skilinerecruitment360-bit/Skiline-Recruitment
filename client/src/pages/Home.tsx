import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Briefcase, Heart, Phone, Users } from "lucide-react";
import heroImage from "@assets/generated_images/Diverse_professionals_collaborating_warmly_a701da27.png";

export default function Home() {
  usePageMeta({
    title: "Skiline Recruitment - Experience Never Retires | Career Opportunities for Retired Professionals",
    description: "Skiline Recruitment offers meaningful career opportunities for retired professionals, housewives 35+, and young telecallers. Reignite your professional journey with flexible roles designed for your experience.",
    keywords: "retired job opportunities, second career options, jobs for seniors, work for housewives, flexible career after 35, experience never retires",
  });
  const opportunities = [
    {
      id: "retired",
      icon: Briefcase,
      title: "Retired Professionals",
      description: "Share your wisdom and continue contributing in flexible, dignified roles suited to your experience.",
      color: "text-primary",
    },
    {
      id: "housewife",
      icon: Heart,
      title: "Housewives (35+)",
      description: "Restart your career journey with part-time or flexible roles tailored for homemakers.",
      color: "text-secondary",
    },
    {
      id: "telecalling",
      icon: Phone,
      title: "Telecalling (Female, 20-25)",
      description: "Engage with clients over the phone, manage follow-ups, and assist our HR team.",
      color: "text-primary",
    },
    {
      id: "field",
      icon: Users,
      title: "Field Executives (20-30)",
      description: "Represent Skiline in the field, generate leads, and help us reach more professionals.",
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-accent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Experience Never Retires
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Reignite your professional journey with opportunities designed just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/join">
                  <Button size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-hero-join">
                    Join Us Today
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" data-testid="button-hero-explore">
                    Explore Opportunities
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Diverse professionals collaborating warmly in a modern office"
                  className="w-full h-auto object-cover"
                  data-testid="img-hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-6">
          <p className="text-xl md:text-2xl text-foreground leading-relaxed" data-testid="text-mission">
            At Skiline Recruitment, we believe that experience never goes out of style. We create meaningful opportunities for those ready to return, honoring the wisdom and dedication that comes with a lifetime of work.
          </p>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Find Your Perfect Role
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our carefully curated opportunities designed for different life stages and experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {opportunities.map((opp) => {
              const Icon = opp.icon;
              return (
                <Card
                  key={opp.id}
                  className="hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-xl flex flex-col"
                  data-testid={`card-opportunity-${opp.id}`}
                >
                  <CardHeader className="space-y-4">
                    <div className={`w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center ${opp.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-serif text-2xl">
                      {opp.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-lg leading-relaxed">
                      {opp.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href="/join">
                      <Button variant="ghost" className="w-full text-lg" data-testid={`button-opportunity-${opp.id}`}>
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
