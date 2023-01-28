function getFromColorSet(_colorSet) {
    let color;

    color = _colorSet[0];


    return color;
}



function globalColor(colorSetName) {

    /* var raster = new Raster('image.jpg');
    raster.scale(0.2);
    raster.position = new Point(1100, 820);
    var colorSets = getColorSet(raster, 10, 10); */



    //如果没有指定colorset名称，颜色按全范围
    {
        var rMin = 0;
        var rMax = 1;
        var gMin = 0;
        var gMax = 1;
        var bMin = 0;
        var bMax = 1;
    }

    if (colorSetName == 'yellow') {
        rMin = 1;
        rMax = 1;
        gMin = 1;
        gMax = 1;
        bMin = 0;
        bMax = 1;
    }

    if (colorSetName == 'cyan') {
        rMin = 0;
        rMax = 1;
        gMin = 1;
        gMax = 1;
        bMin = 1;
        bMax = 1;
    }

    if (colorSetName == 'pink') {
        rMin = 1;
        rMax = 1;
        gMin = 0;
        gMax = 1;
        bMin = 1;
        bMax = 1;
    }

    //红蓝紫色调
    if (colorSetName == 'g0') {
        rMin = 0;
        rMax = 1;
        gMin = 0;
        gMax = 0;
        bMin = 0;
        bMax = 1;
    }

    //蓝绿青色调
    if (colorSetName == 'r0') {
        rMin = 0;
        rMax = 0;
        gMin = 0;
        gMax = 1;
        bMin = 0;
        bMax = 1;
    }

    //红绿黄色调
    if (colorSetName == 'b0') {
        rMin = 0;
        rMax = 1;
        gMin = 0;
        gMax = 1;
        bMin = 0;
        bMax = 0;
    }


    //cus1
    if (colorSetName == 'cus1') {
        rMin = 0;
        rMax = 0.1843137254901961;
        gMin = 0;
        gMax = 0.1803921568627451;
        bMin = 0.1450980392156863;
        bMax = 0.3137254901960784;
    }

    //图片
    if (colorSetName == 'image2') {

        let randomColor;

        randomColor = colorSets[Math.round(Math.random() * (colorSets.length - 1))];

        return randomColor;
    }

    //运算部分
    {
        var r = Math.random() * (rMax - rMin) + rMin;
        var g = Math.random() * (gMax - gMin) + gMin;
        var b = Math.random() * (bMax - bMin) + bMin;

        var color4 = new Color(r, g, b);

        return color4;
    }
}