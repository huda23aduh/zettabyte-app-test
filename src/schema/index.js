const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  """
  A Post refers to available attributes for a Post
  """
  type Post {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
    commentsData: Comment 
  }
  type Comment {
    _id: ID!
    text: String!
    createdAt: String!
  }
  input PostType {
    title: String!
    body: String!
  }
  input CommentType {
    text: String!
    post: ID
  }
  type RootQuery {
    posts: [Post!]
    post(_id: String!): Post!
  }
  type Mutation {
    createPost(Post:PostType): Post,
    deletePost(_id: String): Post,
    updatePost(_id: String, title: String, body: String): String,
    addComment(Comment:CommentType): Comment,
  }
  schema {
    query: RootQuery
    mutation: Mutation
  }
`);
