/*global THREE, scene */

//make sure that THREE and scene are available before calling this function from your main code
function initSkyBox() {
    
    var imagePrefix = 'imigis/spooce-box/';
    var directions = ['purplenebula_rt', 'purplenebula_lf', 'purplenebula_ft', 'purplenebula_bk', 'purplenebula_up', 'purplenebula_dn'];
    var imageSuffix = '.jpg';
    var materialArray = [];
    for (var i = 0; i < 6; i++) {
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),
            side: THREE.BackSide
        }));
    }
    
    var skyGeometry = new THREE.CubeGeometry(sceneWidth, sceneHeight, sceneDepth); // size of your world
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    // attach the skybox to a marker that follows camera X, Y, and Z movement
    scene.add(skyBox);

}