import React,{PureComponent} from "react";

function addAge(target:Function){
    target.prototype.age=111
}

//装饰器写法，在tsconfig配置开启
@addAge
class CustomConpo extends PureComponent{
    age?:number
    render(){
        return <div>
            <span>{this.age+'公因子'}</span>
        </div>
    }
}
export default CustomConpo