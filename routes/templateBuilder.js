var templateBuilder = function(body) {

  var helper = require('sendgrid').mail;
  params = JSON.parse(body.params);

  // If we don't have the template requested, return false
  switch(body.template) {
    // Verification Token
    case 1:
      var subject = "You Have Been Verified on the DMC";
      var content = new helper.Content('text/plain', "Please input " + params.token + " in the token field on your 'my account' page to continue.");
      break;
    // Shared Document
    case 2:
      var subject = "A DMC Document Has Been Shared With You";
      var content = new helper.Content('text/plain', "The Document '" + params.documentName + "' has been shared with you. \n\nYou can access it via this link: " + params.presignedUrl);
      break;
    default:
      return false;
  }

  var email = new helper.Email(body.email);
  var requester = new helper.Email(body.requester);
  return new helper.Mail(requester, subject, email, content);
}

module.exports = templateBuilder;
