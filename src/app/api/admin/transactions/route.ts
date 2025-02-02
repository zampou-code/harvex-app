import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });

  try {
    const user_id = request.auth.user?.id;
    const { transaction, action, status } = await request.json();

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

    if (action === "update" && transaction && status) {
      await db
        .collection("transactions")
        .where("id", "==", transaction.id)
        .get()
        .then(async (querySnapshot) => {
          for (const doc of querySnapshot.docs) {
            const transactionData = doc.data();

            const handleWithdrawal = async () => {
              const accountSnapshot = await db
                .collection("accounts")
                .where("user_id", "==", transactionData.user_id)
                .get();

              if (!accountSnapshot.empty) {
                const accountDoc = accountSnapshot.docs[0];
                const accountData = accountDoc.data();

                if (accountData.main.amount < transactionData.amount) {
                  throw new Error(
                    "Solde insuffisant pour effectuer le retrait"
                  );
                }

                const newMainBalance =
                  accountData.main.amount - transactionData.amount;
                await accountDoc.ref.update({ "main.amount": newMainBalance });
              }
            };

            const handleDeposit = async () => {
              const accountSnapshot = await db
                .collection("accounts")
                .where("user_id", "==", transactionData.user_id)
                .get();

              if (!accountSnapshot.empty) {
                const accountDoc = accountSnapshot.docs[0];
                const accountData = accountDoc.data();

                const newMainBalance =
                  accountData.main.amount + transactionData.amount;
                await accountDoc.ref.update({ "main.amount": newMainBalance });

                const userDoc = await db
                  .collection("users")
                  .doc(transactionData.user_id)
                  .get();

                if (userDoc.exists) {
                  const referralCode = userDoc.data()?.referral_id;

                  if (referralCode) {
                    const referrerSnapshot = await db
                      .collection("users")
                      .where("referral_code", "==", referralCode)
                      .get();

                    if (!referrerSnapshot.empty) {
                      const referrerDoc = referrerSnapshot.docs[0];
                      const referrerAccountSnapshot = await db
                        .collection("accounts")
                        .where("user_id", "==", referrerDoc.id)
                        .get();

                      if (!referrerAccountSnapshot.empty) {
                        const referrerAccountDoc =
                          referrerAccountSnapshot.docs[0];
                        const referrerAccountData = referrerAccountDoc.data();
                        const affiliateBonus = transactionData.amount * 0.03;
                        const newAffiliateBalance =
                          referrerAccountData.affiliate.amount + affiliateBonus;
                        await referrerAccountDoc.ref.update({
                          "affiliate.amount": newAffiliateBalance,
                        });
                      }
                    }
                  }
                }
              }
            };

            if (status === "success") {
              if (transactionData.type === "withdraw") {
                await handleWithdrawal();
              } else if (transactionData.type === "deposit") {
                await handleDeposit();
              }
            }

            await doc.ref.update({ status: status });
          }
        });
      return NextResponse.json(
        { state: true, message: "Statut de la transaction mis à jour" },
        { status: 200 }
      );
    } else if (action === "transaction") {
      await db.collection("transactions").doc(transaction.id).delete();

      return NextResponse.json(
        { state: true, message: "Transaction supprimée" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { state: false, message: "Action non valide" },
        { status: 400 }
      );
    }
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
