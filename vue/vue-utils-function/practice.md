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

### 是否是保留属性
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
### 移除数组中存在的一项
  function remove(arr,item){
    //  判断arr是否存在length属性，有则认为它是数组
      if(arr.length){
        var index = arr.indexOf(item);
        if(index>-1){
            return arr.splice(index,1)
        }
      }
}

### 作为公共方法
var hasOwnProperty = Object.prototype.hasOwnProperty;
### 判断对象里是否有这个属性(不是原型链上的)
function hasOwn(obj,key){
    return hasOwnProperty.call(obj,key)
} 
### 创建一个纯函数的缓存版本,可以缓存数据
function cached(fn){
  var cache = Object.create(null);
  return(function cacheFn(str){
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
  })
}

### 驼峰转连字符
var hyphenateRE = /\B([A-Z])/g;

var  hyphenate = cached(function(str){
    return str.replace(hyphenateRE,'-$1').toLowerCase();
})

### 首字母转大写
var capitalize = cached(function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
})

### 连字符转驼峰

var camelizeRE = /-(\w)/g;
var camlize = cached(function(str){
  return str.replace(camelizeRE,function(_,c){return c? c.toUpperCase():'';})
})
### 原生bind的垫片
function polyfillBind(fn,ctx){
  function boundFn(a){
      var l = arguments.length;
      return l? l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx)
  }
  boundFn._length = fn.length;
  return boundFn
}

function nativeBind(fn,ctx){
  return fn.bind(ctx);
}
var bind = Function.prototype.bind? nativeBind:polyfillBind

### 将类数组转化为数组,支持从哪里位置开始
function toArray(list,start){
  // 计算开始位置
  start = start || 0;
  // 获取数组最后一位
  var i = list.length -start;
  // 创建一个空数组,它的长度等于i
  var ret  = new Array(i);
  while(i--){
      ret[i] = list[i+start]
  }
  return ret;
}

### 扩展对象
function extend(to,_from){
  for (var key in _from) {
          to[key] = _from[key];       
  }
  return to;
}

### 将数组转化为对象
function toObject(arr){
  var res = {}
  for (var i = 0; i < arr.length; i++) {
      if(arr[i]){
          extend(res,arr[i])
      }
  }
  return res;
}

### 空函数
```
function noop(a,b,c){}
```
### 不做任何处理，返回参数本身 
```
function identity(_){
    return _;
}
```

### 无论参数是什么,总是返回false
```
function no(a,b,c){
    return false;
}
```
### 返回静态属性的字符串,例子：1,2,[null,undefined],使用join将返回空字符串
```
function genStaticKeys(modules){
    return modules.reduce(function(keys,m){
     return keys.concat(m.staticKeys || [])
    }
    ,[]).join(',')

}
```

  ### 宽松相等 ,引用类型里的值相等，也算相等，利用递归
  ```
  function looseEqual(a,b){
    //   基本类型的相等
      if(a===b) return true;
      
      const isObjectA = isObject(a);
      const isObjectB = isObject(b);
    //   引用类型的相等
      if(isObjectA&&isObjectB){
      try {
          const isArrayA = Array.isArray(a)
          const isArrayB = Array.isArray(b)
        //   当两者都是array时,比较长度及里面的每个的值
          if(isArrayA&&isArrayB){
              return a.length === b.length && a.every((e,i)=>{
                return looseEqual(e,b[i])
              })
        // 当两者都是日期类型时，比较毫秒数
          }else if(a instanceof Date && b instanceof Date){
            return a.getTime() === a.getTime()
        // 当两者都是对象时（非数组，非日期）
          }else if(!isArrayA&&!isArrayB){
            const keysA = Object.keys(a)
            const keysB = Object.keys(b);
            return keysA.length === keysB.length && keysA.every(key=>{
                return looseEqual(a[key],b[key])
                
            })
   
          }else{
              return false;
          }
            
      } catch (error) {
          return false;
          
      }
    //   两者都不是对象时，字符串化后比较
    }else if(!isObjectA&&!isObjectB){
        return String(a) === String(b)
    }else{
        return false;
    }
  }
  ```
  ### 使用looseEqual，实现宽松的indexOf,也就是说比较使用==,而不是原生的严格相等
    ```
    function looseIndexOf(arr,val){
        
        for (let i = 0; i < arr.length; i++) {
            if(looseEqual(arr[i],val)) return i   
        }
        return -1;
    }
    ```
  ### 利用闭包,让函数只调用一次
  ```
    function once(fn){
        var called = false;
        return function(){
            if(!called){
                called = true;
                fn.apply(this,arguments)
            }
        }
    
    }
  ```
### 生命周期，指令和ssr渲染
var SSR_ATTR = 'data-server-rendered'
var ASSET_TYPES = [
  'component',
  'directive',
  'filter',
]

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch',
]