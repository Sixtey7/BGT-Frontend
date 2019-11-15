import axios from 'axios';
import ArrayHelper from '../utils/ArrayHelper';

const PLAYER_URL = 'http://localhost:5000/players';

class PlayerModel {
    playerArray;
    _arrayHelper;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('standing up the Player Model!');
        this.playerArray = new Array();
        this._arrayHelper = new ArrayHelper(logger);

        axios
            .get(PLAYER_URL)
            .then(response => {
                this._logger.debug('Got the response: ' + JSON.stringify(response.data));

                this.playerArray = response.data;

                this._logger.debug('Player array is: ' + this.playerArray.length + ' items long');
            })
            .catch(err => {
                this._logger.error('Got an error attempting to read from the player backend: ' + err);
            })
    }


    async _putPlayer(playerToPut) {
        let playerJSON = JSON.stringify(playerToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: PLAYER_URL + playerToPut.id,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                playerJSON
        })
        .then(response => {
            this._logger.debug('got the response from the put: ' + response.data);
            returnVal = response.data;
        })
        .catch(err => {
            this._logger.error('got an error from attempting to put a player: ' + err);
        })

        return returnVal;
    }

    async _postPlayer(playerToPost) {
        // need to delete the empty id to prevent the backend from trying to use it
        delete playerToPost.id;
        let playerJSON = JSON.stringify(playerToPost);

        let returnVal = '';
        await axios({
            method: 'post',
            url: PLAYER_URL,
            headers: {
                'Content-type': 'application/json'
            },
            data: 
                playerJSON
        })
        .then(response => {
            this._logger.debug('got the response: ' + JSON.stringify(response.data));
            if (response.status === 200) {
                this._logger.debug('Successfully posted the player!');
                returnVal = response.data;
            }
            else {
                this._logger.warn('Got a negative status from posting the player: ' + response.status);
            }
        })
        .catch(err => {
            this._logger.error('Got an error attempting to post a Player: ' + err);
        })

        return returnVal;
    }

    async _deletePlayer(idToDelete) {
        this._logger.debug('Delete player with id: ' + idToDelete);

        let returnVal = false;
        await axios({
            method: 'DELETE',
            url: PLAYER_URL + idToDelete
        })
        .then(response => {
            if (response.status === 200) {
                returnVal = true;
            }
            else {
                this._logger.error('Failed to delete player with id: ' + idToDelete + ' got back status: ' + response.status);
            }
        })
        .catch(err => {
            this._logger.error('Got an error attempting to delete player with id: ' + idToDelete + ': ' + err);
        })

        return returnVal;
    }
}

export default PlayerModel;
