// Generate random value for x, y attribute (為 x, y 屬性產生隨機值)
const values = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650];

// randomly select a number from values array (從值數組中隨機選擇一個數字)
// console.log(Math.floor(Math.random() * values.length));
// console.log(values[Math.floor(Math.random() * values.length)]);

const getRandomPosition = () => {
  return {
    x: values[Math.floor(Math.random() * values.length)],
    // 只從陣列前 6 個元素中隨機選取，也就是 0, 150, 300, 450, 600, 750
    y: values[Math.floor(Math.random() * (values.length - 6))],
  };
};

// console.log(getRandomPosition());

let tl = gsap.timeline();

gsap.utils.toArray(".rect").forEach((rect) => {
  const position = getRandomPosition();
  console.log("position", position);
  console.log("rect", rect);

  tl.set(rect, {
    attr: {
      x: position.x,
      y: position.y,
    },
  });
});

tl.to(".rect", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out",
  stagger: {
    // stagger 屬性是用來設定動畫的延遲時間（delay）和間隔時間（interval）-> 每 3 秒後對下一個元素進行動畫。
    amount: 3,
  },
});
