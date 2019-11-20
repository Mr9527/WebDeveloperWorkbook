# JavaScript 语言精粹





### 原型继承

原型继承是 JavaScript 中的一个很有争议的特性。JavaScript 有一个无类型的（class-free）对象系统，在这个系统中，对象直接从自其他对象继承属性。这真的很强大，但是对那些被训练使用类去创建对象的程序员们来说，原型继承是一个陌生的概念。如果你尝试对 JavaScript 直接应用基于继承的设计模式，你将会收到挫折。但是，如果你学会了自如地使用 JavaScript 原型，你的努力将会有所回报。

### 全局对象（The global object）

JavaScript 中所有的编译单元的所有顶级变量被撮合到一个被称为全局对象的公共命名空间。这是一件糟糕的事情，因为全局变量是魔鬼，但它们在 JavaScript 中却是基础。



#### for in

`for in` 语句可用来遍历一个对象中的所有属性名。该枚举将会列出素有的属性——包括函数和你可能不关心的原型中属性——所以有必要过滤掉那些你不想要的值。最为常用的方法是通过 `hasOwnProperty` 方法，以及使用 `typeof` 来排除函数。还有一点就是属性名出现的顺序是不确定的，因此要对任何可能出现的顺序有所准备。如果你想确保以正确特定的顺序出现，最好的办法是完全避免使用 `for in` 语句，在其中以正确的顺序包含属性名，通过使用 `for` 而不是 `for in` 来达到目的。

### Delete

`delete` 可以用来删除对象的属性。如果对象包含该属性，那么该属性就会被移除，该操作不会触及原型链中的任何对象。删除对象的属性可能会让来自原型链中的属性透现出来。

### Function object

JavaScript 中的函数就是对象。对象是以键值对的集合并拥有一个连接到原型对象的隐藏连接。对象字面量产生的对象，连接到 `Object.prototype` 。函数对象连接到 `Function.prototype`（该原型对象本身连接到 `Object.prototype`） 每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。

每个函数对象在创建时也随分配一个 prototype 属性。它的值是一个拥有 `constructor` 构造函数的对象。

因为函数是对象，所以它们可以像任何其他值一样被使用。函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其他函数，函数也可以再返回函数。而且，因为函数是对象，所以函数可以拥有方法。

#### 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明定义的形式参数，每个函数还接收两个附加附加的参数：`this` `arguments`  。参数 `this` 在面向对象编程中非常重要，它的值取决于调用的模式。在 JavaScript 中的一共有 4 种调用模式 ：方法调用、函数调用模式、构造器调用模式和 apply 调用模式。这些模式在如何初始化关键参数 this 上存在差异。

- **方法调用模式**
  当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this 被绑定到该对象。

  ``` javascript
  var myObject={
      value:0,
      increment:function(inc){
          thils.value+= typeof inc === 'number'? inc :1;
      }
  }
  myObject.increment();//1
  myObject.increment(2);//3
  ```

- **函数调用模式**
  当一个函数并非一个对象的属性时，那么它就会被当做一个函数来调用。这是 `this` 绑定到全局对象。
  这是语言设计上的一个错误。倘若语言设计正确，那么当内部函数被调用时，this 应该仍然绑定到外部函数的 `this` 变量。这个设计的错误的后果就是方法不能利用内部函数来帮助它工作，因为内部函数的 `this` 被绑定了错误的值，所以不能共享该方法对对象的访问权。幸运的是它很容易解决：如果该方法定一个变量并把它赋值为 `this` ，那么内部函数就可以通过那个变量访问到 `this`。

  ```javascript
  myObject.double= function (){
      var that=this;
      var helper=function(){
          that.value=add(that.value,that.value);
      };
      helper();
  }
  myObject.double();
  ```

  

- **构造器调用模式**
  JavaScript 是一门基于原型继承的语言。这意味着对象可以直接从其他对象继承属性。该语言是无类型的。
  这偏离了当今编程语言的主流风格。当今大多数语言都是基于类的语言。尽管原型继承极富表现力，但它并未被广泛理解。JavaScript 本身对它原型的本质也缺乏信心，所以它提供了一套和基于类的语言类似的对象构建语法。
  弱国在一个函数前面滴带上 new 来调用，那么背地里将会创建一个连接到该函数的 `prototype` 成员的新对象，同时 `this` 会被绑定到那个新对象上。

  ``` javascript
  var Quo = function (string){
      this.status=string;
  }
  Quo.prototype_get_status=function(){
      return this.status;
  }
  var myQuo= new Quo("confused");
  
  doucument.writeln(myQuo.get_status());// "confused"
  ```

- **Apply 调用模式**
  `apply` 方法让我们构建一个参数数组传递给调用函数。它也允许我们选择选择 `this ` 的值。 `apply` 方法接收两个参数，第一个是要绑定 `this` 的值，第二个就是一个参数数组

  ``` javascript
  var array=[3,4];
  var sum = add.apply(null,array);
  
  var statusObject ={
      status:'A-OK'
  };
  
  var status=Quo.prototype.get_status.apply(statusObject);
  // status = 'A-OK'
  ```

  

