import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const GET = auth(async function GET(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const { user } = request.auth;
    if (!user?.id) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const [userDoc, userData] = await Promise.all([
      db.collection("users").doc(user.id).get(),
      db
        .collection("users")
        .doc(user.id)
        .get()
        .then((doc) => doc.data()),
    ]);

    if (!userDoc.exists || userData?.role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé", state: false },
        { status: 403 }
      );
    }

    const usersSnapshot = await db.collection("users").get();

    const users: any[] = [];

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();

      if (userData.kyc.status === "pending") {
        users.push({
          user: { id: doc.id, ...userData },
        });
      }
    }

    return NextResponse.json(
      {
        state: true,
        data: users.sort(
          (a, b) =>
            new Date(b.user.created_at).getTime() -
            new Date(a.user.created_at).getTime()
        ),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      {
        state: false,
        message: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}) as any;
