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
import { InfoIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AuthModal = ({ open, onClose }: Props) => {
  const [mode, setMode] = useState<'select' | 'login' | 'register'>('select');
  const { signInWithGoogle, signUpWithEmail, signInWithEmail, signInFake } = useAuth();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      
      if (!isFirebaseEnabled) {
        // Handle demo mode
        if (signInFake) {
          await signInFake({
            displayName: "Demo User",
            email: "demo@example.com"
          });
        }
      } else {
        // Google sign-in with popup
        await signInWithGoogle();
        // On successful sign-in
        onClose();
        navigate("/register");
        return;
      }
      
      onClose();
      navigate("/register");
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      // Handle specific Google Sign-In errors
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in cancelled. Please try again.");
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups for this site and try again.");
      } else {
        setError(err.message || "Failed to sign in with Google. Please try again.");
      }
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
        <DialogHeader className="space-y-3">
          <div className="flex items-center">
            {mode !== 'select' && (
              <Button
                variant="ghost"
                className="mr-2 h-8 w-8 p-0"
                onClick={() => setMode('select')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className="flex-1">
              {mode === 'select' && "Welcome to Simhastha 2028"}
              {mode === 'register' && "Create Your Account"}
              {mode === 'login' && "Welcome Back"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            {mode === 'select' && "Are you new to Simhastha or returning?"}
            {mode === 'register' && "Register with your details to join Simhastha 2028"}
            {mode === 'login' && "Sign in to manage your registration"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mode === 'select' && (
            <div className="grid gap-4">
              <Button
                variant="outline"
                onClick={() => setMode('register')}
                className="w-full py-8 text-lg"
              >
                I'm New to Simhastha
              </Button>
              <Button
                onClick={() => setMode('login')}
                className="w-full py-8 text-lg"
              >
                I'm a Returning Member
              </Button>
            </div>
          )}

          {mode === 'register' && (
            <div className="grid gap-4">
              <Button
                onClick={handleGoogle}
                variant="outline"
                className="w-full py-6 text-lg relative flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="opacity-0">Continue with Google</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      Signing in...
                    </div>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or fill registration form
                  </span>
                </div>
              </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91XXXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    onClick={async () => {
                      if (!name || !email || !phone || !password) {
                        setError("Please fill in all required fields");
                        return;
                      }
                      try {
                        setLoading(true);
                        setError(null);
                        if (signUpWithEmail) {
                          await signUpWithEmail(email, password, name);
                        } else if (signInFake) {
                          await signInFake({ displayName: name, email, phoneNumber: phone });
                        }
                        onClose();
                        navigate("/register");
                      } catch (err: any) {
                        setError(err.message || "Registration failed");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button
                onClick={async () => {
                  if (!email || !password) {
                    setError("Please enter email and password");
                    return;
                  }
                  try {
                    setLoading(true);
                    setError(null);
                    if (signInWithEmail) {
                      await signInWithEmail(email, password);
                    } else if (signInFake) {
                      await signInFake({ email });
                    }
                    onClose();
                    navigate('/');
                  } catch (err: any) {
                    setError(err.message || 'Login failed');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in with Email'}
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
            </div>
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