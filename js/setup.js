	var raycaster = new THREE.Raycaster();

	var $container = $('#canvasContainer');
	var backgroundColor = 0x000000;

	//set lazy animation
	window.requestAnimationFrame = (function(){
			return  window.requestAnimationFrame       || 
							window.webkitRequestAnimationFrame || 
							window.mozRequestAnimationFrame    || 
							window.oRequestAnimationFrame      || 
							window.msRequestAnimationFrame     || 
							function(/* function */ callback, /* DOMElement */ element){
								window.setTimeout(callback, 1000 / 60);
							};
		})();

	// set the scene size
	var WIDTH = $(window.document).width();
	var HEIGHT = $(window.document).height();
	var ASPECT = WIDTH / HEIGHT;

	// WebGL Renderer
	var renderer = new THREE.WebGLRenderer({antialias: true });
	renderer.setClearColor(backgroundColor, 1);
	renderer.setSize(WIDTH, HEIGHT);
	//handles on window resize
	let onWindowResize = () => {
		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	};
	window.addEventListener( 'resize', onWindowResize, false );

	// Scene
	var scene = new THREE.Scene();

	// Camera
	var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.01,50 );
	camera.position.set( -5, 1, 10 );
	camera.lookAt( new THREE.Vector3(0,0,0) );
	scene.add(camera);

	// Render loop
	function render() {
		renderer.render(scene, camera);
		window.requestAnimationFrame(render);
	}

	// Append to DOM
	$container.append(renderer.domElement);

	// Kick off render loop
	render();
