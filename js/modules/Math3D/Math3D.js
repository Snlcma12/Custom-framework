class Math3D {
  constructor(WIN) {
    this.WIN = WIN;
  }

  xs(point) {
    const zs = this.WIN.CENTER.z;
    const z0 = this.WIN.CAMERA.z;
    const x0 = this.WIN.CAMERA.x;
    return ((point.x - x0) / (point.z - z0)) * (zs - z0) + x0;
  }

  ys(point) {
    const zs = this.WIN.CENTER.z;
    const z0 = this.WIN.CAMERA.z;
    const y0 = this.WIN.CAMERA.y;
    return ((point.y - y0) / (point.z - z0)) * (zs - z0) + y0;
  }

  Pointer(point, T) {
    const array = this.multPoint(T, [point.x, point.y, point.z, 1]);
    point.x = array[0];
    point.y = array[1];
    point.z = array[2];
  }

  multPoint(T, m) {
    const a = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      let b = 0;
      for (let j = 0; j < 4; j++) {
        b += T[j][i] * m[j];
      }
      a[i] = b;
    }
    return a;
  }

  zoom(delta) {
    return [
      [delta, 0, 0, 0],
      [0, delta, 0, 0],
      [0, 0, delta, 0],
      [0, 0, 0, 1]
    ];
  }

  move(dx, dy, dz) {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [dx, dy, dz, 1]
    ];
  }

  rotateOx(alpha) {
    return [
      [1, 0, 0, 0],
      [0, Math.cos(alpha), Math.sin(alpha), 0],
      [0, -Math.sin(alpha), Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  rotateOy(alpha) {
    return [
      [Math.cos(alpha), 0, -Math.sin(alpha), 0],
      [0, 1, 0, 0],
      [Math.sin(alpha), 0, Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  rotateOz(alpha) {
    return [
      [Math.cos(alpha), Math.sin(alpha), 0, 0],
      [-Math.sin(alpha), Math.cos(alpha), 0, 0],
      [0, 0, Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  transform(matrix, point){
    const result = this.multPoint(matrix, [point.x, point.y, point.z, 1]);
    point.x = result[0];
    point.y = result[1];
    point.z = result[2];
   }	
   
   getTransform(args){
    return args.reduce(
      (s,t) => this.multMatrix(s,t),
      [[1,0,0,0],
      [0,1,0,0],
      [0,0,1,0],
      [0,0,0,1]]
    );	
  }

  multMatrix(T1, T2) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result[i] = [];
      for (let j = 0; j < 4; j++) {
        result[i][j] = 0;
        for (let k = 0; k < 4; k++) {
          result[i][j] += T1[i][k] * T2[k][j];
        }
      }
    }
    return result;
  }

  SolarSystem(){
    const Earth = this.surfaces.sphere();
    Earth.addAnimation('rotateOy',0.1);
    const Moon = this.surfaces.cube();
    Moon.addAnimation('rotateOx',0.2);
    Moon.addAnimation('rotateOx',0.05);
    return[Earth,Moon];
  }
  
  


  calcDistance(surface, endPoint, name) {
    surface.polygons.forEach((polygon) => {
      let x = 0, y = 0, z = 0;
      polygon.points.forEach((index) => {
        x += surface.points[index].x;
        y += surface.points[index].y;
        z += surface.points[index].z;
      });
      x /= polygon.points.length;
      y /= polygon.points.length;
      z /= polygon.points.length;
      polygon[name] = Math.sqrt(
        (endPoint.x - x) ** 2 +
        (endPoint.y - y) ** 2 +
        (endPoint.z - z) ** 2
      );
    });
  }

  sortByArtistAlgorithm(polygons) {
    polygons.sort((a, b) => b.distance - a.distance);
  }

  calcIllumination(distance, lumen) {
    const illum = distance ? lumen / distance ** 2 : 1;
    return illum > 1 ? 1 : illum; 
  }
}

