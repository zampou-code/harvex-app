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

      if (userData.role === "admin") {
        continue;
      }

      const transactionsSnapshot = await db
        .collection("transactions")
        .where("user_id", "==", doc.id)
        .get();

      const transactions = transactionsSnapshot.docs.map((tx) => ({
        doc_id: tx.id,
        ...tx.data(),
      }));

      const accountsSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", doc.id)
        .get();
      const account = accountsSnapshot.docs[0]
        ? {
            id: accountsSnapshot.docs[0].id,
            ...accountsSnapshot.docs[0].data(),
          }
        : null;

      users.push({
        transactions: transactions.sort(
          (a, b) =>
            new Date((b as any).created_at).getTime() -
            new Date((a as any).created_at).getTime()
        ),
        user: { id: doc.id, ...userData },
        account: {
          main: (account as any)?.main?.amount || 0,
          affiliate: (account as any)?.affiliate?.amount || 0,
        },
      });
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

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });

  try {
    const { user: userAuth } = request.auth;

    if (!userAuth?.id) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const [userDoc, userData] = await Promise.all([
      db.collection("users").doc(userAuth.id).get(),
      db
        .collection("users")
        .doc(userAuth.id)
        .get()
        .then((doc) => doc.data()),
    ]);

    if (!userDoc.exists || userData?.role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé", state: false },
        { status: 403 }
      );
    }

    const { user, type, status, transaction, account } = await request.json();

    if (type === "delete-user" && user) {
      await db.collection("users").doc(user.id).delete();

      const transactionsSnapshot = await db
        .collection("transactions")
        .where("user_id", "==", user.id)
        .get();

      const deletePromises = transactionsSnapshot.docs.map((doc) =>
        doc.ref.delete()
      );
      await Promise.all(deletePromises);

      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user.id)
        .get();

      if (!accountSnapshot.empty) {
        await accountSnapshot.docs[0].ref.delete();
      }

      return NextResponse.json(
        { state: true, message: "Utilisateur supprimé avec succès" },
        { status: 200 }
      );
    }

    if (type === "update-account-amount" && user && account) {
      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user.id)
        .get();

      if (!accountSnapshot.empty) {
        const accountDoc = accountSnapshot.docs[0];
        await accountDoc.ref.update({
          main: {
            ...accountDoc.data().main,
            amount: account.main,
          },
          affiliate: {
            ...accountDoc.data().affiliate,
            amount: account.affiliate,
          },
        });

        return NextResponse.json(
          { state: true, message: "Comptes mis à jour avec succès" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { state: false, message: "Compte non trouvé" },
          { status: 404 }
        );
      }
    }

    if (type === "update-kyc-status" && user && status) {
      await db
        .collection("users")
        .doc(user.id)
        .update({
          "kyc.status": status,
          "kyc.file": status == "rejected" ? "" : user?.kyc.file,
        });

      return NextResponse.json(
        { state: true, message: "Statut KYC mis à jour" },
        { status: 200 }
      );
    }

    if (type === "delete-transaction" && transaction) {
      await db.collection("transactions").doc(transaction.id).delete();

      return NextResponse.json(
        { state: true, message: "Transaction supprimée avec succès" },
        { status: 200 }
      );
    }

    if (type === "update-transaction-status" && user && transaction && status) {
      if (transaction.type === "investment") {
        await db
          .collection("transactions")
          .doc(transaction.id)
          .update({ status });

        if (status === "approved") {
          const referrerSnapshot = await db
            .collection("users")
            .where("referral_code", "==", user.referral_id)
            .get();

          if (!referrerSnapshot.empty) {
            const referrerDoc = referrerSnapshot.docs[0];
            const referrerId = referrerDoc.id;

            const bonusAmount = transaction.amount * 0.03;

            await db
              .collection("accounts")
              .where("user_id", "==", referrerId)
              .get()
              .then(async (accountSnapshot) => {
                if (!accountSnapshot.empty) {
                  const accountDoc = accountSnapshot.docs[0];
                  const accountData = accountDoc.data();

                  await db
                    .collection("accounts")
                    .doc(accountDoc.id)
                    .update({
                      affiliate: {
                        ...accountData.affiliate,
                        amount: accountData.affiliate.amount + bonusAmount,
                      },
                    });
                }
              });
          }
        }

        return NextResponse.json(
          {
            state: true,
            message:
              "Le statut de la transaction d'investissement a été mis à jour avec succès.",
          },
          { status: 200 }
        );
      }

      if (transaction.type === "withdraw") {
        await db
          .collection("transactions")
          .doc(transaction.id)
          .update({ status });
      }
    }
  } catch (error) {
    console.log(error);
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
