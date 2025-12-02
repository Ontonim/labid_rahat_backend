import { Request, Response } from "express";
import { Newsletter } from "./newslatter.model";
import { sendMailToUser } from "../../../utils/nodeMailer";
import { generateNewsletterEmail, generateThankYouEmail } from "./newslatter.emailTamplate";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { newslatterService } from "./newslatter.service";

export const subscribeNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return SendResponse(res, {
      success: false,
      message: "Invalid email address.",
      data: null,
      statusCode: 400,
    });
  }

  const subscription = await newslatterService.subscribeEmail(email);

  // Send thank you email
  try {
    const html = generateThankYouEmail(email);
    await sendMailToUser(email, "Thank You for Subscribing!", html);
  } catch (err) {
    console.error("Error sending email:", err);
  }

  SendResponse(res, {
    success: true,
    message: "Subscription successful.",
    data: subscription,
    statusCode: 201,
  });
});

export const sendNewsletterUpdate = catchAsync(async (req: Request, res: Response) => {
  const { subject, message } = req.body;

  // validation
  if (!subject || typeof subject !== "string" || !message || typeof message !== "string") {
    return SendResponse(res, {
      success: false,
      message: "Subject and message are required.",
      data: null,
      statusCode: 400,
    });
  }

  const subscribers = await Newsletter.find({}, "email");
  if (!subscribers.length) {
    return SendResponse(res, {
      success: false,
      message: "No subscribers found.",
      data: null,
      statusCode: 404,
    });
  }

  const html = generateNewsletterEmail(message);

  for (const sub of subscribers) {
    await sendMailToUser(sub.email, subject, html);
  }

  SendResponse(res, {
    success: true,
    message: "Newsletter update sent to all subscribers.",
    data: { totalSent: subscribers.length },
    statusCode: 200,
  });
});
