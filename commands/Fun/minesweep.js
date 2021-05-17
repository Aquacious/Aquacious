module.exports = {
  name:'minesweeper',
  description:'Play minesweeper in discord!',
  cooldown:10,
  category:'Fun',
  aliases:['ms'],
  execute(client, message, args) {
    // Minesweeper Generator by JochCool on GitHub. Thanks!
    const numberEmoji = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"], neighbourLocations = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}]
    function generateGame(gameWidth, gameHeight, numMines, message, startsNotUncovered, isRaw) {
      
      /** ──────── CHECKS ──────── **/
      
      // Check game size
      if (isNaN(gameWidth)) {
        gameWidth = 6;
      }
      else if (gameWidth <= 0 || gameHeight <= 0) {
        return `Uh, I'm not smart enough to generate a maze sized ${gameWidth} by ${gameHeight}. I can only use positive numbers. Sorry :cry:`;
      }
      if (isNaN(gameHeight)) {
        gameHeight = 6;
      }
      else if (gameWidth > 40 || gameHeight > 20) {
        return "That's way too large! Think of all the mobile users who are going to see this!";
      }
      
      // Check mine count
      if (isNaN(numMines)) {
        numMines = Math.round(gameWidth * gameHeight / 5);
      }
      else {
        if (numMines <= 0) {
          return "You think you can look clever by solving a Minesweeper game without mines? Not gonna happen my friend.";
        }
        else if (numMines > gameWidth * gameHeight) {
          return "I can't fit that many mines in this game!";
        }
      }
      
      /** ──────── CREATE GAME ──────── **/
      
      // 2D array that contains the game, sorted [y][x]. -1 means a mine, positive number is the amount of neighbouring mines
      var game = [];
      
      // Initialize the game array with zeroes
      for (var y = 0; y < gameHeight; y++) {
        game.push([]);
        for (var x = 0; x < gameWidth; x++) {
          game[y].push(0);
        }
      }
      
      // Takes in an object with x and y properties
      function coordIsInGame(coord) {
        return coord.y >= 0 && coord.y < game.length &&
              coord.x >= 0 && coord.x < game[coord.y].length;
      };
      
      // Fill the game with mines!
      for (var mine = 0; mine < numMines; mine++) {
        var x = Math.floor(Math.random()*gameWidth),
            y = Math.floor(Math.random()*gameHeight);
        
        // Retry if there was already a mine there
        if (game[y][x] === -1) {
          mine--;
          continue;
        }
        
        game[y][x] = -1;
        
        // Add 1 to neighbouring tiles
        for (var j = 0; j < neighbourLocations.length; j++) {
          let newCoord = {x: x + neighbourLocations[j].x, y: y + neighbourLocations[j].y};
          if (coordIsInGame(newCoord) && game[newCoord.y][newCoord.x] !== -1) {
            game[newCoord.y][newCoord.x]++;
          }
        }
      }
      
      /** ──────── UNCOVERING ──────── **/
      
      // Initialize vars
      let zeroLocations = []; // Array of {x,y} objects, will contain locations of all zeroes in the game
      let uncoveredLocations = []; // 2D array, each value is either nothing (not uncovered) or true (uncovered)
      for (var y = 0; y < game.length; y++) {
        uncoveredLocations.push([]);
      }
      
      if (startsNotUncovered) {
        // Find all the zeroes in this game
        for (var y = 0; y < game.length; y++) {
          for (var x = 0; x < game[y].length; x++) {
            if (game[y][x] === 0) {
              zeroLocations.push({x: x, y: y});
            }
          }
        }

        // Uncover a random region
        if (zeroLocations.length > 0) {
          
          // Select random starting point
          let locationsToUncover = [];
          let firstCoord = zeroLocations[Math.floor(Math.random()*zeroLocations.length)];
          uncoveredLocations[firstCoord.y][firstCoord.x] = true;
          locationsToUncover.push(firstCoord);

          // Uncover neighbouring tiles
          while (locationsToUncover.length > 0) {
            for (var j = 0; j < neighbourLocations.length; j++) {
              
              let newCoord = {x: locationsToUncover[0].x + neighbourLocations[j].x, y: locationsToUncover[0].y + neighbourLocations[j].y};
              if (!coordIsInGame(newCoord) || uncoveredLocations[newCoord.y][newCoord.x] === true) continue;
              uncoveredLocations[newCoord.y][newCoord.x] = true;
              
              // Continue uncovering
              if (game[newCoord.y][newCoord.x] === 0) {
                locationsToUncover.push(newCoord);
              }
            }
            locationsToUncover.shift();
          }
        }
      }
      
      /** ──────── CREATE REPLY ──────── **/
      
      let returnTxt;
      if (numMines === 1) returnTxt = `Here's a board sized ${gameWidth}x${gameHeight} with 1 mine:`;
      else                returnTxt = `Here's a board sized ${gameWidth}x${gameHeight} with ${numMines} mines:`;
      
      if (isRaw) { returnTxt += "\n```"; }
      
      for (var y = 0; y < game.length; y++) {
        returnTxt += "\n"
        for (var x = 0; x < game[y].length; x++) {
          if (game[y][x] === -1) {
            returnTxt += "||:bomb:||";
          }
          else if (startsNotUncovered && uncoveredLocations[y][x]) {
            returnTxt += numberEmoji[game[y][x]];
          }
          else {
            returnTxt += `||${numberEmoji[game[y][x]]}||`;
          }
        }
      }
      
      if (isRaw) { returnTxt += "\n```"; }
      
      // Send the message if it's not longer than 2000 chars (Discord's limit)
      if (returnTxt.length <= 2000) {
        return returnTxt;
      }
      
      // Otherwise, split the message
      let splitReturns = [];
      do {
        let splitIndex = returnTxt.substring(0, 1900).lastIndexOf("\n");
        if (splitIndex === -1) {
          return "Sorry, your message appears to be too large to send (because of Discord's character limit). Please try a smaller game.";
        }
        splitReturns.push(returnTxt.substring(0, splitIndex));
        returnTxt = returnTxt.substring(splitIndex+1);
        
        // Also split the triple backticks
        if (isRaw) {
          splitReturns[splitReturns.length-1] += "\n```";
          returnTxt = "```\n" + returnTxt;
        }
      } while (returnTxt.length > 1900)
      
      splitReturns.push(returnTxt);
      
      // Send the messages one by one
      let i = 0;
      function sendNextMessage() {
        if (i < splitReturns.length) message.channel.send(splitReturns[i++]).then(sendNextMessage, log);
      };
      sendNextMessage();
    }
    if (!args[0]) {
      message.channel.send(generateGame())
    } else if (args[0] == 'help') {
      let msembed = new discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("Minesweeper Help")
      .addField('Syntax',`${prefix}minesweeper <x> <y> <bombs> [StartUncovered?]`)
      .addField(`Arguments Descriptors`,"Here's what to put for custom boards")
      .addField('x', 'The horizontal board size', true)
      .addField('y', 'The vertical board size', true)
      .addField('bombs', 'Quantity of bombs to place on the board', true)
      .addField('StartUncovered?', `Set to true if you want to have all 0's unhidden from the start`, true)
      .addField('_ _',"Note: You can totally use &minesweeper on its own and it'll use default settings. You can also use &ms as a shortcut!")
      .setTimestamp()
      .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
      message.channel.send(msembed)
    } else if (args[0] && args[1] && args[2]) {
      message.channel.send(generateGame(args[0], args[1], args[2], message, args[3]))
    } else {
      message.channel.send(`Invalid command syntax, refer to &minesweeper help`).then(x => {x.delete({timeout:5000})})
    }
  }
}