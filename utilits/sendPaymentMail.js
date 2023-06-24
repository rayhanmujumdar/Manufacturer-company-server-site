const sendPaymentMail = ({ orderInfo, paymentInfo }) => {
  const { email, name, cost } = orderInfo;
  const { transactionId } = paymentInfo;
  const mailOptions = {
    from: "rayhanmujumdar0177@gmail.com",
    to: email,
    subject: `Product purchase for Paid Confirmation`,
    text: `Thank you for your payment. We are pleased to confirm that your payment has been received successfully
    . 
    payment Id: ${transactionId},
    Amount Paid: $${cost} 
    `,
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Paid Confirmation</title>
    </head>
    <body>
        <div style="max-width: 600px; margin: 0 auto;">
            <h2>Paid Confirmation</h2>
            <p>Dear ${name},</p>
            <p>Thank you for your payment. We are pleased to confirm that your payment has been received successfully.</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Payment ID:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${transactionId}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Payment Date:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Amount Paid:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">$${cost}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Payment Method:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Card</td>
                </tr>
            </table>
            <p>If you have any questions or concerns regarding this payment or any other matter, please don't hesitate to contact us. We're here to help!</p>
            <p>Thank you again for choosing our services.</p>
            <p>Best regards,</p>
            <p>The Computer Market Team</p>
        </div>
    </body>
    </html>
    `,
  };
  return mailOptions;
};

/* <!-- Payment Information -->
  <tr>
  <td align="center" style="padding: 20px;">
  <h2>Payment Information</h2>
  <p>Payment Method: Credit Card</p>
  <p>Card Number: **** **** **** 1234</p>
  <p>Amount Charged: $99.99</p>
  </td>
  </tr> */

module.exports = sendPaymentMail;
