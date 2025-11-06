import { Users, Shield, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import sadhusImage from "@/assets/sadhus.jpg";

const Akharas = () => {
  const akharaTypes = [
    {
      name: "Shaivite Akharas",
      icon: Shield,
      description: "Followers of Lord Shiva, includes the legendary Naga Sadhus. The largest is the ancient Juna Akhara, known for their fierce devotion and ascetic practices.",
      color: "primary",
    },
    {
      name: "Vaishnavite Akharas",
      icon: Heart,
      description: "Devoted followers of Lord Vishnu, known as Bairagis. They practice intense meditation and devotion, maintaining ancient Vaishnava traditions.",
      color: "secondary",
    },
    {
      name: "Udaseen Akharas",
      icon: Users,
      description: "Follow the teachings of Sri Chand, son of Guru Nanak. They represent a unique blend of Hindu and Sikh spiritual practices.",
      color: "accent",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Sacred Akharas
            </h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Ancient monastic orders of Hindu saints and ascetics - the traditional custodians and
              primary participants of the Kumbh Mela
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              {akharaTypes.map((akhara, index) => {
                const Icon = akhara.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 font-heading text-xl">
                        <div className={`w-10 h-10 rounded-full bg-${akhara.color}/20 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${akhara.color}`} />
                        </div>
                        {akhara.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-serif text-muted-foreground">{akhara.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-spiritual">
                <img
                  src={sadhusImage}
                  alt="Naga Sadhus in traditional attire during Shahi Snan procession"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Kinnar Akhara Special Mention */}
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-primary" />
                Historic Inclusion: Kinnar Akhara
              </CardTitle>
              <CardDescription className="font-serif text-base">
                A landmark moment in Kumbh Mela history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-muted-foreground leading-relaxed">
                The Kinnar Akhara represents the transgender community in the Kumbh Mela. Their
                participation since 2016 marks a historic and significant step towards inclusion in
                this ancient spiritual tradition. Their presence celebrates diversity and the
                universal nature of spiritual seeking, honoring all souls on the path to moksha.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="font-serif text-sm text-muted-foreground italic">
              13 traditional Akharas participate in the sacred processions and rituals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

export default Akharas;
