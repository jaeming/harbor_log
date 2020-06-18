import { users } from './users/users'
import { userCreate } from './users/create'
import { posts } from './posts/posts'
import { post } from './posts/post'
import { postCreate } from './posts/create'

export default {
  Query: {
    users,
    posts,
    post
  },

  Mutation: {
    postCreate,
    userCreate
  }
}
