const user_handler = require("./user");
const check_handler = require("./checks");
const token_handler = require("./tokens");
const helpers = require("../../../utils/helpers");
// define the handler, used by router
const acceptMethods = ["post", "get", "put", "delete"];

const handler = {

    CONTENT_TYPE : {
        HTML: 'text/html',
        ICON: 'image/x-icon',
        CSS: 'text/css',
        JS: 'text/plain',
        JPEG: 'image/jpeg',
        PNG: 'image/png',
        JSON: 'application/json'
    },

    /* -----------------------html handler-----------------*/
    index: (data, callback) => {
        if (data.method === "get") {
            const templateData = {
                "head.title": "Uptime Monitoring - Made Simple",
                "head.description":
                    "We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we'll send you a text to let you know",
                "body.class": "index"
            };
            // Read in a template as a string
            helpers.getTemplate("index", templateData, function(err, str) {
                if (!err && str) {
                    // Add the universal header and footer
                    helpers.addUniversalTemplates(str, templateData, function(err, str) {
                        if (!err && str) {
                            // Return that page as HTML
                            callback(200, str, handler.CONTENT_TYPE.HTML);
                        } else {
                            callback(500, undefined, handler.CONTENT_TYPE.HTML);
                        }
                    });
                } else {
                    callback(500, undefined, handler.CONTENT_TYPE.HTML);
                }
            });
        } else {
            callback(405, undefined, handler.CONTENT_TYPE.HTML);
        }
    },

    // load account creation page
    accountCreate: (data, callback) => {
        if (data.method === "get") {
            const templateData = {
                "head.title": "register with us",
                "head.description":
                    "sign up with us and get started monitoring",
                "body.class": "accountCreate"
            };
            // Read in a template as a string
            helpers.getTemplate("accountCreate", templateData, function(err, str) {
                if (!err && str) {
                    // Add the universal header and footer
                    helpers.addUniversalTemplates(str, templateData, function(err, str) {
                        if (!err && str) {
                            // Return that page as HTML
                            callback(200, str, handler.CONTENT_TYPE.HTML);
                        } else {
                            callback(500, undefined, handler.CONTENT_TYPE.HTML);
                        }
                    });
                } else {
                    callback(500, undefined, handler.CONTENT_TYPE.HTML);
                }
            });
        } else {
            callback(405, undefined, handler.CONTENT_TYPE.HTML);
        }
    },

    // create session after register
    sessionCreate: (data, callback) => {
        if (data.method === "get") {
            const templateData = {
                "head.title": "log in your account",
                "head.description":
                    "Enter your phone number and passworkd to login to your account",
                "body.class": "sessionCreate"
            };
            // Read in a template as a string
            helpers.getTemplate("sessionCreate", templateData, function(err, str) {
                if (!err && str) {
                    // Add the universal header and footer
                    helpers.addUniversalTemplates(str, templateData, function(err, str) {
                        if (!err && str) {
                            // Return that page as HTML
                            callback(200, str, handler.CONTENT_TYPE.HTML);
                        } else {
                            callback(500, undefined, handler.CONTENT_TYPE.HTML);
                        }
                    });
                } else {
                    callback(500, undefined, handler.CONTENT_TYPE.HTML);
                }
            });
        } else {
            callback(405, undefined, handler.CONTENT_TYPE.HTML);
        }
    },
    sessionDeleted: (data, callback) => {
        if (data.method === "get") {
            const templateData = {
                "head.title": "log out your account",
                "head.description":
                    "you just log out of your account",
                "body.class": "sessionDeleted"
            };
            // Read in a template as a string
            helpers.getTemplate("sessionDeleted", templateData, function(err, str) {
                if (!err && str) {
                    // Add the universal header and footer
                    helpers.addUniversalTemplates(str, templateData, function(err, str) {
                        if (!err && str) {
                            // Return that page as HTML
                            callback(200, str, handler.CONTENT_TYPE.HTML);
                        } else {
                            callback(500, undefined, handler.CONTENT_TYPE.HTML);
                        }
                    });
                } else {
                    callback(500, undefined, handler.CONTENT_TYPE.HTML);
                }
            });
        } else {
            callback(405, undefined, handler.CONTENT_TYPE.HTML);
        }
    },
    // Account has been deleted
    accountDeleted: (data,callback) => {
        // Reject any request that isn't a GET
        if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Account Deleted',
            'head.description' : 'Your account has been deleted.',
            'body.class' : 'accountDeleted'
        };
        // Read in a template as a string
        helpers.getTemplate('accountDeleted',templateData,function(err,str){
            if(!err && str){
            // Add the universal header and footer
            helpers.addUniversalTemplates(str,templateData,function(err,str){
                if(!err && str){
                // Return that page as HTML
                callback(200,str,'html');
                } else {
                callback(500,undefined,'html');
                }
            });
            } else {
            callback(500,undefined,'html');
            }
        });
        } else {
        callback(405,undefined,'html');
        }
    },

    accountEdit: (data,callback) => {
        // Reject any request that isn't a GET
        if(data.method == 'get'){
          // Prepare data for interpolation
          var templateData = {
            'head.title' : 'Account Settings',
            'body.class' : 'accountEdit'
          };
          // Read in a template as a string
          helpers.getTemplate('accountEdit',templateData,function(err,str){
            if(!err && str){
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str){
                if(!err && str){
                  // Return that page as HTML
                  callback(200,str,'html');
                } else {
                  callback(500,undefined,'html');
                }
              });
            } else {
              callback(500,undefined,'html');
            }
          });
        } else {
          callback(405,undefined,'html');
        }
    },
    // Dashboard (view all checks)
    checkList: (data,callback) => {
        // Reject any request that isn't a GET
        if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Dashboard',
            'body.class' : 'checksList'
        };
        // Read in a template as a string
        helpers.getTemplate('checksList',templateData,function(err,str){
            if(!err && str){
            // Add the universal header and footer
            helpers.addUniversalTemplates(str,templateData,function(err,str){
                if(!err && str){
                // Return that page as HTML
                callback(200,str,'html');
                } else {
                callback(500,undefined,'html');
                }
            });
            } else {
            callback(500,undefined,'html');
            }
        });
        } else {
        callback(405,undefined,'html');
        }
    },
    // Create a new check
    checkCreate:  function(data,callback){
        // Reject any request that isn't a GET
        if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Create a New Check',
            'body.class' : 'checksCreate'
        };
        // Read in a template as a string
        helpers.getTemplate('checksCreate',templateData,function(err,str){
            if(!err && str){
            // Add the universal header and footer
            helpers.addUniversalTemplates(str,templateData,function(err,str){
                if(!err && str){
                // Return that page as HTML
                callback(200,str,'html');
                } else {
                callback(500,undefined,'html');
                }
            });
            } else {
            callback(500,undefined,'html');
            }
        });
        } else {
        callback(405,undefined,'html');
        }
    },

    public: (data, callback) => {
        if (data.method === 'get') {
            const filePath = data.trimmedPath.replace('public/', '');

            let contentType = '';
            if (data.trimmedPath.match(/.ico$/)) {
                contentType = handler.CONTENT_TYPE.ICON;
            }
            if (data.trimmedPath.match(/.css$/)) {
                contentType = handler.CONTENT_TYPE.CSS;
            }
            if (data.trimmedPath.match(/.js$/)) {
                contentType = handler.CONTENT_TYPE.JS;
            }
            if (data.trimmedPath.match(/.jpg$/)) {
                contentType = handler.CONTENT_TYPE.JPEG;
            }
            if (data.trimmedPath.match(/.png$/)) {
                contentType = handler.CONTENT_TYPE.PNG;
            }
            helpers.loadStaticResource(filePath, (err, response) => {
                if (!err && response) {
                    callback(200, response, contentType);
                } else {
                    callback(500, undefined);
                }
            });
        } else {
            callback(405, undefined);
        }
    },


    /* -----------------------json handler-----------------*/
    ping: (data, callback) => {
        callback(200);
    },

    notFound: (data, callback) => {
        callback(404, { error: "not such handler" }, handler.CONTENT_TYPE.JSON);
    },

    // define the user handler
    users: (data, callback) => {
        // see the data object in router module , line 25
        if (acceptMethods.indexOf(data.method.toLowerCase()) > -1) {
            // connect with the handler container
            user_handler[data.method](data, callback);
        } else {
            callback(404, { error: "no match user handler found" }, handler.CONTENT_TYPE.JSON);
        }
    },

    tokens: (data, callback) => {
        if (acceptMethods.indexOf(data.method) > -1) {
            token_handler[data.method.toLowerCase()](data, callback);
        } else {
            callback(404, { error: "no match token handler found" }, handler.CONTENT_TYPE.JSON);
        }
    },

    checks: (data, callback) => {
        if (acceptMethods.indexOf(data.method.toLowerCase()) !== -1) {
            check_handler[data.method](data, callback);
        } else {
            callback(404, { error: "no match checks handle found" }, handler.CONTENT_TYPE.JSON);
        }
    }
};

module.exports = handler;
