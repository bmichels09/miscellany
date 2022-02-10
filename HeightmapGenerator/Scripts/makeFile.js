// https://sharp.pixelplumbing.com/api-constructor#sharp

function makeFile(pixels) {
    console.log(pixels);

    var data = new Uint16Array(new ArrayBuffer(1081 * 1081 * 2));       // or generate pixels manually
    for (var i = 0; i < 1081 * 1081; i++) {
        let height = Math.round(pixels[i].height * 64);
        if (height < 0) {height = 0;}
        if (height > 65535) {height = 65535;}
        data[i] = (height % 256) * 256 + (~~(height / 256));    // change the endianness
        //data[j * 2] = ~~(pixels[j] / 256);   // divide, but discard the remainder
    }
    console.log(data.buffer);

    var png = UPNG.encodeLL([data.buffer], 1081, 1081, 1, 0, 16, [0]);
    // var png = UPNG.encode([data.buffer], 200, 300, 0);
    // var arr = new Uint16Array(png);

    const file = new File([png], 'image.png', {
        type: 'image/png'
    });
    console.log(file);
    let url = window.URL.createObjectURL(file);
    // window.open(url);

    const elem = window.document.createElement('a');
    elem.href = url;
    elem.download = 'image.png';
    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);

    // window.location = url;
    URL.revokeObjectURL(url);
}

function makeErosionMap(pixels) {
    console.log(pixels);

    var data = new Uint16Array(new ArrayBuffer(1081 * 1081 * 2));       // or generate pixels manually
    for (var i = 0; i < 1081 * 1081; i++) {
        let erosion = Math.round(Math.sqrt(pixels[i].erosion) * 512);
        if (erosion < 0) {erosion = 0;}
        if (erosion > 65535) {erosion = 65535;}
        data[i] = (erosion % 256) * 256 + (~~(erosion / 256));    // change the endianness
        //data[j * 2] = ~~(pixels[j] / 256);   // divide, but discard the remainder
    }
    console.log(data.buffer);

    var png = UPNG.encodeLL([data.buffer], 1081, 1081, 1, 0, 16, [0]);
    // var png = UPNG.encode([data.buffer], 200, 300, 0);
    // var arr = new Uint16Array(png);

    const file = new File([png], 'erosion.png', {
        type: 'image/png'
    });
    console.log(file);
    let url = window.URL.createObjectURL(file);
    // window.open(url);

    const elem = window.document.createElement('a');
    elem.href = url;
    elem.download = 'erosion.png';
    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);

    // window.location = url;
    URL.revokeObjectURL(url);
}