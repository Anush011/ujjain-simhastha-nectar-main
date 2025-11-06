import { useState } from "react";
import { db, isFirebaseEnabled } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Shahi snan dates for 2028
const SNAN_DATES = [
  "2028-04-21",
  "2028-04-25",
  "2028-04-27",
  "2028-05-01",
  "2028-05-08",
  "2028-05-12",
] as const;

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  groupSize: number;
  accommodation: "needed" | "not_needed";
  specialRequests: string;
}

export default function RegistrationForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    preferredDate: SNAN_DATES[0],
    groupSize: 1,
    accommodation: "not_needed",
    specialRequests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // require user to be signed in
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to register for Shahi Snan.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // If Firebase is not configured, save locally to mock_registrations for dev/demo
      if (!isFirebaseEnabled || !db) {
        try {
          const raw = localStorage.getItem("mock_registrations");
          const arr = raw ? JSON.parse(raw) : [];
          const rec = {
            ...formData,
            userId: user.uid,
            status: "pending",
            createdAt: new Date().toISOString(),
          };
          arr.push(rec);
          localStorage.setItem("mock_registrations", JSON.stringify(arr));

          toast({
            title: "Registration saved (demo) Your registration was saved locally because backend is not configured.",
          });

          setFormData({
            ...formData,
            groupSize: 1,
            accommodation: "not_needed",
            specialRequests: "",
          });
          return;
        } catch (err) {
          console.error("Local registration error:", err);
          toast({
            title: "Registration failed",
            description: "There was an error saving your registration locally.",
            variant: "destructive",
          });
          return;
        }
      }

      await addDoc(collection(db, "registrations"), {
        ...formData,
        userId: user.uid,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Registration successful",
        description: "Your Shahi Snan registration has been submitted successfully.",
      });

      // Reset form
      setFormData({
        ...formData,
        groupSize: 1,
        accommodation: "not_needed",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register for Shahi Snan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Select
                value={formData.preferredDate}
                onValueChange={(value) => setFormData({ ...formData, preferredDate: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SNAN_DATES.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="groupSize">Number of People</Label>
              <Input
                id="groupSize"
                type="number"
                min="1"
                max="20"
                value={formData.groupSize}
                onChange={(e) =>
                  setFormData({ ...formData, groupSize: parseInt(e.target.value, 10) })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accommodation">Accommodation Required?</Label>
              <Select
                value={formData.accommodation}
                onValueChange={(value: "needed" | "not_needed") =>
                  setFormData({ ...formData, accommodation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="needed">Yes, I need accommodation</SelectItem>
                  <SelectItem value="not_needed">No, I've arranged my own</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any special requirements or requests..."
                value={formData.specialRequests}
                onChange={(e) =>
                  setFormData({ ...formData, specialRequests: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}