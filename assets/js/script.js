const birth = document.getElementById("birthday");
const day = document.getElementById("day");
const mon = document.getElementById("mon");
const year = document.getElementById("year");
const nameInput = document.getElementById("name-input");

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
    {name: "b", number: 2, vowel: true},
    {name: "c", number: 3, vowel: true},
]

const input = "acccccbbbbbbbb";

const nameNumbers = () => {
    const array = Array.from(nameInput.value); // changes input to ["a","b"]
    console.log("array:", array)
    const des = destiny(array);
    console.log("destiny:", des)
    const desMajor = reduceMajor(des);
    console.log("destiny:", desMajor)
    const desMinor = reduceMinor(des);
    console.log("destiny:", desMinor)
    if (desMajor === desMinor) {
        results.innerHTML = `<h3>Destiny Number: ${desMinor}</h3>`
    } else {
        results.innerHTML = `<h3>Destiny Number: ${desMajor}/${desMinor}</h3>`
    }
    // const find = array.map(arr => alphabet.find(a => a.name === arr));
    // // Maps through the object to find letters that match letters in arr
    // console.log("value:", find)
    // const fil = find.filter(obj => obj && obj.vowel)
    // // removed all the false vowel objects
    // console.log("Filter:", fil);
    // const mp = fil.map(f => f.number)
    // // Maps those objects to create an array with number values
    // console.log("map:", mp)

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


const lifePath = () => {
    const results = document.getElementById("results");
    const dayArr = Array.from(day.value, Number);
    const dayTotal = dayArr.reduce((acc, num) => acc + num, 0);
    console.log("total:", dayTotal)

    const monArr = Array.from(mon.value, Number);
    const monTotal = monArr.reduce((acc, num) => acc + num, 0);
    console.log("total:", monTotal)

    const yearArr = Array.from(year.value, Number);
    const yearTotal = yearArr.reduce((acc, num) => acc + num, 0);
    console.log("total:", yearTotal)

    const lifePathTotal = dayTotal + monTotal + yearTotal;
    const lifePathMinor = reduceMinor(lifePathTotal)
    results.innerHTML = `<h3><span>Life Path Number: </span>${lifePathTotal}/${lifePathMinor}</h3>`
    console.log(`lifePath: ${lifePathTotal}/${lifePathMinor}\nDay number: ${day.value}`);
    nameNumbers();
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

const btn = document.getElementById("btn");
btn.addEventListener("click", lifePath)