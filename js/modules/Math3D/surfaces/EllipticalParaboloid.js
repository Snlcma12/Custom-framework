Surfaces.prototype.EllipticalParaboloid = (a = 1, b = 1, c = 1) => {
    const points = [];
    const edges = [];
    const polygons = [];
    const step = 0.1;
    for (let u = -Math.PI; u < Math.PI; u += step) {
        for (let v = -Math.PI; v < Math.PI; v += step) {
            const x = a * Math.cosh(u) * Math.cos(v);
            const y = b * Math.sinh(u) * Math.sin(v);
            const z = c * Math.sinh(u);
            points.push(new Point(x, y, z));
        }
    }

    for (let u = -Math.PI; u < Math.PI; u += step) {
        for (let v = -Math.PI; v < Math.PI; v += step) {
            var first = u * (Math.PI + 1) + v;
            var second = first + Math.PI + 1;
            edges.push(new Edge(first, second));
        }
    }
   


    
    


    return new Surface(points, edges, polygons);
};