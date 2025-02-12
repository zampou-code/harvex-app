import { NextResponse } from "next/server";
import { TransactionMail } from "@/mail/transaction-mail";
import { addDays } from "date-fns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";
import { nanoid } from "nanoid";
import { sendMail } from "@/lib/mail";

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
      doc_id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        state: true,
        data: transactions.sort(
          (a, b) =>
            new Date((b as any).created_at).getTime() -
            new Date((a as any).created_at).getTime()
        ),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        message: "Erreur lors de la récupération des transactions",
      },
      { status: 500 }
    );
  }
}) as any;

export const POST = auth(async function POST(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const user_id = request.auth.user?.id;
    const email = request.auth.user?.email;

    const { amount, type, account, pack, payment_mean, action, investment } =
      await request.json();

    if (type === "transfert" && user_id && amount && account) {
      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user_id)
        .get();

      if (!accountSnapshot.empty && account) {
        const accountDoc = accountSnapshot.docs[0];
        const accountData = accountDoc.data();

        if (accountData[account].amount < amount) {
          return NextResponse.json(
            {
              state: false,
              message: `Solde est insuffisant pour effectuer ce transfert. Votre solde actuel est de ${new Intl.NumberFormat(
                "fr-FR",
                { style: "currency", currency: "XOF" }
              ).format(accountData[account].amount)}.`,
            },
            { status: 400 }
          );
        }

        await db
          .collection("accounts")
          .doc(accountDoc.id)
          .update({
            affiliate: {
              ...accountData.affiliate,
              amount: accountData.affiliate.amount - Number(amount),
            },
            main: {
              ...accountData.main,
              amount: accountData.main.amount + Number(amount),
            },
          });

        return NextResponse.json(
          {
            data: {},
            state: true,
            message: `Transfert effectué avec succès ! Le montant de ${new Intl.NumberFormat(
              "fr-FR",
              { style: "currency", currency: "XOF" }
            ).format(
              Number(amount)
            )} a été transféré de votre compte de parrainage vers votre compte principal.`,
          },
          { status: 201 }
        );
      }
    }

    if (
      type === "withdraw" &&
      user_id &&
      email &&
      amount &&
      account &&
      payment_mean
    ) {
      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user_id)
        .get();

      if (!accountSnapshot.empty && account) {
        const accountDoc = accountSnapshot.docs[0];
        const accountData = accountDoc.data();

        if (accountData[account].amount < amount) {
          return NextResponse.json(
            {
              state: false,
              message: `Solde est insuffisant pour effectuer ce retrait. Votre solde actuel est de ${new Intl.NumberFormat(
                "fr-FR",
                { style: "currency", currency: "XOF" }
              ).format(accountData[account].amount)}.`,
            },
            { status: 400 }
          );
        }

        const transactionRef = await db.collection("transactions").add({
          user_id,
          id: nanoid(),
          type: "withdraw",
          status: "pending",
          amount: Number(amount),
          account: account || "",
          payment_mean: payment_mean || "",
          created_at: new Date().toISOString(),
        });

        sendMail({
          to: email,
          name: "Harvex",
          subject: "Demande de retrait en attente - Harvex Groupe",
          body: TransactionMail({
            type,
            action: "demand",
          }),
        });

        return NextResponse.json(
          {
            state: true,
            data: {
              id: transactionRef.id,
            },
            message: `Votre demande de retrait a bien été enregistrée. Pour finaliser l'opération, veuillez contacter notre équipe de support par WhatsApp au plus vite.`,
          },
          { status: 201 }
        );
      }
    }

    if (
      type === "investment" &&
      user_id &&
      email &&
      amount &&
      account &&
      action &&
      pack
    ) {
      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user_id)
        .get();

      if (!accountSnapshot.empty && account) {
        const accountDoc = accountSnapshot.docs[0];
        const accountData = accountDoc.data();

        if (action === "demande") {
          const transactionRef = await db.collection("transactions").add({
            user_id,
            id: nanoid(),
            status: "pending",
            type: "investment",
            amount: Number(amount),
            account: account || "",
            payment_mean: payment_mean || "",
            pack: {
              ...pack,
              start_date: new Date().toISOString(),
              end_date: addDays(new Date(), pack?.number_of_day).toISOString(),
            },
            created_at: new Date().toISOString(),
          });

          sendMail({
            to: email,
            name: "Harvex",
            subject: "Demande d'investissement - Harvex Groupe",
            body: TransactionMail({
              type,
              action: "demand",
            }),
          });

          return NextResponse.json(
            {
              state: true,
              data: {
                id: transactionRef.id,
              },
              message: `Votre demande de investissement a bien été enregistrée. Pour finaliser l'opération, veuillez contacter notre équipe de support par WhatsApp au plus vite.`,
            },
            { status: 201 }
          );
        }

        if (action === "account") {
          if (accountData[account].amount < amount) {
            return NextResponse.json(
              {
                state: false,
                message: `Solde est insuffisant pour effectuer cet investissement. Votre solde actuel est de ${accountData[account].amount} FCFA.`,
              },
              { status: 400 }
            );
          }

          await db
            .collection("accounts")
            .doc(accountDoc.id)
            .update({
              [account]: {
                ...accountData[account],
                amount: accountData[account].amount - Number(amount),
              },
            });

          const transactionRef = await db.collection("transactions").add({
            user_id,
            id: nanoid(),
            status: "approved",
            type: "investment",
            amount: Number(amount),
            account: account || "",
            payment_mean: payment_mean || "",
            pack: {
              ...pack,
              start_date: new Date().toISOString(),
              end_date: addDays(new Date(), pack?.number_of_day).toISOString(),
            },
            created_at: new Date().toISOString(),
          });

          const userSnapshot = await db.collection("users").doc(user_id).get();

          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            const parrainId = userData?.parrain_id;

            if (parrainId) {
              const parrainAccountSnapshot = await db
                .collection("accounts")
                .where("referral_code", "==", parrainId)
                .get();

              if (!parrainAccountSnapshot.empty) {
                const parrainAccountDoc = parrainAccountSnapshot.docs[0];
                const parrainAccountData = parrainAccountDoc.data();
                const bonusAmount = Number(amount) * 0.03;

                await db
                  .collection("accounts")
                  .doc(parrainAccountDoc.id)
                  .update({
                    affiliate: {
                      ...parrainAccountData.main,
                      amount: parrainAccountData.main.amount + bonusAmount,
                    },
                  });
              }
            }
          }

          sendMail({
            to: email,
            name: "Harvex",
            subject: "Investissement effectué avec succès - Harvex Groupe",
            body: TransactionMail({
              type,
              action: "account",
            }),
          });

          return NextResponse.json(
            {
              state: true,
              data: {
                id: transactionRef.id,
              },
              message: `Félicitations ! Votre investissement a été effectué avec succès.`,
            },
            { status: 201 }
          );
        }
      }
    }

    if (type === "update-investment" && user_id && investment) {
      const accountSnapshot = await db
        .collection("accounts")
        .where("user_id", "==", user_id)
        .get();

      if (!accountSnapshot.empty) {
        const accountDoc = accountSnapshot.docs[0];
        const accountData = accountDoc.data();

        const currentDate = new Date();
        const endDate = new Date(investment.pack.end_date);

        if (currentDate < endDate) {
          return NextResponse.json(
            {
              state: false,
              message: `Votre investissement n'est pas encore arrivé à terme. La date de fin prévue est le ${endDate.toLocaleDateString(
                "fr-FR"
              )}. Veuillez patienter jusqu'à cette date pour récupérer vos gains.`,
            },
            { status: 400 }
          );
        }

        await db
          .collection("accounts")
          .doc(accountDoc.id)
          .update({
            main: {
              ...accountData[account],
              amount: accountData.main.amount + Number(investment.pack.roi),
            },
          });

        await db.collection("transactions").doc(investment.doc_id).update({
          status: "success",
          updated_at: new Date().toISOString(),
        });

        return NextResponse.json(
          {
            state: true,
            message: `Félicitations ! Votre investissement de ${new Intl.NumberFormat(
              "fr-FR",
              { style: "currency", currency: "XOF" }
            ).format(
              investment.pack.roi
            )} a été crédité avec succès sur votre compte principal. Nous vous souhaitons une excellente expérience d'investissement avec nous.`,
          },
          { status: 201 }
        );
      }
    }

    return NextResponse.json(
      { message: "Missing parameters", state: false },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        message:
          "Une erreur s'est produite lors de votre opération financière. Veuillez vérifier vos informations et réessayer. Si le problème persiste, contactez notre support.",
      },
      { status: 500 }
    );
  }
}) as any;
