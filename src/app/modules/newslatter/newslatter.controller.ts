// newsletter.controller.ts
import { Request, Response } from "express";


import { sendMail } from "../../../utils/nodeMailer";
import { generateThankYouEmail } from "./newslatter.emailTamplate";
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
    await sendMail(email, "Thank You for Subscribing!", html);
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
