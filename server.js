const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// 允许跨域请求
app.use(cors());
// 解析JSON请求体
app.use(express.json());

// 配置QQ邮箱SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // QQ邮箱SMTP服务器
  port: 587, // 端口（587或465）
  secure: false, // 587端口用false，465用true
  auth: {
    user: '3630327054@qq.com', // 替换为你的QQ邮箱
    pass: 'vbgfydwzcsiechac' // 替换为你的16位授权码
  }
});

// 处理发送请求
app.post('/send', async (req, res) => {
  try {
    // 发送邮件
    await transporter.sendMail({
      from: '"用户输入" <3630327054@qq.com>', // 发送方
      to: '3630327054@qq.com', // 替换为接收邮箱
      subject: '新的用户输入内容', // 邮件主题
      text: req.body.content // 邮件内容（用户输入的文本）
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

// 启动服务
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务运行在端口 ${port}`);
});
    
