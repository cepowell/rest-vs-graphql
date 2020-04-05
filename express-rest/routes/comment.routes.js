module.exports = (app) => {
  const comments = require('../controllers/comment.controller.js');

  app.post('/media-items/:mediaItemId/comments', comments.create);

  app.get('/media-items/:mediaItemId/comments', comments.findAll);

  app.get('/media-items/:mediaItemId/comments/:commentId', comments.findOne);

  app.put('/media-items/:mediaItemId/comments/:commentId', comments.update);

  app.delete('/media-items/:mediaItemId/comments/:commentId', comments.delete);
}
