import axios from 'axios'

const SESSION_URL = 'http://localhost:5000/sessions/';

class SessionModel {
    sessionArray;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('standing up the Session Model!');
        this.sessionarray = new Array();

        axios
            .get(SESSION_URL)
            .then(response => {
                this._logger.debug('Got the response: ' + JSON.stringify(response.data));

                this.sessionArray = response.data

                this._logger.debug("Session array is " + this.sessionArray.length + " elements long")
            })
            .catch(err => {
                this._logger.error('Got an error attempting to read from the backend: ' + err)
            });
        
    }
}

export default SessionModel;