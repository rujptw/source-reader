let emptyObject = Object.freeze({});
console.log("emptyObject: ", Object.freeze(emptyObject)); //true;
console.log("emptyObject: ", Object.isSealed(emptyObject)); //true;

// 对于undefined和null，都视为未定义
function isUndef(v) {
  return v === undefined || v === null;
}
// 对未定义的参数，进行严格判断（underscore）
function isUndefSecond(v) {
  return v === void 0;
}
// 判断是否定义
function isDef(v) {
  return v !== undefined && v !== null;
}

// 判断是否为true;
function isTrue(v) {
  return v === true;
}
console.log("isTrue: ", isTrue);
// 判断是否为false;
function isTrue(v) {
  return v === true;
}
// 判断是否是基本类型，（原始值）
function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}
let a = BigInt(9007199254740991n);
console.log(typeof a);
console.log(isPrimitive(a));

let b = Symbol(1);
console.log(isPrimitive(b));
function isObject(v) {
  return v !== null && typeof v === "object";
}
console.log("isObject: ", isObject([]));
let _toString = Object.prototype.toString;
// 提取数据的的类型
function toRawType(v) {
  return _toString.call(v).slice(8, -1);
}
console.log("toRawType: ", toRawType(null));

function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}
console.log("isPlainObject: ", isPlainObject(new Date()));
function isRegExp(obj) {
  return _toString.call(obj) === "[object RegExp]";
}
console.log("isRegExp: ", isRegExp(/1/));
console.log("isRegExp: ", isRegExp({}));

//  判断是否为有效的数组索引，数组索引可以为字符串化的正整数
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  console.log("n: ", n);
  return n >= 0 && Math.floor(val) === n && isFinite(n);
}
console.log(isValidArrayIndex(null));
console.log(isValidArrayIndex(1.2));
console.log(isValidArrayIndex(2));
let arr = [1, 2, 3];
console.log(arr[""]);

// 判断是否为promise
function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}
let c = 2;
console.log("isPromise: ", isPromise(a));
console.log(c.then);

// 将一个值转化为字符串,
// 1. 当值为underfined 或 null 时，返回空字符串
// 2. 当值为数组或者为纯对象时，调用JSON.stringify来输出字符串,JSON.stringify第二个参数是一个replacer，当它为null或者未提供时，正常序列化
//第三个值为缩进的空字符串,是为了美化输出
function toString(val) {
  return val == null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
}
console.log("toString: ", toString(new Date()));

// 将一个值转化为number类型，失败的话，返回本身
// isNaN是为了判断n是不是NaN,是返回true，不是返回false;

function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
console.log("toNumber: ", toNumber("1.2"));
console.log("toNumber: ", toNumber("1.2n"));
console.log("toNumber: ", toNumber(undefined));
console.log("toNumber: ", toNumber(null));

// 接收一个字符串和一个布尔值，用split方法将字符串转化为数组，之后将数组的每一个值作为一个对象的key并且设置为true；
// 之后返回一个内部函数，它是用来判断传入该内部函数的值，是不是在之前生成的对象里，在则返回true，否则返回undefined
// 第二个参数，传递为true，则会将传入内部函数的值转化为小写,然后判断该参数是不是在之前生成的对象里
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  console.log("map: ", map);
  return expectsLowerCase
    ? function (val) {
        return map[val.toLowerCase()];
      }
    : function (val) {
        return map[val];
      };
}
let test = makeMap("slot", true);
let test2 = makeMap("lll", false);
console.log("test2: ", test2("LLL"));
console.log(test("Slot"));

// 判断是否为内部的tag
var isBuiltInTag = makeMap("slot,component", true);
console.log("isBuiltInTag: ", isBuiltInTag("Slot"));
console.log("isBuiltInTag: ", isBuiltInTag("slot"));
console.log("isBuiltInTag: ", isBuiltInTag("CoMponent"));
