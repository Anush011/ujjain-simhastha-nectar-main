import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Ujjain Simhastha 2028
              </h3>
              <p className="font-serif text-muted-foreground">
                Join millions in the sacred journey along the Shipra River for spiritual awakening
                and divine blessings.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 font-serif text-muted-foreground">
                <li>
                  <a href="#dates" className="hover:text-primary transition-colors">
                    Bathing Dates
                  </a>
                </li>
                <li>
                  <a href="#significance" className="hover:text-primary transition-colors">
                    Spiritual Significance
                  </a>
                </li>
                <li>
                  <a href="#locations" className="hover:text-primary transition-colors">
                    Sacred Locations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Contact</h4>
              <p className="font-serif text-muted-foreground">
                Ujjain, Madhya Pradesh
                <br />
                India
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="font-serif text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> for spiritual
              seekers worldwide
            </p>
            <p className="font-serif text-sm text-muted-foreground mt-2">
              © 2028 Ujjain Simhastha Kumbh Mela. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
