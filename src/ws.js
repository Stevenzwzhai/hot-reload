import { websocketClient } from 'websocket'

const client = new websocketClient();

export default () => {
    client.on("connectFailed", error => console.log(`Connect Error ${error.toString()}`))
        client.on("connect", connection => {
            console.log("connected");
            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString());
            });
            connection.on('close', function() {
                console.log('echo-protocol Connection Closed');
            });
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    console.log("Received: '" + message.utf8Data + "'");
                }
            });
            
            function sendNumber() {
                if (connection.connected) {
                    var number = Math.round(Math.random() * 0xFFFFFF);
                    connection.sendUTF(number.toString());
                    setTimeout(sendNumber, 1000);
                }
            }
            sendNumber();
        })
        client.connect('ws://localhost:8988', 'echo-protocol');
}       
        