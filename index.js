import axios from 'axios';

const endpoint = 'http://www.google.co.kr/';
const proxyConfig = {
    //protocol: 'https',
    host: 'squid',
    port: 3128,
    /*
    auth: {
        username: null,
        password: null
    }
     */
};

async function delay(ms) {
    return new Promise((resolve) => {
       setTimeout(() => {
           resolve();
       }, ms);
    });
}

(async () => {
    while (Infinity) {
        try {
            const response = await axios.get(endpoint, {
                //proxy: proxyConfig,
            });
            const {status} = response;

            console.log(`response status: ${status} - ${endpoint}`);
        } catch (e) {
            console.error(e.message);
        }

        await delay(1000);
    }
})();