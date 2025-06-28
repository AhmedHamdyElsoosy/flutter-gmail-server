const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { toEmail, unitNo, project, salesAgent,salesManager,salesDirector,subject,lineOne,lineTwo,lineThree,lineFour} = req.body;

  try {
    // إعدادات الإرسال من Gmail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7amdy.elsoosy@gmail.com', // إيميلك
        pass: process.env.GMAIL_PASS, // App Password
      },
    });

if (!Array.isArray(toEmail)) {
  return res.status(400).json({ status: 'error', message: 'toEmail must be an array' });
}

    // الإيميل نفسه
    let mailOptions = {
      from: '"Sphinx Operation - Aplus"<7amdy.elsoosy@gmail.com>',
      to: toEmail.join(','),
      subject: `${subject}`,
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
     <p>Dear ${salesAgent || 'Team'} & All Responsible for ,</p>
    <br>
    <p>${lineOne || ''}</p>
    <p>${lineTwo || ''}</p>
    <p>${lineThree || ''}</p>
    <p>${lineFour || ''}</p>
    <br>
    <p>Good Luck! , بالتوفيق</p>
    <p>Sales Operations Team<br>A Plus Software<br>Website : Sphinx.Aplus-Dev.com</p>
  </div>
`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ status: 'success' });
  } catch (error) {
    console.error('خطأ في إرسال الإيميل:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ السيرفر شغال على http://localhost:${PORT}`);
});
