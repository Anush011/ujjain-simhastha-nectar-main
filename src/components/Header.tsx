import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Star,
  Users,
  MapPin,
  Building2,
  Home as HomeIcon,
  ChevronDown,
} from "lucide-react";
import { db, isFirebaseEnabled } from "@/lib/firebase";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of the fixed header plus some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // keep placeholder in case future work needs mounted behavior
    return () => {};
  }, []);

  const handleRegisterClick = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }

    try {
      if (!isFirebaseEnabled || !db) {
        // local mock registration (stored in localStorage)
        try {
          const raw = localStorage.getItem("mock_registrations");
          const arr = raw ? JSON.parse(raw) : [];
          const rec = {
            uid: user.uid,
            name: user.displayName || null,
            phone: user.phoneNumber || null,
            email: user.email || null,
            createdAt: new Date().toISOString(),
          };
          arr.push(rec);
          localStorage.setItem("mock_registrations", JSON.stringify(arr));
        } catch (err) {
          console.error("mock registration failed", err);
        }
        return;
      }

      await addDoc(collection(db, "registrations"), {
        uid: user.uid,
        name: user.displayName || null,
        phone: user.phoneNumber || null,
        email: user.email || null,
        createdAt: new Date().toISOString(),
      });
      // optional: show a toast (not implemented here)
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
                        <Button 
              variant="ghost" 
              className="text-xl font-bold text-primary px-0 hover:bg-transparent site-logo"
              onClick={() => scrollToSection('hero')}
            >
              <span>सिंहस्थ</span>
              <span className="year">2028</span>
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center w-full">
            {/* spacer pushes group to the right */}
            <div className="ml-auto flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-foreground/70 hover:text-foreground"
                onClick={() => scrollToSection("hero")}
                aria-label="Home"
              >
                <HomeIcon className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-foreground/70 hover:text-foreground">
                    <span>Explore</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => scrollToSection("bathing-dates")}>
                    <Calendar className="mr-2 h-4 w-4" /> Bathing Dates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => scrollToSection("spiritual-significance")}>
                    <Star className="mr-2 h-4 w-4" /> Significance
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => scrollToSection("akharas")}>
                    <Users className="mr-2 h-4 w-4" /> Akharas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => scrollToSection("sacred-locations")}>
                    <MapPin className="mr-2 h-4 w-4" /> Sacred Locations
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => scrollToSection("preparations")}>
                    <Building2 className="mr-2 h-4 w-4" /> Preparations
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          {/* Mobile Menu Button - You can expand this with a proper mobile menu later */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={8} align="end">
                <DropdownMenuItem onClick={() => scrollToSection("hero")}>
                  <HomeIcon className="mr-2 h-4 w-4" /> Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("bathing-dates")}>
                  <Calendar className="mr-2 h-4 w-4" /> Bathing Dates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("spiritual-significance")}>
                  <Star className="mr-2 h-4 w-4" /> Significance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("akharas")}>
                  <Users className="mr-2 h-4 w-4" /> Akharas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("sacred-locations")}>
                  <MapPin className="mr-2 h-4 w-4" /> Sacred Locations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("preparations")}>
                  <Building2 className="mr-2 h-4 w-4" /> Preparations
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Auth / Register Controls */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            {/* registered count removed per design */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="text-sm">{user.displayName || user.email || user.phoneNumber}</div>
                <Button onClick={() => navigate("/register")}>Register</Button>
                <Button variant="ghost" onClick={() => signOut()}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button onClick={() => setAuthOpen(true)}>Login / Sign up</Button>
                <Button onClick={() => setAuthOpen(true)} variant="default">Register</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
};

export default Header;