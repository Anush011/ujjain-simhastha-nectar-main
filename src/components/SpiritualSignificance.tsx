import { Droplets, Sparkles, Star } from "lucide-react";
import riverImage from "@/assets/river-ghats.jpg";

const SpiritualSignificance = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Spiritual Significance
            </h2>
            <p className="font-serif text-lg text-muted-foreground">
              The sacred essence of Simhastha Kumbh Mela
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    The Mythology
                  </h3>
                  <p className="font-serif text-muted-foreground leading-relaxed">
                    Rooted in the ancient Samudra Manthan (Churning of the Ocean), when drops of
                    Amrit - the nectar of immortality - fell from a celestial pitcher into the
                    Shipra river, sanctifying it for eternity. This divine event blessed the waters
                    with the power to cleanse all sins.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    The Astrology
                  </h3>
                  <p className="font-serif text-muted-foreground leading-relaxed">
                    Occurs during a rare celestial alignment when Jupiter enters Leo (Simha Rashi)
                    and the Sun enters Aries (Mesha Rashi). This cosmic configuration amplifies the
                    spiritual energy, making it the most auspicious time for ritual bathing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    The Transformation
                  </h3>
                  <p className="font-serif text-muted-foreground leading-relaxed">
                    Taking a holy dip during Simhastha is believed to cleanse all sins, purify the
                    soul, and help devotees attain moksha - liberation from the eternal cycle of
                    birth and death. It is considered one of the highest spiritual acts in Hinduism.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-spiritual">
                <img
                  src={riverImage}
                  alt="Devotees taking sacred bath at Shipra River ghats during sunrise"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl" />
            <div className="relative p-8 md:p-12 text-center">
              <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
                "Where the nectar of immortality touched the earth,
                <br />
                millions gather to wash away lifetimes of karma"
              </blockquote>
              <div className="mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritualSignificance;
