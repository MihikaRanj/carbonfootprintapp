import React, { useContext, useEffect, useState } from 'react';
import { auth as firebaseAuth } from './firebase';

interface Auth {
  loggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  console.log("Inside useAuthInit");
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
  console.log("Inside useAuthInit: authInit", authInit);
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      console.log("Inside onAuthStateChanged");
      const auth = firebaseUser
        ? { loggedIn: true, userId: firebaseUser.uid }
        : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);
  console.log("Inside useAuthInit: authInit", authInit);
  return authInit;
}