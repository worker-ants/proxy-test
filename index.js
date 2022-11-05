import https from'https';
import axios from 'axios';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// set PROXY
process.env.http_proxy = process.env.APP_HTTP_PROXY ?? process.env.http_proxy ?? process.env.HTTP_PROXY;
process.env.https_proxy = process.env.APP_HTTPS_PROXY ?? process.env.https_proxy ?? process.env.HTTPS_PROXY;

// exec once
const execOnce = String(process.env.EXEC_ONCE ?? 'FALSE').toUpperCase() === 'TRUE';

const client = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    proxy: undefined, //proxyConfig
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    },
});

const endpoints = [
    'http://www.google.co.kr/',
    'https://www.google.co.kr/',
    'https://www.naver.com/',
    'https://www.happytalk.io/',
    'https://happytalk.io/auth/login',
    'http://dummy-server',
];

async function delay(ms) {
    return new Promise((resolve) => {
       setTimeout(() => {
           resolve();
       }, ms);
    });
}

async function request(endpoint) {
    try {
        const response = await client.get(endpoint);
        const {status} = response;

        console.log(`response status: ${status} - ${endpoint}`);
    } catch (e) {
        console.error(`error: ${e.message} - ${endpoint}`);
    }
}

(async () => {
    while (Infinity) {
        const promises = endpoints.map(request);

        await Promise.allSettled(promises);
        if (execOnce) return;

        await delay(1000);
    }
})();