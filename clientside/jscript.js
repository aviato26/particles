
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 15;

let geometry = new THREE.SphereGeometry(5, 32, 32);

// exact same sphere with bigger raduis to make a spring constaint point
let geometry2 = new THREE.SphereGeometry(6, 32, 32);

// white spotlight shining from the side, casting a shadow

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

var material = new THREE.MeshPhysicalMaterial(
	{
		color: 0xffffff,
		//wireframe: true
	}
);

var sphere1 = new THREE.Mesh( geometry, material );

scene.add( sphere1 );

let x;
let y;
let z;
let dist;
let diff;
let offx;
let offy;
let offz;
let restLength = .005;
let damp1 = .09;
let damp2 = .5;
let test = 0;

var animate = function () {
	requestAnimationFrame( animate );

	for(let i = 0; i < geometry.vertices.length; i++){
		x = geometry.vertices[i].x - geometry2.vertices[i].x;
		y = geometry.vertices[i].y - geometry2.vertices[i].y;
		z = geometry.vertices[i].z - geometry2.vertices[i].z;

		dist = Math.sqrt((x * x) + (y * y) + (z * z))
		diff = (restLength - dist) / dist * damp1;
		offx = x * diff * damp2;
		offy = y * diff * damp2;
		offz = z * diff * damp2;

		geometry.vertices[i].x += offx;
		geometry.vertices[i].y += offy;
		geometry.vertices[i].z += offz;
	}

	geometry.verticesNeedUpdate = true
	material.needsUpdate = true
	renderer.render( scene, camera );
};

scene.background = new THREE.Color( 0xffffff );


animate();

let move = false;
let ind = 0;

document.addEventListener('mousedown', (e) => {
	move = !move;

	geometry.vertices[ind].x += 1
	geometry.vertices[ind].y += 1
	geometry.vertices[ind].z += 1
	ind++
})



document.addEventListener('mousemove', (e) => {
	if(move){

		sphere1.rotation.x = e.clientY * .03
		sphere1.rotation.y = e.clientX * .03

	} else {
		move = false
	}
})
