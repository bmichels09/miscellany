function smooth(intensity, cycles, pixels) {
    for (var i = 0; i < cycles; i++) {
        pixels = smoothOnce(intensity, pixels);
    }

    return pixels;
}

function smoothOnce(intensity, pixels) {
    var newPixels = pixels;
    for (var y = 0; y < 1081; y++) {
        for (var x = 0; x < 1081; x++) {
            let total = 0;
            let count = 0;

            for (var i = Math.max(0, x - 1); i <= Math.min(1080, x + 1); i++) {
                for (var j = Math.max(0, y - 1); j <= Math.min(1080, y + 1); j++) {
                    if (i === x && j === y) {continue;}
                    total = total + pixels[j * 1081 + i].height;
                    count = count + 1;
                }
            }

            newPixels[y * 1081 + x].height = parseFloat(intensity) * total / count + (1 - parseFloat(intensity)) * pixels[y * 1081 + x].height;
        }
    }

    return newPixels;
}