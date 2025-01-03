// Generate random value for x, y attribute (為 x, y 屬性產生隨機值)
const values = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650];

// randomly select a number from values array (從值數組中隨機選擇一個數字)
// console.log(Math.floor(Math.random() * values.length));
// console.log(values[Math.floor(Math.random() * values.length)]);

const getRandomPosition = () => {
  return {
    x: values[Math.floor(Math.random() * values.length)],
    y: values[Math.floor(Math.random() * (values.length - 6))], // -6 to never pick from the last 6 elements of the array (-6 表示從不從陣列的最後 6 個元素中選取，也就是 0, 150, 300, 450, 600, 750, 這幾個)
  };
};

// console.log(getRandomPosition());

let t1 = gsap.timeline();

gsap.utils.toArray(".rect").forEach((rect) => {
  
  const position = getRandomPosition();
  console.log("position", position);
  console.log("rect", rect);
  
  t1.set(rect, {
    attr: {
      x: position.x,
      y: position.y,
    },
  });
});
