var templateBuilder = function(body) {

  var helper = require('sendgrid').mail;
  params = JSON.parse(body.params);
  var header = "<div style=\"font-family: sans-serif; font-weight: 200;\"><h2 style=\"padding: 10px; border-bottom: 3px solid #64b045; font-weight: 200;\">Digital Manufacturing Commons</h2><p style=\"padding: 10px 20px;\">"
  var footer = "</p>"

  // If we don't have the template requested, return false
  switch(body.template) {
    // Verification Token
    case 1:
      var subject = "You Have Been Verified on the DMC";
      var content = new helper.Content('text/html', header+"Please input " + params.token + " in the token field on your 'my account' page to continue."+footer);
      break;
    // Shared Document
    case 2:
      var subject = "A DMC Document Has Been Shared With You";
      var content = new helper.Content('text/html', header+"The Document '" + params.documentName + "' has been shared with you. <br><br>You can access it via <a href=\"" + params.presignedUrl+"\">this link</a>"+footer);
      break;
    default:
      return false;
  }

  var email = new helper.Email(body.email);
  var requester = new helper.Email(body.requester);
  return new helper.Mail(requester, subject, email, content);
}

module.exports = templateBuilder;
