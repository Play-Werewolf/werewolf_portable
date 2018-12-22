const Room = require('colyseus').Room;
const Player = require('../player').Player;

module.exports = class TownRoom extends Room {
        
    onInit () {
        this.maxClients = 16;
        this.blockSameUser = false;
        this.timeout = 15;

        this.setState({
            currentTurn: null,
            players: [],
            idList: [],
        })
    }

    requestJoin(opts, isNew){
        console.log('a client joined', opts);
        return true;
        if(isNew)
        {
            return true;
        }

        //check if room allows same user to log in twice
        if(!this.blockSameUser)
        {
            return true;
        }
        
         //check if the optional args contains nickname and id
        if(!('NickName' in opts) || !('ID' in opts))
        {
            return false;
        }

        //check if client is already connected
        for(i = 0; i < Object.keys(this.state.players).length; i ++)
        {
            if(opts.ID === this.state.idList[i])
            {
                return false;
            }
        }
        
        //check if the user is already in the players list
        return !this.players.includes(opts.NickName);

    }

    onJoin (client) {
        console.log('a client joined', client);
        //sets the player object in the array
        client.playerIndex = Object.keys(this.state.players).length;
        this.state.players[ client.playerIndex ] = new Player(client.NickName, client.playerIndex);
        this.state.idList[client.playerIndex] = client.id;

        if (this.state.players.length == this.maxClients) {
            //start a time to do a random move.
            this.chooseRandomTimeout = this.clock.setTimeout(this.chooseRandom.bind(this, client), this.timeout * 1000);

            // lock this room for new users
            this.lock();

            this.GameStart();
        }
    }

    onLeave (client){
        delete this.state.players[ client.playerIndex ];
        for(i = 0; i < Object.keys(this.state.players).length; i ++)
        {
            if(client.playerIndex === this.state.players[i].id)
            {
                this.state.players.splice(i,1);
                this.state.idList.splice(i,1);
            }
        }
        this.CheckWin();
    }

    GameStart(){
        //implement later with this.send(client, { message: "Hello world!" });
    }

    CheckWin(){
        winningside = this.state.players[0].side;
        for(i = 0; i < Object.keys(this.state.players).length; i ++)
        {
            if(this.state.players[i].side != winningside)
            {
                return false;
            }
        }
        WinScreen(winningside);
        return true;
    }

    Winscreen(wside){
        //implement later.
    }
}
