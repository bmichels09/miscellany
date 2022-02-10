function createHill(x, y, maxHeight, baseHeight, slopeForward, slopeBackward, slopeLeft, slopeRight, rotation, exp, pixels) {
    var radius = Math.ceil(maxHeight / Math.min(slopeForward, slopeBackward, slopeLeft, slopeRight));
    var minX = Math.max(0, x - radius);
    var maxX = Math.min(1080, x + radius);
    var minY = Math.max(0, y - radius);
    var maxY = Math.min(1080, y + radius);

    for (var j = minY; j <= maxY; j++) {
        for (var i = minX; i <= maxX; i++) {            
            var dist = Math.hypot(i - x, j - y);

            if (i === x && j === y) {
                var angle = 0;
            }
            else {
                var angle = Math.acos((i - x) / parseFloat(dist)) / Math.PI * 180;
                if (j < y) {angle = 360 - angle;}
                angle = angle + rotation;
            }

            effX = Math.cos(angle * Math.PI / parseFloat(180)) * dist + x;
            effY = Math.sin(angle * Math.PI / parseFloat(180)) * dist + y;
            
            if (effX < x) {
                var xDist = (x - effX) * slopeLeft / parseFloat(maxHeight - baseHeight);
            }
            else {
                var xDist = (effX - x) * slopeRight / parseFloat(maxHeight - baseHeight);
            }

            if (effY < y) {
                var yDist = (y - effY) * slopeForward / parseFloat(maxHeight - baseHeight);
            }
            else {
                var yDist = (effY - y) * slopeBackward / parseFloat(maxHeight - baseHeight);
            }

            let netDist = Math.pow(Math.hypot(xDist, yDist), exp);
            let pixelHeight = (1 - netDist) * (maxHeight - baseHeight) + baseHeight;
            if (pixelHeight < 0) {pixelHeight = 0;}
            if (pixelHeight > 1023.984375) {pixelHeight = 1023.984375;}
            if (pixelHeight > pixels[j * 1081 + i].height) {pixels[j * 1081 + i].height = pixelHeight;}
        }
    }

    return pixels;
}

function createValley(x, y, minHeight, baseHeight, slopeForward, slopeBackward, slopeLeft, slopeRight, rotation, exp, pixels) {
    var radius = Math.ceil((1024 - parseFloat(minHeight)) / Math.min(slopeForward, slopeBackward, slopeLeft, slopeRight));
    var minX = Math.max(0, x - radius);
    var maxX = Math.min(1080, x + radius);
    var minY = Math.max(0, y - radius);
    var maxY = Math.min(1080, y + radius);

    for (var j = minY; j <= maxY; j++) {
        for (var i = minX; i <= maxX; i++) {
            var dist = Math.hypot(i - x, j - y);

            if (i === x && j === y) {
                var angle = 0;
            }
            else {
                var angle = Math.acos((i - x) / parseFloat(dist)) / Math.PI * 180;
                if (j < y) {angle = 360 - angle;}
                angle = angle + rotation;
            }
            
            effX = Math.cos(angle * Math.PI / parseFloat(180)) * dist + x;
            effY = Math.sin(angle * Math.PI / parseFloat(180)) * dist + y;
            
            if (effX < x) {
                var xDist = (x - effX) * slopeLeft / parseFloat(baseHeight - minHeight);
            }
            else {
                var xDist = (effX - x) * slopeRight / parseFloat(baseHeight - minHeight);
            }

            if (effY < y) {
                var yDist = (y - effY) * slopeForward / parseFloat(baseHeight - minHeight);
            }
            else {
                var yDist = (effY - y) * slopeBackward / parseFloat(baseHeight - minHeight);
            }

            let netDist = Math.pow(Math.hypot(xDist, yDist), exp);
            let pixelHeight = baseHeight - ((1 - netDist) * parseFloat(baseHeight - minHeight));
            if (pixelHeight < 0) {pixelHeight = 0;}
            if (pixelHeight > 1023.984375) {pixelHeight = 1023.984375;}
            if (pixelHeight < pixels[j * 1081 + i].height) {pixels[j * 1081 + i].height = pixelHeight;}
        }
    }

    return pixels;
}