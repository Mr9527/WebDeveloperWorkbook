var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};
flight["number"]; // 815
flight.departure.IATA; //SYD
flight["name"]; // undefined 当你尝试检索一个并不存在的值，将会返回 undefined

flight["middle-name"] || "(none)"; // 可以用 \\ 运算符来填充默认值

flight.number = 100;
flight.abx = {
  "middle-name": "Curly"
};
// 如果对象之前没有拥有那个属性名，那么该属性就被扩充到对象中。
// 对象通过引用来传递。它们永远不会被复制


// 每个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象都连接到 object.prototype, 它是 javaScript 中的标配对象。
// 当你创建一个新对象时，你可以选择某个对象作为它的原型。JavaScript 提供的实现机制杂乱而复杂，但其实可以被明显简化。我们将给 object 增加一个 create 方法