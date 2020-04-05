const graphql = require('graphql');

const MediaItem = require('./models/media-item.model');
const Comment = require('./models/comment.model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const MediaItemType = new GraphQLObjectType({
  name: 'MediaItem',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    year: {
      type: GraphQLString
    },
    mediaType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    representationType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({

        })
      }
    },
    positive: {
      type: GraphQLBoolean
    },
    description: {
      type: GraphQLString
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    content: {
      type: GraphQLString
    }
  })
});
