let camera, scene, renderer;
let cube;

let orbit;

function init(){

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff)

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 5, 2 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	const material = new THREE.MeshNormalMaterial( { color: 0x333333 } );

	// for ( let i = 0; i <= 10; i ++ ) {
    
    	cube = new THREE.Mesh( geometry, material );
      	cube.position.y = 5;
    	scene.add( cube );
    // }

   	window.addEventListener( 'wheel', onMouseWheel, false );
   	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function onMouseWheel( event ) {

	event.preventDefault();

	// camera.position.y -= event.deltaY * 0.005;

	cube.rotation.x += 0.05;
	cube.rotation.y += 0.05;
	cube.rotation.z -= 0.05;
  
  // prevent scrolling beyond a min/max value
  
  	camera.position.clampScalar( 0, 10 );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

init();
animate();