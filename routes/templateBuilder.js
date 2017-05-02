var templateBuilder = function(body) {

  var helper = require('sendgrid').mail;

  // If we don't have the template requested, return false
  switch(body.template) {
    case 33:
      var subject = "Hello "+ Date.now()
      var content = new helper.Content('text/plain', "Hello Please input " + body.token + " in the token slot of your accont to continue");
      break;
    case 2:
      var subject = "Hello "+ Date.now()
      var content = new helper.Content('text/plain', "Hello Please input " + body.token + " in the token slot of your accont to continue");
      break;
    case 44:
      break;
    default:
      return false;
  }

  var email = new helper.Email(body.email);
  // TODO do we want to anonymize the sender?
  var requester = new helper.Email(body.requester);
  return new helper.Mail(requester, subject, email, content);
}

module.exports = templateBuilder;
