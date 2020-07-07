import { users } from './users/users'
import { register } from './users/register'
import { login } from './users/login'
import { posts } from './posts/posts'
import { post } from './posts/post'
import { postCreate } from './posts/create'
import { postDelete } from './posts/delete'

export default {
  Query: {
    users,
    posts,
    post
  },

  Mutation: {
    register,
    login,
    postCreate,
    postDelete
  }
}
