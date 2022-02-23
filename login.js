const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
const delay = require('delay');
const readline = require("readline-sync");
var keyOtp ='e3e9759cc0655ebAc6c54e1203e49536'

const genUniqueId = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const generateIndoName = () => new Promise((resolve, reject) => {
    fetch('https://swappery.site/data.php?qty=1', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const sendOtp = (sessionId, uniqueId, phoneNumber) => new Promise((resolve, reject) => {
    const boday = {"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","country_code":"+62","phone_number":`${phoneNumber}`}
    fetch('https://goid.gojekapi.com/goid/login/request', {
        method: 'POST',
        headers: {
            'Host': 'goid.gojekapi.com',
            'X-Signature': 'pyNt5Dd1Ydg6+mgqx3tKyVzLkMIrYQxZAG+yHpY9I/Z/A6ca/IlYupr5vUKcuHR4o2zyNwiEU5zvQAnZhzrurdhTcvcYpQpC1IDwHa0IcF5R7bDSU5wx3J5F2mpJLwtFQF8Bcsy9An0C+q3xQ2sP01jxTQR3WkLb6rJeuSb+cajnlaKjGKTLMz0iqeklOZh27Lgwad0dPXuv8A7eg96l1WUAeglOcbu9TtssTZ/pekDOmV5dK/vOEA8QRFsbfSk7mm63ROEokPBZnDRMti154NFfULjEjTnniPy6Cutg3qnqNC9o5R2rRLxcH2NWWpMRr1EX5YDkTYZ2AmLpGjHS/g==',
            'X-Signature-Time': moment().unix().toString(),
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.38.0',
            'X-AppId': 'com.gojek.app',
            'D1': '17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60',
            'Authorization': 'Bearer',
            'X-User-Type': 'customer',
            'X-DeviceOS': 'Android,10',
            'User-uuid': '',
            'X-DeviceToken': '',
            'X-PhoneMake': 'Apple',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'i?hone,12 ?ro ?ax',
            'Accept-Language': 'id-null',
            'X-User-Locale': 'id_null',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627037',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '189',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: JSON.stringify(boday)
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const veryfOtp = (otpCode1, otpToken, sessionId, uniqueId) => new Promise((resolve, reject) => {
    const boday = {"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"otp":`${otpCode1}`,"otp_token":`${otpToken}`},"grant_type":"otp"}
    fetch('https://goid.gojekapi.com/goid/token', {
        method: 'POST',
        headers: {
            'Host': 'goid.gojekapi.com',
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.38.0',
            'X-AppId': 'com.gojek.app',
            'D1': '17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60',
            'Authorization': 'Bearer',
            'X-User-Type': 'customer',
            'X-DeviceOS': 'Android,10',
            'User-uuid': '',
            'X-DeviceToken': '',
            'X-PhoneMake': 'Apple',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'i?hone,12 ?ro ?ax',
            'Accept-Language': 'id-null',
            'X-User-Locale': 'id_null',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627037',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '187',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: JSON.stringify(boday)
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const getData = (bearerToken, sessionId, uniqueId) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/gojek/v2/customer', {
        method: 'GET',
        headers: {
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AppVersion': '4.36.1',
            'X-AppId': 'com.gojek.app',
            'X-Session-ID': sessionId,
            'D1': '63:6C:5D:AB:64:50:4E:89:23:C1:1B:57:A4:C2:25:49:1B:4A:18:52:F9:FF:83:58:68:53:DF:E6:15:9B:20:BE',
            'X-DeviceOS': 'Android,7.1.2',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'Iphone',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Pro Max,IP-ProMax2',
            'User-uuid': '',
            'Authorization': `Bearer ${bearerToken}`,
            'Accept-Language': 'id-null',
            'X-User-Locale': 'id_null',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1645640018626-4612021475609230108,4:120026,5:msm8998|2465|4,6:08:00:27:CB:97:33,7:d2q86b1f322899d477e,8:720x1280,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2001,14:1645640183',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13',
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .then(err => {
        reject(err)
    })
});

const getSaldo = (bearerToken, userID, sessionId, uniqueId) => new Promise((resolve, reject) => {
    fetch('https://customer.gopayapi.com/v1/payment-options/balances', {
        method: 'GET',
        headers: {
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AppVersion': '4.36.1',
            'X-AppId': 'com.gojek.app',
            'X-Session-ID': sessionId,
            'D1': '63:6C:5D:AB:64:50:4E:89:23:C1:1B:57:A4:C2:25:49:1B:4A:18:52:F9:FF:83:58:68:53:DF:E6:15:9B:20:BE',
            'X-DeviceOS': 'Android,7.1.2',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'Iphone',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Pro Max,IP-ProMax2',
            'User-uuid': userID,
            'Authorization': `Bearer ${bearerToken}`,
            'Accept-Language': 'id-null',
            'X-User-Locale': 'id_null',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1645640018626-4612021475609230108,4:120026,5:msm8998|2465|4,6:08:00:27:CB:97:33,7:d2q86b1f322899d477e,8:720x1280,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2001,14:1645640183',
            'Host': 'customer.gopayapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13',
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .then(err => {
        reject(err)
    })
});

const checkVoucher = (sessionId, bearerToken, userID, uniqueId) => new Promise((resolve, reject) => {
    //console.log(sessionId, jwt, userId, uniqueId)
    fetch('https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=200&page=1', {
        method: 'GET',
        headers: {
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '9A:C9:4F:37:14:82:43:AC:08:0E:69:64:80:70:69:F7:08:A5:AF:FC:A2:EA:20:1C:F8:3C:FE:6E:A1:6E:C3:CB',
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.36.1',
            'X-AppId': 'com.gojek.app',
            'X-DeviceOS': 'Android,7.1.2',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'samsung',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'samsung,SM-N976N',
            'User-uuid': userID,
            'Authorization': `Bearer ${bearerToken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '1.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633963',
            'Content-Type': 'application/json; charset=UTF-8',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13',
            'If-Modified-Since': 'Sat, 19 Feb 2022 14:20:12 GMT'
        },
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const redeemVoucher = (sessionId, bearerToken, userID, uniqueId) => new Promise((resolve, reject) => {
    //console.log(otpCode2, sessionId, jwt, userId, uniqueId)
    fetch('https://api.gojekapi.com/go-promotions/v1/promotions/enrollments', {
        method: 'POST',
        headers: {
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '9A:C9:4F:37:14:82:43:AC:08:0E:69:64:80:70:69:F7:08:A5:AF:FC:A2:EA:20:1C:F8:3C:FE:6E:A1:6E:C3:CB',
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.36.1',
            'X-AppId': 'com.gojek.app',
            'X-DeviceOS': 'Android,7.1.2',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'samsung',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'samsung,SM-N976N',
            'User-uuid': userID,
            'Authorization': `Bearer ${bearerToken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '1.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633963',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '27',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: '{"promo_code":"GOJEKINAJA"}'
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

(async () => {

    const sessionId = uuidv4();
    const uniqueId = await genUniqueId(16);
    const phoneNumber1 = readline.question(chalk.white(`[ ${moment().format("HH:mm:ss")} ] Enter the number you want to login : 62`));
    const phoneNumber = `${phoneNumber1}`
    const sendOtpResult = await sendOtp(sessionId, uniqueId, phoneNumber);
    const otpToken = sendOtpResult.data.otp_token
    const otpCode1 = readline.question(chalk.white(`[ ${moment().format("HH:mm:ss")} ] Enter the verification code : `));
    const verifOtpResult = await veryfOtp(otpCode1, otpToken, sessionId, uniqueId);
    await delay(1000)
    const bearerToken = verifOtpResult.access_token
    const getDataResult = await getData(bearerToken, sessionId, uniqueId);
    const userID = getDataResult.customer.id.toString()
    const created = getDataResult.customer.created_at
    const getSaldoResult = await getSaldo(bearerToken, userID, sessionId, uniqueId);
    const saldo = getSaldoResult.data[0].balance.display_value
    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.white(`Gopay Balance : ${saldo}`))
    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.white(`Account created at : ${created}`))
    await delay(1000)
    const checkVoucherResult = await checkVoucher(sessionId, bearerToken, userID, uniqueId);
    //console.log(checkVoucherResult);
    const jumlahvoucher = checkVoucherResult.voucher_stats.total_vouchers
    if(jumlahvoucher === 0){
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`You don't have any voucher yet.`))
    }else{
        const isivoucher = checkVoucherResult.data.map(datas => {
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`[-] ${datas.title} Exp: ${datas.expiry_date}`))
        })
    }
    await delay(1000)
    const redeemVoucherResult = await redeemVoucher(sessionId, bearerToken, userID, uniqueId);
    if(redeemVoucherResult.success === true) {
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`${redeemVoucherResult.data.message}`))
    }else{
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`${redeemVoucherResult.errors[0].message}`))
    }
})();