import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider, isFirebaseEnabled } from "@/lib/firebase";

// Read fake auth toggle from Vite env
const isFakeAuth = Boolean(import.meta.env.VITE_FAKE_AUTH === "true");

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail?: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithEmail?: (email: string, password: string) => Promise<void>;
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

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    if (isFakeAuth) {
      // In fake mode, store a simple fake user
      if (signInFake) {
        await signInFake({ displayName, email });
      }
      return;
    }

    if (!isFirebaseEnabled || !auth) {
      console.warn("Firebase not configured — cannot signUpWithEmail");
      return Promise.resolve();
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    try {
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (e) {
      // non-fatal: profile update failed
      console.warn("Failed to set displayName:", e);
    }
    // onAuthStateChanged will pick up the new user; setUser for immediacy
    setUser(userCredential.user as any);
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (isFakeAuth) {
      if (signInFake) {
        await signInFake({ email });
      }
      return;
    }

    if (!isFirebaseEnabled || !auth) {
      console.warn("Firebase not configured — cannot signInWithEmail");
      return Promise.resolve();
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user as any);
  };

  const signOut = async () => {
    if (isFakeAuth) {
      await signOutFake();
      return;
    }
    
    if (!isFirebaseEnabled || !auth) return Promise.resolve();
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut, signInFake: isFakeAuth ? signInFake : undefined }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
