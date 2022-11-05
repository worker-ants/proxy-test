# proxy-test
squid forward proxy 테스트

## 설치 및 설정
### node package
```shell
npm install
```

### squid SSL 인증서 생성
```shell
cd ./volume/squid/ssl/
openssl req -new -newkey rsa:2048 -sha256 -days 365 -nodes -x509 -extensions v3_ca -keyout ./volume/squid/ssl/proxyCA.pem -out ./volume/squid/ssl/proxyCA.pem
openssl x509 -in ./volume/squid/ssl/proxyCA.pem -outform DER -out ./volume/squid/ssl/proxyCA.der
```

## 실행
```shell
docker-compose up
```

* app: http/https 테스트 요청
* squid: forward proxy
* dummy-server: squid를 통한 요청의 헤더 확인용