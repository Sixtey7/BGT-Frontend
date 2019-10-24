import axios from 'axios'

const GAME_URL = 'http://localhost:5000/games/';

class GameModel {
    gameArray;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('standing up the Game Model!');
        this.gameArray = new Array();

        axios
            .get(GAME_URL)
            .then(response => {
                this._logger.debug('Got the response: ' + JSON.stringify(response.data));

                this.gameArray = response.data

                this._logger.debug("Game array is " + this.gameArray.length + " elements long")
            })
            .catch(err => {
                this._logger.error('Got an error attempting to read from the backend: ' + err)
            });
        
    }
}

export default GameModel;