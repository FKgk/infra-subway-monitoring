import {sleep} from 'k6';
import {getAuthHeaders} from './config.js';
import {checkLine, checkStation, checkPath} from './functions.js';

export const options = {
    scenarios: {
        stress: {
            executor: "ramping-arrival-rate",
            preAllocatedVUs: 500,
            timeUnit: "1s",
            stages: [
                { duration: "2m", target: 100 }, // below normal load
                { duration: "5m", target: 200 },
                { duration: "2m", target: 300 }, // normal load
                { duration: "5m", target: 300 },
                { duration: "2m", target: 400 }, // around the breaking point
                { duration: "5m", target: 400 },
                { duration: "2m", target: 500 }, // beyond the breaking point
                { duration: "5m", target: 500 },
                { duration: "10m", target: 0 }, // scale down. Recovery stage.
            ],
        },
    },
};
export default () => {
    const authHeaders = getAuthHeaders();

    checkLine(authHeaders);
    checkStation(authHeaders);
    checkPath(authHeaders);

    sleep(1);
};
