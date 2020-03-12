

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,0,120);

let lut = new Lut('cooltowarm')
lut.setMin(0);
lut.setMax(1000)

let sphere = new THREE.SphereGeometry(40, 20, 20);

var material = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  vertexColors: THREE.VertexColors
} );

let mesh = new THREE.Mesh(sphere, material);

scene.add(mesh);

console.log(sphere)

sphere.faces.map((c, i) => {
  c.color = lut.getColor(i)
})

var animate = function () {
  requestAnimationFrame( animate );

  sphere.verticesNeedUpdate = true;
  sphere.colorsNeedUpdate = true;
  mesh.colorsNeedUpdate = true;
  renderer.render( scene, camera );
};

scene.background = new THREE.Color(0xffffff)

animate();
