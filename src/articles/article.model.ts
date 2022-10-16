import * as mongoose from 'mongoose';

export const Article = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: Array, required: false },
});

export interface IArticle extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  tags: string[];
}
