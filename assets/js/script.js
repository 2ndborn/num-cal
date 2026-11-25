import { alphabet } from "../data/alphabet.js";
import { birthDay } from "../data/birthDay.js";
import { destinyNum } from "../data/destinyNum.js";
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

const lifePath = () => {
    const dayTotal = dayMonthReduce(day.value)// reduces day except 11, 22
    console.log("daytotal:", dayTotal)
    const dayTot = Array.from(day.value, Number).reduce((acc, num) => acc + num, 0); // used for the ternary operator in allResult()
    console.log("total:", dayTot)
    const monthTotal = dayMonthReduce(mon.value); // reduces month except 11, 22
    const yearTotal = Array.from(year.value, Number).reduce((acc, num) => acc + num, 0);
    console.log("Year:", yearTotal)
    const total = dayTotal + monthTotal + yearTotal;
    return {dayMajor: Number(day.value), dayMinor: dayTot, major: total, minor: reduceMinor(total)}
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


const reduceMinor = (n) => {
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
    if ([13, 14, 15, 16, 19 ].includes(num)) {
        return "(Karmic Debt)"
    } else if ([11, 22].includes(num)) {
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
    const lp = lifePath();
    const dn = nameNumbers();
    const mat = maturityNumber(lp, dn);
    const birthDate = getResults(birthDay, lp.dayMajor, lp.dayMajor)
    const destiny = getResults(destinyNum, dn.major, dn.minor);
    const soul = getResults(soulResults, dn.soulU);
    const person = getResults(personNum, dn.perso);
    const maturity = getResults(mature, mat);
    const karmic = masterKarmic(lp.dayMajor);
    console.log("Result:", soul)
    console.log("soul:", dn.soulU)
    results.innerHTML = `
        <h3><span>Life Path Number: </span>${lp.major}/${lp.minor}</h3>
        <h3><span>Birthday Number: </span>${lp.dayMajor === lp.dayMinor ? lp.dayMinor : `${lp.dayMajor}/${lp.dayMinor} ${karmic}`}</h3>
        <h4>Keywords: ${birthDate?.keywords}</h4>
        <p>${birthDate?.content}</p>
        <h3><span>Destiny Number: </span>${dn.major === dn.minor ? dn.minor : `${dn.major}/${dn.minor}`}</h3>
        <h4>Keywords: ${destiny?.keywords}</h4>
        <p>${destiny?.content}</p>
        <h3><span>Soul Urge Number: </span>${dn.soulU} - ${soul?.title}</h3>
        <h4>${soul?.keywords || ""}</h4>
        <p>${soul?.content || "You have no vowels in your name."}</p>
        <h3><span>Personality Number: </span>${dn.perso}</h3>
        <h4>${person.keywords}</h4>
        <p>${person?.content}</p>
        <h3><span>Maturity Number: </span>${mat}</h3>
        <h4>${maturity.keywords}</h4>
        <p>${maturity?.content}</p>
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