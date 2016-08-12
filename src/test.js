function add(a,b,c){
	return a+b+c;
}

function a(x){
	return function(y){
		return function(z){
			return x+y+z;
		}
	}
}

console.log(a(2)(3)(4));