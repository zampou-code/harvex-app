import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const GET = auth(async function GET(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const user_id = request.auth.user?.id;

    if (!user_id)
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
    const userDoc = await db.collection("users").doc(user_id).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "Unauthorized", state: false },
        { status: 403 }
      );
    }

    const userData = userDoc.data();

    if (userData?.role === "user") {
      return NextResponse.json(
        { error: "Unauthorized", state: false },
        { status: 403 }
      );
    }

    const usersSnapshot = await db.collection("users").get();

    const users: any[] = [];
    usersSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return NextResponse.json(
      {
        state: true,
        data: users,
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

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });

  try {
    const user_id = request.auth.user?.id;
    const { user, action, kyc } = await request.json();

    if (!user_id)
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });

    const userDoc = await db.collection("users").doc(user_id).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "Non autorisé", state: false },
        { status: 403 }
      );
    }

    const userData = userDoc.data();

    if (userData?.role === "user") {
      return NextResponse.json(
        { error: "Non autorisé", state: false },
        { status: 403 }
      );
    }

    if (action === "kyc" && user) {
      await db
        .collection("users")
        .doc(user.id)
        .update({
          kyc: {
            ...user.kyc,
            status: kyc,
          },
        });
      return NextResponse.json(
        { state: true, message: "Statut KYC mis à jour" },
        { status: 200 }
      );
    } else if (action === "user") {
      await db.collection("users").doc(user).delete();
      return NextResponse.json(
        { state: true, message: "Utilisateur supprimé" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { state: false, message: "Action non valide" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        message: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}) as any;