#### 参数

当函数被调用时，会附加一个额外的参数 `arguments`数组。函数可以通过此参数访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的形式参数的多余参数。

但是因为语言设计错误，`arguments` 因为语言错误并不是一个真正的数组。它只是一个类是数组的独享。它拥有个一个 `length` 属性，但它没有任何数组的方法。

#### 返回

函数总会返回一个只。如果没有指定返回值，则会返回一个 `undefined`.

``` javascript
var myObject=function{
    doucument.write('this is a document');
}
myObject;// undefined;
```

#### 扩展

之前我们已经知道，通过给 `Object.prototype` 添加方法，就可以让该方法对所有对象可用。这样的方式对函数、数组、字符、数字、正则以及布尔值都同样适用。

例如，我们可以通过给 `fucntion.prototype` 增加方法来使得该方法对所有函数都可用：

``` javascript
Function.prototype.method= function (name,func){
	if(!this.prototype[name]){
       this.prototype[name]=func;
    }
    return this;
}
```

我们还可以给字符串添加一个一个移除首尾空白的方法。

``` javascript
String.method('trim',function (){
   return this.replace(/^\s+|\s+$/g,''); 
});
doucument.writelen("  neat  ".trim());
```

#### 作用域

在编程语言中，作用域控控制着变量与参数的可见性及生命周期。对程序员来说这是一项重要的服务，因为它减少了名称冲突，并且提供了自动内存管理。

``` javascript
var foo = function{
    var a = 3 ,b =5;
    var bar =function () {
        var b=7, c= 11;
        // 此时 , a = 3 b =7 c= 11;
        a+=b+c;
        // 此时 a =21 b =7,c=11;
    };
    // 此时 a=3 b =5 ,而 C 还没被定义
    bar();
    // 此时 a =21 b =5
}
```



### JavaScript 伪类机制

JavaScript 并不允许对象直接从其他对象继承，反而插入一个多余的间接层，通过构造器函数产生对象，当一个函数对象被创建时， `Function` 构造器产生的函数对象会运行类似这样的一些代码

``` javascript
this.prototype={constructor:this};
```

新函数对象被赋予一个 `prototype` 属性，它的值是一个包含 `constructor` 属性且属性值为该新函数的对象。这个 prototype 对象是存放继承特征的地方。因为 JavaScript 语言没有提供一种方法去确定哪个函数是打算用来做构造器的，所以每个函数都会得到一个 `prototype` 对象。`constructor` 则没什么用处。

当采用构造器调用模式，即用 new 前缀去调用一个函数时，函数执行的方式会被修改。如果 new 运算符是一个方法而不是一个运算符，它可能会这样执行。

``` javascript
Function.method('new',function(){
    // 创建一个新对象，它继承自构造器函数的原型对象。
    var that = Object.create(this.prototype);
    // 调用构造器函数，绑定 - this - 到新对象上
    var other = this.apple(this,arguments);
    // 如果它的返回值不是一个对象，就返回新对象。
    return (typeof other ==='object'&&other)||that;
})

```

我们可以定义一个构造器扩充它的原型：

``` javascript
var Mammal =function(name){
    this.name=name;
};
Mammal.prototype.get_name=function(){
    return this.name;
}
Mammal.prototype.says=function(){
    return this.saying||"";
}
//现在我们可以构造一个实例
 var myMammal =new Mammal('Herb the Mammal');
 var name = myMammal.get_name(); //Herb the Mammal

// 然后我们构造另一个伪类来继承 Mammal ，这是通过定义它的 constructor 函数并替换它的
// prototype 为一个 Mammal 实现的。

var Cat = function(name){
    this.name=name;
    thils.saying='meow';
}

// 替换 Cat.prototype = 为Mammal 实例
Cat.prototype=new Mammal();
// 扩充原型对象，增加 purr 和 get_name 方法
Cat.prototype.purr = function(n){
    var i,s='';
    for(i=0;i<n;i++){
        if(s){
            s+='-';
        }
        s +='r';
    }
    return s;
};
Cat.prototype.get_name= function(){
    return this.says()+' 'this,name+' '+ this.says();
};
var myCat = new Cat('Henrietta');
var says = myCat.says();// 'meow'
var purr = myCat.purr(5);// r-r-r-r-r-r
var name = myCat.get_name();
```

**通过操作 `prototype`，我们现在有了像 ''类' 的构造器函数，但仔细看它们，你会惊讶的发现；没有私有环境，所有的属性都是公开的。无法访问 super 的方法。**而且更糟糕的是，是构造器函数存在一个严重的危害。如果你在调用构造器函数时忘记了在前面上加上 `new` 前缀，那么 this 将不会被绑定到一个新对象上。悲剧的是， `this` 将被绑定到全局对象上，所以你不但没有扩充新对象，反而破坏了全局变量环境。

