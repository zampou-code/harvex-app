import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });

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

    const { type, status, transaction } = await request.json();

    if (type === "delete-transaction" && transaction) {
      await db.collection("transactions").doc(transaction.id).delete();

      return NextResponse.json(
        { message: "Transaction supprimée avec succès", state: true },
        { status: 200 }
      );
    }

    if (type === "update-transaction-satuts" && transaction && status) {
      await db
        .collection("transactions")
        .doc(transaction.doc_id)
        .update({ status });

      if (transaction.type === "investment" && status === "approved") {
        const userSnapshot = await db
          .collection("users")
          .doc(transaction.user_id)
          .get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          const referralCode = userData?.referral_code;

          if (referralCode) {
            const referrerSnapshot = await db
              .collection("users")
              .where("referral_code", "==", referralCode)
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
        }
      }

      if (transaction.type === "withdraw" && status === "approved") {
        const accountSnapshot = await db
          .collection("accounts")
          .where("user_id", "==", transaction.user_id)
          .get();

        if (!accountSnapshot.empty) {
          const accountDoc = accountSnapshot.docs[0];
          const accountData = accountDoc.data();

          await db
            .collection("accounts")
            .doc(accountDoc.id)
            .update({
              [transaction.account]: {
                ...accountData[transaction.account],
                amount:
                  accountData[transaction.account].amount - transaction.amount,
              },
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

    return NextResponse.json(
      {
        state: false,
        message:
          "Une erreur s'est produite lors de la mise à jour du statut de la transaction.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        state: false,
        message: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}) as any;
