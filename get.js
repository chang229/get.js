// 封装for循环
	var each = function(arr,fn){
		for( i = 0;i < arr.length; ++i){
			if(fn.call(arr[i],i,arr[i]) === false ){
				break;
			}
		}
	};
// 设置support函数
	var support = {};
	support.getElementsByClassName = (function(){
		var IsSup = !!document.getElementsByClassName;
		if( IsSup ){
			var div = document.createElement("div"),
			divWithClass = document.createElement("div");
			divWithClass.className = "pc";
			div.appendChild(divWithClass);
			return div.getElementsByClassName("pc")[0] === divWithClass;
		}
		return false;
	})();
// 自己封装push方法
push = {
	array:function(target,else){
		var j = target.length,
			i = 0;
		while (target[j++] = else[i++]){ };
		target.length = j - 1; 
	}
}
// 检测push方法是否可用
try{
	var div = document.createElement("div");
	div.innerHTML = "<div></div><div></div>";
	var divs = div.getElementsByTagName("div"),
		resultes = [];
	resultes.push.apply(resultes,divs);
} catch (e){
	// 不可用时调用自己写的push方法
	Array.prototype.push = push ;
};
// 封装getClassName方法
	var getClass = function(className,context,result){
		result = result || [];
		context = context || document;
		// 判断是否支持
		if( support.getElementsByClassName ){
			// 支持
			result.push.apply(result,context.getElementsByClassName(className));
		}else{
			// 不支持
			var allArr = getTag("*");
			each(allArr,function(){
				if((" " + this.className + " ").indexOf(" " + className + " ") != -1){
					result.push(this);
				}
			})
		}
		return result;
	};
// 封装getTag方法
	var getTag = function(tag,context,result){
		result = result || [];
		context = context || document;
		result.push.apply(result,context.getElementsByTagName(tag));
		return result;
	};
// 封装getId方法
	var getId = function(id,result){
		result = result || [];
		result.push(document.getElementById(id));
		return result;
	};
// 封装get方法
	var get = function(selector,context,result){
		result = result || [];
		context = context || document;
		var aExpet = /^(?:#([\w-]+)|\.([\w-]+)|([\w-]+)|(\*))$/,
		m = aExpet.exec(selector);
		if(m){
			if( context.nodeType ){
				context = [ context ];
			};
			if( typeof( context ) === "string" ){
				context = get( context );
			}
			each(context,function(i,v){
				if(m[1]){
					result = getId(m[1],result);
				}else if(m[2]){
					result = getClass(m[2],this,result);
				}else if(m[3]){
					result = getTag(m[3],this,result);
				}else if(m[4]){
					result = getTag(m[4],this,result);
				}
			});
		}
		return result;
	};
// 实现基本选择器：如：
// get(".box")通过类名选择节点
// get("#id")通过id选择
// get("*")选择全部节点
// get("div")通过标签名选择节点
// get(".box","div")选择div下的.box节点
