// let Waterline = require('waterline');
// let dbAdaptor = require('sails-mysql');

// let return_codes = require('./return_codes'); 

// let waterline = new Waterline();
// let ontology = null;

// let global_config = {
//     adapters: {
//         'db': dbAdaptor
//     },
//     datastores: {
//         default: {
//             host: process.env.RDS_HOSTNAME,
//             port: process.env.PORT,
//             user: process.env.RDS_USERNAME,
//             password: process.env.RDS_PASSWORD,
//             adapter: 'db'
//         }
//     }
// };

// let registerCollection = function(c) {
//     let wCollection = Waterline.Collection.extend(c);
//     waterline.registerModel(wCollection);
// };

// let getOntology = function() {
//     "use strict";                                           // Not sure how important this "strict" stuff is.
//     return new Promise(function (resolve, reject) {
//         if (ontology) {                                     // Have I retrieved and cached the ontology?
//             //logging.debug_message("getOntology1: " + ontology);
//             resolve(ontology);
//         }
//         else {
//             // Ontology uses callbacks. Call initialize and resolve Promise based on the response.
//             waterline.initialize(global_config, function (err, result) {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     //logging.debug_message("Setting ontology = ", null);
//                     ontology = result;
//                     resolve(ontology);
//                 }
//             });
//         }
//     });
// };

// let mapError = function(e) {

//     let mapped_error = {};

//     switch(e.code) {

//         case "E_UNIQUE": {
//             mapped_error = return_codes.codes.uniqueness_violation;
//             break;
//         }

//         default: {
//             mapped_error = return_codes.codes.unknown_error;
//             break;
//         }

//     }

//     return mapped_error;
// };


// // Generic class for accessing a table in MySQL.
// let Dao = function(collection) {

//     self = this;                                        // JavaScript "this" can act weird.

//     self.collection = collection;                       // Configuration information.

//     registerCollection(this.collection);                // Register config information with Waterline.

//     self.getCollection = function(id) {

//         return new Promise(function(resolve, reject) {
//             getOntology(global_config).then(
//                 function (result) {
//                     "use strict";
//                     //console.log("Collection identity = " + id);
//                     resolve(result.collections[id]);
//                 },
//                 function (err) {
//                     "use strict";
//                     reject(err);
//                 });
//         });
//     };

//     self.getByQ = function(id, q, fields) {
//         return new Promise(function (resolve, reject) {
//             self.getCollection(id).then(
//                 function (result) {
//                     if (fields) {
//                         //
//                         resolve(result.find({"where": q, "select": fields}));
//                     }
//                     else {
//                         resolve(result.find({"where": q}));
//                     }
//                 },
//                 function (error) {
//                     reject(error)
//                 });
//         });
//     };

//     // Retrieve by a single column, primary key.
//     // Probably should add support for multi-column primary keys.
//     self.retrieveById = function(id, fields) {
//         return new Promise(function(resolve, reject) {
//             s = self.collection.primaryKey;

//             self.getByQ(self.collection.identity, {[s]: id}).then(
//                 function (result) {
//                     if (result && result[0]) {
//                         // Queries always return an array, but primary key is unique.
//                         resolve(result[0])
//                     }
//                     else {
//                         // This is a mistake. [] is the correct answer for general queries, but
//                         // should be "not found" for a primary key lookup.
//                         resolve([]);
//                     }
//                 },
//                 function (error) {
//                     // logging.debug_message("Dao.retrieve_by_id: error  = " + error);
//                     reject(error);
//                 }
//             );
//         });
//     };

//     // A template is a dictionary of the form (column_name: values). This function returns
//     // all of the rows that match the template.
//     //
//     // TODO: Add support for pagination!
//     //
//     self.retrieveByTemplate = function(template, fields) {
//         s = self.collection.primaryKey;
//         return new Promise(function(resolve, reject) {
//             self.getByQ(self.collection.identity, template, fields).then(
//                 function (result) {
//                     if (result) {
//                         resolve(result);
//                     }
//                     else {
//                         resolve([]);
//                     }
//                 },
//                 function (error) {
//                     // logging.debug_message("Boom2 = " + error);
//                     reject(error);
//                 }
//             )
//         });
//     };

    
    
//     // 1. id is the table name.
//     // 2. d is the dictionary of (column_name, value) pairs to insert.
//     //
//     self.create = function(id, d) {
//         return new Promise(function (resolve, reject) {
//             self.getCollection(id).then(
//                 function (result) {
//                     resolve(result.create(d));
//                 },
//                 function (error) {
//                     reject(error)
//                 })
//                 .catch(function(exc) {
//                     reject(exc);
//                 });
//         });
//     };

//     // I have not really tested this one all that much.
//     self.update = function(template, updates) {

//         return new Promise(function (resolve, reject) {
//             self.getCollection(self.collection.identity).then(
//                 function (result) {
//                     result.update(template, updates).then(
//                         function (result) {
//                             resolve(result);
//                         },
//                         function (error) {
//                             // logging.error_message("dao.Dao.update: error = ", error);
//                             reject(error);
//                         });
//                 },
//                 function (error) {
//                     // logging.error_message("dao.Dao.update: error = ", error);
//                     reject(error)
//                 });
//         });
//     };

//     // Ditto.
//     self.delete = function(template) {
//         return new Promise(function (resolve, reject) {
//             self.getCollection(self.collection.identity).then(
//                 function (result) {
//                     result.destroy(template).then(
//                         function (result) {
//                             resolve(result);
//                         },
//                         function (error) {
//                             // logging.error_message("dao.Dao.delete: error = ", error);
//                             reject(error);
//                         });
//                 },
//                 function (error) {
//                     // logging.error_message("dao.Dao.update: delete = ", error);
//                     reject(error)
//                 });
//         });
//     };

//     // Ditto
//     self.create = function(data) {
//         return new Promise(function(resolve, reject) {
//             create(self.collection.identity, data).then(
//                 function (result) {
//                     resolve(result)
//                 },
//                 function (error) {
//                     let new_error = mapError(error);
//                     // logging.debug_message("Boom = ", new_error);
//                     reject(new_error);
//                 }
//             );
//         });
//     };

//     // This would push a custom query into the DB, but Waterline makes this really hard.
//     self.customQ = function(q) {
//        reject("Not implemented.");
//     };

// };



// exports.Dao = Dao;


