// teste 01
// console.log("A");
// setTimeout(() => {
//   console.log("B");
//   process.nextTick(() => {
//     console.log("C");
//   });
//   Promise.resolve().then(() => {
//     console.log("D");
//   });
// }, 0);
// Promise.resolve().then(() => {
//   console.log("E");
//   process.nextTick(() => {
//     console.log("F");
//   });
// });
// process.nextTick(() => {
//   console.log("G");
// });
// console.log("H");
async function getUser() {
    console.log("A");
    throw new Error("Erro no utilizador");
}
async function getProfile() {
    console.log("B");
    await getUser();
    console.log("C");
}
async function main() {
    try {
        console.log("D");
        await getProfile();
        console.log("E");
    }
    catch (error) {
        console.log("Catch:", error.message);
    }
    console.log("F");
}
main();
console.log("G");
export {};
// D, B, A, G, Catch, C, E, F
