import mongoose, { Schema, Document } from "mongoose";
import { INewsletterSubscriber } from "@/types";

export interface INewsletterSubscriberDocument
  extends Omit<INewsletterSubscriber, "_id">,
    Document {}

const NewsletterSubscriberSchema =
  new Schema<INewsletterSubscriberDocument>(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
      subscribedAt: { type: Date, default: Date.now },
      isActive: { type: Boolean, default: true },
    },
    {
      timestamps: true,
    }
  );

export const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriberDocument>(
    "NewsletterSubscriber",
    NewsletterSubscriberSchema
  );

export default NewsletterSubscriber;
