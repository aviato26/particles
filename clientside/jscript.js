

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,0,120);

let particles = new THREE.Geometry();

let parMaterial = new THREE.PointCloudMaterial({
  size: 1,
  color: 0x000000
})

let x;
let y;
let z;

for(let i = 0; i < 10000; i++){
  x = (Math.random() * 100) - 50;
  y = (Math.random() * 100) - 50;
  z = (Math.random() * 100) - 50;

  particles.vertices.push(new THREE.Vector3(x, y, z))
}

let pointCloud = new THREE.PointCloud(particles, parMaterial)

scene.add(pointCloud);

let dx = 0;
let dy = 0;
let dz = 0;

let move = () => {
  let constraintX;
  let constraintY;
  let constraintZ;
  let offset = 0;
  let x;

  for(let i = 0; i < 10000; i++){
    constraintX = .008 * Math.sin(dx);
    constraintY = 0.03 * Math.sin(dy);
    constraintZ = 1 * Math.sin(dz);

    particles.vertices[i].x += constraintX;
    particles.vertices[i].y += constraintY;
    particles.vertices[i].z += constraintZ;

    dx += 1.3;
    dy += 0.005;
    dz += 0.01;
    if(i < 100){
//      particles.material.colors.setHex(0xffffff);
    }
/*
    particles.vertices[i].x *= 1.009;
    particles.vertices[i].y *= 1.009;
    particles.vertices[i].z *= 1.009;

   x = particles.vertices[i].x;
   y = particles.vertices[i].y;
   z = particles.vertices[i].z;

   particles.vertices[i].x = mapRange(Math.sin(x), -1, 1, -50, 50);
   particles.vertices[i].y = mapRange(Math.sin(y), -1, 1, -50, 50);
   particles.vertices[i].z = mapRange(Math.sin(z), -1, 1, -50, 50);
//   particles.vertices[i].y = mapRange(Math.sin(y), -1, 1, 0, 100);
*/

  }
}
console.log(pointCloud)
var animate = function () {
  requestAnimationFrame( animate );

  move()
//a = particles.vertices[0].x
//b = particles.vertices[0].y

//console.log(100 * Math.sin(a))
/*
b = 5 * Math.sin(a);
particles.vertices[0].x = b;
a += 0.2;
*/
//particles.vertices[0].x = mapRange(Math.sin(a), -1, 1, -50, 50);
//particles.vertices[0].y = mapRange(Math.sin(b), -1, 1, -50, 50);

//particles.vertices[0].x = (a - -1) / (1 - -1) * (0.1 - 0) + 0.1;

  particles.verticesNeedUpdate = true;
  particles.colorsNeedUpdate = true;
  renderer.render( scene, camera );
};

scene.background = new THREE.Color(0xffffff)

animate();
