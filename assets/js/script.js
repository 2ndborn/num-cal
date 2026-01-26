const birth = document.getElementById("birthday");

const array = "26";

const lifePath = () => {
    const arr = Array.from(array, Number);
    const total = arr.reduce((acc, num) => acc + num, 0);
    console.log("total:", total)
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