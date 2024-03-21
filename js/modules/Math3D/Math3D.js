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
    const array = this.multMatrix(T, [point.x, point.y, point.z, 1]);
    point.x = array[0];
    point.y = array[1];
    point.z = array[2];
  }

  multMatrix(T, m) {
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
    const T = [
      [delta, 0, 0, 0],
      [0, delta, 0, 0],
      [0, 0, delta, 0],
      [0, 0, 0, 1]
    ];
    return T;
  }

  move(dx, dy, dz) {
    const T = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [dx, dy, dz, 1]
    ];
    return T;
  }

  rotateOx(alpha) {
    const T = [
      [1, 0, 0, 0],
      [0, Math.cos(alpha), Math.sin(alpha), 0],
      [0, -Math.sin(alpha), Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
    return T;
  }

  rotateOy(alpha) {
    const T = [
      [Math.cos(alpha), 0, -Math.sin(alpha), 0],
      [0, 1, 0, 0],
      [Math.sin(alpha), 0, Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
    return T;
  }

  rotateOz(alpha) {
    const T = [
      [Math.cos(alpha), Math.sin(alpha), 0, 0],
      [-Math.sin(alpha), Math.cos(alpha), 0, 0],
      [0, 0, Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
    return T;
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

