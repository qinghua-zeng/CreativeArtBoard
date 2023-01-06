function globalColor() {
    var rMin = 100;
    var rMax = 255;
    var gMin = 0;
    var gMax = 255;
    var bMin = 100;
    var bMax = 255;

    var r = Math.round(Math.random() * (rMax - rMin) + rMin);
    var g = Math.round(Math.random() * (gMax - gMin) + gMin);
    var b = Math.round(Math.random() * (bMax - bMin) + bMin);


    // 转换为 16 进制字符串
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    // 补 0 直到达到两位
    if (r.length < 2) {
        r = '0' + r;
    }
    if (g.length < 2) {
        g = '0' + g;
    }
    if (b.length < 2) {
        b = '0' + b;
    }

    // 拼接字符串
    var color3 = '#' + r + g + b;

    return color3;
}