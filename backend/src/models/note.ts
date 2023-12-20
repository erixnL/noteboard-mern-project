import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    //timestamp for createdAt and updatedAt
}, {timestamps: true});

//create type inferred from Mongoose schema
type Note = InferSchemaType<typeof noteSchema>

//model(modelName, schema)
export default model<Note>("Note", noteSchema)