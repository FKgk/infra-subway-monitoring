import {checkLogin} from "./functions";


export const BASE_URL = 'https://sample-subway.o-r.kr';
const USERNAME = 'test@test.ccom';
const PASSWORD = 'test';


export function getAuthHeaders(){
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = checkLogin(payload);

    return {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
};
