import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();

  // Set up Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL, // Your Gmail
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
    },
  });

  // Email Content
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: "🎉 Welcome to My Website!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TodoPro</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px;
      background-color: #4CAF50;
      color: #ffffff;
      border-radius: 10px 10px 0 0;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to TodoPro 🎉</h1>
    </div>
    <div class="content">
      <p>Hey <strong>${email}</strong>,</p>
      <p>Thank you for signing up for <strong>TodoPro</strong>! 🚀 Stay organized and boost your productivity with our powerful task management features.</p>
      <p>Here’s what you can do:</p>
      <ul>
        <li>✅ Create & manage tasks easily</li>
        <li>📅 Set due dates & reminders</li>
        <li>👥 Share todos with teammates</li>
        <li>🌟 Mark tasks as completed</li>
        <li>📊 Track your progress</li>
      </ul>
      <p>Get started by logging in and adding your first task.</p>
      <center>
        <a href="{todo-app}" class="button">Go to My Todo List</a>
      </center>
    </div>
    <div class="footer">
      <p>Need help? Contact our support team at <a href="mailto:support@todopro.com">support@todopro.com</a></p>
      <p>&copy; 2025 TodoPro. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
