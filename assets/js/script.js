import { alphabet } from "../data/alphabet.js";
import { birthDay } from "../data/birthDay.js";
import { destinyNum } from "../data/destinyNum.js";
import { lifePathNum } from "../data/lifePathNum.js";
import { mature } from "../data/mature.js";
import { personNum } from "../data/personNum.js";
import { soulResults } from "../data/soulUrge.js";

const birth = document.getElementById("birthday");
const day = document.getElementById("day");
const mon = document.getElementById("mon");
const year = document.getElementById("year");
const nameInput = document.getElementById("name-input");
const inputs = [...document.querySelectorAll("input")]
const results = document.getElementById("results");
const btn = document.getElementById("btn");
const topBtn = document.getElementById("topBtn");

document.addEventListener("DOMContentLoaded", () => {
    day.focus();
})

day.addEventListener("input", () => {
    if (day.value.length === day.maxLength) mon.focus();
}) // moves to month input if max length is reached

mon.addEventListener("input", () => {
    if (mon.value.length === mon.maxLength) year.focus();
}) // moves to year input if max length is reached

const age = () => {
    const today = new Date();
    
    let age = today.getFullYear() - Number(year.value);

    const birthdayPassed = 
        today.getMonth() + 1 > Number(mon.value) ||
        // If the month has passed then 1st condition is true
        (
            today.getMonth() + 1 === Number(mon.value) &&
            today.getDate() >= Number(day.value)
            // If the month is equal and the date is equal or passed 
            // then this condition is true
        )

    if (!birthdayPassed) {
        age--
        // if birthday not passed reduce age.
    }

    return age
}

const lifePath = () => {
    const dayTotal = dayMonthReduce(day.value)// reduces day except 11, 22
    const dayTot = Array.from(day.value, Number).reduce((acc, num) => acc + num, 0); // used for the ternary operator in allResult()
    const monthTotal = dayMonthReduce(mon.value); // reduces month except 11, 22
    const yearTotal = Array.from(year.value, Number).reduce((acc, num) => acc + num, 0);
    const monSingle = reduceMinor(mon.value)
    const yearSingle = reduceMinor(year.value)
    const total = dayTotal + monthTotal + yearTotal;
        return {
        dayMajor: Number(day.value), 
        dayMinor: dayTot, 
        major: total, 
        minor: reduceMinor(total),
        month: monSingle,
        year: yearSingle
    }
}

const nameNumbers = () => {
    const spaces = nameInput.value.trim().toLowerCase().replace(/\s+/g, "")
    const array = Array.from(spaces); // changes input to ["a","b"]
    console.log("array:", array)
    const total = destiny(array);
    const soul = soulUrge(array)
    const person = personality(array)
    return {
        major: reduceMajor(total), 
        minor: reduceMinor(total),
        soulU: reduceMinor(soul),
        perso: reduceMinor(person)
    }
}

const destiny = (input) => {
    const find = input.map(arr => alphabet.find(a => a.name === arr));
    // Maps through the object to find letters that match letters in arr
    console.log("value:", find)
    const mp = find.map(f => f.number)
    // Maps those objects to create an array with number values
    console.log("map:", mp)
    const total = mp.reduce((acc, num) => acc + num, 0)
    return total
}

const soulUrge = (input) => {
    const vowels = input.map(arr => alphabet.find(a => a.name === arr))
    .filter(obj => obj && obj.vowel).map(v => v.number);
    console.log("urge:", vowels)
    const total = vowels.reduce((a, b) => a + b, 0);
    return total
}

const personality = (input) => {
    const consonants = input.map(arr => alphabet.find(a => a.name === arr))
    .filter(obj => obj && !obj.vowel).map(v => v.number);
    console.log("personality:", consonants)
    const total = consonants.reduce((a, b) => a + b, 0);
    console.log("num:", total)
    return total
}

const maturityNumber = (lp, dn) => {
    const total = lp.minor + dn.minor
    return reduceMajor(total);
}

