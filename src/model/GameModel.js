import axios from 'axios'
import ArrayHelper from '../utils/ArrayHelper';

const GAME_URL = 'http://localhost:5000/games/';

class GameModel {
    gameArray;
    _arrayHelper;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('standing up the Game Model!');
        this.gameArray = new Array();
        this._arrayHelper = new ArrayHelper(logger);

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

    async saveGame(gameToSave) {
        //determine if this is an existing game or a new one
        if (gameToSave.id) {
            this._logger.debug('saving an edited game: ' + JSON.stringify(gameToSave));

            let returnVal = await this._putGame(gameToSave);

            if (returnVal) {
                this.gameArray = await this._arrayHelper.mergeItemIntoArray(gameToSave, this.gameArray)
            }
            else {
                this._logger.error('failed to put the game');
            }
        }
        else {
            this._logger.debug('adding a new game: ' + JSON.stringify(gameToSave));

            let returnVal = await this._postGame(gameToSave);

            if (returnVal) {
                gameToSave.id = returnVal.id;
                this.gameArray.push(gameToSave);
            }
            else {
                this._logger.error('failed to post game for: ' + JSON.stringify(gameToSave));
            }
        }
    }

    async deleteGame(idToDelete) {
        this._logger.debug('Deleting a game with id: ' + idToDelete);

        let returnVal = await this._deleteGame(idToDelete);

        if (returnVal) {
            this.gameArray = await this._arrayHelper.removeItemFromArray(idToDelete, this.gameArray);
        }
    }

    async _putGame(gameToPut) {
        let gameJSON = JSON.stringify(gameToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: GAME_URL + gameToPut.id,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                gameJSON
        })
        .then(response => {
            this._logger.debug('got the response from the put: ' + response.data);
            returnVal = response.data;
        })
        .catch(error => {
            this._logger.error('got the error from attempting to put a game: ' + error);

        });

        return returnVal;
    }

    async _postGame(gameToPost) {
        // need to delete the empty id to prevent the backend from trying to handle it
        delete gameToPost.id;
        let gameJSON = JSON.stringify(gameToPost);

        let returnVal = '';
        await axios({
            method: 'post',
            url: GAME_URL,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                gameJSON
        })
        .then(response => {
            this._logger.debug('Got the response: ' + JSON.stringify(response));
            if (response.status === 200) {
                this._logger.debug('Successfully posted the game!');
                returnVal = response.data;
            }
            else {
                this._logger.warn('got a negative status back from posting the game: ' + response.status);
            }
        })
        .catch(error => {
            this._logger.error('Got an error attempting to post the game: ' + error);
        });

        return returnVal;
    }

    async _deleteGame(idToDelete) {
        this._logger.debug('Deleting game with id: ' + idToDelete);

        let returnVal = false;
        await axios({
            method: 'DELETE',
            url: GAME_URL + idToDelete
        })
        .then(response => {
            this._logger.debug('Got a return value of ' + response.data);
            if (response.status === 200) {
                returnVal = true;
            }
            else {
                this._logger.error('Failed to delete game with id: ' + idToDelete + ' got the response: ' + response.data);
            }
        })
        .catch(error => {
            this._logger.error('Got an error attempting to delete game with id: ' + idToDelete + ' got the error: ' + error);
        });

        return returnVal;
    }
}

export default GameModel;