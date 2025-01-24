import * as THREE from 'three';

const canvas = document.getElementById('container3D');

// Renderer
const renderer = new THREE.WebGLRenderer({
	antialias: true,
    canvas
});
// renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

// Perspective Camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// Scene (Root)
const scene = new THREE.Scene();

// Light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// Parent
const objects = [];
const shapes = new THREE.Object3D();
scene.add( shapes );

// Cube Mesh
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const cubeMaterial = new THREE.MeshPhongMaterial( { 
	color: 0x320062,
	transparent: true,
	opacity: 0.9
} );
const cube = new THREE.Mesh( geometry, cubeMaterial );
shapes.add( cube );
objects.push( cube );

// Cube Outline
const edges = new THREE.EdgesGeometry( geometry ); 
const lineMat = new THREE.LineBasicMaterial( { color: 0xd5a8ff } );
const line = new THREE.LineSegments( edges, lineMat ); 
shapes.add( line );
objects.push( line );

// Mid Outline
const geoMidLine = new THREE.BoxGeometry( 20, 20, 20 );
const midEdge = new THREE.EdgesGeometry( geoMidLine );
const midLineMat = new THREE.LineBasicMaterial( { color: 0x0056ff } );
const midLine = new THREE.LineSegments( midEdge, midLineMat ); 
shapes.add( midLine );

// Outer Outline
const geoOuterLine = new THREE.BoxGeometry( 30, 30, 30 );
const outerEdge = new THREE.EdgesGeometry( geoOuterLine ); 
const outerLineMat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const outerLine = new THREE.LineSegments( outerEdge, outerLineMat ); 
shapes.add( outerLine );

// Sphere Parent
const sphere = new THREE.Object3D();
scene.add( sphere );

// Inner Sphere
const radius = 2;
const widthSegments = 12;
const heightSegments = 12;
const sphereGeo = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
const inSphereMat = new THREE.MeshPhongMaterial( { 
	color: 0x0056ff,
	transparent: true,
	opacity: 0.8
} );
const innerSphere1 = new THREE.Mesh( sphereGeo, inSphereMat );
const innerSphere2 = new THREE.Mesh( sphereGeo, inSphereMat );
innerSphere1.position.x = 25;
innerSphere2.position.x = -30;
outerLine.add( innerSphere1 );
sphere.add( innerSphere2 );

// Outer Sphere
const outSphereMat = new THREE.MeshPhongMaterial( { 
	color: 0xff0000,
	transparent: true,
	opacity: 0.8
} );
const outerSphere1 = new THREE.Mesh( sphereGeo, outSphereMat );
const outerSphere2 = new THREE.Mesh( sphereGeo, outSphereMat );
outerSphere1.position.x = -35;
outerSphere2.position.x = 40;
midLine.add( outerSphere1 );
sphere.add( outerSphere2 );

// Animation
function animate() {

	shapes.rotation.x += 0.001;
	shapes.rotation.y -= 0.001;

	objects.forEach((obj) => {
		obj.rotation.x += 0.01;
		obj.rotation.y += 0.01;
	});

    midLine.rotation.x -= 0.008;
	midLine.rotation.y -= 0.008;

	outerLine.rotation.x -= 0.004;
	outerLine.rotation.y += 0.004;

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	renderer.render( scene, camera );

}

// Resizing renderer
function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
	const width  = Math.floor( canvas.clientWidth  * pixelRatio );
	const height = Math.floor( canvas.clientHeight * pixelRatio );
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}