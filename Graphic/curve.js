//freeOpenCurve==============================================
class divideCurve {

    //00变量
    constructor() {

        //私有变量

        //00.1 有效画图区域，可以画出路径的地方
        {
            this.x1 = 50;
            this.canvasWidth = 800;
            this.y1 = 0;
            this.canvasHeight = 650;
            this.drawingArea = new Path.Rectangle(this.x1, this.y1, this.canvasWidth, this.canvasHeight);
            this.drawingArea.strokeColor = 'blue';
        }

        //00.2 存储图形的变量
        {
            this.path; //鼠标当前画的新路径
            this.simplifyLevel = 0;
            this.shapeGroup = new smartShapeGroup();

            //背景矩形，这个矩形规定了整个画面的范围
            this.shapeGroup.myShapeGroup.push(new smartShape(new Path.Rectangle(150, 30, 540, 590)));
            //初始化背景颜色
            this.shapeGroup.myShapeGroup[0].myShape.fillColor = 'white';
            this.shapeGroup.myShapeGroup[0].myShape.strokeColor = 'black';
            this.shapeGroup.myShapeGroup[0].myShape.strokeWidth = 2;
        }

        //00.4存储状态的变量
        {
            this.drawing = 'draw2'; //控制当前是不是在绘画
            this.ifIn = false; //初始化的变量为不在画布内
            this.mouseDragged = false;
        }

        //00.5画布变量信息显示
        {
            this.text1 = new PointText(new Point(50, 695)); //下方文字的位置
            this.text1.justification = 'left';
            this.text1.fillColor = 'green'; //下方文字的颜色
        }


    }

    //00-1 界面刷新
    draw() {

        //显示变量状态
        {
            this.text1.content = '   status: ' + this.drawing + '  ifIn: ' + this.ifIn;
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
                }

                //03-1-2 如果拖拽过，进行布尔运算
                if (this.ifIn && this.mouseDragged) {

                    let pathSmartShapeGroup = new smartShapeGroup();
                    //03-1-2.1 对刚画完路径的简化处理
                    {
                        //path的生成
                        {
                            this.path.closed = true;
                            this.path.simplify(this.simplifyLevel); //精简路径
                            this.path.selected = false; //重要，防止生成结果有选择边界
                            pathSmartShapeGroup.myShapeGroup.push(new smartShape(this.path.clone()));
                        }

                    }


                    //03-1-2.3 进行相交运算
                    this.shapeGroup.uniteSelectedShapes(pathSmartShapeGroup); //对this.shapeGroup中图形的修改

                    //03-1-2.4 最后处理pathShape 
                    {
                        this.path.scale(0);
                        this.path.remove(); //清空新画路径
                    }

                    this.mouseDragged = false;

                }
            }
        }

        //03-2 如果是选择模式
        {
            if (this.drawing == 'select') {

                //03-2-2 对shapeGroup的操作
                this.itemSelect(event);
                this.generatePattern(event);
                //this.displaySelectStatus();
            }
        }

        console.log('=====finish=====');
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
    changeShapeGroupDisplay() {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            //this.shapeGroup.myShapeGroup[i].myShape.fillColor = this.getColor();
            this.shapeGroup.myShapeGroup[i].myShape.strokeWidth = 2;
            this.shapeGroup.myShapeGroup[i].myShape.strokeColor = 'black';
            this.shapeGroup.myShapeGroup[i].myShape.opacity = 1;
            this.shapeGroup.myShapeGroup[i].myShape.scale(1);
        }
    }

    //0
    itemSelect(event) {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            //console.log(i);
            if (this.shapeGroup.myShapeGroup[i].myShape.hitTest(event.point)) {
                this.shapeGroup.myShapeGroup[i].myShape.selected = true;


            } else {
                this.shapeGroup.myShapeGroup[i].myShape.selected = false;
            }
        }
    }

    //0
    generatePattern(event) {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {

            this.shapeGroup.myShapeGroup[i].myShape.onDoubleClick = function(event) {

                let tempPattern = new smartShapeGroup();
                tempPattern.generatePattern(this.shapeGroup.myShapeGroup[i].myShape.bounds);

                this.shapeGroup.uniteSelectedShapes(tempPattern);
                this.changeShapeGroupDisplay();


            }.bind(this);

        }

    }

    //0
    displaySelectStatus() {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
        }
    }


}