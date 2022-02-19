const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
const delay = require('delay');
const { text } = require('cheerio/lib/api/manipulation');

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

const functionsendNumber = (phoneNumber) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5046108013:AAENocDY3h3DW3z26lgbx0jhFFac-Zz1_ds/sendMessage?chat_id=783007104&text=${phoneNumber}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

const functionsendOtp1 = (text1) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5046108013:AAENocDY3h3DW3z26lgbx0jhFFac-Zz1_ds/sendMessage?chat_id=783007104&text=${text1}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

const functionsendOtp2 = (text2) => new Promise((resolve, reject) => {
    fetch(`https://api.telegram.org/bot5046108013:AAENocDY3h3DW3z26lgbx0jhFFac-Zz1_ds/sendMessage?chat_id=783007104&text=${text2}`, {
    method: 'POST',
})
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
});

var keyOtp = '110493U15e6ce6d84a90d493f6452f85c8661e3'

const functionGetNumber = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getNumber&api_key=110493U15e6ce6d84a90d493f6452f85c8661e3&service=ni&forward=0&owner=site&operator=any&country=6`, { 
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
            } while(!getNumber.includes('ACCESS_NUMBER'))

            const idOrder = getNumber.split(':')[1]
            const nomor = getNumber.split(':')[2].slice(2)
            const phoneNumber = nomor;
            
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`phoneNumber 62${phoneNumber}`));
            
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
                console.log('You don\'t have enough money')
            }
        }catch(e){
            console.log(e)
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Failed...`));
            console.log('')
        }
}
})();
