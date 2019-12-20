/*global THREE marker, camera, Physijs, scene, controls*/

function makeAsteroid() {
    console.log("I am a test.  This test works.");
    var asteroidloader = new THREE.ObjectLoader();
    var asteroidloader = new THREE.ObjectLoader();

    // open a terminal to unzip amodils/asteroid/asteroid.json file
  asteroidloader.load('modils/asteroid/asteroid.json', function(asteroid_obj) {

        var clonedAsteroid = asteroid_obj.clone();

        var size1 = Math.random() * 50 + 20;
        var size2 = Math.random() * 50 + 20;
        var size3 = Math.random() * 50 + 20;

        var hitbox1 = size1 + 5;
        var hitbox2 = size2 + 5;
        var hitbox3 = size3 + 5;

        var pointValue = Math.floor((size1 + size2 + size3) / 3);

        var asteroidBoxGeom = new THREE.BoxGeometry(hitbox1, hitbox2, hitbox3);
        var asteroidBoxCover = new THREE.MeshNormalMaterial();
        asteroidBoxCover.visible = false;
        var asteroidBox = new Physijs.BoxMesh(asteroidBoxGeom, asteroidBoxCover);

        clonedAsteroid.scale.set(size1, size2, size3);

        //parents the complex graphics model to the simple collision geometry
        asteroidBox.add(clonedAsteroid);
        asteroidBox.name = "asteroid";
        asteroidBox.pointValue = pointValue;
        console.log("spawn!");

        asteroidBox.position.set(-Math.random() * Math.floor(sceneWidth), -Math.random() * Math.floor(sceneHeight), -Math.random() * Math.floor(sceneDepth));
        scene.add(asteroidBox);

        var asteroidVelocity = asteroidBox.getLinearVelocity();
        asteroidVelocity.z = 150;
        asteroidVelocity.x = 10;
        asteroidVelocity.y = 10;
        asteroidBox.setLinearVelocity(asteroidVelocity);

        asteroidBox.rotation.set(Math.random() * Math.floor(360), Math.random() * Math.floor(360), Math.random() * Math.floor(360));
        asteroidBox.__dirtyRotation = true;

        asteroidBox.setAngularVelocity(
            new THREE.Vector3(Math.random() * 1, Math.random() * 1, Math.random() * 1)
        );
    })
}

function initAsteroids() {
    var asteroidloader = new THREE.ObjectLoader();

    // open a terminal to unzip a file
    asteroidloader.load('modils/asteroid/asteroid.json', function(asteroid_obj) {

        // for (var i = 0; i < 100; i++) {
        //     makeAsteroid();
        // }
        var itterations = 0;
        var spawn = setInterval(function() {
            
            makeAsteroid();
            itterations++;
            
            if(itterations >= 20) {
                clearInterval(spawn);
            }
        }, 500);

    });
}
