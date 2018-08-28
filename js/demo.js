var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, windowWidth/windowHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

var keyboard = {};
var player = { height: 1.8, speed: 0.5, turnSpeed: Math.PI * 0.02 };
var zMax = 22.5
var zMin = -22.5
var xMax = 22.5
var xMin = -22.5

renderer.setSize( windowWidth, windowHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe: false } );
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh( geometry, material );
var meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 10, 10),
    new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false })
);
var meshWall = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 10, 10),
    new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false })
);
var meshWall2 = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 10, 10),
    new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false })
);
var meshWall3 = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 10, 10),
    new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false })
);
var meshWall4 = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 10, 10),
    new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false })
);
var meshRoof = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 10, 10),
    new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false })
);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
var pointLight = new THREE.PointLight(0xffffff, 0.9, 25);
var pointLight2 = new THREE.PointLight(0xffffff, 0.9, 25);
var pointLight3 = new THREE.PointLight(0xffffff, 0.9, 25);
var pointLight4 = new THREE.PointLight(0xffffff, 0.9, 25);


pointLight.position.set(-10, 10, -5);
pointLight2.position.set(10, 10, -5);
pointLight3.position.set(10, 10, 5);
pointLight4.position.set(-10, 10, 5);

cube.receiveShadow = true;
cube.castShadow = true;
cube2.receiveShadow = true;
cube2.castShadow = true;
meshFloor.receiveShadow = true;
meshWall.receiveShadow = true;
meshWall2.receiveShadow = true;

scene.add( ambientLight );
scene.add( pointLight );
scene.add ( pointLight2 );
scene.add ( pointLight3 );
scene.add ( pointLight4 );
scene.add( meshFloor );
scene.add( meshWall );
scene.add( meshWall2 );
scene.add( meshWall3 );
scene.add( meshWall4 );
scene.add( meshRoof );
scene.add( cube );
scene.add( cube2 );

cube.position.y += 1
cube.position.x -= 1
cube2.position.x += 2
cube2.position.y += 1

meshWall.position.y = 5
meshWall.position.z = -22.5
meshWall2.position.y = 5
meshWall2.position.z = 22.5
meshWall3.position.y = 5
meshWall3.position.x = 22.5
meshWall4.position.y = 5
meshWall4.position.x = -22.5
meshRoof.position.y = 25

meshFloor.rotation.x -= Math.PI / 2;
meshRoof.rotation.x += Math.PI / 2;
meshWall3.rotation.y -= Math.PI / 2;
meshWall4.rotation.y += Math.PI / 2;

var walls = [ meshFloor, meshWall, meshWall2, meshWall3, meshWall4, meshRoof ]
var lights = [ pointLight, pointLight2, pointLight3 ]

lights.forEach( function(node) {
    node.castShadow = true;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 25;
});

walls.forEach( function( node ) {
    node.receiveShadow = true;
    if( node.material ) {
        node.material.side = THREE.DoubleSide;
    }
});


camera.position.z = 5;
// camera.position.x = 2;
camera.position.y = player.height;

var animate = function () {
    requestAnimationFrame( animate );
    checkPosition();
    updatePosition(camera.position)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    if (keyboard[38] || keyboard[87]) { // up arrow key or W
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[40] || keyboard[83]) { // up arrow key or W
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[65]) { // A
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }
    if (keyboard[68]) { // D
        camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }
    if (keyboard[37]) { // left arrow key 
        camera.rotation.y += player.turnSpeed;
    }
    if (keyboard[39]) { // right arrow key 
        camera.rotation.y -= Math.PI * 0.01;
    }

    renderer.render( scene, camera );
};

function keyDown(event) {
  keyboard[event.keyCode] = true;
};

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

function checkPosition() {
    if (camera.position.x > xMax - 1) {
        camera.position.x = xMax - 1;
    } else if (camera.position.z > zMax - 1) {
        camera.position.z = zMax - 1;
    } else if (camera.position.x < xMin + 1) {
        camera.position.x = xMin + 1;
    } else if (camera.position.z < zMin + 1) {
        camera.position.z = zMin + 1;
    }
};

function updatePosition(position) {
  document.getElementById('text-overlay').innerHTML = "Position: \n" + "X: " + position.x + "\nZ: " + position.z;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);


animate();