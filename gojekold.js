const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const delay = require('delay');
const readline = require("readline-sync");

let pilih = readline.question(chalk.white(`\n[-] Please choose your apikey : `));
//const operator = readline.question(chalk.white(`[-] Please choose your operator : `));
//const operator = 'axis'
const operator = 'telkomsel'

let file = fs.readFileSync('accountsmshub.txt', 'utf8')                    
             .replace(/\r\n|\r|\n/g, " ")
             .split(" ");
let data = file[`${pilih}`]
let keyOtp = data.split("-----")[1]
//console.log(keyOtp)
//let email1 = data.split("|")[1]


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

const functionsendotpMessage = (text1) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5104006090:AAE42D5lgDA715SaLOXfQEhm0M6PhFUS1V8/sendMessage?chat_id=783007104&text=${text1}`, {
    method: 'POST',
    })
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

const functionGetNumber = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getNumber&service=ni&forward=0&owner=site&operator=${operator}&country=6`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetOtp = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getStatus&id=${idOrder}`, { 
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

const functionChangeStatus= (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=setStatus&status=3&id=${idOrder}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeConfirm = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=setStatus&status=6&id=${idOrder}`, { 
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
try {
    var email1 = data.split("-----")[2]

    do{
        var getBalance = await functionGetBalance()
        //console.log(getBalance)
    }while(!getBalance.includes('ACCESS_BALANCE'))

    const balance = getBalance.split(':')[1]

    if(balance >= 3.6){
        while(true){
            let lop = true; 
            while(lop){
            do{
                do{
                    var getBalance1 = await functionGetBalance()
                }while(!getBalance1.includes('ACCESS_BALANCE'))

                const balance1 = getBalance1.split(':')[1]
                var getNumber = await functionGetNumber()
                if(getNumber.includes('BANNED')){
                    //console.log(`\n[-]`, chalk.white(`Email : ${email1}`));
                    console.log(`[-]`, chalk.red(`Balance : ${balance1} - ${getNumber}`));
                    return false
                }else if(getNumber.includes('NO_NUMBERS')){
                    //console.log(`\n[-]`, chalk.white(`Email : ${email1}`));
                    console.log(`[-]`, chalk.red(`Balance : ${balance1} - ${getNumber}`));
                    await delay(5000)
                }
            }while(!getNumber.includes('ACCESS_NUMBER'))

            do {
                var getBalance1 = await functionGetBalance()
            }while(!getBalance1.includes('ACCESS_BALANCE'))

            const balance1 = getBalance1.split(':')[1]
            const idOrder = getNumber.split(':')[1]
            const nomor = getNumber.split(':')[2]
            const phoneNumber = nomor;
            const phoneNumber1 = nomor.slice(2)
            const phoneNumber2 = nomor.slice(9)
            const indoName = await generateIndoName();
            const { result } = indoName;
            const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
            const realName = `${result[0].firstname} ${result[0].lastname}`;
            const rand = await randstr(2)
            const email = `${name}${rand}@eonohocn.com`;
            const sessionId = uuidv4();
            const uniqueId = await genUniqueId(16);
            const sendOtpResult = await sendOtp(realName, email, sessionId, phoneNumber, uniqueId);

            if(sendOtpResult.success) {
                console.log(`\n[-]`, chalk.red(`Balance : ${balance1} - ${phoneNumber}`));
                for(var i = 0; i < 2; i++){
                    var done = await functionChangeCancel(idOrder)
                }
            }else if(sendOtpResult.errors[0].message === 'This email is already registered.'){
                console.log(`\n[-]`, chalk.red(`Balance : ${balance1} - ${phoneNumber}`));
                for(var i = 0; i < 2; i++){
                    var done = await functionChangeCancel(idOrder)
                }
            }else{
                console.log(`\n[-]`, chalk.green(`Balance : ${balance1} - ${phoneNumber}`));
                const text = `${phoneNumber1}`
                const sendMessageResult = await functionsendMessage(text)
                console.log(`[-]`, chalk.white(`Trying to get a verification code`))
                let loop = true;
                let otpCode12 = "";
                let otpCode1 = "";
                let batas = 0;

                while(loop){
                    otpCode12 = await functionGetOtp(idOrder)
                    if(otpCode12.includes('STATUS_WAIT_CODE')){
                        batas++;
                    }else{
                        otpCode1 = otpCode12.split(":")[1]
                        for(var i = 0; i < 2; i++){
                            var done = await functionChangeStatus(idOrder)
                        }
                        loop = false;
                    }
                }

                console.log(`[-] Your verification code :`, chalk.green(`${otpCode1}`))
                console.log(chalk.green(`${otpCode1}`))
                const text1 = `${phoneNumber1} : ${otpCode1}`
                const sendMessageotpResult = await functionsendotpMessage(text1)

                const resend = readline.question(`[-] Resend the otp (y/n) : `);

                if (resend === 'y' || resend === "1"){
                    console.log(chalk.white(` -----`))
                    console.log(`[-]`, chalk.white(`Trying to get a second verification code`))
                    let loop1 = true;
                    let otpCode123 = "";
                    let batas1 = 0;
                    let secondResend = "";

                    while(loop1){
                        if(batas1 > 300){
                            console.log(`[-]`, chalk.red(`Gagal. Silahkan coba ulang.`))
                            for(var i = 0; i < 2; i++){
                                var done = await functionChangeCancel(idOrder)
                            }
                            loop1 = false;
                            lop = false;
                        }
                        otpCode123 = await functionGetOtp(idOrder)
                        if(otpCode123.includes('STATUS_WAIT_CODE')){
                            batas1++;
                        }else{
                            otpCode2 = otpCode123.split(":")[1]
                            if(otpCode2.includes('Bukan kamu?')){
                                otpCode22 = otpCode2.split("?")[0];
                                //console.log(`[-]`, chalk.green(`Your second verification code ${otpCode22}`))
                                secondResend = 'y'
                            }else{
                                const text1 = `${phoneNumber1} : ${otpCode2}`
                                const sendMessageotpResult = await functionsendotpMessage(text1)
                                console.log(`[-] Your second verification code :`, chalk.green(`${otpCode2}`))
                                console.log(chalk.green(`${otpCode2}`))
                                //await fs.appendFileSync("accountgojekinaja.txt", `8980${phoneNumber1}\n`, "utf-8");
                                readline.question(chalk.yellow(`[-] Press enter to continue . . .`));
                                secondResend = 'n';
                            }
                            for(var i = 0; i < 2; i++){
                                var done = await functionChangeStatus(idOrder)
                            }
                            loop1 = false;
                        }
                    }   

                    //const secondResend = readline.question(`[-] Resend the second otp again (y/n) : `);

                    if (secondResend === 'y' || secondResend === "Y"){
                        //console.log(`[-]`, chalk.white(`Trying to get a third verification code`))
                        let loop1 = true;
                        let otpCode123 = "";
                        let batas1 = 0;

                        while(loop1){
                            if(batas1 > 300){
                                console.log(`[-]`, chalk.red(`Gagal. Silahkan coba ulang.`))
                                for(var i = 0; i < 2; i++){
                                    var done = await functionChangeCancel(idOrder)
                                }
                                loop1 = false;
                                lop = false;
                            }
                            otpCode123 = await functionGetOtp(idOrder)
                            if(otpCode123.includes('STATUS_WAIT_CODE')){
                                batas1++;
                            }else{
                                otpCode3 = otpCode123.split(":")[1]
                                for(var i = 0; i < 2; i++){
                                    var done = await functionChangeStatus(idOrder)
                                }
                                loop1 = false;
                            }
                        }   
        
                        console.log(`[-] Your second verification code :`, chalk.green(`${otpCode3}`))
                        //await fs.appendFileSync("accountgojekinaja.txt", `8980${phoneNumber1}\n`, "utf-8");
                        
                        const text1 = `${phoneNumber1} : ${otpCode3}`
                        const sendMessageotpResult = await functionsendotpMessage(text1)
                        for(var i = 0; i < 2; i++){
                            var done = await functionChangeConfirm(idOrder)
                        }
                                
                        readline.question(chalk.yellow(`Next`));

                    }else{
                        console.log(chalk.white(`Next`))
                        for(var i = 0; i < 2; i++){
                            var done = await functionChangeConfirm(idOrder)
                        }
                    }   
                }else{
                    console.log(chalk.white(`Next`))
                    for(var i = 0; i < 2; i++){
                        var done = await functionChangeConfirm(idOrder)
                    }
                }
            }
        
        
            }
        }
    }else{
        console.log(`\n[-]`, chalk.white(`Email : ${email1}`));
        console.log(`[-]`, chalk.red(`Balance : ${balance} - You don\'t have enough money `))   
    }
}catch(e){
    console.log(e)
    console.log(`[-] `, chalk.red(`Failed...`));
    console.log('')
}
})();
