function generate() {
    document.getElementById('selTemp').disabled = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }

    var sel = document.getElementById('selTemp');
    var template = sel.options[sel.selectedIndex].value;
    var numMaj = document.getElementById('numMaj').value;
    var numMin = document.getElementById('numMin').value;
    var numHeight = document.getElementById('numHeight').value;
    var numSlope = document.getElementById('numSlope').value;
    var numSmooth = document.getElementById('numSmooth').value;
    var numErosion = document.getElementById('numErosion').value;

    updateStatus('Creating pixels...');
    console.log('Creating pixels...');
    var pixels = createPixels(template);

    for (var i = 0; i < numMaj; i++) {
        updateStatus(`Adding major hill ${i + 1} of ${numMaj}...`);
        console.log(`Adding major hill ${i + 1} of ${numMaj}...`);
        let x = Math.floor(Math.random() * 1081);
        let y = Math.floor(Math.random() * 1081);
        let maxHeight = Math.sqrt(Math.random()) * (numHeight - 60) + 60;
        let slopeForward = (Math.random() * 0.75 + 0.625) * numSlope;
        let slopeBackward = (Math.random() * 0.75 + 0.625) * numSlope;
        let slopeLeft = (Math.random() * 0.375 + 0.3125) * numSlope;
        let slopeRight = (Math.random() * 0.375 + 0.3125) * numSlope;
        let rotation = Math.random() * 180;
        pixels = createHill(x, y, maxHeight, 0, slopeForward, slopeBackward, slopeLeft, slopeRight, rotation, 1, pixels);
    }

    for (var i = 0; i < numMin; i++) {
        updateStatus(`Adding minor hill ${i + 1} of ${numMin}...`);
        console.log(`Adding minor hill ${i + 1} of ${numMin}...`);
        let x = Math.floor(Math.random() * 1081);
        let y = Math.floor(Math.random() * 1081);
        // let maxHeight = Math.sqrt(Math.random()) * 25 + pixels[y * 1081 + x].height;
        let maxHeight = pixels[y * 1081 + x].height;
        let slopeForward = (Math.random() * 0.75 + 0.625) * numSlope;
        let slopeBackward = (Math.random() * 0.75 + 0.625) * numSlope;
        let slopeLeft = (Math.random() * 0.75 + 0.625) * numSlope;
        let slopeRight = (Math.random() * 0.75 + 0.625) * numSlope;
        let rotation = Math.random() * 180;
        pixels = createHill(x, y, maxHeight, 0, slopeForward, slopeBackward, slopeLeft, slopeRight, rotation, 1.25, pixels);
    }

    //pixels = createHill(810, 810, 1020, 4, 4, 4, 4, pixels);
    //pixels = createValley(540, 540, 60, 4, 8, 4, 20, pixels);

    updateStatus('Eroding...');
    console.log('Eroding...');
    pixels = erode(1000000, 1, numSlope, numHeight, pixels);

    updateStatus('Smoothing...');
    console.log('Smoothing...');
    pixels = smooth(0.5, 10, pixels);

    updateStatus('Creating file...');
    console.log('Creating file...');
    makeFile(pixels);
    // makeErosionMap(pixels);
    updateStatus('Done!');

    document.getElementById('selTemp').disabled = false;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }
}

function updateStatus(html) {
    document.getElementById('status').innerHTML = html;
}