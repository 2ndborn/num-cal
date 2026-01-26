const birth = document.getElementById("birthday");
const day = document.getElementById("day");
const mon = document.getElementById("mon");
const year = document.getElementById("year");

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
    const lifePathMinor = reduced(lifePathTotal)
    results.innerHTML = `<h2><span>Life Path Number: </span>${lifePathTotal}/${lifePathMinor}</h2>`
    console.log(`lifePath: ${lifePathTotal}/${lifePathMinor}\nDay number: ${day.value}`)
}

const reduced = (n) => {
    while (n > 9) {
        n = Array.from(String(n), Number)
        .reduce((acc, num) => acc + num, 0);
    }
    return n
}

const btn = document.getElementById("btn");
btn.addEventListener("click", lifePath)