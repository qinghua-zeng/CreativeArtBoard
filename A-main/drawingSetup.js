//01 所有绘画内容的变量设定都在这
function myDrawingSetup(event) {

    saveSVG = new saveSVG();
    saveSVG.draw(event);

    dvdCurve = new divideCurve(); //声明一个变量

    centerText = new PointText(new Point(50, 395));
    centerText.fillColor = 'black';

    //selectButton = new mouseClickButton1(50, 400, 'select');














}