const getSpecialNumber = (num) => {
    const karmic = [13, 14, 16, 19, 49, 58, 59];
    const master = [11, 22, 33, 44];

    if (karmic.includes(num)) {
        return {value: num, message: "(Karmic Debt)"}
    } else if (master.includes(num)) {
        return {value: num, message: "(Master Number)"}
    } else {
        return null
    }
}

const getMonth = (mon) => {
    const month = Number(mon)

    const months = ["January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"] 

    return months[month -1]
}

const getSuffix = (day) => {
    day = Number(day)
    const first = [1, 21, 31];
    const second = [2, 22];
    const third = [3, 23];

    if (first.includes(day)) {
        return "st"
    } else if (second.includes(day)) {
        return "nd"
    } else if (third.includes(day)) {
        return "rd"
    } else {
        return "th"
    }
}

const pinnacleNumber = (day, mon, year) => {
    const pinOne = reduceMinor(day + mon);
    const pinTwo = reduceMinor(day + year);
    const pinThree = reduceMinor(pinOne + pinTwo);
    const pinFour = reduceMinor(mon + year)
    const specOne = getSpecialNumber(day + mon)
    const specTwo = getSpecialNumber(day + year)
    const specThree = getSpecialNumber(pinOne + pinTwo)
    const specFour = getSpecialNumber(day + mon)
    return {
        one: pinOne, two: pinTwo, three: pinThree, four: pinFour,
        oneMK: specOne, twoMK: specTwo, threeMK: specThree, fourMK: specFour
    }
}

const challengeNumber = (day, mon, year) => {
    const one = Math.abs(day - mon);
    const two = Math.abs(day - year);
    const three = Math.abs(one - two);
    const four = Math.abs(mon - year);
    return [one, two, three, four]
}

const reduceMinor = (n) => {
    n = Number(n); 
    
    while (n > 9) {
        n = Array.from(String(n), Number)
        .reduce((acc, num) => acc + num, 0);
    }
    return n
}

const reduceMajor = (n) => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = Array.from(String(n), Number)
        .reduce((acc, num) => acc + num, 0);
    }
    return n
}

const dayMonthReduce = (n) => {
    n = Number(n);
    while (n > 9 && n !== 11 && n !== 22) {
        n = Array.from(String(n), Number)
        .reduce((a, b) => a + b, 0);
    }
    return n
}

const masterKarmic = (num) => {
    if ([13, 14, 16, 19, 49, 58, 59].includes(num)) {
        return "(Karmic Debt)"
    } else if ([11, 22, 33, 44].includes(num)) {
        return "(Master Number)"
    }
    return ""
}

const getResults = (data, major, minor) => {
    // finds the content that matches the number
    const match = data.find(item => item.num === Number(major))

    return match || data.find(item => item.num === Number(minor))
}

