var templateBuilder = function(body) {

  var helper = require('sendgrid').mail;
  params = JSON.parse(body.params);
  var header = "<div style=\"font-family: sans-serif; font-weight: 200;\"><h2 style=\"padding: 10px; border-bottom: 3px solid #64b045; font-weight: 200;\">Digital Manufacturing Commons</h2><p style=\"padding: 10px 20px;\">"
  var footer = "</div>"

  // If we don't have the template requested, return false
  switch(body.template) {
    // Verification Token
    case 1:
      var subject = "You Have Been Verified on the DMC";
      var content = new helper.Content('text/html', header+"<p>Your application for on boarding onto the DMDII member Portal hosted on the Digital Manufacturing Commons has been approved.  Follow the instructions below to finalize the onboarding process.</p><ol><li>Log on to <a href=\"https://portal.opendmc.org\">portal.opendmc.org</a></li><li>Click on your user name in the upper right corner under My Account<ol><li>Make sure your First Name, Last Name, and e-mail are correct as you will lose the ability to edit these once your account is verified.</li><li>You can change your display name at any time though at this moment it is recommended that you set this as your full name, as this will be the name other users will see on your profile.</li></ol></li><li>Input the token provided below in the Validation Token field and press Verify</li><div style=\"text-align: center;\"><h4>"+params.token+"</h4></div><li>You can now confirm your account as validated by the “verified” status next to account basics as well as by the inability to edit you organization field</li><li>New menu items available<ol><li>Core</li><li>Explore</li><li>My Organization</li><li>Marketplace</li><li>DMDII Portal</li></ol></li><li>Find more information for Organization Administrators read <a href=\"https://digitalmfgcommons.atlassian.net/wiki/pages/viewpage.action?pageId=67043368\">our wiki</a> or reach our help desk at askdmc@uilabs.org</li></ol>"+footer);
      break;
    // Shared Document
    case 2:
      var subject = "A DMC Document Has Been Shared With You";
      var content = new helper.Content('text/html', header+"The Document '" + params.documentName + "' has been shared with you by " + params.sender + ". It's SHA hash is " + params.sha + ". <br><br>You can access it via <a href=\"" + params.presignedUrl+"\">this link</a>"+footer);
      body.requester = "doNotReply@opendmc.org"
      break;
    // Workspace invite
    case 3:
      var subject = "You Have Been Invited to a DMC Workspace";
      var content = new helper.Content('text/html', header+"You have been invited to a workspace on the DMC.<br><br>You can manage your invitations <a href=\"" + params.link+"\">here.</a>"+footer);
      body.requester = "doNotReply@opendmc.org"
      break;
    default:
      return false;
  }

  var email = new helper.Email(body.email);
  var requester = new helper.Email(body.requester);
  return new helper.Mail(requester, subject, email, content);
}

module.exports = templateBuilder;
