//01 所有绘画内容的变量设定都在这
function myDrawingSetup(event) {

    //lines = new Array;



    //temp = null;
    saveSVG = new saveSVG();
    //button3 = new buttonCircle();

    //nbbutton = new numberButton();
    //itstbutton = new intersectButton();
    saveSVG.draw(event);

    //bz3=new bezier3();
    //pt = new point2D2();
    //bz=new beziers2();
    //bzButton = new beziersButton();

    //bdi=new PointsBoundIn2();

    focb = new freeOpenCurveButton();
    dvdCurve = new divideCurve();

    //fc=new freeOpenCurve();
    //fcc=new freeCloseCurve();
    //pt2db = new point2dButton();

    fccb = new freeClosedCurveButton();

    //pbiButton = new PointsBoundIn2Button();
    //itst=new intersect();



    centerText = new PointText(new Point(50, 395));
    centerText.fillColor = 'black';



   










}