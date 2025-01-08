import { createContext, useState, useContext, useEffect } from "react";
import { Map } from 'immutable';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import "./Context.css";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [cart, setCart] = useState(Map());
  const [purchases, setPurchases] = useState(Map());
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const sessionCart = localStorage.getItem(user.uid);
        if (sessionCart) {
          setCart(Map(JSON.parse(sessionCart)));
        }

        const docRef = doc(firestore, "users", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetchedGenres = docSnap.data().genres || [];
            setGenres(fetchedGenres);
          } else {
            setGenres([]);
          }
        } catch (error) {
          console.log("Error fetching genres:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h1 className="loading-title">Loading...</h1>
      </div>
    )
  }

  return (
    <StoreContext.Provider value={{ cart, setCart, genres, setGenres, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(StoreContext);
}