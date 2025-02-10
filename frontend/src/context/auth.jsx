import { onAuthStateChanged, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase"; // Asegúrate de que auth esté configurado correctamente

// Creamos el contexto para manejar la autenticación global
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Usamos el hook useEffect para suscribirnos al cambio de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualizamos el estado cuando el usuario cambia
      // Save or remove user data from localStorage
      if (currentUser) {
        localStorage.setItem("authUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("authUser");
      }
    });
    return () => unsubscribe(); // Limpiamos la suscripción al desmontar el componente
  }, []);

  // Función para hacer logout
  const logout = async () => {
    await signOut(auth); // Llamamos al método signOut de Firebase para cerrar la sesión
    setUser(null); // Limpiamos el estado global cuando el usuario cierra sesión
    localStorage.removeItem("authUser"); // Clear localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useAuth = () => {
  return React.useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
