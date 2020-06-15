import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './type_defs'
import PolicyDirective from './type_defs/policy_directive'
import { currentUser } from './authentication'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => ({ user: await currentUser(req) }),
  schemaDirectives: { policy: PolicyDirective }
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}.`))
