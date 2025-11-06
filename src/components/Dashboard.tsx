import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type RegistrationData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  groupSize: number;
  accommodation: "needed" | "not_needed";
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from Firestore
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Registrations</h2>

        {registrations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No registrations found. Register for a Shahi Snan to get started.
          </div>
        ) : (
          <Table>
            <TableCaption>Your Shahi Snan registrations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Group Size</TableHead>
                <TableHead>Accommodation</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>
                    {new Date(reg.preferredDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{reg.groupSize} people</TableCell>
                  <TableCell>
                    {reg.accommodation === "needed" ? "Required" : "Not required"}
                  </TableCell>
                  <TableCell className="capitalize">{reg.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {user?.displayName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user?.phoneNumber || "Not provided"}
          </p>
        </div>
      </Card>
    </div>
  );
}