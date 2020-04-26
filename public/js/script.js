let camera, 
	scene,
	controls,
	renderer,
	raycaster,
	cube;

let mouseDown = false,
	mouse,
	INTERSECTED = null,
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
	camera.position.set( 400, 300, 0 );
	camera.rotation.x = Math.PI * Math.sin( 60 );

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	geometry.translate( 0, 0.5, 0 );

	for ( var i = 0; i < 500; i ++ ) {
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
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

    window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'mouseout', onMouseOut, false);
	window.addEventListener( 'mouseleave', onMouseLeave, false);
    window.addEventListener( 'mousedown', onMouseDown, false);
    window.addEventListener( 'mouseup', onMouseUp, false);
   	// window.addEventListener( 'wheel', onMouseWheel, false );
   	window.addEventListener( 'resize', onWindowResize, false );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}

function clearPicking(){
	 mouse.x = -100000;
	 mouse.y = -100000;
}

function onMouseMove ( evt ){
	/* Hold Mouse 1 */
    if (!mouseDown) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        return;
    }
    
    clearPicking();
    evt.preventDefault();

    deltaX = evt.clientX - mouseX;
    deltaY = evt.clientY - mouseY;

 	mouseX = evt.clientX;
    mouseY = evt.clientY;

    translateCamera(deltaX, deltaY);

}

function onMouseOut (evt){
	 clearPicking();
}

function onMouseLeave (evt){
	 clearPicking();
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

function translateCamera(deltaX, deltaY) {
    // scene.rotation.y += deltaX / 1000;
    // scene.rotation.x += deltaY / 1000;
    camera.position.x -= deltaX / 2;
    camera.position.z -= deltaY / 2;
}

function render() {
	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
  		if ( INTERSECTED != intersects[ 0 ].object ) {
	        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	        INTERSECTED = intersects[ 0 ].object;
	        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	        INTERSECTED.material.emissive.setHex( 0xff0000 );
	         // console.log(intersects.length);
	         if(mouseDown)  $('html,body').css('cursor', 'grabbing');
	         else $('html,body').css('cursor', 'pointer');
  			}
    	} else {
	      	if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	      	INTERSECTED = null;
	        if(mouseDown)  $('html,body').css('cursor', 'grabbing');
	      	else $('html,body').css('cursor', 'grab');
    }

	renderer.render( scene, camera );
}	
