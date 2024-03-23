Surfaces.prototype.EllipticalParaboloid = (rx = 10, ry = 5, k = 0.1) => {
    const points = [];
    const edges = [];
    const polygons = [];
    for (let i = 0; i <= ry; i++) {
        for (let j = 0; j <= rx; j++) {
            const x = j / rx * 2 * Math.PI - Math.PI;
            const y = i / ry * Math.PI - Math.PI / 2;
            const z = k * Math.sinh(x) * Math.cos(y);

            points.push(new Point(x, y, z));
        }
    }

    // Generate edges
    
   

    // Generate polygons
    


    return new Surface(points, edges, polygons);
};