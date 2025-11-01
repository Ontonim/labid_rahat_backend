import { Contact } from "./contactMessage.model";
import { IContact } from "./contactMessage.interface";

// Create a new contact message (Public)
const createMessage = async (payload: IContact): Promise<IContact> => {
  const newMessage = await Contact.create(payload);
  return newMessage;
};

// Get all contact messages (Admin only)
const getAllMessages = async (): Promise<IContact[]> => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  return messages;
};

export const ContactService = {
  createMessage,
  getAllMessages,
};
