## Set up Node and Apollo-Server with Typescript

- create a directory
  - `mkdir MyApp && cd MyApp`
- initialize a package.json
  - `yarn init -y` or `npm init -y`
- install typescript
  - `yarn add typescript -D` or `npm install typescript -D`
- generate tsconfig
  - `tsc --init`
  - edit tsconfig to customize your src and build directories:
    ```
    "outDir": "./dist"
    "rootDir": "./app"
    ```
- install eslint (optional)
  - `yarn add eslint -D` or `npm install eslint -D`
  - `eslint --init`
    - answer the questions according to preference but make sure to answer `y` when asked if using typescript and select `node` instead of `browser`. here's how I answered:
    ```
    ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
    ? What type of modules does your project use? JavaScript modules (import/export)
    ? Which framework does your project use? None of these
    ? Does your project use TypeScript? Yes
    ? Where does your code run? Node
    ? How would you like to define a style for your project? Use a popular style guide
    ? Which style guide do you want to follow? Standard: https://github.com/standard/standard
    ? What format do you want your config file to be in? JavaScript
    ```
  - vs code extension and auto correct
  - lint task script
- install apollo-server and graphql
  - `yarn add graphql apollo-server` or `npm install graphql apollo-server`
- Set up appolo-server:
  the following code is somewhat based on the getting started example on apollo's site [here](https://www.apollographql.com/docs/apollo-server/getting-started/)

  - create a folder called `app` and a file in it called `index.ts` and add the following:

  ```
    import { ApolloServer } from 'apollo-server'
    import resolvers from './resolvers'
    import typeDefs from './types'

    const server = new ApolloServer({ resolvers, typeDefs })

    server.listen().then(({ url }) => console.log(`Server ready at ${url}. `))
  ```

  - create a file called `types.ts` and add:

  ```
  import { gql } from 'apollo-server'

  export default gql`
    type Post {
      title: String!
      text: String!
    }

    type Query {
      posts: [Post!]
      """
      Test Message.
      """
      testMessage: String!
    }
  `

  ```

  - finally add a file called `resolvers.ts` and add:

  ```
  export default {
    Query: {
      posts: () => [{ title: 'test post', text: 'testing...' }],
      testMessage: (): string => 'Hello World!'
    }
  }

  ```

- set up the dev server:
  - install ts-node-dev
    - `yarn add ts-node-dev -D` or `npm install ts-node-dev -D`
    - in your package.json add a script sections:

      ```
      "scripts": {
        "dev": "ts-node-dev --poll ./app"
      },
      ```

      note: you may not need the `--poll` flag but it was required for my OS when using node v14

You should now have a server running on localhost:4000. Go to that in your browser and try out a query:

```
query {
  posts {
    title
    text
  }
}
```

You'll notice you can autocomplete (press ctrl-space to give you initial auto-complete options).
