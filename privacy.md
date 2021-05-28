## Privacy and Data Collection
Aqua doesn't collect any data except from the data you, as a user of the bot, give it.
Any data stored is only available to you as the user unless the feature used does otherwise. An example of this is !afk.
This stores a timestamp of when it was triggered and stores a reason string if provided. The string is publicly available to anyone who pings you in any server.
> It is up to you whether you use features like this which could expose confidential information if used incorrectly. 
> This goes for all commands that store data and expose data like this intensionally, so think before you hit send.

## Guild Data Collection
For guilds, preferences are the only data stored and are binded to your guild ID, said data can only be accessed from that guild. 

## User Data Collection
Aqua collect user-specific preferences set by the user, binded to the user's ID. Messages are also collected if the user's preferences and the guild's preferences allow message Sniping. More on this below.

## Chat Peeking
Aqua never permanently stores your messages. However, the sniping commands do store all  messages in memory. None of these messages are accessible outside the channel they're saved from. If ther bot restarts, these messages are permanently lost.
These commands can be disabled in any guild by admins for the entire guild, and users can disable logging of their own messages too for all guilds.

## Other things you should know
!queues saving still stores who added the song to the now saved queue. Other people can see your username if they load your Queue ID.
