camera.position.set( -1.5, 0.5, 2.5 );
camera.lookAt( new THREE.Vector3(0, -0.35, 0) );

let createGeometryTexture = function(geometry, size){
  let data = new Float32Array( size * size * 3 );
  let verticesLength = geometry.vertices.length;
  for (let i = 0; i < size * size; i ++) {
    if(verticesLength > i){
      data[ i * 3 ]     = geometry.vertices[i].x;
      data[ i * 3 + 1 ] = geometry.vertices[i].y;
      data[ i * 3 + 2 ] = geometry.vertices[i].z;
    } else {
      data[ i * 3 ] = data[ i * 3 + 1 ] = data[ i * 3 + 2 ] = 0.0;
    }
  }
  let dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBFormat, THREE.FloatType);
  dataTexture.needsUpdate = true;
  return dataTexture;
  console.log(dataTexture)
};

let size = 75;

let geometryTexture = createGeometryTexture( new THREE.TorusKnotGeometry( .5, .5, 75, 75 ), size);;
let geometryTextureSphere = createGeometryTexture(new THREE.SphereGeometry(1, size-1, size-1), size);
let geometryTextureBox = createGeometryTexture(new THREE.BoxGeometry(1.5, 1.5, 1.5, 26, 26, 26), size);
let geometryTextureTorus = createGeometryTexture( new THREE.TorusKnotGeometry( .5, .5, 75, 75 ), size);

// Add textures to array for iteration
let geometryTextures = [];
geometryTextures.push( geometryTextureTorus, geometryTextureBox, geometryTextureSphere );

// Change geometryTexture.image on click
let geometryTextureIndex = 0;
$('body').on('click', function(){
  geometryTextureIndex++;
  if(geometryTextureIndex > geometryTextures.length-1){
    geometryTextureIndex = 0;
  }
  geometryTexture.image = geometryTextures[geometryTextureIndex].image;
  geometryTexture.needsUpdate = true;
});

// Create the particles
let particleOptions = {
  textureSize: 75,
  explodeRate: .5,
  targetTexture: geometryTexture,
  velocityFunctionString: 'outVelocity = direction * (dist/35.0);',
  // colorFunctionString: 'color = vec4(0.455, .143, .99 - dist, 10);'
  colorFunctionString: 'color = vec4(4.0, 1.3 - dist, .83 - dist, 3);'  
  // colorFunctionString: 'color = vec4(.9, 1.3 - dist, .003 - dist, 2);'  
  //colorFunctionString: 'color = vec4(9, .5, .04, 9);' 
  // colorFunctionString: 'color = vec4(8, .5, .3, 2);'
};
let particles = new Particles(renderer, scene, particleOptions);

// Update the particles for each frame
(function updateParticles() {
  particles.pointCloud.rotation.y += 0.005;
  particles.pointCloud.rotation.z += 0.005;
  particles.update();
  window.requestAnimationFrame(updateParticles);
})();
