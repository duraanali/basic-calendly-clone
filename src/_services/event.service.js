import { BehaviorSubject } from 'rxjs';
import { fetchWrapper, history } from '../_helpers/index';

const apiUrl = 'http://localhost:4000';
const eventSubject = new BehaviorSubject(null);
const baseUrl = `${apiUrl}/events`;

const eventService = {
    refreshToken,
    logout,
    create,
    getAll,
    getById,
    update,
    _delete,
    event: eventSubject.asObservable(),
    get eventValue () { return eventSubject.value }
};

export default eventService;

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    eventSubject.next(null);
    history.push('/account/login');
}



function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(event => {
            // publish event to subscribers and start timer to refresh token
            
            eventSubject.next(event);
            startRefreshTokenTimer();
            return event;
        }); 
}


function getAll() {
  
    return fetchWrapper.get(baseUrl);

}


function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(event => {
            // update stored event if the logged in event updated their own record
            if (event.id === eventSubject.value.id) {
                // publish updated event to subscribers
                event = { ...eventSubject.value, ...event };
                eventSubject.next(event);
            }
            return event;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {

            
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(eventSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
