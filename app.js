async function getUserInformation() {
    try {
        let res = await fetch('https://tomlink.ca/identify')
        res = await res.json()
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

function businessCard() {
    console.log(
        '%ccurl https://business-card.tomontheinternet.com',

        'color:green;font-family:monospace; font-size: 20px'
    )
}

getUserInformation()
businessCard()
