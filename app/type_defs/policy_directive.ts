import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'

class PolicyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { args: { requires } } = this
    const resolver = field.resolve || defaultFieldResolver

    field.resolve = function (...args) {
      const { user } = args[2] || { user: { roles: [] } }
      const authorized = user.admin || user.roles.map(i => i.name).includes(requires)
      if (!authorized) throw new Error(`Not Authorized: ${requires}`)

      return resolver.apply(this, args)
    }
  }
}

export default PolicyDirective
