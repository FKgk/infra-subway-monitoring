import http from 'k6/http';
import {check} from 'k6';


export const BASE_URL = 'https://sample-subway.o-r.kr';
const USERNAME = 'test@test.ccom';
const PASSWORD = 'test';


export function getAuthHeaders(){
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
};
