class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.divided = false;
        this.points = [];
    }
    divide() {
        this.divided = true;

        let w = this.boundary.size.x / 2;
        let h = this.boundary.size.y / 2;

        let tl = new Rectangle(this.boundary.pos.x, this.boundary.pos.y, w, h);
        this.TopLeft = new QuadTree(tl, this.capacity);

        let tr = new Rectangle(this.boundary.pos.x + w, this.boundary.pos.y, w, h);
        this.TopRight = new QuadTree(tr, this.capacity);

        let bl = new Rectangle(this.boundary.pos.x, this.boundary.pos.y + h, w, h);
        this.BottomLeft = new QuadTree(bl, this.capacity);

        let br = new Rectangle(this.boundary.pos.x + w, this.boundary.pos.y + h, w, h);
        this.BottomRight = new QuadTree(br, this.capacity);
    }
    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) this.divide();
        let inserted = (
            this.TopLeft.insert(point) ||
            this.TopRight.insert(point) ||
            this.BottomLeft.insert(point) ||
            this.BottomRight.insert(point));
        return inserted;
    }
    query(range) {
        let found = [];
        if (!this.boundary.intersects(range)) return found;
        this.points.forEach((point) => {
            if (range.contains(point)) found.push(point);
        })
        if (this.divided) {
            found = found.concat(this.TopLeft.query(range));
            found = found.concat(this.TopRight.query(range));
            found = found.concat(this.BottomLeft.query(range));
            found = found.concat(this.BottomRight.query(range));
        }
        return found;
    }
    draw(canvas) {
        canvas.rectangle(this.boundary.pos.x, this.boundary.pos.y, this.boundary.size.x, this.boundary.size.y, '#555555');
        if (this.divided) {
            this.TopLeft.draw(canvas);
            this.TopRight.draw(canvas);
            this.BottomLeft.draw(canvas);
            this.BottomRight.draw(canvas);
        }
        this.points.forEach(p => {
            canvas.point(p.x, p.y, 'white', 5);
        });
    }
}