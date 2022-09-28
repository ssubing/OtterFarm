class VectorUtils {
	static add(v1, v2) {
	  return { x: v1.x + v2.x, y: v1.y + v2.y }
	}
  
	static subtract(v1, v2) {
	  return { x: v1.x - v2.x, y: v1.y - v2.y }
	}
  
	static multiply(v1, factor) {
	  //console.log("Multiply", v1, factor,{x:factor*v1.x, y:factor*v1.y});
	  return { x: factor * v1.x, y: factor * v1.y }
	}
  
	static divide(v1, factor) {
	  if (factor === 0) return v1
	  //console.log("Divide", v1, factor,{x:v1.x/factor, y:v1.y/factor});
	  return { x: v1.x / factor, y: v1.y / factor }
	}
  
	static magnitude(v) {
	  //console.log("Magnitude", v, Math.sqrt((v.x*v.x)+(v.y*v.y)));
	  return Math.sqrt(v.x * v.x + v.y * v.y)
	}
  
	static distance(v1, v2) {
	  return VectorUtils.magnitude(VectorUtils.subtract(v1, v2))
	}
  
	static normalize(v1, magnitude = 1) {
	  return VectorUtils.multiply(
		VectorUtils.divide(v1, VectorUtils.magnitude(v1)),
		magnitude
	  )
	}
  }
  
  export default VectorUtils
  