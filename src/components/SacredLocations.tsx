import { MapPin, Waves, Church } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import templeImage from "@/assets/temple-interior.jpg";

const SacredLocations = () => {
  const ghats = [
    {
      name: "Ram Ghat",
      description:
        "The most famous and central ghat, where the main Shahi Snan processions are focused. Thousands of devotees gather here for the sacred bathing ceremonies.",
    },
    {
      name: "Harsiddhi Ghat",
      description:
        "Located near the powerful Harsiddhi Temple, this ghat is blessed with the divine energy of the Goddess Shakti.",
    },
    {
      name: "Kailash Ghat",
      description:
        "A significant ghat known for its serene environment, perfect for meditation and spiritual contemplation.",
    },
  ];

  const temples = [
    {
      name: "Mahakaleshwar Temple",
      type: "Jyotirlinga",
      description:
        "One of the 12 most sacred abodes of Lord Shiva in India. The epicenter of Ujjain's spiritual life, housing one of the only south-facing Shiva lingams in the world.",
    },
    {
      name: "Kal Bhairava Temple",
      type: "Guardian Deity Temple",
      description:
        "Dedicated to the fierce form of Shiva who is the guardian of Ujjain. Known for unique rituals involving offerings of liquor.",
    },
    {
      name: "Harsiddhi Temple",
      type: "Shakti Peeth",
      description:
        "One of the 51 most sacred sites dedicated to the Goddess Shakti, where her elbow is believed to have fallen during the cosmic dance of Shiva.",
    },
    {
      name: "Mangalnath Temple",
      type: "Astrological Temple",
      description:
        "Considered the birthplace of the planet Mars (Mangal), attracting devotees seeking astrological remedies and cosmic blessings.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sacred Locations
            </h2>
            <p className="font-serif text-lg text-muted-foreground">
              Holy sites where heaven touches earth
            </p>
          </div>

          <Tabs defaultValue="ghats" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="ghats" className="font-heading text-base">
                <Waves className="w-4 h-4 mr-2" />
                Bathing Ghats
              </TabsTrigger>
              <TabsTrigger value="temples" className="font-heading text-base">
                <Church className="w-4 h-4 mr-2" />
                Major Temples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ghats" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                <div className="space-y-6">
                  {ghats.map((ghat, index) => (
                    <Card key={index} className="border-2 hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          {ghat.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-serif text-muted-foreground">{ghat.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-spiritual h-96">
                  <img
                    src={templeImage}
                    alt="Sacred ghat at Shipra River with devotees"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border">
                <p className="font-serif text-muted-foreground">
                  The ghats along the Shipra River span over 30 kilometers, with new facilities
                  being developed for Simhastha 2028 to accommodate millions of pilgrims.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="temples" className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {temples.map((temple, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:shadow-lg transition-all hover:border-primary/30"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Church className="w-6 h-6 text-primary" />
                        <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {temple.type}
                        </span>
                      </div>
                      <CardTitle className="font-heading text-xl">{temple.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-serif text-muted-foreground">{temple.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-lg border border-primary/20">
                <p className="font-serif text-muted-foreground">
                  These ancient temples have been sites of continuous worship for over a thousand
                  years, drawing millions of pilgrims seeking divine blessings and spiritual
                  awakening.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SacredLocations;
