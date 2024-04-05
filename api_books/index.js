const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation");

const books = [
  { id: "1", author_id: "1", title: "春と修羅" },
  { id: "2", author_id: "2", title: "白痴" },
  { id: "3", author_id: "3", title: "藪の中" },
  { id: "4", author_id: "1", title: "銀河鉄道の夜" },
];

const typeDefs = gql`
 type Query {
   books: [Book]
 }

 type Book {
   id: ID!
   author_id: ID!
   title: String!
 }

 extend type Author @key(fields: "id") {
	id: ID! @external
	books: [Book]
 }
 `;

const resolvers = {
  Query: {
    books() {
      return books;
    },
  },
  Author: {
    books(author) {
      return books.filter((book) => book.author_id === author.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
