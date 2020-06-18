import { gql } from 'apollo-server'

export default gql`
  enum Permission {
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
    roles: [Role!]!
  }

  type Role {
    id: Int!
    name: Permission!
    user: User!
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

  input UserInput {
    email: String!
    name: String
    password: String!
  }

  type Query {
    users: [User!]
    posts: [Post!]
    post(id: Int!): Post
  }

  type Mutation {
    postCreate(input: PostInput!): Post @policy(requires: postWrite)
    userCreate(input: UserInput!): String # jwt token
  }
`
