import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import all gallery images using Vite's import.meta.glob
const galleryImages = Object.values(
  import.meta.glob('../../../attached_assets/generated_images/*.{webp,jpg,jpeg,png}', { 
    eager: true,
    as: 'url' 
  })
);

export default function Gallery() {
  usePageMeta({
    title: "Gallery - Skiline Recruitment Community & Professional Opportunities India",
    description: "View our gallery showcasing Skiline Recruitment's team, workplace, and the professionals we've empowered. See our inclusive culture and welcoming environment for retired professionals and career restarters.",
    keywords: "Skiline Recruitment gallery, our community, professional opportunities India",
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      src: galleryImages[0],
      alt: "Professional team collaboration",
      caption: "Our dedicated team working together",
    },
    {
      src: galleryImages[1],
      alt: "Team meeting in progress",
      caption: "Brainstorming new ideas and strategies",
    },
    {
      src: galleryImages[2],
      alt: "Office workspace",
      caption: "Our comfortable and modern workspace",
    },
    {
      src: galleryImages[3],
      alt: "Team celebration",
      caption: "Celebrating our achievements together",
    },
    {
      src: galleryImages[4],
      alt: "Professional development",
      caption: "Continuous learning and growth",
    },
    {
      src: galleryImages[5],
      alt: "Team building activity",
      caption: "Strengthening our team bonds",
    },
    {
      src: galleryImages[6],
      alt: "Client meeting",
      caption: "Delivering excellent service to our clients",
    },
    {
      src: galleryImages[7],
      alt: "Office environment",
      caption: "Our welcoming office space",
    },
    {
      src: galleryImages[8],
      alt: "Team collaboration",
      caption: "Working together towards success",
    },
    {
      src: galleryImages[9],
      alt: "Professional networking",
      caption: "Building valuable connections",
    },
    {
      src: galleryImages[10],
      alt: "Team celebration",
      caption: "Recognizing our achievements",
    },
    {
      src: galleryImages[11],
      alt: "Office culture",
      caption: "A positive and inclusive work environment",
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation and focus trap
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    // Add keyboard listener
    document.addEventListener("keydown", handleKeyDown);
    
    // Trap focus within lightbox
    const focusableElements = lightboxRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, selectedImage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-accent py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
            Our Gallery
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Glimpses of our team, workplace, and the professionals we've empowered.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer hover:shadow-xl"
                onClick={() => openLightbox(index)}
                data-testid={`gallery-image-${index}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg font-medium">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          data-testid="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 h-12 w-12"
            onClick={closeLightbox}
            data-testid="button-close-lightbox"
          >
            <X className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 text-2xl px-6 py-8"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            data-testid="button-prev-image"
          >
            ←
          </Button>

          <div
            className="max-w-5xl max-h-[90vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="w-full h-full object-contain rounded-lg"
              data-testid="lightbox-image"
            />
            <div className="mt-4 bg-accent/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <p className="text-foreground text-xl font-medium">
                {images[selectedImage].caption}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 text-2xl px-6 py-8"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            data-testid="button-next-image"
          >
            →
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
}
