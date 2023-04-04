const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        default: 'general'
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notes", NotesSchema);

// A schema is a JSON object that defines the structure and contents of your data. Schemas represent types of data rather than specific values.
// For example, this is a basic schema for data about cars and some car objects that conform to the schema:
// {
//     "title": "car",
//     "required": [
//        "_id",
//        "year",
//        "make",
//        "model",
//        "miles"
//     ],
//     "properties": {
//       "_id": { "bsonType": "objectId" },
//       "year": { "bsonType": "string" },
//       "make": { "bsonType": "string" },
//       "model": { "bsonType": "string" },
//       "miles": { "bsonType": "number" }
//     }
//   }