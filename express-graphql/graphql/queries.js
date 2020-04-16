const graphql = require('graphql');

const MediaItem = require('../models/media-item.model');
const Comment = require('../models/comment.model');

const {
  MediaItemType,
  CommentType
} = require('./types');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    mediaItems: {
      type: GraphQLList(MediaItemType),
      resolve: (root, args, context, info) => {
        return MediaItem.find().populate('comments').exec();
      }
    },
    mediaItem: {
      type: MediaItemType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, args, context, info) => {
        return MediaItem.findById(args.id).populate('comments');
      }
    },
    comments: {
      type: CommentType,
      resolve: (root, args, context, info) => {
        return Comment.find.exec();
      }
    },
    comment: {
      type: CommentType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, args, context, info) => {
        return Comment.findById(args.id).exec();
      }
    }
  }
});

module.exports = Query;
