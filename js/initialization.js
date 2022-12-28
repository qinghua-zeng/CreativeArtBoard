paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
//paperScope.install(scope);

window.onload = function() {
    //00 所有预先设置部分
    //paperScope.install(scope);
    setUp();
    //00 所有预先设置部分
    myDrawingSetup(); //声明变量
    //00 所有预先设置部分

    function setUp(event) {
        //01 创建画布
        paper.setup('myCanvas'); //01 
        //02 创建我的鼠标事件,myMouseEvent 必须是全局变量
        myMouseEvent = new Tool(); //02 
        //myKeyEvent = new Tool();

        globalWidth = 600;
        globalHeight = 500;
        fx(0, 0, globalWidth, globalHeight); //03
        //04 创建显示文字定义模块===================================
    }
    view.onFrame = draw; //draw()函数在draw.js文件里，负责实时刷新视图

    myMouseEvent.onMouseDown = mouseDown; //mouseDown
    myMouseEvent.onMouseUp = mouseUp; //mouseUp
    myMouseEvent.onMouseDrag = mouseDrag; //
    myMouseEvent.onMouseMove = mouseMove; //

    //myKeyEvent.onKeyUp = keyUp;

    //02 实时刷新模块，所有需要实时刷新的内容都在这
    function draw(event) {
        //project.clear();
        dvdCurve.draw();
        //selectButton.draw(event);
    }

    function mouseDown(event) {
        dvdCurve.onMouseDown(event);
        //selectButton.mouseDown(event);
    }

    function mouseDrag(event) {
        dvdCurve.onMouseDrag(event);
    }

    function mouseUp(event) {
        dvdCurve.onMouseUp(event);
    }

    function mouseMove(event) {
        dvdCurve.onMouseMove(event);
    }
    /* function keyUp(event) {
        // When a key is released, set the content of the text item:
        dvdCurve.onKeyUp(event);
    } */


    // Create a centered text item at the center of the view:

    //在这上面写代码=================================================================
}