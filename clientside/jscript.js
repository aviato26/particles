

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
  }
}
console.log(pointCloud)
var animate = function () {
  requestAnimationFrame( animate );

  move()

  particles.verticesNeedUpdate = true;
  particles.colorsNeedUpdate = true;
  renderer.render( scene, camera );
};

scene.background = new THREE.Color(0xffffff)

animate();
