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

    const accounts = accountDoc.docs[0]?.data() || null;

    const accountData = {
      user: userData,
      account: {
        main: accounts?.main?.amount || 0,
        affiliate: accounts?.affilate?.amount || 0,
      },
    };

    return NextResponse.json(
      {
        state: true,
        data: {
          ...accountData,
          message: "Account information successfully retrieved",
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
        data: {
          message:
            "An error occurred while fetching account information. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
});
