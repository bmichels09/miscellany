function createPixels(template) {
    var pixels = new Array(1081 * 1081);

    if (template === "inlandWE") {
        for (var j = 0; j < 1081; j++) {
            for (var i = 0; i < 1081; i++) {
                pixels[j * 1081 + i] = {
                    x: i,
                    y: j,
                    height: 75 - (parseFloat(i) / 72),
                    erosion: 0,
                    newHeight: false
                };
            };
        };
    }

    else {
        for (var j = 0; j < 1081; j++) {
            for (var i = 0; i < 1081; i++) {
                pixels[j * 1081 + i] = {
                    x: i,
                    y: j,
                    height: 60,
                    erosion: 0,
                    newHeight: false
                };
            };
        };
    }

    return pixels;
}