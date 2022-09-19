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
    comments: [Comment] 
  }
  type Comment {
    _id: ID
    text: String
    createdAt: String
    postId: ID
  }
  input PostType {
    title: String!
    body: String!
  }
  input CommentType {
    text: String!
    postId: ID
  }
  type RootQuery {
    posts: [Post!]
    post(_id: String!): Post!
    commentsOfAPost(_id: String!): [Comment!]
  }
  type Mutation {
    createPost(Post:PostType): Post,
    deletePost(_id: String): Post,
    updatePost(_id: String, title: String, body: String): String,
    addComment(Comment:CommentType): Comment,
    updateComment(_id: String, text: String): String,
    deleteComment(_id: String): String,
  }
  schema {
    query: RootQuery
    mutation: Mutation
  }
`);
