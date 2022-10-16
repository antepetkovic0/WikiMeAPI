import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IArticle } from './article.model';

@Injectable()
export class ArticlesService {
  articles: IArticle[] = [];

  constructor(
    @InjectModel('Article') private readonly articleModel: Model<IArticle>,
  ) {}

  async createArticle(title: string, content: string, tags: string[]) {
    const article = new this.articleModel({
      title,
      content,
      tags,
    });
    const result = await article.save();
    return result.id as string;
  }

  async getArticles() {
    const articles = await this.articleModel.find().exec();
    return articles.map((a) => ({
      id: a.id,
      title: a.title,
      content: a.content,
      tags: a.tags,
    })) as IArticle[];
  }

  async getArticle(articleId: string) {
    const article = await this.findArticle(articleId);
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      tags: article.tags,
    };
  }

  async updateArticle(
    articleId: string,
    title: string,
    content: string,
    tags: string[],
  ) {
    const article = await this.findArticle(articleId);

    if (title) {
      article.title = title;
    }
    if (content) {
      article.content = content;
    }
    if (tags) {
      article.tags = tags;
    }

    article.save();
  }

  deleteArticle(articleId: string) {
    return this.articleModel.deleteOne({ id: articleId }).exec();
  }

  private async findArticle(articleId: string): Promise<IArticle> {
    let article: IArticle;

    try {
      article = await this.articleModel.findById(articleId);
    } catch (err) {
      throw new NotFoundException('Could not find article.');
    }

    if (!article) {
      throw new NotFoundException('Could not find article.');
    }

    return article;
  }
}
