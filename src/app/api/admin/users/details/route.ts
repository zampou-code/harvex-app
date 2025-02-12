import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const POST = auth(async function POST(request) {
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

    const { user_id } = await request?.json();

    const userId = user_id;
    const usersSnapshot = await db.collection("users").doc(userId).get();

    if (!usersSnapshot.exists) {
      return NextResponse.json(
        { state: false, message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
    const userClientData = usersSnapshot.data();

    const transactionsSnapshot = await db
      .collection("transactions")
      .where("user_id", "==", userId)
      .get();

    const transactions = transactionsSnapshot.docs.map((tx) => ({
      doc_id: tx.id,
      ...tx.data(),
    }));

    const accountsSnapshot = await db
      .collection("accounts")
      .where("user_id", "==", userId)
      .get();
    const account = accountsSnapshot.docs[0]
      ? {
          id: accountsSnapshot.docs[0].id,
          ...accountsSnapshot.docs[0].data(),
        }
      : null;

    return NextResponse.json(
      {
        state: true,
        data: {
          transactions: transactions.sort(
            (a, b) =>
              new Date((b as any).created_at).getTime() -
              new Date((a as any).created_at).getTime()
          ),
          user: { id: userId, ...userClientData },
          account: {
            main: (account as any)?.main?.amount || 0,
            affiliate: (account as any)?.affiliate?.amount || 0,
          },
        },
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
