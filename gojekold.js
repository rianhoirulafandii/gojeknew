const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
const delay = require('delay');
const readline = require("readline-sync");
var keyOtp = '110493U15e6ce6d84a90d493f6452f85c8661e3'

const genUniqueId = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

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

const functionGetNumber = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getNumber&api_key=110493U15e6ce6d84a90d493f6452f85c8661e3&service=ni&forward=0&owner=site&operator=telkomsel&country=6`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeCancel = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=setStatus&status=8&id=${idOrder}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetBalance = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getBalance`, { 
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
            const phoneNumber1 = nomor.slice(2)
            console.log("");
            const indoName = await generateIndoName();
            const { result } = indoName;
            const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
            const realName = `${result[0].firstname} ${result[0].lastname}`;
            const email = `${name}@eonohocn.com`;
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.white(`Register with number ${phoneNumber}`));
            const sessionId = uuidv4();
            const uniqueId = await genUniqueId(16);
            const sendOtpResult = await sendOtp(realName, email, sessionId, phoneNumber, uniqueId);

            if (sendOtpResult.success) {
                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Akun belum terdaftar `))
                for(var i = 0; i < 2; i++){
                    var done = await functionChangeCancel(idOrder)
                    }
                    
                } else if (sendOtpResult.errors[0].message === 'This email is already registered.'){
                    console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`${sendOtpResult.errors[0].message}`))
                    for(var i = 0; i < 2; i++){
                        var done = await functionChangeCancel(idOrder)
                        }
                    } else {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`${sendOtpResult.errors[0].message}`))
                        const text = `${phoneNumber1}`
                        const sendMessageResult = await functionsendMessage(text)
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