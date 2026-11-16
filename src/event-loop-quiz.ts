console.log("A");

setTimeout(() => {
  console.log("B");

  process.nextTick(() => {
    console.log("C");
  });

  Promise.resolve().then(() => {
    console.log("D");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("E");

  process.nextTick(() => {
    console.log("F");
  });
});

process.nextTick(() => {
  console.log("G");
});

console.log("H");
