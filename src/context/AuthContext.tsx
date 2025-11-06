import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth, googleProvider, isFirebaseEnabled } from "@/lib/firebase";

// Read fake auth toggle from Vite env
const isFakeAuth = Boolean(import.meta.env.VITE_FAKE_AUTH === "true");

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  // dev-only fake sign-in (name/email/phone)
  signInFake?: (payload: { displayName?: string; email?: string; phoneNumber?: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFakeAuth) {
      // check localStorage for fake user
      try {
        const raw = localStorage.getItem("mock_user");
        if (raw) {
          setUser(JSON.parse(raw) as any);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
      setLoading(false);
      return;
    }

    if (!isFirebaseEnabled || !auth) {
      // Firebase not configured — don't subscribe
      setUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseEnabled || !auth || !googleProvider) {
      // eslint-disable-next-line no-console
      console.warn("Firebase not configured — cannot signInWithGoogle");
      return Promise.resolve();
    }
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    if (!isFirebaseEnabled || !auth) return Promise.resolve();
    await firebaseSignOut(auth);
  };

  // dev-only fake signer: store minimal user object in localStorage
  const signInFake = async (payload: { displayName?: string; email?: string; phoneNumber?: string }) => {
    if (!isFakeAuth) return Promise.resolve();
    const fakeUser = {
      uid: `mock_${Math.random().toString(36).slice(2, 9)}`,
      displayName: payload.displayName || null,
      email: payload.email || null,
      phoneNumber: payload.phoneNumber || null,
    } as any;
    try {
      localStorage.setItem("mock_user", JSON.stringify(fakeUser));
    } catch (e) {
      // ignore
    }
    setUser(fakeUser as any);
    return Promise.resolve();
  };

  const signOutFake = async () => {
    if (!isFakeAuth) return Promise.resolve();
    try {
      localStorage.removeItem("mock_user");
    } catch (e) {}
    setUser(null);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, signInFake: isFakeAuth ? signInFake : undefined }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
