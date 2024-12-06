import twilio from "twilio";
import {prisma} from "~/server/db";

const config = useRuntimeConfig();

const twilioAccountSid = config.public.twilioAccountSid;
const twilioAuthToken = config.public.twilioAuthToken;

const client = twilio(twilioAuthToken, "AuthToken");

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const {phoneNumber} = body;

        console.log(twilioAccountSid + " " + twilioAuthToken);

        if (!phoneNumber) {
            throw new Error("Missing phone number");
        }

        const verification = await client.verify.services(twilioAccountSid).verifications.create({
            to: phoneNumber,
            channel: "sms"
        });

        return verification;
    } catch (error) {
        console.error("Error sending verification code:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});
