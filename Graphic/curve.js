//freeOpenCurve==============================================
class shapeBoard {

    //00变量
    constructor(x, y, w, h) {

        //00.1 有效画图区域，可以画出路径的地方
        {
            this.x1 = x;
            this.canvasWidth = w;
            this.y1 = y;
            this.canvasHeight = h;
            this.drawingArea = new Path.Rectangle(this.x1, this.y1, this.canvasWidth, this.canvasHeight);
            this.drawingArea.strokeColor = 'blue';
            this.drawingArea.fillColor = 'white';
        }

        //00.2 存储图形的变量
        {
            this.path; //鼠标当前画的新路径
            this.simplifyLevel = 0;
            this.shapeGroup = new smartShapeGroup();

            //背景矩形，这个矩形规定了整个画面的范围
            this.shapeGroup.myShapeGroup.push(new smartShape(new Path.Rectangle(this.x1 + 30, this.y1 + 30, this.canvasWidth - 60, this.canvasHeight - 60)));
            //初始化背景颜色
            this.shapeGroup.myShapeGroup[0].myShape.fillColor = 'white';
            this.shapeGroup.myShapeGroup[0].myShape.strokeColor = 'black';
            this.shapeGroup.myShapeGroup[0].myShape.strokeWidth = 2;


            this.shapesForSend = new smartShapeGroup();
        }

        //00.4存储状态的变量
        {
            this.drawing = 'draw2'; //控制当前是不是在绘画
            this.ifIn = false; //初始化的变量为不在画布内
            this.mouseDragged = false;
            //this.currentTag;
        }

        //00.5画布变量信息显示
        {
            this.text1 = new PointText(new Point(this.x1, this.y1 + this.canvasHeight - 10)); //下方文字的位置
            this.text1.justification = 'left';
            this.text1.fillColor = 'green'; //下方文字的颜色
        }




    }

    //00-1 界面刷新
    draw() {

        //显示变量状态
        {
            this.text1.content = '   status: ' + this.drawing + '  ifIn: ' + this.ifIn + '  simplifyLevel: ' + this.simplifyLevel;
        }

    }

    //01 鼠标按下的情况
    onMouseDown(event) {
        this.ifInside(event.point);

        //01-2 如果是“选择”状态
        if (this.drawing == 'select') {}
        ////01-2 如果是“绘画”状态
        if (this.drawing == 'draw2') {

            //}

            if (this.ifIn == true) { //如果在路径范围里
                //生成新手绘路径
                {
                    // If we produced a path before, deselect it:
                    if (this.path) {
                        this.path.selected = false;
                        this.path.remove();
                    }

                    // Create a new path and set its stroke color to black:
                    this.path = new Path({ //鼠标点击时候创建一个新图像
                        segments: [event.point],
                        fullySelected: true,
                    });
                    //console.log(this.path);
                }



            }
        }

    }

    //02 鼠标拖拽的情况  While the user drags the mouse, points are added to the path
    onMouseDrag(event) {
        this.mouseDragged = true;
        if (this.drawing == 'draw2') {
            //这次下笔产生的新图形
            this.ifInside(event.point); //用于切换this.ifIn的状态，即鼠标是否在画布内
            if (this.ifIn) {
                this.path.add(event.point);
            }
        }

    }

    //03 鼠标释放的情况  When the mouse is released, we simplify the path:
    onMouseUp(event) {
        //03-1 如果是绘画模式
        {
            if (this.drawing == 'draw2') {

                //03-1-1 如果没拖拽过，删除创建的path
                if (this.ifIn && this.mouseDragged == false) {

                    this.path.remove();
                    this.itemSelect(event);
                    //console.log('no drag');
                }

                //03-1-2 如果拖拽过，进行布尔运算
                else if (this.ifIn && this.mouseDragged && this.ifAnySelected()) {
                    //console.log('dragged');
                    let pathSmartShapeGroup = new smartShapeGroup();
                    //03-1-2.1 对刚画完路径的简化处理

                    //path的生成
                    {
                        this.path.closed = true;
                        this.path.simplify(this.simplifyLevel); //精简路径
                        this.path.selected = false; //重要，防止生成结果有选择边界
                        pathSmartShapeGroup.myShapeGroup.push(new smartShape(this.path.clone()));
                    }



                    //03-1-2.3 进行相交运算
                    this.shapeGroup.uniteSelectedShapes(pathSmartShapeGroup); //对this.shapeGroup中图形的修改
                    this.changeShapeGroupDisplay('randomColor', 'black', 0);

                    this.mouseDragged = false;
                }

                //如果拖拽过但没有任何东西选择
                else if (this.ifIn && this.mouseDragged) {

                    this.path.remove();
                    //this.path.remove(); //清空新画路径
                    this.mouseDragged = false;
                }

                //03-1-2.4 最后处理pathShape 
                {

                }


            }
        }

        //03-2 如果是选择模式
        {
            if (this.drawing == 'select') {

                //03-2-2 对shapeGroup的操作
                this.itemSelect(event);
                //this.generatePattern();
                //this.displaySelectStatus();
                /* if (this.ifIn && event.item) {
                    event.item.selected = true;
                    console.log(event.item);
                } else if (this.ifIn && event.item == false) {
                    event.item.selected = false;
                } */
            }
        }


    }

