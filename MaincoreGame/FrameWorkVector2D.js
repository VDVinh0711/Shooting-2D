// export class Vector2D {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     static distance(v1, v2) {
//         return this.direction(v1,v2).magnitude();
//     }

//     normalize() {
//         const magnitude = this.magnitude();
//         if (magnitude > 0) {
//             return new Vector2D(this.x / magnitude, this.y / magnitude);
//         } else {
//             return new Vector2D(0, 0); 
//         }
//     }

//     static direction(v1, v2) {
//         const dx = v2.x - v1.x;
//         const dy = v2.y - v1.y;
//         const directionVector = new Vector2D(dx, dy);
//         return directionVector.normalize(); 
//     }

//     magnitude() {
//         return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
//     }
// }
