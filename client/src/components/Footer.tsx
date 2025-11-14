import { Link } from "wouter";
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Skiline Recruitment
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience Never Retires. Reconnecting skilled individuals to meaningful opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/" data-testid="link-footer-home" className="text-lg text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-md inline-block pr-4 py-1">
                Home
              </Link>
              <Link href="/#about" data-testid="link-footer-about" className="text-lg text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-md inline-block pr-4 py-1">
                About Us
              </Link>
              <Link href="/opportunities" data-testid="link-footer-opportunities" className="text-lg text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-md inline-block pr-4 py-1">
                Opportunities
              </Link>
              <Link href="/join" data-testid="link-footer-join" className="text-lg text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-md inline-block pr-4 py-1">
                Join Us
              </Link>
            </nav>
          </div>

          {/* Opportunities */}
          <div className="space-y-4">
            <Link href="/join" className="hover-elevate active-elevate-2">
              <h4 className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors">
                Opportunities
              </h4>
            </Link>
            <ul className="flex flex-col space-y-3 text-lg text-muted-foreground">
              <li>Retired Professionals</li>
              <li>Housewives (35+)</li>
              <li>Telecalling Roles</li>
              <li>Field Executives</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold text-foreground">
              Contact Us
            </h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start space-x-3" data-testid="contact-email">
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <a
                  href="mailto:info@skilinerecruitment.com"
                  className="text-lg text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-md inline-block pr-4 py-1"
                >
                  skilinerecruitment360@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3" data-testid="contact-phone">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span className="text-lg text-muted-foreground">
                  +91 98410 02700<br />
                  +91 95510 87099
                </span>
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-3" data-testid="contact-address">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground leading-relaxed">
                    No 8, 44th Street,<br />
                    Ashok Nagar,<br />
                    Chennai - 600083<br />
                  </span>
                </div>
              </div>
              {/* Social Media Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.instagram.com/skilinerecruitment_360/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-full p-2"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.youtube.com/@SKILINERECRUITMENT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-full p-2"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/skiline-recruitment/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-full p-2"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.facebook.com/SkilineRecruitment360/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 rounded-full p-2"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-lg text-muted-foreground">
            © {new Date().getFullYear()} Skiline Recruitment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