这是一个严重的语言设计错误。为了降低这个问题带了的风险，**所有的构造器都约定为首字母大写的形式** 这样我们至少可以通过目视检查去发现是否缺少 `new` 前缀。一个更好的备选方案就是根本不会用 `new`，因为在基于类的语言中，类继承是代码重用的唯一方式，而 JavaScript 有着更多的选择。





### 原型

我们可以通过原型来实现&**差异化继承（differential inheritance）** 。通过定制一个新的对象，我们指明它与所给基于的基本对象的区别。

``` javascript
var myMmmal = {
    name: 'Herb the Mammal',
    get_name: function (){
        return this.name;
    },
    says: function(){
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);
myCat.name = "Coofee";
myCat.saying = "meow";
myCat.purr = function(n){
    var i,s='';
    for(i=0;i<n;i+=1){
        if(s){
            s+='-';
        }
        s+='r';
    }
    return s;
}
myCat.get_name = function(){
    return this.says+' '+ this.name +' 'this.says;
};

```



### 函数化

由于 `JavaScript `没有权限修饰符的存在，也就无法没法保存隐私，对象的所有属性都是可见得，这样做在使得别人可以很轻易的修改那些我们不想要要外部修改的属性。对此，我们也有解决方法——**函数化**。我们可以将对象的创建和实际操作拆分开来，由不同的对象负责，当负责熟悉创建的对象创建后传入给实际操作的对象时，属性对象的所有的状态都是私有的。

我们仍然在 `cat` 上实验：

``` javascript
var cat = function (spec){
    spec.saying = spec.saying||'meow';
    var that=mammal(spec);
    that.purr=function(){
        ....
    }
    that.get_name = function (){
        return that.says()+ ' '+ spec.name + ' ' + that.says();
    };
    return that;
}
var myCat = cat({name:"Henrietta"});
```

我们还可以构造一个 `superior` 方法，使我拥有处理父类方法的能力：

``` javascript
Object.method('superior',function(name){
    var that = this,method=that[name];
    return function(){
        return method.apple(that,arguments);
    };
});

```

在函数化模式中，它相比伪类拥有更大的灵活性，和更少的工作量，还让我们得到更好的封装和信息隐藏，以及访问父类方法的能力。



## 数组

JavaScript 没有像数组一样的数据结构，而是提供了一些类数组特性的对象。它把数组的下标转变为字符串，用其作为属性。它明显地比一个真正的数组慢，但它使用起来更方便。·

``` javascript
var empty=[];
var numbers=['zero','one','two'];
var numbers_object={'1':'one','2':'two','0':'zero'};

empty[1] //undefined
numbers[1] // 'one'
numbners_object[1] //'one'

empty.length // 0
numbers.length // 3
numbers_object.length // undefined
```

`numbers` 和 `numbers_object` 在使用上有一样表现。但它们也有一些显著的不同。 `numbers` 继承自 Array.prototype , 而 `numbers_object` 继承自 Object.prototype, 所以 numbers 继承了大量有用的方法。同时，`numbers` 也有一个 length 属性，而 `numbers_object` 则没有。

### Length（长度）

每个数组都有一个 length 属性。和其他语言的不同，数组的 `length` 的长度是没有上界的。如果你用大于或等于当前 length 的数字为下标来存储一个元素，那么 `length` 值会被增大以容纳新元素，不会发生数组越界的问题。

```javascript
var myArray=[];
myArray.length //0
myArray[100000] =true;
myArray.length // 10000001
// myArray 只包含一个属性
```

length 属性的值是这个数组的最大整数属性名加上1。它不一定等于数组属性的个数(无语)。

你甚至可以直接设置 length 的值。设置更大的 length 不会给数组分配更多的空间。而把 length 设小导致所有下标大于等于新的 length 的属性会被删除；

### 删除

由于 JavaScript 的数组其实是对象，所以 `delete` 运算符可以用来从数组中移除元素:

``` javascript
delete numbers[2];
// numbers =['zero','one',undefined,'shi','go']
```

不幸的是，那样会在数组种留下一个空洞。这是因为排在被删除元素之后的元素保留它们最初的属性。而你通常想要的是递减后面每个元素的属性。

幸运的是，JavaScript 数组有一个 splice 方法。它可以对数组删除一些元素并将它们ithuanwei其他的元素。

``` javascript
numbers.splice(2,1) //(下标，个数)
// numbers=['zero','one','shi','go']
```



### 扩展

从 JavaScript 的原型模式我们知道对象和函数是可以通过原型扩展方法的，数组也同样如此，我们可以通过对 `Array.prototype` 属性进行扩展来扩展数组功能的的目的。



### 初始值

数组通常不会预制值，如果你访问一个不存在的元素得到的值则是 undefined。如果你实习那的算法每个元素都从一个已知的值开始，例如，那么你必须自己准备好这个数组。



