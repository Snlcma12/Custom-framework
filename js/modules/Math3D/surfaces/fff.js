Surfaces.prototype.fff = (count = 10, color = '#aaffee') => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let x = -count; x < count; x++) {
        for (let y = -count; y < count; y++) {
            const z = x ** 2 / 10 + y ** 2 / 20;
            points.push(new Point(x, y, z));
        }
    }

    console.log(points);

    /*
    for (var lat = 0; lat < count; lat++) {
        for (var lon = 0; lon < count; lon++) {
            var first = lat * (count + 1) + lon;
            var second = first + count + 1;
            edges.push(new Edge(first, second));
            edges.push(new Edge(first + 1, second));
            edges.push(new Edge(second + 1, first + 1));
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (points[i + 1 + count]) {
            polygons.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], '#00ffee'));
        }
    }
    */
    return new Surface(points, edges, polygons);
};
