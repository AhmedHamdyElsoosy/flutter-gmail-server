const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { toEmail, clientName } = req.body;

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
      subject: '📄 إشعار بتجهيز عقد عميل',
      html: `
        <div style="font-family: Arial;">
          <h2 style="color:#007BFF;">تحية طيبة وبعد،</h2>
          <p>نفيد سيادتكم أنه قد تم تجهيز عقد العميل التالي:</p>
          <ul><li><strong>اسم العميل:</strong> ${clientName}</li></ul>
          <p>يرجى التكرم بإبلاغ العميل بالحضور لاستلام عقده من مقر الشركة.</p>
          <br><strong>فريق عمليات NAD</strong>
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
