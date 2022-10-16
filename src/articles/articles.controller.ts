import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async createArticle(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
  ) {
    const articleId = await this.articlesService.createArticle(
      title,
      content,
      tags,
    );
    return { id: articleId };
  }

  @Get()
  async getArticles() {
    const articles = await this.articlesService.getArticles();
    return articles;
  }

  @Get(':id')
  async getArticle(@Param('id') articleId: string) {
    return await this.articlesService.getArticle(articleId);
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') articleId: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
  ) {
    await this.articlesService.updateArticle(articleId, title, content, tags);
    return null;
  }

  @Delete(':id')
  async deleteArticle(@Param('id') articleId: string) {
    await this.articlesService.deleteArticle(articleId);
    return null;
  }
}
