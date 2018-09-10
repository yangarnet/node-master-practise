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
        if (acceptMethods.indexOf(data.method) > -1) {
            // connect with the handler container
            user_handler[data.method](data, callback);
        } else {
            callback(404, { error: "no match user handler found" }, handler.CONTENT_TYPE.JSON);
        }
    },

    tokens: (data, callback) => {
        if (acceptMethods.indexOf(data.method) > -1) {
            token_handler[data.method](data, callback);
        } else {
            callback(404, { error: "no match token handler found" }, handler.CONTENT_TYPE.JSON);
        }
    },

    checks: (data, callback) => {
        if (acceptMethods.indexOf(data.method) !== -1) {
            check_handler[data.method](data, callback);
        } else {
            callback(404, { error: "no match checks handle found" }, handler.CONTENT_TYPE.JSON);
        }
    }
};

module.exports = handler;
