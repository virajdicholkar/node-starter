import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export interface ExampleInterface {
    _id?: ObjectId;
    name: string;
    description?: string;
}

export const ExampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

}, { timestamps: true });

export const ExampleModel = mongoose.model('Example', ExampleSchema);
