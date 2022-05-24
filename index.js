require("dotenv").config()
const Discord = require("discord.js")
const { sendMail } = require("./services/Mailer")


const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ]
})

client.on("messageCreate", async (message) => {
  try {

    if (message.channel.id == "859542608074506240") {

      const lines = message.content.split("<>")

      if (lines.length === 3) {

        const title = lines[0]
        const mails = lines[1].split(",")

        let image_data = ""
        const image_urls = message.attachments.map(item => item.attachment)

        if (image_urls.length) {
          image_data = `Resim URL:\n${image_urls.join("\n")}`
        }

        const result = `${title}\n\n${lines[2]}\n\n${image_data}`
        await sendMail(mails.join(";"), "Bizim Ekip Yazılım Bilgilendirme", result)

      } else {

        if (message.author.id !== "978703218764816404") {
          message.channel.send(`Sayın <@${message.author.id}> Mesaj Formatınız Mail İçin Uygun Değil ! Bu Mesaj 1 dk Sonra Silinecektir.`)
          message.channel.send(`Bu Mesajınızın Kalıcı Olması İçin Bu Mesaj Formatına Uymak Zorundasınız. => Mesaj Başlığı<>mail1,mail2,mail3<>mesajiçeriği`)
        }

        setTimeout(() => {
          message.delete()
        }, 60000);

      }

    }
  } catch (error) { }

})

client.on("ready", () => {
  console.log("Bot Started !")
})

client.login(process.env.TOKEN)