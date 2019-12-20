/*global THREE marker, camera, Physijs, scene, controls*/

var infoIsOpen;
var blocker;
var instructions;
        
function initInstructions() {
    infoIsOpen = true;
    blocker = document.getElementById('blocker');
    instructions = document.getElementById('instructions');
    document.addEventListener("keydown", onDisplayInstructionsKeyDown, false);
}

function onDisplayInstructionsKeyDown(event) {

    var keyCode = event.keyCode;
    if (keyCode == 27) {

        if (infoIsOpen == true) {
            blocker.style.display = 'none';
            instructions.style.display = 'none';
        }
        else {
            blocker.style.display = 'block';
            instructions.style.display = 'block';
        }
        infoIsOpen = !infoIsOpen;
    }


    // if (keyCode == 27) {

    //     blocker.style.display = 'none'
    //     instructions.style.display = 'none'

    // }
    console.log(keyCode);

}