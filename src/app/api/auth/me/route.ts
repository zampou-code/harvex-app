import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase-admin";

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

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
    return NextResponse.json(
      {
        state: true,
        data: {
          ...userData,
        },
        message: "User information retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "An error occurred while fetching user information" },
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
    const data = await request?.json();

    if (!user_id)
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );

    await db
      .collection("users")
      .doc(user_id)
      .update({
        ...data,
      });

    return NextResponse.json(
      {
        state: true,
        data: {},
        message: "Vos informations ont été mises à jour avec succès",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        data: {},
        message:
          "Une erreur s'est produite lors de la mise à jour de vos informations. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}) as any;
