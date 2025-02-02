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
        { error: "User not found", state: false },
        { status: 404 }
      );
    }
    const userData = userDoc.data();

    const accountDoc = await db
      .collection("accounts")
      .where("user_id", "==", user_id)
      .get();

    const accountData = accountDoc.docs[0]?.data() || null;

    const transactionsSnapshot = await db
      .collection("transactions")
      .where("user_id", "==", user_id)
      .get();

    const transactions = transactionsSnapshot.docs.map((doc) => doc.data());

    const totalInvestments = transactions
      .filter((t) => t.type === "investment")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalDeposits = transactions
      .filter((t) => t.type === "deposit")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalWithdrawals = transactions
      .filter((t) => t.type === "withdraw")
      .reduce((sum, t) => sum + t.amount, 0);

    const last10Transactions = transactions
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 11);

    const referralsSnapshot = await db
      .collection("users")
      .where("referral_id", "==", userData?.referral_code)
      .get();

    let referrals = referralsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const last4Referrals = referrals
      .sort(
        (a, b) =>
          new Date((b as any)?.created_at).getTime() -
          new Date((b as any)?.created_at).getTime()
      )
      .slice(0, 4);

    const dashboardData = {
      user: userData,
      referrals: {
        count: referrals.length,
        referrals: last4Referrals,
      },
      account: {
        main: accountData?.main?.amount || 0,
        affiliate: accountData?.affilate?.amount || 0,
      },
      transactions: {
        totalInvestments,
        totalDeposits,
        totalWithdrawals,
        count: transactions.length,
        transactions: last10Transactions,
      },
    };

    return NextResponse.json(
      {
        state: true,
        data: {
          ...dashboardData,
          message: "Dashboard data retrieved successfully",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "Error while retrieving dashboard data" },
      },
      { status: 500 }
    );
  }
});
