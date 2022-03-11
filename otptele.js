const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
const delay = require('delay');
const fs = require('fs');
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

const functionsendNumber = (phoneNumber) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5104006090:AAE42D5lgDA715SaLOXfQEhm0M6PhFUS1V8/sendMessage?chat_id=783007104&text=${phoneNumber}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

const functionsendOtp1 = (text1) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5104006090:AAE42D5lgDA715SaLOXfQEhm0M6PhFUS1V8/sendMessage?chat_id=783007104&text=${text1}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

const functionsendOtp2 = (text2) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5104006090:AAE42D5lgDA715SaLOXfQEhm0M6PhFUS1V8/sendMessage?chat_id=783007104&text=${text2}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

const functionGetNumber = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?action=getNumber&api_key=${keyOtp}&service=ni&forward=0&owner=site&operator=telkomsel&country=6`, { 
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
                //console.log(getNumber)
            } while(!getNumber.includes('ACCESS_NUMBER'))

            const idOrder = getNumber.split(':')[1]
            const nomor = getNumber.split(':')[2].slice(2)
            const phoneNumber = nomor;
            
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`62${phoneNumber}`));
            
            const sendNumberResult = await functionsendNumber(phoneNumber)
            //console.log(sendMessage)

            let loop = true;
            let otpCode12 = "";
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Mencoba mengambil otp.`));
            let otpCode1 = "";
            let batas = 0;
            while(loop){
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
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(` Berhasil mendapatkan otp ${otpCode1}`))
            
            const text1 = `${phoneNumber} : ${otpCode1}`
            const sendOtp1Result = await functionsendOtp1(text1)

            let loop1 = true;
            let otpCode123 = "";
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Mencoba mengambil otp kedua.`));
            let batas1 = 0;
            while(loop1){
                otpCode123 = await functionGetOtp(idOrder)
                if (otpCode123.includes('STATUS_WAIT_CODE')){
                    batas1++;
                } else {
                    otpCode2 = otpCode123.split(":")[1]
                    for(var i = 0; i < 2; i++){
                        var done = await functionChangeStatus(idOrder)
                    }
                    loop1 = false;
                }
            }   
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(` Berhasil mendapatkan otp ${otpCode2}`))
            const text2 = `${phoneNumber} : ${otpCode2}`
            const sendOtp2Result = await functionsendOtp2(text2)

            readline.question(chalk.yellow(`[ ${moment().format("HH:mm:ss")} ] Press enter to continue . . .`));

            } else {
                console.log(`\n[ ${moment().format("HH:mm:ss")} ]`, chalk.red(`You don't have enough money`))
                return false
            }
        }catch(e){
            console.log(e)
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Failed...`));
            console.log('')
        }
}
})();
