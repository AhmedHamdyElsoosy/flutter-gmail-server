const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { toEmail, unitNo, project, salesAgent,salesManager,salesDirector,lineOne,lineTwo,lineThree,lineFour,greetings } = req.body;

  try {
    // إعدادات الإرسال من Gmail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7amdy.elsoosy@gmail.com', // إيميلك
        pass: process.env.GMAIL_PASS, // App Password
      },
    });

    // الإيميل نفسه
    let mailOptions = {
      from: '"Ahmed Hamdy" <7amdy.elsoosy@gmail.com>',
      to: toEmail,
      subject: `(${unitNo}-${project} Booking Request Added)`,
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    </p>Dear ${salesAgent} & All Responsible for ,</p>
    <br>
    <p>${lineOne}</p>
    <p>${lineTwo}</p>
    <p>${lineThree}</p>
    <p>${lineFour}</p>
    <br>
    <p>Good Luck! , بالتوفيق</p>
    <p>Sales Operations Team<br>A Plus Software<br>namaa-aplusdevs.netlify.app</p>
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
