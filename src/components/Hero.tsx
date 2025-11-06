import { Calendar, MapPin, Users } from "lucide-react";
import heroImage from "@/assets/hero-temple.jpg";
import Countdown from "./Countdown";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mahakaleshwar Temple at sunset over Shipra River"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Badge */}
          <div className="inline-block">
            <span className="px-6 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-primary font-semibold text-sm tracking-wider">
              SACRED GATHERING 2028
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground drop-shadow-lg">
            Ujjain Simhastha
            <span className="block text-primary mt-2" style={{ fontFamily: 'Playfair Display' }}>
              <span className="hindi-text">कुम्भ मेला</span> 2028
            </span>
          </h1>

          {/* Description */}
          <p className="font-serif text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Join the largest spiritual gathering in history along the sacred Shipra River
          </p>

          {/* Countdown Timer */}
          <div className="max-w-3xl mx-auto">
            <Countdown />
          </div>

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
            <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg border border-border/50 shadow-card">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-foreground">March 27 - May 27</div>
              <div className="text-sm text-muted-foreground mt-1">Festival Duration</div>
            </div>

            <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg border border-border/50 shadow-card">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-foreground">Ujjain, MP</div>
              <div className="text-sm text-muted-foreground mt-1">Sacred City</div>
            </div>

            <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg border border-border/50 shadow-card">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-foreground">140-150 Million</div>
              <div className="text-sm text-muted-foreground mt-1">Expected Devotees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
