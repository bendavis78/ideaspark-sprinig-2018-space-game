/*global THREE marker, camera, Physijs, scene, controls*/

function addLighting() {
    // var doomlight = new THREE.PointLight(565656556565, 15, 10000, 10);
    //     doomlight.position.set(1000, 1000, 1000);
    //     scene.add(doomlight);   
        
        
        
    // Create a DirectionalLight and turn on shadows for the light
    var zposLight = new THREE.DirectionalLight(0xffffff, 1);
    zposLight.position.set(0, 0, sceneDepth);
    zposLight.castShadow = true;
    scene.add(zposLight);

    var znegLight = new THREE.DirectionalLight(0xffffff, 1);
    znegLight.position.set(0, 0, -sceneDepth);
    znegLight.castShadow = true;
    scene.add(znegLight);

    var xnegLight = new THREE.DirectionalLight(0xffffff, 1);
    xnegLight.position.set(-sceneWidth, 0, 0);
    xnegLight.castShadow = true;
    scene.add(xnegLight);

    var xposLight = new THREE.DirectionalLight(0xffffff, 1);
    xposLight.position.set(sceneWidth, 0, 0);
    xposLight.castShadow = true;
    scene.add(xposLight);

    var ynegLight = new THREE.DirectionalLight(0xffffff, 1);
    ynegLight.position.set(-sceneWidth, 0, 0);
    ynegLight.castShadow = true;
    scene.add(ynegLight);

    var yposLight = new THREE.DirectionalLight(0xffffff, 1);
    yposLight.position.set(sceneWidth, 0, 0);
    yposLight.castShadow = true;
    scene.add(yposLight);
}