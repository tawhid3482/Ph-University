import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to:string, html:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // smtp host for gmail
     port: 587, //smtp port for gmail
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'tawhidulislam3482@gmail.com',
      pass: 'rphx petr gxaq hzgi', // app password
    },
  });

  // send mail with defined transport object

  await transporter.sendMail({
    from: 'tawhidulislam3482@gmail.com', // sender address
    to , // list of receivers
    subject: 'Reset Your Password within 10 minutes', // Subject line
    text: '', // plain text body
    html // html body
  });
};
