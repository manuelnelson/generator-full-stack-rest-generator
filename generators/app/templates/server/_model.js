import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const <%=camelModelName %>Schema = new mongoose.Schema({
    name:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
<%=camelModelName %>Schema.statics = {
    /**
    * Get <%=camelModelName %>
    * @param {ObjectId} id - The objectId of <%=camelModelName %>.
    * @returns {Promise<<%=camelModelName %>, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((<%=camelModelName %>) => {
            if (<%=camelModelName %>) {
                return <%=camelModelName %>;
            }
            return null;
            // const err = new APIError('No such <%=camelModelName %> exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List <%=camelModelName %>s in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of <%=camelModelName %>s to be skipped.
    * @param {number} limit - Limit number of <%=camelModelName %>s to be returned.
    * @returns {Promise<<%=camelModelName %>[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('<%=modelName %>', <%=camelModelName %>Schema);
