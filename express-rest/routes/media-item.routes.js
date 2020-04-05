module.exports = (app) => {
  const media_items = require('../controllers/media-item.controller.js');

  /**
   * @swagger
   * /media-items:
   *   post:
   *     description: |
   *       Add a new media item to the database.
   *     tags:
   *       - status
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: The name of the service.
   *             version:
   *               type: string
   *               description: The version of the service.
   *             message:
   *               type: string
   *               description: The status message describing the state of the service.
   *         examples:
   *           application/json: |-
   *             {
   *               "name": "@bvanderlaan/my-service"
   *               "version": "1.0.0"
   *               "message": "up and running"
   *             }
   */
  app.post('/media-items', media_items.create);

  app.get('/media-items', media_items.findAll);

  app.get('/media-items/:itemId', media_items.findOne);

  app.put('/media-items/:itemId', media_items.update);

  app.delete('/media-items/:itemId', media_items.delete);
}
