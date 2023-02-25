import {sleep} from 'k6';
import {getAuthHeaders} from './config.js';
import {checkLine, checkStation, checkPath} from './functions.js';

export const options = {
    stages: [
        { duration: "2m", target: 100 }, // below normal load
        { duration: "5m", target: 200 },
        { duration: "2m", target: 300 }, // normal load
        { duration: "5m", target: 300 },
        { duration: "2m", target: 400 }, // around the breaking point
        { duration: "5m", target: 400 },
        { duration: "2m", target: 500 }, // beyond the breaking point
        { duration: "5m", target: 500 },
        { duration: "2m", target: 0 }, // scale down. Recovery stage.
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
