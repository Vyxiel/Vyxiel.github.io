let camera, 
	scene,
	controls,
	renderer,
	cube;

let mouseDown = false,
    mouseX = window.innerWidth/2,
    mouseY = window.innerHeight/2,
    deltaX = 0,
    deltaY = 0;

init();
animate();

function init(){

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	// camera.position.set( 0, 5, 2 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 400, 100, 0 );

	/*controls = new MapControls( camera, renderer.domElement );

	//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 100;
	controls.maxDistance = 500;

	controls.maxPolarAngle = Math.PI / 2;*/


	const geometry = new THREE.BoxGeometry(1, 1, 1);
	geometry.translate( 0, 0.5, 0 );
	const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

	for ( var i = 0; i < 500; i ++ ) {

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.random() * 1600 - 800;
		mesh.position.y = 0;
		mesh.position.z = Math.random() * 1600 - 800;
		mesh.scale.x = 20;
		mesh.scale.y = Math.random() * 80 + 10;
		mesh.scale.z = 20;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
		scene.add( mesh );
	}

	// cube = new THREE.Mesh( geometry, material );
 	// cube.position.y = 5;
	// scene.add( cube );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( - 1, - 1, - 1 );
	scene.add( light );

	var light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );

    // window.addEventListener( 'mousemove', onMouseMove, false );
    // window.addEventListener( 'mousedown', onMouseDown, false);
    // window.addEventListener( 'mouseup', onMouseUp, false);
   	// window.addEventListener( 'wheel', onMouseWheel, false );
   	window.addEventListener( 'resize', onWindowResize, false );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}

function onMouseMove ( evt ){
	/* Hold Mouse 1 */
    // if (!mouseDown) {
    //     return;
    // }

    evt.preventDefault();

    deltaX = evt.clientX - mouseX;
    deltaY = evt.clientY - mouseY;

    mouseX = evt.clientX;
    mouseY = evt.clientY;

    rotateScene(deltaX, deltaY);

}

function onMouseDown(evt) {
    evt.preventDefault();

    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();

    mouseDown = false;
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

function rotateScene(deltaX, deltaY) {
    cube.rotation.y += deltaX / 1000;
    cube.rotation.x += deltaY / 1000;
}

function render() {

	renderer.render( scene, camera );

}	
