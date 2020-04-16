const graphql = require('graphql');

const MediaItem = require('../models/media-item.model');
const Comment = require('../models/comment.model');

const {
  MediaItemType,
  CommentType
} = require('./types');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createMediaItem: {
      type: MediaItemType,
      args: {
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
        positive: {
          type: GraphQLBoolean
        },
        description: {
          type: GraphQLString
        }
      },
      resolve: (root, args, context, info) => {
        let newMediaItem = new MediaItem({
          title: args.title,
          year: args.year,
          mediaType: args.mediaType,
          representationType: args.representationType,
          positive: args.positive,
          description: args.description
        });
        return newMediaItem.save();
      }
    },
    updateMediaItem: {
      type: MediaItemType,
      args: {
        id: {
          type: GraphQLID
        },
        title: {
          type: GraphQLString
        },
        year: {
          type: GraphQLString
        },
        mediaType: {
          type: GraphQLString
        },
        representationType: {
          type: GraphQLString
        },
        positive: {
          type: GraphQLBoolean
        },
        description: {
          type: GraphQLString
        }
      },
      resolve: (root, args, context, info) => {
        return MediaItem.findByIdAndUpdate(args.id, {
          title: args.title || undefined,
          year: args.year || undefined,
          mediaType: args.mediaType || undefined,
          representationType: args.representationType || undefined,
          positive: args.positive || undefined,
          description: args.description || undefined
        }, {
          new: true,
          useFindAndModify: false,
          omitUndefined: true
        });
      }
    },
    deleteMediaItem: {
      type: MediaItemType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, args, context, info) => {
        return MediaItem.findByIdAndDelete(args.id);
      }
    },
    createComment: {
      type: CommentType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        },
        content: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, args, context, info) => {
        let newComment = new Comment({
          content: args.content
        });
        newComment.save();
        return MediaItem.findByIdAndUpdate(args.id, {
          $push: { "comments": newComment }
        }, {
          new: true,
          useFindAndModify: false
        });
      }
    },
    updateComment: {
      type: CommentType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        },
        content: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, args, context, info) => {
        return Comment.findByIdAndUpdate(args.id, {
          content: args.content
        }, {
          new: true,
          useFindAndModify: false
        });
      }
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, args, context, info) => {
        return Comment.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = Mutation;
