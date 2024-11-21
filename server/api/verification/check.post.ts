import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const config = useRuntimeConfig();

const twilioAccountSid = config.public.twilioAccountSid;
const twilioAuthToken = config.public.twilioAuthToken;

const prisma = new PrismaClient();
const client = twilio(twilioAuthToken, "AuthToken");

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { phoneNumber, code } = body;

		if (!phoneNumber || !code) {
			throw new Error("Missing phone number or code");
		}

		const verificationCheck = await client.verify.services(twilioAccountSid).verificationChecks.create({ to: phoneNumber, code });

		return verificationCheck;
	} catch (error) {
		console.error("Error checking verification code:", error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
});
