const birth = document.getElementById("birthday");
const day = document.getElementById("day");
const mon = document.getElementById("mon");
const year = document.getElementById("year");
const nameInput = document.getElementById("name-input");
const results = document.getElementById("results");

document.addEventListener("DOMContentLoaded", () => {
    day.focus();
})

day.addEventListener("input", () => {
    if (day.value.length === day.maxLength) mon.focus();
}) // moves to month input if max length is reached

mon.addEventListener("input", () => {
    if (mon.value.length === mon.maxLength) year.focus();
}) // moves to year input if max length is reached

const alphabet = [
    {name: "a", number: 1, vowel: true},
    {name: "b", number: 2, vowel: false},
    {name: "c", number: 3, vowel: false},
    {name: "d", number: 4, vowel: false},
    {name: "e", number: 5, vowel: true},
    {name: "f", number: 6, vowel: false},
    {name: "g", number: 7, vowel: false},
    {name: "h", number: 8, vowel: false},
    {name: "i", number: 9, vowel: true},
    {name: "j", number: 10, vowel: false},
    {name: "k", number: 11, vowel: false},
    {name: "l", number: 12, vowel: false},
    {name: "m", number: 13, vowel: false},
    {name: "n", number: 14, vowel: false},
    {name: "o", number: 15, vowel: true},
    {name: "p", number: 16, vowel: false},
    {name: "q", number: 17, vowel: false},
    {name: "r", number: 18, vowel: false},
    {name: "s", number: 19, vowel: false},
    {name: "t", number: 20, vowel: false},
    {name: "u", number: 21, vowel: true},
    {name: "v", number: 22, vowel: false},
    {name: "w", number: 23, vowel: false},
    {name: "x", number: 24, vowel: false},
    {name: "y", number: 25, vowel: false},
    {name: "z", number: 26, vowel: false},
]

const lifePath = () => {
    const dayTotal = dayMonthReduce(day.value)// reduces day except 11, 22
    const dayTot = Array.from(day.value, Number).reduce((acc, num) => acc + num, 0); // used for the ternary operator in allResult()
    const monthTotal = dayMonthReduce(mon.value); // reduces month except 11, 22
    const yearTotal = Array.from(year.value, Number).reduce((acc, num) => acc + num, 0);
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

const allResults = () => {
    const lp = lifePath();
    const dn = nameNumbers();
    const mat = maturityNumber(lp, dn)

    results.innerHTML = `
        <h3><span>Birthday Number: </span>${lp.dayMajor === lp.dayMinor ? lp.dayMinor : `${lp.dayMajor}/${lp.dayMinor}`}</h3>
        <h3><span>Life Path Number: </span>${lp.major}/${lp.minor}</h3>
        <h3><span>Destiny Number: </span>${dn.major === dn.minor ? dn.minor : `${dn.major}/${dn.minor}`}</h3>
        <h3><span>Soul Urge Number: </span>${dn.soulU}</h3>
        <h3><span>Personality Number: </span>${dn.perso}</h3>
        <h3><span>Maturity Number: </span>${mat}</h3>
    `
}

const btn = document.getElementById("btn");
btn.addEventListener("click", allResults)