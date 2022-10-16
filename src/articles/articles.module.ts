import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Article } from './article.model';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Article', schema: Article }])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
