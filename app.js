async function getUserInformation() {
    let userInfo = {}

    try {
        let res = await fetch('https://identify.tomontheinternet.com')
        userInfo = await res.json()
    } catch (err) {
        console.log(err)
    }

    var parsedResults = new UAParser().getResult()

    userInfo.browser = parsedResults.browser.name
    userInfo.os = osDescription(parsedResults.os.name)

    decorateAboutYou(userInfo)
    unhideAboutYou()
}

function businessCard() {
    console.log(
        '%ccurl https://business-card.tomontheinternet.com',

        'color:green;font-family:monospace; font-size: 20px'
    )
}

function glitch() {
    document.querySelector('body').classList.add('wiggle')
    document.querySelector('h1').classList.add('glitch')
    document.querySelector('#about-you h2').classList.add('glitch')
}

function decorateAboutYou(userInfo) {
    document.querySelector('#about-you-os').textContent = userInfo.os
    document.querySelector('#about-you-browser').textContent = userInfo.browser
    document.querySelector('#about-you-country').textContent = userInfo.country
    document.querySelector('#about-you-city').textContent = userInfo.city
}

function eventListeners() {
    document
        .querySelector('#about-you summary')
        .addEventListener('click', glitch)
}

function unhideAboutYou() {
    document.querySelector('#about-you').classList.remove('hide')
}

function osDescription(os) {
    if (os == 'iOS') {
        return `You're holding your pretty iPhone in your hands. Perhaps feeling less convinced that Apple makes secure products.`
    }

    if (os.includes('Android')) {
        return `You're holding your Android in your hands. Maybe if you'd gotten an iPhone you'd be more secure.`
    }

    if (os.includes('Windows')) {
        return `You're sitting in front of your Windows PC. It's just you, me, and Bill Gates here now.`
    }

    if (os === 'Arch') {
        return `You're sitting in front of your computer. BTW, did you know you use Arch?`
    }

    if (os === 'Mac OS') {
        return `You're sitting in front of your Mac. Perhaps feeling less convinced that Apple makes secure products.`
    }

    if (os === 'Linux') {
        return `You're sitting in front of your Linux box. Perhaps feeling like a little bit less of a hacker all of a sudden.`
    }

    return 'Your computer is unconventional.'
}

getUserInformation()
businessCard()
eventListeners()
