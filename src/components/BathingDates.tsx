import { Calendar, Crown, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SnanDate {
  title: string;
  englishTitle?: string;
  date: string;
}

const BathingDates = () => {
  const shahiSnan: SnanDate[] = [
    { title: "प्रथम शाही स्नान", date: "April 9, 2028" },
    { title: "द्वितीय शाही स्नान", date: "April 23, 2028" },
    { title: "तृतीय शाही स्नान", date: "May 8, 2028" },
  ];

  const parvaSnan: SnanDate[] = [
    { title: "मेष संक्रांति", englishTitle: "Mesha Sankranti", date: "April 13, 2028" },
    { title: "अक्षय तृतीया", englishTitle: "Akshaya Tritiya", date: "April 27, 2028" },
    { title: "वैशाख पूर्णिमा", englishTitle: "Vaishakha Purnima", date: "May 8, 2028" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sacred Bathing Dates
          </h2>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            The most auspicious moments to take a holy dip in the Shipra River
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Shahi Snan */}
          <Card className="border-2 border-primary/20 shadow-spiritual hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-primary/20">
              <CardTitle className="flex items-center gap-3 font-heading text-2xl">
                <Sparkles className="w-7 h-7 text-primary" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="hindi-text">शाही स्नान</span>
                  <span className="text-sm text-muted-foreground/90">Shahi Snan</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6 font-serif">
                The most sacred bathing ceremonies led by the traditional Akharas
              </p>
              <div className="space-y-4">
                {shahiSnan.map((snan, index) => (
                    <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-foreground hindi-date">{snan.title}</div>
                        {snan.englishTitle && (
                          <div className="text-sm text-muted-foreground/90">{snan.englishTitle}</div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        {snan.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Parva Snan */}
          <Card className="border-2 border-accent/30 shadow-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-accent/10 to-secondary/10 border-b border-accent/20">
              <CardTitle className="flex items-center gap-3 font-heading text-2xl">
                <Calendar className="w-7 h-7 text-accent" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="hindi-text">पर्व स्नान</span>
                  <span className="text-sm text-muted-foreground/90">Parva Snan</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6 font-serif">
                Auspicious bathing dates aligned with celestial events
              </p>
              <div className="space-y-4">
                {parvaSnan.map((snan, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{snan.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {snan.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic font-serif">
            * Final schedules confirmed closer to the event after consultation with all Akharas
          </p>
        </div>
      </div>
    </section>
  );
};

export default BathingDates;
