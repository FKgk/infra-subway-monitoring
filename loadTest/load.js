import {sleep} from 'k6';
import {getAuthHeaders} from './config.js';
import {checkLine, checkStation, checkPath} from './functions.js';

export const options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '1m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


export default () => {
    const authHeaders = getAuthHeaders();

    checkLine(authHeaders);
    checkStation(authHeaders);
    checkPath(authHeaders);

    sleep(1);
};
