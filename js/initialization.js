paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
//paperScope.install(scope);

window.onload = function() {

    //01 创建画布
    paper.setup('myCanvas'); //01 

    //02 创建我的鼠标事件,myMouseEvent 必须是全局变量
    myMouseEvent = new Tool(); //02 

    var layer2 = new Layer();

    //导入本地svg, 在需要用到这个图形的地方再加载它，必须在它的回调函数里操作外面的对象
    {
        var kk = 'kkkk';
        var localSvg = project.importSVG('svg files/heart.svg', {
            expandShapes: true, // Expand shapes to paths
            onLoad: function(item) {
                // Do something with the imported item
                localSvg = item;
                //console.log(kk); //说明它可以访问外面的对象
                //console.log(item.position);
                kk = 'jfdij'; //说明它可以访问外面的对象，并且互动
                //console.log(kk);

                item.position = new Point(1050, 700);
                //item.position = new Point(0, 0);
            }
        });
        //console.log(kk);
        //var localSvg = project.importSVG('svg files/heart.svg');
        //console.log(localSvg);
        //localSvg.position = new Point(0, 0);
        //localSvg.moveTo(new Point(600, 400));
    }

    {
        {
            /* async function readFile(file) {
                const result = await $.ajax({
                    url: file,
                    dataType: 'text',
                });
                //console.log(result);

                return result;
            }


            const data = readFile('heart.svg').then(result => { console.log(result); return result; });
            console.log(data);
            //var localSvg = project.importSVG(result);
            //var localSvg = project.importSVG(data); */
        }

        {
            /* function readFile(file) {
                const reader = new FileReader();
                reader.readAsText(file);
                return reader.result;
            }

            const data = readFile('heart.svg');
            console.log(data); */
        }

        //失败的研究
        {
            /* var ooo;

            function loadSVG(url) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onload = () => resolve(xhr.responseText);
                    xhr.onerror = () => reject(xhr.statusText);
                    xhr.send();
                });
            }

            // 使用示例
            loadSVG('heart.svg')
                .then(svg => {
                    // 处理 SVG 数据
                    ooo = svg;
                })
                .catch(error => {
                    console.error(error);
                });

            //console.error(ooo); */
        }

        //失败的研究
        {
            /* let pp = $.ajax({
                url: 'heart.svg',
                dataType: 'text',

                success: function(svg) {
                    // 处理 SVG 数据
                    console.log(svg);
                    pp = svg;
                    return svg;
                }
            });

            console.log(pp); */

        }
    }


    //绘制界面
    {
        let UI = new Path.Rectangle(0, 0, 1150, 900);
        UI.strokeColor = 'black';
        UI.fillColor = 'grey';
    }

    //声明变量
    {
        saveSVG = new saveSVG();
        this.myPanel = new panel;
        dvdCurve = new divideCurve(50, 20, 800, 800); //声明一个变量
        sketchWindow = new divideCurve(880, 20, 250, 400); //声明一个变量
        dvdCurve.shapeGroup.updateBoundsAndPosition();
        //console.log(dvdCurve.shapeGroup);

    }

    //图层操作
    {
        //console.log(project.layers);

        var secondPath = new Path.Circle(new Point(1000, 550), 65);
        secondPath.fillColor = 'green';

        //secondPath.bounds._width = secondPath.bounds._width - 50;
        //console.log(secondPath.bounds);
        secondPath.moveTo(project.layers[1]);
        //console.log(project.layers[1].name);
        //project.layers


        //console.log(project.layers[1]._children);

        //project.layers[1]._children[0].scale(2);

        //saveSVG.saveFile();
        //console.log(saveSVG.svgData);
    }


    //声明鼠标键盘事件函数
    {
        view.onFrame = draw; //draw()函数在draw.js文件里，负责实时刷新视图
        myMouseEvent.onMouseDown = mouseDown; //mouseDown
        myMouseEvent.onMouseUp = mouseUp; //mouseUp
        myMouseEvent.onMouseDrag = mouseDrag; //
        myMouseEvent.onMouseMove = mouseMove; //}
        myMouseEvent.onKeyUp = keyUp; //}


        //04 创建显示文字定义模块===================================
    }

    //02 实时刷新模块，所有需要实时刷新的内容都在这
    function draw(event) {
        //project.clear();
        dvdCurve.draw();
        sketchWindow.draw();
        //saveSVG.draw(event);

    }

    //0
    function mouseDown(event) {
        myPanel.onMouseDown(event); //先更新myPanel的status变量

        dvdCurve.drawing = myPanel.status;
        dvdCurve.simplifyLevel = myPanel.simplifyLevel; //

        dvdCurve.onMouseDown(event);
        sketchWindow.onMouseDown(event);


    }

    //0
    function mouseDrag(event) {
        dvdCurve.onMouseDrag(event);
        sketchWindow.onMouseDrag(event);
    }

    //全局mouseUp用于在不同的类之间通信
    function mouseUp(event) {
        //var localSvg = project.importSVG('svg files/heart.svg');


        dvdCurve.onMouseUp(event);
        sketchWindow.onMouseUp(event);

        //从sketchWindow发送图形
        if (myPanel.sendSketchShapesButton.button1.hitTest(event.point)) {

            sketchWindow.generateForSend(); //添加图形到 shapesForSend
            dvdCurve.receivePattern(sketchWindow.shapesForSend);
            sketchWindow.shapesForSend.myShapeGroup.length = 0;
            dvdCurve.changeShapeGroupDisplay('noChange', 'red', 0);

        }

        //接受svg图形
        if (myPanel.getTextButton.button1.hitTest(event.point)) {

            dvdCurve.drawing = 'svg'; //首先切换绘图模式，以免执行其他模式代码

            let svg = textbox1.value;
            let group = project.importSVG(svg);
            //console.log(group);

            //将这个svg group转换成smartShapeGroup格式
            let tempSmartShapeGroup = new smartShapeGroup();
            for (let i = 0; i < group._children.length; i++) {
                tempSmartShapeGroup.pushNewShape(group._children[i]);
            }

            //dvdCurve.shapeGroup.uniteSelectedShapes(tempSmartShapeGroup);
            dvdCurve.receivePattern(tempSmartShapeGroup);

            //取消输入图形的显示
            for (let i = 0; i < tempSmartShapeGroup.myShapeGroup.length; i++) {
                tempSmartShapeGroup.myShapeGroup[i].myShape.remove();
            }

            dvdCurve.changeShapeGroupDisplay('noChange', 'red', 0);


        } //if 结束


        //替换基本图形
        if (myPanel.getShapeButton.button1.hitTest(event.point)) {

            dvdCurve.drawing = 'svg'; //首先切换绘图模式，以免执行其他模式代码

            let svg = textbox1.value;
            let group = project.importSVG(svg);

            //将这个svg group转换成smartShapeGroup格式
            let tempSmartShapeGroup = new smartShapeGroup();
            for (let i = 0; i < group._children.length; i++) {
                tempSmartShapeGroup.pushNewShape(group._children[i]);
            }

            dvdCurve.shapeGroup.uniteSelectedShapes(tempSmartShapeGroup);
            //dvdCurve.receivePattern(tempSmartShapeGroup);

            //取消输入图形的显示
            for (let i = 0; i < tempSmartShapeGroup.myShapeGroup.length; i++) {
                tempSmartShapeGroup.myShapeGroup[i].myShape.remove();
            }

            dvdCurve.changeShapeGroupDisplay('noChange', 'red', 0);


        } //if 结束



        //导出svg
        {
            for (let i = 0; i < dvdCurve.shapeGroup.myShapeGroup.length; i++) {
                //console.log(dvdCurve.shapeGroup.myShapeGroup[i].myShape);
                //dvdCurve.shapeGroup.myShapeGroup[i].myShape.moveTo(project.layers[1]);
            }

            var svg = project.exportSVG(project.layers[1]);
            //console.log(svg.outerHTML);
            //textbox1.value = svg.outerHTML;
            //textbox1.value = dvdCurve.shapeGroup.myShapeGroup[i].myShape;

            saveSVG.svgData = svg;
            saveSVG.onMouseUp(event)
        }


        console.log('======= a mouse up cycle finished  =========');
    }

    //0
    function mouseMove(event) {
        dvdCurve.onMouseMove(event);
        sketchWindow.onMouseMove(event);
    }

    //0
    function keyUp(event) {
        //console.log('key up!');
        myPanel.onKeyUp(event);
        dvdCurve.currentTag = myPanel.currentTag;

        dvdCurve.onKeyUp(event);
        sketchWindow.onKeyUp(event);




    }



    //在这上面写代码=================================================================
    //}
}