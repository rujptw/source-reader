### emptyObject
    1. 实现:`let emptyObject = Object.freeze({})`
    2. 作用:返回一个不可修改的空对象。
    3. 扩展:Object.freeze 如果所在对象的键值为对象，那就可以修改，否则新增，删除，修改操作都不可以

### isUndef 判断是否未定义
    1. 实现: ```function isUndef(v){
    return v === undefined || v === null;
    
    underscore的实现，对未定义的参数，进行严格判断
       function isUndefSecond(v){
            return v === void 0
        }
   }
   ```
### isDef 判断是否定义
    1. function isDef(v){
        return v !==undefined && v !==null
    }

### 判断是否为true;
1. ```function isTrue(v){
      return v === true;
    }
    ```
### 判断是否为false;
    1. ```function isTrue(v){
        return v === true;
    }```
}
### 判断是否是基本类型，（原始值）
```function isPrimitive(value){
    return (
        typeof value ==='string' ||
        typeof value ==='number' ||
        typeof value ==='symbol' ||
        typeof value ==='boolean' 

    )
}
```
### 判断是否为对象（不是日期、正则对象等）
```
function isObject(v){
    return v !==null && typeof v ==='object' 
}
```

### 提取数据的的类型，准确地判断数据的类型
let _toString = Object.prototype.toString  //将原型链中的toString方法提取处理，供多个工具函数使用 
function toRawType(v){
    return _toString.call(v).slice(8,-1)
}

### 判断是否为对象（不是日期、正则对象等）
function isPlainObject(obj){
    return _toString.call(obj) === '[object Object]'

}
### 判断是否为正则对象
function isRegExp(obj){
    return _toString.call(obj) === '[object RegExp]'

}

### 判断是否为有效的数组索引，数组索引可以为字符串化的正整数
function isValidArrayIndex(val){
    var n = parseFloat(String(val));
    console.log('n: ', n);
    return n>=0&&Math.floor(val)===n&&isFinite(n)
}

### 判断是否为promise
function isPromise(val){
    return (
        isDef(val)&&
        typeof val.then==='function'&&
        typeof val.catch==='function'
    )
}
### 将一个值转化为字符串,
   1. 当值为underfined 或 null 时，返回空字符串
   2. 当值为数组或者为纯对象时，调用JSON.stringify来输出字符串,JSON.stringify第二个参数是一个replacer，当它为null或者未提供时，正常序列化
   3. 第三个值为缩进的空字符串,是为了美化输出
```
function toString(val){
    return val ==null? '':Array.isArray(val) || isPlainObject(val)&&val.toString ===_toString? JSON.stringify(val,null,2):String(val)
}

```

### 将一个值转化为number类型，失败的话，返回本身
    1. isNaN是为了判断n是不是NaN,是返回true，不是返回false;
        ```
        function toNumber(val){ 
            var n = parseFloat(val);
            return isNaN(n)? val:n;
        }


### 创建一个判断参数是否在对象里的函数

    1. 接收一个字符串和一个布尔值，用split方法将字符串转化为数组，之后将数组的每一个值作为一个对象的key并且设置为true；
    2. 之后返回一个内部函数，它是用来判断传入该内部函数的值，是不是在之前生成的对象里，在则返回true，否则返回undefined
    3. 第二个参数为布尔值，传递为true，则会将传入内部函数的值转化为小写,然后判断该参数是不是在之前生成的对象里
       ```
        function makeMap(str,expectsLowerCase){
            var map = Object.create(null);
            var list = str.split(',')
            for (let i = 0; i < list.length; i++) {
                map[list[i]] = true;
                
            }
            return expectsLowerCase? function(val){return map[val.toLowerCase()]}:function(val){return map[val]}
        }
        ```
        
### 判断是否为内部的tag
var isBuiltInTag = makeMap('slot,component',true)