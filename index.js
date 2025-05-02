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
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #2c3e50;">📄 تم تجهيز عقد عميل</h2>
      <p>نفيد سيادتكم أنه قد تم تجهيز عقد العميل التالي:</p>
      <table style="width: 100%; margin-top: 10px;">
        <tr>
          <td style="font-weight: bold;">اسم العميل:</td>
          <td>${clientName}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">يرجى التكرم بإبلاغ العميل بالحضور لاستلام عقده من مقر الشركة.</p>
      <hr style="margin: 30px 0;">
      <p style="text-align: center; color: #888;">مع خالص التحية،<br><strong>فريق عمليات NAD</strong></p>
    </div>
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
