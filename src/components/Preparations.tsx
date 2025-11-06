import { Building2, DollarSign, Landmark, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Preparations = () => {
  const projects = [
    {
      icon: Landmark,
      title: "Spiritual City Development",
      description:
        "A transformative 3,300-hectare area dedicated to permanent ashrams and advanced pilgrim facilities, creating a lasting spiritual infrastructure.",
    },
    {
      icon: TrendingUp,
      title: "Shipra Riverfront Development",
      description:
        "Construction of 30 km of new bathing ghats with modern amenities and a 29-km scenic pathway for pilgrims along the sacred river.",
    },
    {
      icon: Building2,
      title: "Infrastructure Upgrade",
      description:
        "Expansion of major temples, new bridges, a state-of-the-art 200-bed hospital, and a potential metro line connecting Indore Airport to Ujjain.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Preparations & Infrastructure
            </h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              A massive transformation to welcome the world's largest spiritual gathering
            </p>
          </div>

          {/* Budget Highlight */}
          <div className="mb-12">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 shadow-spiritual">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="font-heading text-5xl font-bold text-foreground mb-2">$320 Million</div>
                <p className="font-serif text-lg text-muted-foreground">
                  Approximate budget for state-led transformation of Ujjain into a global spiritual
                  capital
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Projects */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-serif text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Vision Statement */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-2xl" />
            <div className="relative p-8 md:p-12 text-center">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Vision for 2028
              </h3>
              <p className="font-serif text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The government's comprehensive development plan aims to transform Ujjain into a
                world-class spiritual destination while preserving its ancient heritage. These
                preparations will ensure that the 140-150 million expected pilgrims experience both
                divine spirituality and modern comfort during this historic gathering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preparations;
