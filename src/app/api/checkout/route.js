import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const reqBody = await req.json();
    const { items, email } = await reqBody;

    const formattedItems = await items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: formattedItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        email,
      },
    });

    return NextResponse.json({
      message: "success",
      reqBody,
      id: session.id,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
