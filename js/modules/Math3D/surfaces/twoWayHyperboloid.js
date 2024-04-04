Surfaces.prototype.twoWayHyperboloid = (count = 20, a = 2, b = 3, c = 4) => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i < count; i++) {
        const u = (Math.PI / count) * i;
        for (let j = 0; j < count; j++) {
          const v = ((2 * Math.PI) / count) * j;
          const x = a * Math.sinh(u) * Math.cos(v);
          const y = c * Math.cosh(u);
          const z = b * Math.sinh(u) * Math.sin(v);
          points.push(new Point(x, y, z));
        }
      }
  
      for (let i = 0; i < count; i++) {
        const u = (Math.PI / count) * i;
        for (let j = 0; j < count; j++) {
          const v = ((2 * Math.PI) / count) * j;
          const x = a * Math.sinh(u) * Math.cos(v);
          const y = -c * Math.cosh(u);
          const z = b * Math.sinh(u) * Math.sin(v);
          points.push(new Point(x, y, z));
        }
      }
  
      for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count != 0) {
          edges.push(new Edge(i, i + 1));
        }
        if (
          i + count < points.length &&
          (i < count * count - count || i >= count * count)
        ) {
          edges.push(new Edge(i, count + i));
        }
      }
      for (let i = 0; i < count; i++) {
        edges.push(
          new Edge(count * count - (i + 1) * count, count * count - 1 - count * i)
        );
        edges.push(new Edge(points.length - 1 - count * i, count * count + count * count - count * (i + 1)));
      }
  
      for (let i = 0; i < points.length; i++) {
        if (
          i + count + 1 < points.length &&
          (i < count * count - count || i >= count * count) &&
          (i + 1) % count != 0
        ) {
          polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#ffff00'));
        }
      }
  
      for (let i = 0; i < count - 1; i++) {
        polygons.push(
          new Polygon(
            [
              count * count - 1 - count * i,
              count * count - count * (i + 1),
              count * count - (i + 2) * count,
              count * count - 1 - count * (i + 1),
            ],
            '#ffff00'
          )
        );
        polygons.push(
          new Polygon(
            [
              points.length - 1 - count * i,
              points.length - count * (i + 1),
              points.length - (i + 2) * count,
              points.length - 1 - count * (i + 1),
            ],
            '#ffff00'
          )
        );
      }





    return new Surface(points, edges, polygons);
};