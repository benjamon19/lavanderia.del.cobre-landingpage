# Configuración de Variables de Entorno para Vercel

Este documento describe cómo configurar las variables de entorno en Vercel para el proyecto.

## Variables de Entorno Necesarias

### Firebase Principal (Intranet)
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### Firebase Comandas Equipo 2
```
VITE_FIREBASE_COMANDAS_API_KEY=AIzaSyCnCDQs1yWNyc_RzXioPCgWnXL5Y6lwW4g
VITE_FIREBASE_COMANDAS_AUTH_DOMAIN=lavanderia-el-cobre-app.firebaseapp.com
VITE_FIREBASE_COMANDAS_PROJECT_ID=lavanderia-el-cobre-app
VITE_FIREBASE_COMANDAS_STORAGE_BUCKET=lavanderia-el-cobre-app.firebasestorage.app
VITE_FIREBASE_COMANDAS_MESSAGING_SENDER_ID=996591227495
VITE_FIREBASE_COMANDAS_APP_ID=1:996591227495:web:fe51a32cd8182ad6fe3ac2
VITE_FIREBASE_COMANDAS_MEASUREMENT_ID=G-FDGW1Y87Z9
```

## Cómo Configurar en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a: **Settings** → **Environment Variables**
3. Agrega cada variable de entorno con su valor correspondiente
4. Selecciona los entornos donde quieres que apliquen:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

5. Haz clic en **Save**

## Notas Importantes

- Las variables con prefijo `VITE_` son requeridas por Vite para exponerlas en el cliente
- Las credenciales de Firebase Comandas ya están incluidas como fallback en el código
- Asegúrate de no commitear el archivo `.env` al repositorio
- El archivo `.env.example` sirve como plantilla para desarrollo local

## Desarrollo Local

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Completa los valores de las variables del Firebase Principal

3. Las variables de Firebase Comandas ya tienen valores por defecto

## Redeploy

Después de agregar o modificar variables de entorno en Vercel:

1. Ve a la pestaña **Deployments**
2. Haz clic en los tres puntos del último deployment
3. Selecciona **Redeploy**
4. Asegúrate de marcar "Use existing Build Cache" para un deploy más rápido

---

**Proyecto:** Lavandería El Cobre - Landing Page & Intranet  
**Última actualización:** Noviembre 2025
