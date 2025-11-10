import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Award, Heart, Target, Users } from "lucide-react";

export default function About() {
  usePageMeta({
    title: "About Skiline Recruitment - Jobs for Retired Professionals | Return to Work India",
    description: "At Skiline Recruitment, we believe experience never goes out of style. Learn about our mission to reconnect skilled individuals to the workforce with meaningful opportunities for retired professionals and career restarters.",
    keywords: "about Skiline Recruitment, jobs for retired people, career restart for women, return to work India",
  });
  const values = [
    {
      icon: Award,
      title: "Experience",
      description: "We honor the wisdom and knowledge that comes with years of professional dedication.",
    },
    {
      icon: Heart,
      title: "Dignity",
      description: "Every role we offer respects the individual and their unique journey.",
    },
    {
      icon: Target,
      title: "Opportunity",
      description: "Creating meaningful pathways back into the professional world.",
    },
    {
      icon: Users,
      title: "Inclusion",
      description: "Welcoming all who are ready to contribute, regardless of age or career gap.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-accent py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
            About Skiline Recruitment
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Reconnecting skilled individuals to the workforce with dignity and purpose.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
              Our Story
            </h2>
            <p className="text-xl text-foreground leading-relaxed" data-testid="text-story">
              At Skiline Recruitment, we believe that experience never goes out of style. Founded with the mission to reconnect skilled individuals to the workforce, we create meaningful opportunities for those ready to return.
            </p>
            <p className="text-xl text-foreground leading-relaxed">
              Whether you're a retired professional with decades of expertise, a homemaker ready to restart your career, or a young professional starting your journey, we understand that everyone deserves a chance to contribute meaningfully to the professional world.
            </p>
            <p className="text-xl text-foreground leading-relaxed">
              Our approach is simple: match the right person with the right opportunity, respecting both the individual's circumstances and the employer's needs. We believe in flexible, dignified roles that honor your experience while providing the support needed to thrive in today's workplace.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="text-center hover-elevate active-elevate-2 transition-all duration-300"
                  data-testid={`card-value-${value.title.toLowerCase()}`}
                >
                  <CardHeader className="space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-serif text-2xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore our opportunities and find the perfect role that matches your skills and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities">
              <Button size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-explore-opportunities">
                Explore Opportunities
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" data-testid="button-contact-us">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
