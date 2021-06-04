const discord = require('discord.js'), Canvas = require('canvas'), fs = require('fs')
module.exports = {
  name:'guildMemberAdd',
  async execute(client, member) {
    const applyText = (canvas, text) => {
      const context = canvas.getContext('2d');
      let fontSize = 70;
      do {
        context.font = `${fontSize -= 10}px sans-serif`;
      } while (context.measureText(text).width > canvas.width - 300);
      return context.font;
    };

    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	  if (!channel) return;
    const canvas = Canvas.createCanvas(700, 250);
	  const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./resources/wallpaper.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#3498DB';

    context.font = '28px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, `${member.displayName}!`);
    context.fillStyle = '#ffffff';
    context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    const avatar = await Canvas.loadImage(`${member.user.displayAvatarURL({ format: 'png' })}?size=1024`);
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, 25, 25, 200, 200);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.lineWidth = 10;
    context.strokeStyle = '#3498DB';
    context.stroke();
    context.closePath();

    const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'image.png');
	  channel.send(
      new discord.MessageEmbed()
      .attachFiles(attachment)
      .setColor('BLUE')
      .setImage('attachment://image.png')
    );
  }
}