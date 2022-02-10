function erode(number, size, slope, maxHeight, pixels) {
    pixels = markErosion(number, size, pixels);

    console.log(pixels.map(x => x.erosion));
    console.log(pixels.map(x => x.erosion).sort((a, b) => b - a));

    pixels = markCanyon(540, 540, slope, maxHeight, pixels);

    pixels = doErosion(slope, maxHeight, pixels);

    return pixels;
}

function markErosion(number, size, pixels) {
    for (var y = 0; y < 1081; y++) {
        for (var x = 0; x < 1081; x++) {
            if (x === 0) {
                updateStatus(`Eroding row ${y + 1} of 1081...`);
                console.log(`Eroding row ${y + 1} of 1081...`);
            }

            pixels = markOneErosion(x, y, size, pixels);
        }
    }
    
    /* for (var i = 0; i < number; i++) {
        if (i % 100 === 0) {
            updateStatus(`Eroding ${i + 1} of ${number}...`);
            console.log(`Eroding ${i + 1} of ${number}...`);
        }

        let x = Math.floor(Math.random() * 1081);
        let y = Math.floor(Math.random() * 1081);
        pixels = markOneErosion(x, y, size, pixels);
    } */

    return pixels;
}

function markOneErosion(x, y, size, pixels) {
    var i = x;
    var j = y;
    
    for (let n = 0; n < 5000; n++) {
        pixels[j * 1081 + i].erosion += size;
        let height = pixels[j * 1081 + i].height;
        let directions = new Array();

        directionDefs.forEach(a => {
            let newI = i + a.xChange;
            let newJ = j + a.yChange;
            if (newI < 0 || newI > 1080 || newJ < 0 || newJ > 1080) {return;}

            let newHeight = pixels[newJ * 1081 + newI].height;
            if (newHeight > height) {return;}

            directions.push({
                name: a.name,
                newI: newI,
                newJ: newJ,
                height: pixels[(j + a.yChange) * 1081 + i + a.xChange].height
            })
        });

        if (directions.length === 0) {break;}

        // let newDir = directions.sort((a, b) => a.height - b.height)[0].direction;

        let index = Math.floor(Math.random() * directions.length);
        let newDir = directions[index];
        
        i = newDir.newI;
        j = newDir.newJ;
    }

    return pixels;
}

function doErosion(slope, maxHeight, pixels) {
    for (var y = 0; y < 1081; y++) {
        for (var x = 0; x < 1081; x++) {
            let pixelNum = y * 1081 + x;
            if (x === 0) {
                updateStatus(`Carving row ${y + 1} of 1081...`);
                console.log(`Carving row ${y + 1} of 1081...`);
            }
            
            if (pixels[pixelNum].newHeight !== false) {
                createValley(x, y, pixels[pixelNum].newHeight, maxHeight, slope, slope, slope, slope, 0, 4, pixels);
            }

            // newPixels[pixelNum].erosion = 0;
        }
    }

    return pixels;
}

function markCanyon(x, y, slope, maxHeight, pixels) {
    var i = x;
    var j = y;
    var landHeight = pixels[j * 1081 + i].height;
    var calcHeight = pixels[j * 1081 + i].height - (Math.sqrt(pixels[j * 1081 + i].erosion) / parseFloat(10));
    var canyonHeight = calcHeight;
    var direction = "none";
    var possibleDirs;
    
    for (let n = 0; n < 5000; n++) {
        let directions = new Array();

        if (i === 0 || i === 1080 || j === 0 || j === 1080) {break;}

        let definition = directionDefs.find( ({ name }) => name === direction);
        
        directionDefs.forEach(a => {
            if (direction === "none" || definition.nextDirs.includes(a.name)) {
                directions.push({
                    name: a.name,
                    xChange: a.xChange,
                    yChange: a.yChange,
                    xCross: a.xCross,
                    yCross: a.yCross,
                    pixel: pixels[(j + a.yChange) * 1081 + i + a.xChange]
                });
            }            
        });

        directions = directions.filter(a => {
            if (a.pixel.newHeight !== false) {return false;}
            
            for (var z = -10; z <= 10; z++) {
                crossX = a.pixel.x + z * a.xCross;
                crossY = a.pixel.y + z * a.yCross;
                if (crossX < 0 || crossX > 1080 || crossY < 0 || crossY > 1080) {continue;}
                if (pixels[crossY * 1081 + crossX].newHeight !== false) {return false;}
            }
            
            return true;
        });
        
        if (directions.length === 0) {break;}

        directions.forEach(a => {
            let adjHeights = [];
            for (var z = -1; z <= 1; z = z + 2) {
                crossX = a.pixel.x + z * a.xCross;
                crossY = a.pixel.y + z * a.yCross;
                if (crossX < 0 || crossX > 1080 || crossY < 0 || crossY > 1080) {continue;}
                adjHeights.push(pixels[crossY * 1081 + crossX].height);
            }

            a['creviceIdx'] = adjHeights.reduce((b, c) => Math.min(b, c)) - a.pixel.height;
        });

        console.log(directions);

        let crevices = directions.filter(a => a.creviceIdx > 0);
        if (crevices.length > 0) {possibleDirs = crevices;}
        else {possibleDirs = directions;}
        console.log(crevices);
        console.log(directions);
        console.log(possibleDirs);
        let minHeight = possibleDirs.map(a => a.pixel.height).reduce((a, b) => Math.min(a, b));
        console.log(minHeight);
        possibleDirs = possibleDirs.filter(a => a.pixel.height === minHeight);
        console.log(possibleDirs);
        if (possibleDirs.length === 0) {break;}
        let sel = Math.floor(Math.random() * possibleDirs.length);
        let selectedDir = possibleDirs[sel];

        let newLandHeight = selectedDir.pixel.height;
        let newCalcHeight = selectedDir.pixel.height - (Math.sqrt(selectedDir.pixel.erosion) * 0);
        let newCanyonHeight = newCalcHeight;
        console.log(`${canyonHeight} => ${newCanyonHeight}`);
        if (canyonHeight < newCanyonHeight) {newCanyonHeight = canyonHeight - 0.25 * Math.abs(calcHeight - newCalcHeight);}
        console.log(`${canyonHeight} => ${newCanyonHeight}`);

        i = selectedDir.pixel.x;
        j = selectedDir.pixel.y;
        pixels[j * 1081 + i].newHeight = newCanyonHeight;
        landHeight = newLandHeight;
        calcHeight = newCalcHeight;
        canyonHeight = newCanyonHeight;
        direction = selectedDir.name;

        // newPixels = createValley(i, j, height, maxHeight * 2, slope, slope, slope, slope, 0, 1, newPixels);

        console.log(`${n}: ${i}, ${j}, ${canyonHeight}, ${direction}`);
    }

    return pixels;
}