import { addDays, differenceInDays } from "date-fns";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { end_date } = await request?.json();

    if (!end_date) {
      return NextResponse.json(
        { error: "Missing parameters", state: false },
        { status: 400 }
      );
    }

    const todayDate = new Date().toISOString();
    const remainingDays = differenceInDays(end_date, todayDate);

    return NextResponse.json(
      {
        state: true,
        data: {
          remaining_days: remainingDays >= 0 ? remainingDays : 0,
          message: "Remaining days calculation completed successfully",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "Invalid identifier or password" },
      },
      { status: 500 }
    );
  }
}
