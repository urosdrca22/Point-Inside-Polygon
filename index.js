class Point
{
    constructor(x, y)
    {
        this.x = x;
            this.y = y;
    }
}

// A function that determines the orientation of a line based on 3 given points
// Returns 0, 1 or 2 for the corresponding orientation
const Orientation = (p, q, r) => {

    let cross_product = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    
    if (cross_product == 0){
        return 0; //collinear
    }
    else if (cross_product > 0){
        return 1; //clockwise orientation
    }
    else{   
        return 2; //counter-clockwise orientation
    }
};

// Determine if two segments intersect based on their orientation 
// Returns true if segments intersect
const Intersection = (p1, q1, p2, q2) => {

    const p1q1p2 = Orientation(p1, q1, p2);
    const p1q1q2 = Orientation(p1, q1, q2);
    const p2q2p1 = Orientation(p2, q2, p1);
    const p2q2q1 = Orientation(p2, q2, q1);

    if (p1q1p2 != p1q1q2 && p2q2p1 != p2q2q1){
        return true; 
    }
    else{
        return false;
    }
};


//The main function to determine if the point is inside the polygon
//Returns true if the point is inside, false otherwise
const pointInsidePolygon = (polygon, polygon_length, point) => {
    
    const INF = 10000;
    let infinite = new Point(INF, point.y)
    let intersect_count = 0;
    let i = 0;
    
    do
    {
        let next = (i + 1) % polygon_length;
        if (Intersection(polygon[i], polygon[next], point, infinite)){
            intersect_count += 1;
        }
        i = next;
    }
    while (i != 0);

    if (intersect_count % 2 == 1){
        return true;
    }
    else{
        return false;
    }
};


//Testing 
polygon1 = [new Point(0, 0),
    new Point(10, 0),
    new Point(10, 10),
    new Point(0, 10)];

let polygon1_length = polygon1.length;
let p1 = new Point(-1, 10);

if (pointInsidePolygon(polygon1, polygon1_length, p1))
    {
        console.log('inside');
    }
    else
    {
        console.log('outside');
    }
