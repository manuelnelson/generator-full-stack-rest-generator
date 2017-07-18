import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { <%=modelName %>Ctrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/<%=camelModelName %>s - Get list of <%=camelModelName %>s */
  .get(<%=modelName %>Ctrl.list)

  /** POST /api/<%=camelModelName %>s - Create new <%=camelModelName %> */
  .post(AuthCtrl.verifyToken,<%=modelName %>Ctrl.create);
  // .post(validate(paramValidation.createUser), <%=modelName %>Ctrl.create);

router.route('/:id')
  /** GET /api/<%=camelModelName %>s/:id - Get <%=camelModelName %> */
  .get(<%=modelName %>Ctrl.get)

  /** PUT /api/<%=camelModelName %>s/:id - Update <%=camelModelName %> */
  .put(<%=modelName %>Ctrl.update)

  /** DELETE /api/<%=camelModelName %>s/:id - Delete <%=camelModelName %> */
  .delete(<%=modelName %>Ctrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', <%=modelName %>Ctrl.load);

export default router;
