paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
//paperScope.install(scope);

window.onload = function() {
    //00 所有预先设置部分
    //paperScope.install(scope);

    //01 创建画布
    paper.setup('myCanvas'); //01 
    //02 创建我的鼠标事件,myMouseEvent 必须是全局变量
    myMouseEvent = new Tool(); //02 
    //myKeyEvent = new Tool();

    //绘制界面
    {
        globalWidth = 600;
        globalHeight = 500;
        //fx(0, 0, globalWidth, globalHeight); //03
        let UI = new Path.Rectangle(0, 0, 600, 500);
        UI.strokeColor = 'black';
    }


    //声明变量
    {
        saveSVG = new saveSVG();
        this.myPanel = new panel;
        dvdCurve = new divideCurve(); //声明一个变量

        //dts = new dots();

    }


    //声明函数
    {
        view.onFrame = draw; //draw()函数在draw.js文件里，负责实时刷新视图
        myMouseEvent.onMouseDown = mouseDown; //mouseDown
        myMouseEvent.onMouseUp = mouseUp; //mouseUp
        myMouseEvent.onMouseDrag = mouseDrag; //
        myMouseEvent.onMouseMove = mouseMove; //}
        myMouseEvent.onKeyUp = keyUp; //}


        //04 创建显示文字定义模块===================================
    }

    /* myMouseEvent.onDoubleClick = function doubleClick(event) {
        console.log('double clicked!')

    } */




    //myKeyEvent.onKeyUp = keyUp;

    //02 实时刷新模块，所有需要实时刷新的内容都在这
    function draw(event) {
        //project.clear();
        dvdCurve.draw();
        saveSVG.draw(event);

    }

    function mouseDown(event) {
        myPanel.onMouseDown(event); //先更新myPanel的status变量
        dvdCurve.drawing = myPanel.status; //
        dvdCurve.onMouseDown(event);


    }

    function mouseDrag(event) {
        dvdCurve.onMouseDrag(event);
    }

    function mouseUp(event) {
        dvdCurve.onMouseUp(event);

        //dts.reGenerate(200, 200, 100, 100);
    }

    function mouseMove(event) {
        dvdCurve.onMouseMove(event);
    }

    function keyUp(event) {
        console.log('key up!');
    }

    /* function keyUp(event) {
        // When a key is released, set the content of the text item:
        dvdCurve.onKeyUp(event);
    } */


    // Create a centered text item at the center of the view:

    //在这上面写代码=================================================================
    //}
}