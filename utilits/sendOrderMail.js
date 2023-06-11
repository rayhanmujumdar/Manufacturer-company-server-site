const sendOrderMail = (order) => {
  const { email, name, cost, img, address, product, orderQuantity } = order;
  const mailOptions = {
    from: "rayhanmujumdar0177@gmail.com",
    to: email,
    subject: `Buy Product Confirmation from Computer Market`,
    text: "This is a test email sent with Nodemailer and Brevo SMTP.",
    html: `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8">
      <title>Buy Product Confirmation from Computer Market</title>
    </head>
    
    <body>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f0f0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse;">
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <h1>Thank you for your purchase!</h1>
                  <p>Order Confirmation</p>
                </td>
              </tr>
              <!-- Order Details -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <h2>Order Summary</h2>
                  <table cellpadding="5" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">
                    <tr>
                      <th>product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                    <tr>
                      <td>${product}</td>
                      <td>${orderQuantity}</td>
                      <td>$${cost}</td>
                    </tr>
                    <!-- Add more rows for additional products if necessary -->
                  </table>
                </td>
              </tr>
              <!-- Shipping Information -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <h2>Shipping Information</h2>
                  <p>${name}</p>
                  <p>${address}</p>
                  <p>Bangladesh</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <p>Thank you for your purchase!</p>
                  <p>Computer Market</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`,
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

module.exports = sendOrderMail;
