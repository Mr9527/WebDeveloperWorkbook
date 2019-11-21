## 注册

`Vue ` 的注册分为**全局注册**和**局部注册**，它们各有各自的特点：

#### 全局注册

``` javascript
Vue.component('my-conponment-name',{
	....
})
```

通过 `Vue.component` 声明的组件即为全局注册组件，它们在创建之后可以用在任何新创建的 `Vue ` 根实例的模板中。这样看似很方便、有利无害但其实不然。任何语言和库都不推崇滥用制造全局的功能，它会使得项目难以管理和问题追踪， 且如果你使用类似 `webpack` 这样的构建系统，全局注册的组件使得即使你并没有使用，它也仍然会包裹在你的最终构建结果中，造成了 JS 文件体量的增加。

#### 局部注册
通常情况下，我们可以通过普通的对象来定义组件，然后在 `Vue` 实例的 `components` 中定义即可。

``` javascript
var CompoentA={/*...*/}
var CompoentB={/*...*/}
var CompoentC={/*...*/}

new Vue({
    el:"#app",
    components:{
        'component-b':ComponentA,
        'ccomponent-a':ComponentsB,
    }
})
```

对于 `components` 对象中的每个属性来说，其属性就是自定义元素的名字，其属性值就是这个组件的选项对象。

局部注册的声明和使用同样很方便，但是有一点需要注意的是**局部注册的组件在其子组件中不可用**，如果你遇到这种情况你需要在父组件中声明需要使用到的组件:

```javascript
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

如果你使用了 ES6 语法模块，那么也可以这样声明:

``` javascript
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
// tips: 注意在 ES2015+ 中，在对象中放一个类似 ComponentA 的变量名其实是 ComponentA: ComponentA 的缩写，即这个变量名同时是名称和属性值
```



## Prop

当我们需要像组件传递数据的时候就需要用到 `prop` 属性，**`prop` 可以接受任何类型的值**，包括对象、数组、字符串布尔值等，同时我们也可以对这些属性的值指定具体的类型以及条件，这样不仅对你的组件提供了文档，还会在它们遇到错误类型的时候获得提示。

``` javascript
props: {
  title: String,
  //多个类型
  likes: [String,Number],
  //默认值    
  isPublished:{
      type:Boolean,
      default:100
  },
  //必填的参数    
  commentIds: {
      type:Array,
      required:true
  },
  // 如果是对象想要创建一个默认值，则必须使用一个 工厂函数来提供
  author: {
      type:Object,
      default:function(){
              return {message:'hello'}
          }
  },
  //自定义验证函数
  age:{
    validator:function(value){
        return value>0&&value<100;
    }  
  },    
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

### 单向数据流

所有的 `prop` 都使得其父子 prop 之间形成了一个单向下行绑定： 父级别 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父组件的状态。从而导致你的数据流向难以理解。

额外的，每次父级别组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内改变 prop 。如果你这样做了, `Vue` 会在浏览器中发出警告。

## 组件特性

### 设置特性

`prop` 适用于向一个子组件显示的传递信息，然后这并不能解决所有的使用场景，我们无法预料组件和其子组件需要什么。所以在 `Vue` 中，组件可以接受任意的特性，这些特性会被写入到这个组件的根元素中。

例如我们使用一个第三方的日期选择插件 `<bootstrap-data-input>` 我们需要在其 `<input>` 上指定一个属性，虽然组件并没有声明相关的 `prop` 但我们仍然可以将这个特性添加到组件上

```javascript
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>

```

通常情况下，我们通过外部提供给组件的值会替换组件内部设置好的值。所以如果传入 `type="text"` 就会替换掉 `type="data"`。但是我们常用的需要累加的 `class` 和 `style` 在表现上有些不一样，它们会尝试将两边的值合起来从而得到最终的值：

``` javascript
<bootstrap-data-input id="data-input" class="newStyle"></bootstrap-data-input>


var element=document.getElementById('data-input');
element.className; // oldStyle newStyle
```

### 禁用特性继承

如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 `inheriAttrs:false` 来禁用，但是即使使用了该属性，也不会影响 `class` 与 `style` 属性的绑定。

``` javascript
Vue.component('my-component',{
    inheritAttrs:false,
})
```

