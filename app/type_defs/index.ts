import { gql } from 'apollo-server'

export default gql`
  enum Permission {
    userRead
    commentRead
    commentWrite
    postWrite
    postPublish
  }

  directive @policy(
    requires: Permission!,
  ) on FIELD_DEFINITION

  type Profile {
    id: Int!
    bio: String
    userId: Int!
    user: User!
  }

  type User {
    id: Int!
    email: String!
    name: String
    profile: Profile
    posts: [Post!]
    roles: [Permission!]!
  }

  type Post {
    id: Int!
    authorId: Int!
    content: String
    published: Boolean!
    title: String!
    author: User!
  }

  input PostInput {
    content: String
    title: String!
    published: Boolean
  }

  input PostDeleteInput {
    id: Int!
  }

  input RegisterInput {
    email: String!
    name: String
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }  

  type Query {
    users: [User!] @policy(requires: userRead)
    posts: [Post!]
    post(id: Int!): Post
  }

  type Mutation {
    register(input: RegisterInput!): String
    login(input: LoginInput!): String
    postCreate(input: PostInput!): Post @policy(requires: postWrite)
    postDelete(input: PostDeleteInput!): Post @policy(requires: postWrite)
  }
`
