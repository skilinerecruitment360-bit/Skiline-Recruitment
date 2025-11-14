import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Briefcase, Heart, Phone, Users, Award, Target } from "lucide-react";
import heroImage from "../../../attached_assets/generated_images/home_screen_team.jpg";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";

export default function Home() {
  usePageMeta({
    title: "Skiline Recruitment - Experience Never Retires | Career Opportunities for Retired Professionals",
    description: "Skiline Recruitment offers meaningful career opportunities for retired professionals, housewives 35+, and young telecallers. Reignite your professional journey with flexible roles designed for your experience.",
    keywords: "retired job opportunities, second career options, jobs for seniors, work for housewives, flexible career after 35, experience never retires",
  });

  // Handle scroll to section on initial load and hash changes
  useEffect(() => {
    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    // Handle initial load with hash
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      // Small delay to ensure the DOM is fully loaded
      const timer = setTimeout(() => {
        scrollToSection(hash);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        scrollToSection(hash);
      } else {
        // Scroll to top if hash is empty
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const opportunities = [
    {
      id: "retired",
      icon: Briefcase,
      title: "Retired Professionals",
      description: "Share your wisdom and continue contributing in flexible, dignified roles suited to your experience.",
      color: "text-primary",
      formLink: "/join?role=retired"
    },
    {
      id: "housewife",
      icon: Heart,
      title: "Housewives (35+)",
      description: "Restart your career journey with part-time or flexible roles tailored for homemakers.",
      color: "text-secondary",
      formLink: "/join?role=housewife"
    },
    {
      id: "telecalling",
      icon: Phone,
      title: "Telecalling (Female, 20-25)",
      description: "Engage with clients over the phone, manage follow-ups, and assist our HR team.",
      color: "text-primary",
      formLink: "/join?role=telecalling"
    },
    {
      id: "field",
      icon: Users,
      title: "Field Executives (20-30)",
      description: "Represent Skiline in the field, generate leads, and help us reach more professionals.",
      color: "text-secondary",
      formLink: "/join?role=field"
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
            <motion.div 
              className="space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Experience Never Retires
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Reignite your professional journey with opportunities designed just for you.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link href="/join">
                  <Button size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-hero-join">
                    Join Us Today
                  </Button>
                </Link>
                <Link href="/join">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" data-testid="button-hero-explore">
                    Explore Opportunities
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <motion.img
                  src={heroImage}
                  alt="Diverse professionals collaborating warmly in a modern office"
                  className="w-full h-auto object-cover"
                  data-testid="img-hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 md:py-24 bg-background">
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
                </Card>
              );
            })}
          </div>
          
          {/* Get Started Button */}
          <div className="mt-12 text-center">
            <Link href="/join">
              <Button size="lg" className="px-8 py-6 text-lg font-medium">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              About Skiline Recruitment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reconnecting skilled individuals to the workforce with dignity and purpose.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
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
            ].map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="text-center hover-elevate active-elevate-2 transition-all duration-300 h-full"
                >
                  <CardHeader className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-serif text-2xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Our Story */}
          <div className="max-w-5xl mx-auto space-y-6">
            <h3 className="font-serif text-3xl font-bold text-foreground text-center mb-6">
              Our Story
            </h3>
            <p className="text-lg text-foreground leading-relaxed text-justify">
              At Skiline Recruitment Services Ltd, Chennai, we believe that experience never retires. Our journey began with a simple vision, to create a platform where retired and VRS professionals could continue sharing their expertise and wisdom. Recognizing the immense value that senior professionals bring to the financial industry, we set out to bridge the gap between seasoned talent and organizations seeking reliability, insight, and trust. Today, we proudly connect experienced individuals with India's leading financial companies, helping them rediscover purpose and passion through meaningful second careers.
            </p>
            <p className="text-lg text-foreground leading-relaxed text-justify">
              Driven by the mission to redefine retirement, Skiline fosters a vibrant community where experience meets opportunity. We empower seniors to embark on fulfilling new chapters as financial consultants and advisors, offering structured training, mentorship, and a supportive environment for continuous growth. Through this initiative, we aim to create a legacy of financial literacy and security that benefits individuals of all ages, proving that the future truly belongs to those who never stop contributing.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
