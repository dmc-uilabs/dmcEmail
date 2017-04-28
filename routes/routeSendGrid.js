  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser')

  // parse application/json
  app.use(bodyParser.json())

  var appRouter = function(app) {


    app.post("/", function(req, res) {

      console.log("made it here")
      console.log(req.body.tempateId)

      if (req.body.tempateId == 33) {

        // expected object shape
        // {
        //   "tempateId" : 33,
        //   "toEmail" : "alex.maties@uilabs.org",
        //   "fromEmail" : "marcin@uilabs.org",
        //   "subject" : "Your DMC validation token",
        //   "token" : "23452"
        // }

        console.log("inside the if")
        console.log("email", req.body.toEmail)


        var helper = require('sendgrid').mail;
        var fromEmail = new helper.Email('test@test.org');
        var toEmail = new helper.Email(req.body.toEmail);
        var fromEmail = new helper.Email(req.body.fromEmail);
        var subject = "Hello "+ Date.now()
        var content = new helper.Content('text/plain', "Hello Please input " + req.body.token + " in the token slot of your accont to continue");

        var mail = new helper.Mail(fromEmail, subject, toEmail, content);
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
            console.log("yesss")
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

      res.send('SendEmail reached');
    });

  }
  module.exports = appRouter;
