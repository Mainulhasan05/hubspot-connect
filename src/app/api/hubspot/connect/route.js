import { Client } from "@hubspot/api-client";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { code, userId } = await req.json();

  const hubspotClient = new Client();
  try {
    const tokenResponse = await hubspotClient.oauth.defaultApi.createToken(
      process.env.HUBSPOT_CLIENT_ID,
      process.env.HUBSPOT_CLIENT_SECRET,
      "authorization_code",
      code,
      "http://localhost:3000/dashboard"
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.body;

    await prisma.hubspotAccount.upsert({
      where: { userId },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
      create: {
        userId,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
    });

    return new Response(JSON.stringify({ message: "Connected to HubSpot" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "HubSpot connection failed" }),
      { status: 500 }
    );
  }
}
