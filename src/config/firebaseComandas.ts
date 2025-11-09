// src/config/firebaseComandas.ts
// Configuración de Firebase para el módulo de Comandas Equipo 2
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase para el módulo de comandas usando variables de entorno
const firebaseConfigComandas = {
  apiKey: import.meta.env.VITE_FIREBASE_COMANDAS_API_KEY || "AIzaSyCnCDQs1yWNyc_RzXioPCgWnXL5Y6lwW4g",
  authDomain: import.meta.env.VITE_FIREBASE_COMANDAS_AUTH_DOMAIN || "lavanderia-el-cobre-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_COMANDAS_PROJECT_ID || "lavanderia-el-cobre-app",
  storageBucket: import.meta.env.VITE_FIREBASE_COMANDAS_STORAGE_BUCKET || "lavanderia-el-cobre-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_COMANDAS_MESSAGING_SENDER_ID || "996591227495",
  appId: import.meta.env.VITE_FIREBASE_COMANDAS_APP_ID || "1:996591227495:web:fe51a32cd8182ad6fe3ac2",
  measurementId: import.meta.env.VITE_FIREBASE_COMANDAS_MEASUREMENT_ID || "G-FDGW1Y87Z9"
};

// Inicializar la App de Firebase con un nombre único para evitar conflictos
const appComandas = initializeApp(firebaseConfigComandas, 'comandas');

// Exportar los servicios específicos para comandas
export const authComandas = getAuth(appComandas);
export const dbComandas = getFirestore(appComandas);
export const storageComandas = getStorage(appComandas);

export default appComandas;
