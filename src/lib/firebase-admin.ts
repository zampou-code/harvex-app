import { getApp, getApps, initializeApp } from "firebase/app";

import { cert } from "firebase-admin/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initFirestore } from "@auth/firebase-adapter";

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// export const db = initFirestore({
//   credential: cert({
//     projectId: "harvex-group-1413e",
//     privateKey:
//       "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwU3GCdzaDCprN\nXwxZtqyYYa6Zol34HaHQCGvO2AyRO4Cz7etieOaFLcHmlgAXgnp9GVCu4fweGtf4\nNVo7kZo1hDE0HCC1zUmqLNYb8KmPXaTeE1yYxN7iiwGg6EXurt80Nfxpktt6Vr5R\nJT6P+3IIGEZTAMQLsNU692Iv9j+Du3WHEc8Nx5tU6ZA1i+Rk9pKPHmqBvNCkwViA\nESyWg84O1gc0KBM0BC+tQgEa3n0jIFOoJQgcj9b92CjieGxK1cCTEZZU/uQBjmKy\nojgPM1bcXz6nEOAo+qHCfGgUDiGCv057KW1nfOO4lUKVIH4s9H3P5xCEP+32/yt/\nERHc/NbvAgMBAAECggEAFZwHChi8dwnf1/HhTHC9V/2HYu/JuW8+61p6L+2Szg0Z\n+bMxCQP30x7np8VUDzg1SnXwSUaL2fqrOOb8/yuZ18Yy1jKToFmflg9hptHzTeKJ\nopKCjicj3mVv1n2w7blubx0l/qBPbVUKhQezUlJcHXmFdjBeq8TJFS1yp0h0F0Y4\nC8EZkyDF24jiG8PUef71L/AaDqnF59NnNM8xiBX3IbQ64v2sXiGH+tHEedWzM8Qz\nr7UMmjWAz5yfvJ7sLjPosm0Sprsj5MgidkLEXTWndenBU+HB8l3Dr67uXftdINI4\naaDwGPwzsomcYpuEJmcRks/v+rJbXXlvCXAO7Y48uQKBgQDmtDny2JyNxuGd9k9y\nZRGWn2IOPjxW43eFWHvQwS5JnLUln3PCJKIXFv4VmJMzpXXZRz1Pw0rRfsSsoIVU\nHqr1uhmHqPhu4W4XzOVGxKFLMQeS/iTYEiIS60kKTuQ3AudDhnIE4BW3U7gubPd6\nBPT9hf7j6sQ3sGVEd8cdIPOiNwKBgQDDqNh8trX+bosVeQeJ7QsoM3UB1L98lq4X\na5EZHSev/AbdTYY7h9s7WBgYdnq+u2r+VhvL24QWU7sNgwTWktPqJEFjw37vI3Nf\ncsUAojc/2qrQjdJftGNmsVY+mzYWis7MJN72BY2ELlcLPG3sUrDFFIImR3ENxIh+\neP5PLn91CQKBgHKrvG3/yvkRlM1OQ7kJkY97k2Ke/qD1mU/3Zjuh+d7u/H9B3Wjv\nin3NmOelGe2+3W/tYAVIfeTZjOp9MyhXwgQ3xz7N9wYuGOnNl1zwmXdlXG1s02Vu\nxe7/ciOkiPzq/YZryjqwIzsnatHwqaXF1vw44TPqWjOQAxXgL2FEIrVLAoGAWPAB\nJ/9tjq/07NfNA3cKoUVypFhuilV74Q12MTI9fhNTk3jP0XOZxcnvef8xIE3U/rNp\ngyrPSc7ZsfSiWF75kO7WAmE068LziKmEvxr9fjsJdi9hNzuqC14E1AR9e5WxFr6T\n0sUHZNQjoOnhFZEo5QzDdF75FscFPGgHQTrjmPECgYBemkwh9mtH/uOnx6bYIf9V\nl7Bk2VzJSI0o6aUf0TevXOehsBLznqFAJyHAcs1P+C2/cuS7l0R7jsSbtBxmyu1Y\nU/ADBrRH+088doUuVWShZLrFcam0o3LV+WHxvIsHF5RONSDDV6dzTzbyg7U9dVcY\nSScXlrNO0FkYBuUbsKJbaA==\n-----END PRIVATE KEY-----\n",
//     clientEmail:
//       "firebase-adminsdk-fbsvc@harvex-group-1413e.iam.gserviceaccount.com",
//   }),
// });
export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});
