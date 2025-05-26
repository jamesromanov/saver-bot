import { Input, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as env from "dotenv";
import fs, { link } from "fs";
// import { getVideo } from "./downloader.api.js";

env.config();
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.hears(/(https?:\/\/[^\s]+)/g, async (ctx) => {
  let id = {};
  let mId = await ctx.reply("⏳");
  console.log(mId.message_id);
  id.message_id = mId.message_id;
  try {
    fetch(`http://localhost:3000/vid?url=${ctx.text}`)
      .then((data) => data.json())
      // "Saved by @muzzle_saver_bot"
      .then((res) => {
        try {
          ctx.replyWithVideo(
            {
              url: res.url.data[0].url,
            },
            {
              caption: "📥 Saved by @muzzle_saver_bot",
            }
          );
          ctx.deleteMessage(id.message_id);
        } catch (error) {
          ctx.reply("Video url xatolik! ☹️");
        }
      });
  } catch (error) {
    ctx.reply("Video url xatolik! ☹️");
  }
});
bot.hears("salom", (ctx) => ctx.replyWithAudio({ source: "./s.ogg" }));
bot.on(message(), (ctx) => ctx.reply("Menga instagram link yuboring"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
