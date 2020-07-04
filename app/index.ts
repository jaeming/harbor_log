import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './type_defs'
import PolicyDirective from './type_defs/policy_directive'
import { currentUser } from './authentication'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => ({ user: await currentUser(req) }),
  schemaDirectives: { policy: PolicyDirective },
  playground: true
})

const port = process.env.PORT || 4000

server.listen({ port }).then(({ url }) => console.log(`Server ready at ${url}.`))
