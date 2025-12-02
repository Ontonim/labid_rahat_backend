import { INewsletter } from "./newslatter.interface";
import { Newsletter } from "./newslatter.model";

 const subscribeEmail = async (email: string): Promise<INewsletter> => {
  // check duplicate
  const existing = await Newsletter.findOne({ email });
  if (existing) throw new Error("Email already subscribed.");

  const newSubscription = await Newsletter.create({ email });
  return newSubscription;
};

const getAllSubscriptions = async (): Promise<INewsletter[]> => {
  return Newsletter.find().sort({ createdAt: -1 });
};

export const newslatterService = {
  subscribeEmail,
  getAllSubscriptions,
};
