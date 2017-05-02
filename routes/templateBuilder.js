var templateBuilder = function(body) {

  var helper = require('sendgrid').mail;

  switch(body.template) {
    case 33:
      break;
    case 2:
      break;
    default:
      return false;
  }

  var requester = new helper.Email('test@test.org');
  var email = new helper.Email(body.email);
  var requester = new helper.Email(body.requester);
  var subject = "Hello "+ Date.now()
  var content = new helper.Content('text/plain', "Hello Please input " + body.token + " in the token slot of your accont to continue");

  return new helper.Mail(requester, subject, email, content);
}

module.exports = templateBuilder;
