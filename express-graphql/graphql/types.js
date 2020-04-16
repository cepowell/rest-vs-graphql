const graphql = require('graphql');

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
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    year: {
      type: GraphQLString
    },
    mediaType: {
      type: GraphQLNonNull(GraphQLString)
    },
    representationType: {
      type: GraphQLNonNull(GraphQLString)
    },
    comments: {
      type: GraphQLList(CommentType)
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
    _id: {
      type: GraphQLID
    },
    content: {
      type: GraphQLString
    }
  })
});

module.exports = {
  MediaItemType,
  CommentType
};
