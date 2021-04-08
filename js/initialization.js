

paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
//paperScope.install(scope);

window.onload = function () {
    //00 所有预先设置部分
    //paperScope.install(scope);
    setUp();
    //00 所有预先设置部分
    myDrawingSetup();
    //00 所有预先设置部分
    function setUp(event) {
        //01 创建画布
        paper.setup('myCanvas');//01 
        //02 创建我的鼠标事件,myMouseEvent 必须是全局变量
        myMouseEvent = new Tool();//02 
        //printObject(myMouseEvent);
        //03 创建画布显示区域
        //globalCanvasX1=0;
        //globalCanvasX2=400;
        globalWidth = 800;
        globalHeight=500;
        //globalHeight=600;
        //fx(0, 0, glabalWidth, glabalWidth);//03 
        fx(0, 0, globalWidth, globalHeight);//03
        //04 创建显示文字定义模块===================================


    }
    view.onFrame = draw;

    myMouseEvent.onMouseDown = mouseDown;
    myMouseEvent.onMouseUp = mouseUp;
    myMouseEvent.onMouseDrag = mouseDrag;


    //button3.update();




    function mouseDrag(event) {
        //fc.onMouseDrag(event);
        //fcc.onMouseDrag(event);
        focb.mouseDrag(event);
        fccb.mouseDrag(event);
        //bzButton.mouseDrag(event);
        dvdCurve.onMouseDrag(event);


    }
    //在这上面写代码=================================================================
}

