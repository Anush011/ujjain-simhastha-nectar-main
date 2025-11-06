import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Shahi snan dates for 2028
const SNAN_DATES = [
  "2028-04-21",
  "2028-04-25",
  "2028-04-27",
  "2028-05-01",
  "2028-05-08",
  "2028-05-12",
] as const;

type RegistrationFormData = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  groupSize: number;
  accommodation: "needed" | "not_needed";
  specialRequests: string;
};

export default function RegistrationForm() {
  const { user } = useAuth();
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
    // TODO: Submit to Firestore
    console.log("Form data:", formData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold">Register for Shahi Snan</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Preferred Snan Date</Label>
            <Select
              value={formData.preferredDate}
              onValueChange={(value) => setFormData({ ...formData, preferredDate: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred date" />
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

          <div>
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

          <div>
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
                <SelectItem value="not_needed">No, I have arrangements</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specialRequests">Special Requests or Notes</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
              placeholder="Any special requirements or additional information..."
              className="h-24"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Registration
        </Button>
      </form>
    </Card>
  );
}