const allResults = () => {
    const ages = age()
    const lp = lifePath();
    const dn = nameNumbers();
    const mat = maturityNumber(lp, dn);
    const life = getResults(lifePathNum, lp.major, lp.minor)
    const birthDate = getResults(birthDay, lp.dayMajor, lp.dayMajor)
    const destiny = getResults(destinyNum, dn.major, dn.minor);
    const soul = getResults(soulResults, dn.soulU);
    const person = getResults(personNum, dn.perso);
    const maturity = getResults(mature, mat);   
    const pinnacle = pinnacleNumber(lp.dayMinor, lp.month, lp.year)
    const challenge = challengeNumber(lp.dayMinor, lp.month, lp.year)
    console.log("Pinnacles:", pinnacle)
    console.log("Challenge:", challenge)
    const dayKarmic = masterKarmic(lp.dayMajor); // Remember to change this....
    const lifeKarmic = masterKarmic(lp.major);
    console.log("Result:", soul)
    console.log("soul:", dn.soulU)
    results.innerHTML = `
        <h3>Name: ${nameInput.value}</h3>
        <h3>DoB: ${day.value}${getSuffix(day.value)} ${getMonth(mon.value)} ${year.value}</h3>
        <h3>Age: ${ages}</h3>
        <h3><span>Life Path Number: </span>${lp.major}/${lp.minor} ${lifeKarmic} - ${life?.title}</h3>
        <h4>Keywords: ${life?.keywords.join(" | ")}</h4>
        <p>${life?.content}</p>
        <h3><span>Birthday Number: </span>${lp.dayMajor === lp.dayMinor ? lp.dayMinor : `${lp.dayMajor}/${lp.dayMinor} ${dayKarmic}`} - ${birthDate?.title}</h3>
        <h4>Keywords: ${birthDate?.keywords.join(" | ")}</h4>
        <p>${birthDate?.content}</p>
        <h3><span>Destiny Number: </span>${dn.major === dn.minor ? dn.minor : `${dn.major}/${dn.minor}`} - ${destiny?.title}</h3>
        <h4>Keywords: ${destiny?.keywords.join(" | ")}</h4>
        <p>${destiny?.content}</p>
        <h3><span>Soul Urge Number: </span>${dn.soulU} - ${soul?.title}</h3>
        <h4>${soul?.keywords.join(" | ") || ""}</h4>
        <p>${soul?.content || "You have no vowels in your name."}</p>
        <h3><span>Personality Number: </span>${dn.perso} - ${person?.title}</h3>
        <h4>${person.keywords.join(" | ")}</h4>
        <p>${person?.content}</p>
        <h3><span>Maturity Number: </span>${mat} - ${maturity?.title}</h3>
        <h4>${maturity.keywords.join(" | ")}</h4>
        <p>${maturity?.content}</p>
        <h3><span>Pinnacle Numbers: </span></h3>
        <p>Pinnacle numbers represent the four major seasons or "climates" of your 
        life, showing the overarching themes, external opportunities, and kinds of 
        growth you encounter during each phase.</p>
        <h4>1st Pinnacle <i>(from Birth  to ${36 - lp.minor})</i> - ${pinnacle?.oneMK?.value ? `${pinnacle?.oneMK?.value} / ` : ""}${pinnacle?.one} ${pinnacle?.oneMK?.message ? `${pinnacle?.oneMK?.message}` : ""}:</h4>
        <h4>2nd Pinnacle <i>(from ${36 - lp.minor} to ${36 - lp.minor + 9})</i> - ${pinnacle?.twoMK?.value ? `${pinnacle?.twoMK?.value} / ` : ""}${pinnacle?.two} ${pinnacle?.twoMK?.message ? `${pinnacle?.twoMK?.message}` : ""}:</h4>
        <h4>3rd Pinnacle <i>(from ${36 - lp.minor + 9} to ${36 - lp.minor + 18})</i> - ${pinnacle?.threeMK?.value ? `${pinnacle?.threeMK?.value} / ` : ""}${pinnacle?.three} ${pinnacle?.threeMK?.message ? `${pinnacle?.threeMK?.message}` : ""}:</h4>
        <h4>4th Pinnacle <i>(from ${36 - lp.minor + 18} onward)</i> - ${pinnacle?.fourMK?.value ? `${pinnacle?.fourMK?.value} / ` : ""}${pinnacle?.four} ${pinnacle?.fourMK?.message ? `${pinnacle?.fourMK?.message}` : ""}:</h4>
    `
}

const isDateValid = (day, month, year) => {
    const date = new Date(
        Number(year), 
        Number(month) - 1, 
        Number(day)
    )

    return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === Number(month) - 1 &&
        date.getDate() === Number(day)
    )
}

const validForm = () => {
    const valid = isDateValid(day.value, mon.value, year.value) &&
    nameInput.value.trim()
    btn.disabled = !valid
}

inputs.forEach(input => {
    input.addEventListener("input", validForm)
})

btn.addEventListener("click", () => {
    allResults()
    results.scrollIntoView({behavior: "smooth"})
})

topBtn.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"})
})

window.addEventListener("scroll", () => {
    console.log(window.scrollY)
    topBtn.classList.toggle("show", window.scrollY > 10)
    console.log(topBtn.className)
})