import Item from "../(models)/Item";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const itemData = body.formData;
    await Item.create(itemData);

    return NextResponse.json({ message: "Error", error }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
