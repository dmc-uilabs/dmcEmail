  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser')
  var templateBuilder = require('./templateBuilder.js')

  // parse application/json
  app.use(bodyParser.json())

  var appRouter = function(app) {


    app.post("/", function(req, res) {

      var template = templateBuilder(req.body);

      // if (req.body.template == 33) {
      if (template) {

        // expected object shape
        // {
        //   "template" : 33,
        //   "email" : "alex.maties@uilabs.org",
        //   "requester" : "marcin@uilabs.org",
        //   "subject" : "Your DMC validation token",
        //   "token" : "23452"
        // }

        console.log("inside the if")
        console.log("email", req.body.email)

        var mail = templateBuilder(req.body);
        console.log("getting the right env", process.env.SENDGRID_API_KEY)
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        console.log("creating the email", (new Date).toString())
        sg.API(request, function(error, response) {
          if (response.statusCode == 202) {

            console.log("positive response ", (new Date).toString())
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          } else {

            console.log('resending')
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          }

        });

      } else {

        console.log('nothing to do')

      }

      res.send('LOCAL SendEmail reached');
    });

  }
  module.exports = appRouter;
