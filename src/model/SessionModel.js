import axios from 'axios'
import ArrayHelper from '../utils/ArrayHelper';

const SESSION_URL = 'http://localhost:5000/sessions/';

class SessionModel {
    sessionArray;
    _arrayHelper;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('standing up the Session Model!');
        this.sessionarray = new Array();
        this._arrayHelper = new ArrayHelper(logger);

        axios
            .get(SESSION_URL)
            .then(response => {
                this._logger.debug('Got the response: ' + JSON.stringify(response.data));

                this.sessionArray = response.data
                this._massageSessions();

                this._logger.debug("Session array is " + this.sessionArray.length + " elements long")
            })
            .catch(err => {
                this._logger.error('Got an error attempting to read from the backend: ' + err)
            });
        
    }
    async saveSession(sessionToSave) {
        //determine if this is an existing session or a new one
        if (sessionToSave.id) {
            this._logger.debug('saving an edited session: ' + JSON.stringify(sessionToSave));

            let returnVal = await this._putSession(sessionToSave);

            if (returnVal) {
                this.sessionArray = await this._arrayHelper.mergeItemIntoArray(sessionToSave, this.sessionArray)
            }
            else {
                this._logger.error('failed to put the session');
            }
        }
        else {
            this._logger.debug('adding a new session: ' + JSON.stringify(sessionToSave));

            let returnVal = await this._postSession(sessionToSave);

            if (returnVal) {
                sessionToSave.id = returnVal.id;
                this.sessionArray.push(sessionToSave);
            }
            else {
                this._logger.error('failed to post session for: ' + JSON.stringify(sessionToSave));
            }
        }
    }

    async deleteSession(idToDelete) {
        this._logger.debug('Deleting a session with id: ' + idToDelete);

        let returnVal = await this._deleteSession(idToDelete);

        if (returnVal) {
            this.sessionArray = await this._arrayHelper.removeItemFromArray(idToDelete, this.sessionArray);
        }
    }

    async _putSession(sessionToPut) {
        let sessionJSON = JSON.stringify(sessionToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: SESSION_URL + sessionToPut.id,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                sessionJSON
        })
        .then(response => {
            this._logger.debug('got the response from the put: ' + response.data);
            returnVal = response.data;
        })
        .catch(error => {
            this._logger.error('got the error from attempting to put a session: ' + error);

        });

        return returnVal;
    }

    async _postSession(sessionToPost) {
        // need to delete the empty id to prevent the backend from trying to handle it
        delete sessionToPost.id;
        let sessionJSON = JSON.stringify(sessionToPost);

        let returnVal = '';
        await axios({
            method: 'post',
            url: SESSION_URL,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                sessionJSON
        })
        .then(response => {
            this._logger.debug('Got the response: ' + JSON.stringify(response));
            if (response.status === 200) {
                this._logger.debug('Successfully posted the session!');
                returnVal = response.data;
            }
            else {
                this._logger.warn('got a negative status back from posting the session: ' + response.status);
            }
        })
        .catch(error => {
            this._logger.error('Got an error attempting to post the session: ' + error);
        });

        return returnVal;
    }

    async _deleteSession(idToDelete) {
        this._logger.debug('Deleting session with id: ' + idToDelete);

        let returnVal = false;
        await axios({
            method: 'DELETE',
            url: SESSION_URL + idToDelete
        })
        .then(response => {
            this._logger.debug('Got a return value of ' + response.data);
            if (response.status === 200) {
                returnVal = true;
            }
            else {
                this._logger.error('Failed to delete session with id: ' + idToDelete + ' got the response: ' + response.data);
            }
        })
        .catch(error => {
            this._logger.error('Got an error attempting to delete session with id: ' + idToDelete + ' got the error: ' + error);
        });

        return returnVal;
    }

    _massageSessions() {
        this.sessionArray.forEach(sessionObj => {
            sessionObj.date = new Date(sessionObj.date);
        });
    }
}

export default SessionModel;