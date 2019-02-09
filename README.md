# Taekwondo

This is an angular application that helps keep score of a Taekwondo match

## How it Works
1. On initialization the electron app spawns a child process that runs a local server connected to a MongoDB instance
(I know it's an overkill but I needed to learn)
2. The electron app also switches on a wifi  hotspot for the client devices to connect
3. Clint devices automatically scan an connect to our server
4. Information is streamed to the server and relayed to the user Via an angualr implementation on top of electron

##Prerequisites
1. Installation of MongoDB (Since I cant bundle it)
 
