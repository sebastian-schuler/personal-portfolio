import sgMail from '@sendgrid/mail';
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from 'sanitize-html';

/**
 * Verify the recaptcha token
 * @param token - recaptcha token
 * @returns response from google
 */
const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  return await axios.post(verificationUrl);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const token = req.body.gRecaptchaToken;

  // Recaptcha response
  const response = await verifyRecaptcha(token);

  // For more info check, https://developers.google.com/recaptcha/docs/v3
  if (response.data.success && response.data.score >= 0.5) {

    // Sendgrid setup
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Sanitize the message body
    const sanitizedBody = sanitizeHtml(req.body.message, {
      allowedTags: [],
      allowedAttributes: {},
      allowedIframeHostnames: [],
      disallowedTagsMode: 'escape',
    });

    // Create the message
    const msg = {
      to: process.env.PRIVATE_EMAIL!,
      from: process.env.PUBLIC_EMAIL!,
      subject: 'Contact Form Message: ' + req.body.subject,
      replyTo: req.body.email,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <body>
        <h4>New mail from '${req.body.name}', email: '${req.body.email}' (${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })})</h4>
        <div style="font-size: 16px;">
          <h5>Message:</h5>
          <p>${sanitizedBody}</p>
        </div>
      </body>
      </html>`,
    }

    try {

      // Send the message
      await sgMail.send(msg);

      return res.status(200).json({
        status: "success",
        message: "Message sent successfully"
      });

    } catch (error: any) {
      // Error on sending message
      console.error(error);
      return res.status(400).json({
        status: "error",
        message: "Something went wrong when sending the form data, please try again",
      });
    }

  } else {
    // Recaptcha failed
    return res.json({
      status: "not-passed",
      message: "You might be a robot, sorry!",
    });
  }
}