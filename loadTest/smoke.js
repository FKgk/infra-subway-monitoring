import { sleep } from 'k6';
import { getAuthHeaders} from './config.js';
import {checkMember, checkLine, checkStation, checkPath} from './functions.js';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function ()  {
    const authHeaders = getAuthHeaders();

    checkMember(authHeaders);
    checkLine(authHeaders);
    checkStation(authHeaders);
    checkPath(authHeaders);

    sleep(1);
};
