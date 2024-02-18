import {
  Query,
  Resolver,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Author } from 'src/model/author.model';
import { Post } from 'src/model/post.model';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor() {}

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return {
      id: 213,
      firstName: 'bruce',
      lastName: 'Armstrong',
      posts: [],
    };
  }

  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return [
      {
        id: 23,
        title: '2wad',
        votes: 22,
      },
      {
        id: 22,
        title: '2wad',
        votes: 22,
      },
      {
        id: 21,
        title: '2wad',
        votes: 22,
      },
      {
        id: 24,
        title: '2wad',
        votes: 22,
      },
    ];
  }
}
