import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { getAuthHeaders }  from 'config';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function ()  {
    let authHeaders = getAuthHeaders();

    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

    sleep(1);
};
