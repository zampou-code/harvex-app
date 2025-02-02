import { NextResponse } from "next/server";
import { addDays } from "date-fns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const GET = auth(async function GET(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const user_id = request.auth.user?.id;
    const transactionsSnapshot = await db
      .collection("transactions")
      .where("user_id", "==", user_id)
      .get();

    const transactions = transactionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { state: true, data: transactions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "Erreur lors de la récupération des transactions" },
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const user_id = request.auth.user?.id;

    const { amount, fee_amount, type, account, pack, status, payment_mean } =
      await request.json();

    if (type === "withdraw" && user_id) {
      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user_id)
        .get();

      if (!accountSnapshot.empty && account) {
        const accountDoc = accountSnapshot.docs[0];
        const accountData = accountDoc.data();
        console.log(`${account}: `, accountData[account].amount);
        if (accountData[account].amount < amount) {
          return NextResponse.json(
            {
              state: false,
              message: `Solde est insuffisant pour effectuer ce retrait. Votre solde actuel est de ${accountData[account].amount} FCFA.`,
            },
            { status: 400 }
          );
        }
      }
    }

    switch (type) {
      case "investment":
        if (!user_id || !amount || !pack) {
          return NextResponse.json(
            { error: "Missing parameters", state: false },
            { status: 400 }
          );
        }
        break;
      case "deposit":
      case "withdraw":
        if (!user_id || !amount || !account || !status || !payment_mean) {
          return NextResponse.json(
            { error: "Missing parameters", state: false },
            { status: 400 }
          );
        }
        break;

      default:
        return NextResponse.json(
          { error: "Missing parameters", state: false },
          { status: 400 }
        );
    }

    const transactionRef = await db.collection("transactions").add({
      user_id,
      id: `${Math.random().toString(36).charAt(0)}${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      amount: Number(amount),
      fee_amount: Number(fee_amount) || 0,
      status: status || "",
      payment_mean: payment_mean || "",
      account: account || "",
      type,
      pack: pack
        ? {
            ...pack,
            start_date: new Date().toISOString(),
            end_date: addDays(new Date(), pack?.number_of_day).toISOString(),
          }
        : {},
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        state: true,
        data: {
          id: transactionRef.id,
        },
        message: `Votre demande de ${
          type === "deposit" ? "dépôt" : "retrait"
        } a bien été enregistrée. Pour finaliser l'opération, veuillez contacter notre équipe de support par WhatsApp au plus vite.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        state: false,
        data: {
          message:
            "Une erreur s'est produite lors de votre opération financière. Veuillez vérifier vos informations et réessayer. Si le problème persiste, contactez notre support.",
        },
      },
      { status: 500 }
    );
  }
});
