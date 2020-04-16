module.exports = (app) => {
  const media_items = require('../controllers/media-item.controller.js');
  
  app.post('/media-items', media_items.create);

  app.get('/media-items', media_items.findAll);

  app.get('/media-items/:itemId', media_items.findOne);

  app.put('/media-items/:itemId', media_items.update);

  app.delete('/media-items/:itemId', media_items.delete);
}
