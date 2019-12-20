function createPlanetHoth() {
    var modelobj = new THREE.ObjectLoader();

    modelobj.load('modils/Hoth/planet.json', function(hoth) {
        hoth.position.set(0, 0, -1000);
        hoth.scale.set(180, 200, 200);
        scene.add(hoth);
    });

}