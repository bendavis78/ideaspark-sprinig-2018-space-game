/*global THREE marker, camera, Physijs, scene, controls*/

function createSpacePlane() {
    var modelobj = new THREE.ObjectLoader();

    modelobj.load('modils/spooce-shoops/green-spaceship.json', function(SpooceShoop) {
        SpooceShoop.position.set(0, 0, 0);
        SpooceShoop.scale.set(5, 5, 7.5);
        marker.add(SpooceShoop);
    });

}


        
var crossHairCoords = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var bulletMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
var pos = new THREE.Vector3();
var bulletSpeed = Math.random()*10000;

function fireBullet() {
    console.log("fire!");
    crossHairCoords.set(
        (window.innerWidth / 2 / window.innerWidth) * 2 - 1, -(window.innerHeight / 2 / window.innerHeight) * 2 + 1
    );

    console.log(crossHairCoords);
    raycaster.setFromCamera(crossHairCoords, camera);

    // Creates a bullet and give it velocity
    var bulletMass = 100;
    var bulletRadius = 2;
    var bullet = new Physijs.SphereMesh(
        new THREE.SphereGeometry(bulletRadius, 10, 10),
        bulletMaterial,
        bulletMass
    );

    bullet.castShadow = true;
    bullet.receiveShadow = true;

    // bullet.position.copy(raycaster.ray.direction);
    // bullet.position.add(raycaster.ray.origin);
    //console.log(Shoop.position.x, Shoop.position.y, Shoop.position.z);
    bullet.position.set(marker.position.x, marker.position.y, marker.position.z);

    scene.add(bullet);


    bullet.addEventListener('collision', function(otherObj, relVelocity, relRotation, norm) {
        if (otherObj.name == "asteroid") {
            scene.remove(otherObj);
            payloadOfExplosionParticles.push(new ExplodeAnimation(otherObj.position.x, otherObj.position.y, otherObj.position.z));
            scoreboard.addPoints(otherObj.pointValue);
            makeAsteroid();
        }
    });

    pos.copy(raycaster.ray.direction);
    pos.multiplyScalar(bulletSpeed);
    bullet.setLinearVelocity(new THREE.Vector3(pos.x, pos.y, pos.z));
    
    setTimeout(function() {
        scene.remove(bullet);
    }, 2500);
} 


        var explosionParticleSpeed = 80;
        var totalExplosionParticles = 1000;
        var explosionParticleSize = 15;
        var explosionColors = [0xFF0FFF, 0xCCFF00, 0xFF000F, 0x996600, 0xFFFFFF];

        var explosionParticleDirections = [];
        var payloadOfExplosionParticles = [];
        
        function getPayloadOfExplosionParticles() {
            return payloadOfExplosionParticles
        }

        function ExplodeAnimation(x, y, z) {
            var geometry = new THREE.Geometry();

            for (var i = 0; i < totalExplosionParticles; i++) {
                var vertex = new THREE.Vector3();
                vertex.x = x;
                vertex.y = y;
                vertex.z = z;

                geometry.vertices.push(vertex);
                explosionParticleDirections.push({
                    x: (Math.random() * explosionParticleSpeed) - (explosionParticleSpeed / 2),
                    y: (Math.random() * explosionParticleSpeed) - (explosionParticleSpeed / 2),
                    z: (Math.random() * explosionParticleSpeed) - (explosionParticleSpeed / 2)
                });
            }
            var material = new THREE.PointsMaterial({ size: explosionParticleSize, color: explosionColors[Math.round(Math.random() * explosionColors.length)] });
            var particles = new THREE.Points(geometry, material);

            this.object = particles;
            this.status = true;

            this.xDir = (Math.random() * explosionParticleSpeed) - (explosionParticleSpeed / 2);
            this.yDir = (Math.random() * explosionParticleSpeed) - (explosionParticleSpeed / 2);
            this.zDir = (Math.random() * explosionParticleSpeed) - (explosionParticleSpeed / 2);

            scene.add(this.object);

            this.update = function() {
                if (this.status == true) {
                    var pCount = totalExplosionParticles;
                    while (pCount--) {
                        var particle = this.object.geometry.vertices[pCount];
                        particle.y += explosionParticleDirections[pCount].y;
                        particle.x += explosionParticleDirections[pCount].x;
                        particle.z += explosionParticleDirections[pCount].z;
                    }
                    this.object.geometry.verticesNeedUpdate = true;
                }
            };

        }






document.addEventListener('keydown', function(event) {
    if (event.keyCode == 32) {
        fireBullet();
    }
});