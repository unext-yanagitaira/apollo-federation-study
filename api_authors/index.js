const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation");

const authors = [
  { id: "1", name: "宮沢賢治", birthday: "1896-08-27" },
  { id: "2", name: "坂口安吾", birthday: "1906-10-20" },
  { id: "3", name: "芥川龍之介", birthday: "1892-03-01" },
];

const typeDefs = gql`
 type Query {
   authors: [Author]
 }

 type Author @key(fields: "id") {
  id: ID!
  name: String!
  birthday: String
}
`;

const resolvers = {
  Query: {
    authors(parent, args, context, info) {
      return authors;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]), // 注意点1
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
