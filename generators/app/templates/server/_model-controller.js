import {<%=modelName %>} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load <%=camelModelName %> and append to req.
*/
function load(req, res, next, id) {
    <%=modelName %>.get(id)
    .then((<%=camelModelName %>) => {
        req.<%=camelModelName %> = <%=camelModelName %>;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get <%=camelModelName %>
* @returns {<%=modelName %>}
*/
function get(req, res) {
    return res.json(req.<%=camelModelName %>);
}

/**
* Checks if user exists with same email as <%=camelModelName %>.  If not, it creates a new User with the email provided and a default password. Then creates the <%=modelName %> to reside in the new user
* @returns {<%=modelName %>}
*/
function create(req, res, next) {
    const <%=camelModelName %> = new <%=modelName %>(req.body)
        .save()
        .then(saved<%=modelName %> => res.json(saved<%=modelName %>))
        .catch(e => next(e));
}

/**
* Update existing <%=camelModelName %>
* @returns {<%=modelName %>}
*/
function update(req, res, next) {
    const <%=camelModelName %> = req.<%=camelModelName %>;
    for(let prop in req.<%=camelModelName %>){
        <%=camelModelName %>[prop] = req.<%=camelModelName %>[prop];
    }
    <%=camelModelName %>.save()
    .then(saved<%=modelName %> => res.json(saved<%=modelName %>))
    .catch(e => next(e));
}

/**
* Get <%=camelModelName %> list.
* @property {number} req.query.skip - Number of <%=camelModelName %>s to be skipped.
* @property {number} req.query.limit - Limit number of <%=camelModelName %>s to be returned.
* @returns {<%=modelName %>[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    <%=modelName %>.list({ limit, skip })
    .then(<%=camelModelName %>s => res.json(<%=camelModelName %>s))
    .catch(e => next(e));
}

/**
* Delete <%=camelModelName %>.
* @returns {<%=modelName %>}
*/
function remove(req, res, next) {
    const <%=camelModelName %> = req.<%=camelModelName %>;
    <%=camelModelName %>.remove()
    .then(deleted<%=modelName %> => res.json(deleted<%=modelName %>))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
