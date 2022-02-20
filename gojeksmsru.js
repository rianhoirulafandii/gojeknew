const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
const delay = require('delay');
const readline = require("readline-sync");
var keyOtp ='d2483A0cAAc0ff5fc79c42AAf57763Af'

const functionsendMessage = (text) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5104006090:AAE42D5lgDA715SaLOXfQEhm0M6PhFUS1V8/sendMessage?chat_id=783007104&text=${text}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

async function ip() {
    let fet = await fetch("https://httpbin.org/ip", {
        method: "GET",
        headers: {
            'Connection': 'keep-alive',
            'Accept': '/',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    }).then((res) => res.json()).then((response) => { return response.origin });
    return fet;
}

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const genUniqueId = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const functionGetNumber = () => new Promise((resolve, reject) => {
    fetch(`https://api.sms-activate.org/stubs/handler_api.php?action=getNumber&api_key=d2483A0cAAc0ff5fc79c42AAf57763Af&service=ni&country=6&forward=0&owner=site&operator=any`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetOtp = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://api.sms-activate.org/stubs/handler_api.php?action=getStatus&api_key=${keyOtp}&id=${idOrder}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeCancel = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://api.sms-activate.org/stubs/handler_api.php?action=setStatus&api_key=d2483A0cAAc0ff5fc79c42AAf57763Af&id=${idOrder}&status=8`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeConfirm = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://api.sms-activate.org/stubs/handler_api.php?action=setStatus&api_key=d2483A0cAAc0ff5fc79c42AAf57763Af&id=${idOrder}&status=6`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetBalance = () => new Promise((resolve, reject) => {
    fetch(`https://api.sms-activate.org/stubs/handler_api.php?action=getBalance&api_key=${keyOtp}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeStatus= (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://api.sms-activate.org/stubs/handler_api.php?action=setStatus&api_key=d2483A0cAAc0ff5fc79c42AAf57763Af&id=${idOrder}&status=3`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
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

const sendOtp = (name, email, sessionId, phoneNumber, uniqueId) => new Promise((resolve, reject) => {

    fetch('https://api.gojekapi.com/v5/customers', {
        method: 'POST',
        headers: {
            'X-Signature': '2002',
            'X-Signature-Time': moment().unix().toString(),
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.36.1',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60',
            'X-DeviceOS': 'Android,7.1.2',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'samsung',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'samsung,SM-N976N',
            'User-uuid': '',
            'Authorization': 'Bearer',
            'Accept-Language': 'id-null',
            'X-User-Locale': 'id_null',
            'X-Location': '0.0,0.0',
            'X-Location-Accuracy': '0.0',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627037',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '107',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: `{"email":"${email}","name":"${name}","phone":"+${phoneNumber}","signed_up_country":"ID"}`
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const veryfOtp = (otp, otpToken, sessionId, uniqueId) => new Promise((resolve, reject) => {

    fetch('https://api.gojekapi.com/v5/customers/phone/verify', {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.36.1',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60',
            'X-DeviceOS': 'Android,7.1.2',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'samsung',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'samsung,SM-N976N',
            'User-uuid': '',
            'Authorization': 'Bearer',
            'Accept-Language': 'id-null',
            'X-User-Locale': 'id_null',
            'X-Location': '0.0,0.0',
            'X-Location-Accuracy': '0.0',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627063',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '158',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: `{"client_name":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"otp":"${otp}","otp_token":"${otpToken}"}}`
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const requestGetNewJwt = (refreshToken, sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    fetch('https://goid.gojekapi.com/goid/token', {
        method: 'POST',
        headers: {
            'X-Signature': '2001',
            'X-Signature-Time': moment().unix().toString(),
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
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2001,14:1631633881',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '189',
            'Host': 'goid.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"refresh_token":"${refreshToken}"},"grant_type":"refresh_token","scopes":[]}`
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const firstSetPin = (sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    fetch('https://customer.gopayapi.com/v1/users/pin', {
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
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '0.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633940',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '16',
            'Host': 'customer.gopayapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: '{"pin":"080599"}'
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const secondSetPin = (otpCode2, sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    //console.log(otpCode2, sessionId, jwt, userId, uniqueId)
    fetch('https://customer.gopayapi.com/v1/users/pin', {
        method: 'POST',
        headers: {
            'otp': otpCode2,
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
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '0.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633963',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '16',
            'Host': 'customer.gopayapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: '{"pin":"080599"}'
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const redeemVoucher = (sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
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
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
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

const checkVoucher = (sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
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
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
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

(async () => {
while(true){
    try {
        do {
            var getBalance = await functionGetBalance()
        } while(!getBalance.includes('ACCESS_BALANCE'))
        
        const balance = getBalance.split(':')[1]
        if(balance >= 4){
           
            do{
                var getNumber = await functionGetNumber()
            } while(!getNumber.includes('ACCESS_NUMBER'))

            const idOrder = getNumber.split(':')[1]
            const nomor = getNumber.split(':')[2]
            const phoneNumber = nomor;
            console.log("");
            const indoName = await generateIndoName();
            const { result } = indoName;
            const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
            const realName = `${result[0].firstname} ${result[0].lastname}`;
            const email = `${name}@eonohocn.com`;
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`IP Address : ${await ip()}`));
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`Register with number ${phoneNumber}`));
            const sessionId = uuidv4();
            const uniqueId = await genUniqueId(16);
            const sendOtpResult = await sendOtp(realName, email, sessionId, phoneNumber, uniqueId);

            if (sendOtpResult.success) {
                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`${sendOtpResult.data.message}`))
                let loop = true;
                let otpCode12 = "";
                //console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`Mencoba mengambil otp.`));
                let otpCode1 = "";
                let batas = 0;
                while(loop){
                if(batas > 300){
                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(` Please use another number . . .`))
                    for(var i = 0; i < 2; i++){
                        var done = await functionChangeCancel(idOrder)
                        }   
                    loop = false;
                    break;
                    }
                    otpCode12 = await functionGetOtp(idOrder)
                    if (otpCode12.includes('STATUS_WAIT_CODE')){
                            batas++;
                        } else {
                            otpCode1 = otpCode12.split(":")[1]
                            for(var i = 0; i < 2; i++){
                                var done = await functionChangeStatus(idOrder)
                                }
                            loop = false;
                        }
                    }

                console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.white(` Your otp code ${otpCode1}`))
                const verifOtpResult = await veryfOtp(otpCode1, sendOtpResult.data.otp_token, sessionId, uniqueId);
                if (verifOtpResult.success) {
                    console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`Set up your PIN`));
                    await delay(10000)
                    const requestGetNewJwtResult = await requestGetNewJwt(verifOtpResult.data.refresh_token, sessionId, verifOtpResult.data.access_token, verifOtpResult.data.resource_owner_id.toString(), uniqueId);
                    const firstSetPinResult = await firstSetPin(sessionId, requestGetNewJwtResult.access_token, verifOtpResult.data.resource_owner_id.toString(), uniqueId);
                    if(firstSetPinResult.errors[0].code === 'GoPay-1603') {
                        let loop1 = true;
                        let otpCode123 = "";
                        //console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`Mencoba mengambil otp kedua.`));
                        let batas1 = 0;
                        while(loop1){
                            if(batas1 > 3000){
                                console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`Gagal Setpin. Silahkan coba ulang.`))
                                loop1 = false;
                                break;
                            }
                            otpCode123 = await functionGetOtp(idOrder)
                            if (otpCode123.includes('STATUS_WAIT_RETRY')){
                                batas1++;
                            } else {
                                otpCode2 = otpCode123.split(":")[1]
                                for(var i = 0; i < 2; i++){
                                    var done = await functionChangeStatus(idOrder)
                                }
                                loop1 = false;
                            }
                        }   

                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.white(` Your otp code for PIN ${otpCode2}`))
                        const secondSetPinResult = await secondSetPin(otpCode2, sessionId, requestGetNewJwtResult.access_token, verifOtpResult.data.resource_owner_id.toString(), uniqueId);
                        console.log(secondSetPinResult)
                        const redeemVoucherResult = await redeemVoucher(sessionId, requestGetNewJwtResult.access_token, verifOtpResult.data.resource_owner_id.toString(), uniqueId);
                        //console.log(redeemVoucherResult);
                        if(redeemVoucherResult.success === true) {
                            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`${redeemVoucherResult.data.message}`))
                            const text = `${phoneNumber} : ${redeemVoucherResult.data.message}`
                            const sendMessageResult = await functionsendMessage(text)
                        }else{
                            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`${redeemVoucherResult.errors[0].message}`))
                            const text = `${phoneNumber} : ${redeemVoucherResult.errors[0].message}`
                            const sendMessageResult = await functionsendMessage(text)
                        }
                        await delay(3000)
                        const checkVoucherResult = await checkVoucher(sessionId, requestGetNewJwtResult.access_token, verifOtpResult.data.resource_owner_id.toString(), uniqueId);
                        console.log(checkVoucherResult);
                        await delay(300000)
                        //readline.question(chalk.yellow(`[ ${moment().format("HH:mm:ss")} ] Press enter to continue . . .`));

                        }else{
                            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`${firstSetPinResult.errors[0].message}`))
                        }
                    }
                } else {
                    console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`${sendOtpResult.errors[0].message}`))
                }

            } else {
                console.log('You don\'t have enough money')
            }
        }catch(e){
            console.log(e)
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Failed...`));
            console.log('')
        }
}
})();
