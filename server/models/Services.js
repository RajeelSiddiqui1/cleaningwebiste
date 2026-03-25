import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const serivcesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    points: [
      {
        type: String,
        required: false,
      },
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    specailService: {
      type: Boolean,
      default: false
    },
    charges: {
      type: String, 
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = models.Service || model("Service", serivcesSchema);

export default Service;
