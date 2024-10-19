import nodemailer from 'nodemailer';

export async function sendMail (
  {
    from,fromPassword,
    to,subject,content},
){
  return new Promise((resolve,reject) => {
    try{
      const transporter = nodemailer.createTransport({
        host: 'srv623447.hstgr.cloud', // Replace with your mail server hostname
        port: 465, // Use port 465 for SSL, or 587 for STARTTLS
        secure: true, // Set true if port is 465
        auth: {
          user: from, // Your email address
          pass: fromPassword, // Your email password
        },
        tls: {
          rejectUnauthorized: false, // Bypass self-signed certificate error
        },
      });
      // Send email
      const mailOptions = {
        from, // Sender address
        to, // Recipient address
        subject: subject,
        html: content,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    }catch (e){
      reject(e);
    }
  });
}