    onKeyUp(event) {
        //console.log('event.key: ' + event.key);
        if (event.key == 't') {
            for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                //console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
                if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                    this.shapeGroup.myShapeGroup[i].myTag.push(this.currentTag);
                    for (let j = 0; j < this.shapeGroup.myShapeGroup[i].myTag.length; j++) {
                        console.log(this.shapeGroup.myShapeGroup[i].myTag[j]);
                    }

                }
            }
        }
    }

    //04
    onMouseMove(event) {
        this.ifInside(event.point);
    }

    //05 判断画的位置是不是在画布内的函数
    ifInside(point) {
        if (point.x > this.x1 && point.x < this.x1 + this.canvasWidth && point.y > this.y1 && point.y < this.y1 + this.canvasHeight) {
            this.ifIn = true;
            //console.log(point.x);
            //console.log(this.x2);

        } else {
            this.ifIn = false;
        }
    }

    //0
    changeShapeGroupDisplay(color, strokeColor, strokeWidth) {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (color == 'randomColor') {

                this.shapeGroup.myShapeGroup[i].myShape.fillColor = globalColor();
                //this.shapeGroup.myShapeGroup[i].myShape.fillColor = 'green';

            } else if (color == 'noChange') {

            } else {
                this.shapeGroup.myShapeGroup[i].myShape.fillColor = color;
            }

            this.shapeGroup.myShapeGroup[i].myShape.strokeWidth = strokeWidth;
            this.shapeGroup.myShapeGroup[i].myShape.strokeColor = strokeColor
                //this.shapeGroup.myShapeGroup[i].myShape.opacity = 1;
                //this.shapeGroup.myShapeGroup[i].myShape.scale(1);
        }


    }


    //0
    itemSelect(event) {
        if (this.ifIn) { //console.log(i);

            for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {

                if (this.shapeGroup.myShapeGroup[i].myShape.hitTest(event.point)) {
                    this.shapeGroup.myShapeGroup[i].myShape.selected = true;
                    console.log('No. ' + i + ' selected! Tags are following:');

                    for (let j = 0; j < this.shapeGroup.myShapeGroup[i].myTag.length; j++) {
                        console.log('Tag ' + j + ': ' + this.shapeGroup.myShapeGroup[i].myTag[j]);
                    }

                } else {
                    this.shapeGroup.myShapeGroup[i].myShape.selected = false;
                    //console.log('no selected');
                }
            }

        }
    }

    //0
    itemSelect2(event) {
        if (this.ifIn) { //console.log(i);

            if (event.item) {
                event.item.selected = true;
                console.log('selected');
            } else {
                for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                    this.shapeGroup.myShapeGroup[i].myShape.selected = false;
                    console.log('no selected');
                }

            }

        }
    }


    //0
    generatePattern() {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {

            this.shapeGroup.myShapeGroup[i].myShape.onDoubleClick = function() {

                let tempPattern = new smartShapeGroup();
                tempPattern.generatePattern(this.shapeGroup.myShapeGroup[i].myShape.bounds);

                this.shapeGroup.uniteSelectedShapes(tempPattern);
                this.changeShapeGroupDisplay();


            }.bind(this);

        }

    }

    //用于在sketchWindow里生成基本图形，这个函数主要目的把临时变量shapesForSend弄出来
    generateForSend() {
        //console.log('generateForSend');

        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) { //只有某个图形被选择才会生成图形
                this.shapeGroup.myShapeGroup[i].myShape.selected = false;
                //this.shapesForSend.myShapeGroup.push(this.shapeGroup.myShapeGroup[i].myShape);

                let temp = this.shapeGroup.myShapeGroup[i].myShape.clone()
                temp.position = new Point(0, 0);
                this.shapesForSend.pushNewShape(temp.clone()); //把这个被选择的图形加到临时变量shapesForSend里
                temp.remove();

                //console.log('this.shapesForSend.myShapeGroup.length: ' + this.shapesForSend.myShapeGroup.length);
            }


        }
        //this.shapesForSend.myShapeGroup[0].myShape.selected = false;
        //this.shapesForSend.myShapeGroup[0].myShape.position = new Point(200, 200);
        //this.shapesForSend.myShapeGroup[0].myShape.fillColor = 'green';
        //this.shapesForSend.myShapeGroup.length = 0;
    }



    //这个函数在主窗口的对象中执行。接受sketchWindow里生成的基本图形，并交给generatePattern2复制多个
    receivePattern(shapes) {

        //选择被选中的那个（些）图形
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {

            //如果被选中
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {


                let tempPattern = new smartShapeGroup(); //临时变量存放生成的pattern
                tempPattern.generatePattern3(this.shapeGroup.myShapeGroup[i].myShape.bounds, shapes); //基于输入的图形
                this.shapeGroup.uniteSelectedShapes(tempPattern); //和全体图形相交运算
                //this.changeShapeGroupDisplay();
            }


        }

        //this.shapesForSend.myShapeGroup.length = 0;

    }


    //0
    displaySelectStatus() {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
        }
    }

    //
    ifAnySelected() {
        let ifAnySelected;
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                ifAnySelected = true;
            }

            //console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
        }
        return ifAnySelected;
    }

    getTag(tag) {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                this.shapeGroup.myShapeGroup[i].myTag.push(tag);
                console.log('new tag pushed!');
                for (let j = 0; j < this.shapeGroup.myShapeGroup[i].myTag.length; j++) {
                    //console.log(this.shapeGroup.myShapeGroup[i].myTag[j]);
                }

            }

            //console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
        }
    }

    deselectAll() {

        //console.log(' deselectAll');

        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                console.log(i + ' selected');
                this.shapeGroup.myShapeGroup[i].myShape.selected = false;
            }
            //this.shapeGroup.myShapeGroup[i].myShape.selected = false;
        }
    }

}