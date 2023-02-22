import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from './config.js';

// 1 ~ 9 호선에 해당하는 라인 목록
const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 24, 29, 48, 49, 50, 54, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 118, 119, 122, 123, 124, 125, 126, 127, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 142, 143, 144, 145, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 166, 167, 168, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 189, 190, 191, 192, 193, 194, 197, 198, 200, 201, 202, 203, 204, 205, 206, 207, 211, 212, 213, 214, 215, 216, 217, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 247, 248, 249, 250, 251, 252, 253, 256, 257, 258, 260, 261, 262, 263, 265, 267, 268, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 289, 290, 291, 293, 329, 334, 335, 336, 337, 339, 341, 342, 343, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 357, 359, 360, 361, 363, 364, 365, 366, 368, 369, 371, 372, 374, 375, 376, 378, 379, 380, 381, 382, 383, 384, 386, 387, 389, 390, 392, 393, 395, 396, 397, 398, 399, 400, 401, 403, 404, 406, 407, 408, 409, 411, 412, 415, 416, 417, 418, 419, 420, 421, 422, 424, 425, 426, 427, 428, 429, 431, 433, 436, 437, 438]

export function checkLogin(payload){
    // 로그인 토근 가져오기
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes;
}

export function checkMember(authHeaders){
    // 정상 인증 여부 확인
    let memberRes = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(memberRes, { 'retrieved member': (obj) => obj.status !== 200 });

    return memberRes
}

export function checkStation(authHeaders){
    // 지하철 호선 목록 확인
    const minStationCount = 23;

    let stationRes = http.get(`${BASE_URL}/stations`, authHeaders).json();
    check(stationRes, { 'retrieved stations': (obj) => obj.json().length >= minStationCount });

    return stationRes
}

export function checkLine(authHeaders){
    // 지하철 역 목록 확인
    const minLineCount = 616;

    let lineRes = http.get(`${BASE_URL}/lines`, authHeaders).json();
    check(lineRes, { 'retrieved lines': (obj) => obj.json().length >= minLineCount });

    return lineRes
}

export function checkPath(authHeaders){
    // 경로 조회 확인

    const source = lines[Math.floor(Math.random() * lines.length)];
    const target = lines[Math.floor(Math.random() * lines.length)];

    let pathRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`, authHeaders).json();
    check(pathRes, { 'search path': (obj) => obj.json('stations').length > 0 });

    return pathRes
}


