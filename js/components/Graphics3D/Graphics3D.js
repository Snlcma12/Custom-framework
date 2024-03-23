class Graphics3D extends Component {
    constructor(props) {
        super(props);


        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50),
        };

        this.graph = new Graph({
            id: "graph3D",
            width: 600,
            height: 600,
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseMove: (event) => this.mouseMove(event),
                mouseLeave: () => this.mouseLeave(),
            },
        });
        this.math3D = new Math3D(this.WIN);
        const surfaces = new Surfaces();
        this.scene = [surfaces.cube()];
        this.LIGHT = new Light(-40, 15, 0, 1250);
        //this.scene = this.SolarSystem();
        
    
        setInterval(() => {
        this.scene.forEach(surface=>surface.doAnimation(this.math3D));
        this.render3D();
        },50);

        this.color = "#ff2a00";
        this.polygonsOnly = true;
        this.pointOnly = true;
        this.edgesOnly = true;
        this.animationActive = true;
        this.canMove = false;
        this.dx = 0;
        this.dy = 0;
        
        this.render3D();
        this.animate();
    }

    addEventListeners() {
        document.getElementById("SelectSurface")
            .addEventListener("change", (event) => {
                this.scene = [(new Surfaces)[event.target.value]()];
                this.render3D();
            });
        document.querySelectorAll('.surfaceCustom').forEach(input =>
            input.addEventListener("input", (event) => {
                this[event.target.dataset.custom] = event.target.checked;
                this.render3D();
            })
        );
        document.getElementById("animationControl").addEventListener("change", (event) => {
            this.animationActive = event.target.checked;
            if (this.animationActive) {
              this.animate();
            }
          });
    }

    

    wheel(event) {
        event.preventDefault();
        const delta = event.wheelDelta < 0 ? 0.9 : 1.1;
        const matrix = this.math3D.zoom(delta);
	    this.scene.forEach(surface => surface.points.forEach(point => this.math3D.transform(matrix, point)));
        this.render3D();
    }

    mouseUp() {
        this.canMove = false;
    }
    mouseDown() {
        this.canMove = true;
    }
    mouseLeave() {
        this.canMove = false;
    }

    mouseMove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            const alphaX = gradus * (this.dy - event.offsetY);
            const alphaY = gradus * (this.dx - event.offsetX);
            const tX = this.math3D.rotateOx(alphaX);
            const tY = this.math3D.rotateOy(alphaY);
            this.scene.forEach(surface =>
                surface.points.forEach((point) => {
                    this.math3D.Pointer(point, tX);
                    this.math3D.Pointer(point, tY);
                })
            );
            this.render3D();
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    animate() {
        if (!this.animationActive) return;
    
        requestAnimationFrame(() => this.animate());
    
        this.scene.forEach(surface => surface.doAnimation(this.math3D));
        this.render3D();
      }
    

    render3D() {
        this.graph.clear();
        if (this.polygonsOnly) {
            const polygons = [];
            this.scene.forEach((surface, index) => {
                this.math3D.calcDistance(surface, this.WIN.CAMERA, "distance");
                this.math3D.calcDistance(surface, this.LIGHT, "lumen");
                surface.polygons.forEach(polygon => {
                    polygon.index = index;
                    polygons.push(polygon);
                });
            });
            this.math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach((polygon) => {
                const points = polygon.points.map(index => {
                    return new Point(
                        this.math3D.xs(this.scene[polygon.index].points[index]),
                        this.math3D.ys(this.scene[polygon.index].points[index])
                    );
                });
                const lumen = this.math3D.calcIllumination(
                    polygon.lumen,
                    this.LIGHT.lumen
                );
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph.drawPolygon(points, polygon.rgbToHex(r, g, b));
            });
        }
        if (this.pointOnly) {
            this.scene.forEach((surface) =>
                surface.points.forEach((point) => {
                    this.graph.drawPoint(
                        this.math3D.xs(point),
                        this.math3D.ys(point),
                    );
                })
            );
        }
        if (this.edgesOnly) {
            this.scene.forEach((surface) =>
                surface.edges.forEach((edge) => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    this.graph.drawLine(
                        this.math3D.xs(point1),
                        this.math3D.ys(point1),
                        this.math3D.xs(point2),
                        this.math3D.ys(point2),
                        this.color
                    );
                })
            );
        }
    }
}
