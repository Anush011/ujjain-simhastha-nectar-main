import { useEffect, useRef, useState } from "react";
import { auth, isFirebaseEnabled } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  mode?: "login" | "register";
};

const AuthModal = ({ open, onClose, mode = "login" }: Props) => {
  const { signInWithGoogle, signInFake } = useAuth();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationResultRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirebaseEnabled) return;

    if (open && recaptchaRef.current && !verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, recaptchaRef.current, { size: "invisible" });
    }
  }, [open]);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      onClose();
      if (mode === "register") {
        navigate("/register");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    if (!isFirebaseEnabled) return;

    try {
      setLoading(true);
      setError(null);
      if (!verifierRef.current) return;
      if (!phone.match(/^\+\d{10,15}$/)) {
        throw new Error("Please enter a valid phone number with country code (e.g., +91XXXXXXXXXX)");
      }
      confirmationResultRef.current = await signInWithPhoneNumber(auth, phone, verifierRef.current);
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!isFirebaseEnabled) return;

    try {
      setLoading(true);
      setError(null);
      if (!confirmationResultRef.current) return;
      await confirmationResultRef.current.confirm(code);
      onClose();
      if (mode === "register") {
        navigate("/register");
      }
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!signInFake) return;
      await signInFake({ 
        displayName: phone || "Demo User", 
        email: code || "demo@example.com" 
      });
      onClose();
      if (mode === "register") {
        navigate("/register");
      }
    } catch (err: any) {
      setError(err.message || "Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "register" ? "Register Account" : "Welcome Back"}</DialogTitle>
          <DialogDescription>
            {mode === "register" 
              ? "Create an account to register for Shahi Snan" 
              : "Sign in to manage your Shahi Snan registration"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isFirebaseEnabled ? (
            <>
              {import.meta.env.VITE_FAKE_AUTH === "true" ? (
                <div className="grid gap-4">
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Development Mode</AlertTitle>
                    <AlertDescription>
                      Using demo authentication for local development
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <Button 
                      onClick={handleDemoLogin} 
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "Continue with Demo Account"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Authentication Not Configured</AlertTitle>
                  <AlertDescription>
                    Please contact the administrator to enable authentication, or enable demo mode for development.
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <>
              <Button 
                onClick={handleGoogle} 
                className="w-full" 
                variant="outline"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Continue with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with phone
                  </span>
                </div>
              </div>

              {!verificationSent ? (
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                  />
                  <Button 
                    onClick={sendOTP} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Verification Code"}
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={loading}
                  />
                  <Button 
                    onClick={verifyOTP} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="text-sm text-muted-foreground text-center">
          By continuing, you agree to receive updates about Shahi Snan registration.
        </DialogFooter>

        <div ref={recaptchaRef} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;