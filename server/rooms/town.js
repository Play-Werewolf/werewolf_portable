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
        })
    }

    requestJoin(opts){
        //check if room allows same user to log in twice
        if(!this.blockSameUser)
        {
            return true;
        }
        
        //check if the optional args contains nickname
        if(!('NickName' in opts))
        {
            return false;
        }
        
        //check if the user is already in the players list
        return !this.players.includes(opts.NickName);

    }

    onJoin (client) {
        //sets the player object in the array
        client.playerIndex = Object.keys(this.state.players).length;
        this.state.players[ client.playerIndex ] = new Player(client.NickName, client.playerIndex);

        if (this.clients.length == this.maxClients) {
            //start a time to do a random move.
            this.chooseRandomTimeout = this.clock.setTimeout(this.chooseRandom.bind(this, client), this.timeout * 1000);

            // lock this room for new users
            this.lock();

            this.GameStart();
        }
    }

    onLeave (client){
        new_players = [];
        j = 0;
        for(i = 0; i < Object.keys(this.state.players).length; i ++)
        {
            j++;
            if(client.playerIndex === this.state.players[i].id)
            {
                j--;
            }
            else
            {
                new_players[j] = this.state.players[i];
            }
        }
        this.state.players = new_players;
        this.CheckWin();
    }

    GameStart(){
        
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
