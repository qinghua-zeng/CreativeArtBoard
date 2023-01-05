//freeOpenCurve==============================================
class divideCurve {

    //00变量
    constructor() {

        //私有变量
        {
            //00.1 有效画图区域，可以画出路径的地方
            {
                this.x1 = 0;
                this.x2 = 600;
                this.y1 = 0;
                this.y2 = 360;
                this.drawingArea = new Path.Rectangle(this.x1, this.y1, this.x2, this.y2);
                this.drawingArea.strokeColor = 'black';
            }

            //00.2 画布大小及位置
            {
                var padding = 30; //内边距
                var point1 = new Point(padding, padding);
                //var point2 = new Point(420, 150);
                var size = new Size(540, 300);
            }

            //00.3 存储图形的变量
            {
                this.path; //鼠标当前画的新路径

                this.pathShape = new smartShapeGroup();

                this.shapeGroup = new smartShapeGroup();

                //this.multiPaths.push(new Path.Rectangle(point1, size)); //先放一个背景板，它是一个矩形路径

                //新背景
                {
                    this.shapeGroup.myShapeGroup.push(new smartShape(new Path.Rectangle(30, 30, 540, 300)));
                    //初始化背景颜色
                    this.shapeGroup.myShapeGroup[0].myShape.fillColor = 'pink';

                }

            }

            //00.4存储状态的变量
            {
                this.drawing = 'draw2'; //控制当前是不是在绘画
                this.ifIn = false; //初始化的变量为不在画布内
                this.seletedPathNum = 0;
                this.mouseDragged = false;
            }

            //00.5画布变量信息显示
            {

                this.text1 = new PointText(new Point(50, 495)); //下方文字的位置
                this.text1.justification = 'left';
                this.text1.fillColor = 'green'; //下方文字的颜色

            }

            //00.6颜色变量
            {
                //this.myColor = new Array;
                this.rMin = 200;
                this.rMax = 255;
                this.gMin = 0;
                this.gMax = 255;
                this.bMin = 100;
                this.bMax = 255;
                //this.currentColor;
            }

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
                }

                //03-1-2 如果拖拽过，进行布尔运算
                if (this.ifIn && this.mouseDragged) {
                    //03-1-2.1 对刚画完路径的简化处理
                    {
                        //path的生成
                        {
                            this.path.closed = true;
                            this.path.simplify(1); //精简路径
                            this.path.selected = false; //重要，防止生成结果有选择边界
                        }

                        //将path转换成smartShape类型
                        {
                            this.pathShape.myShapeGroup.length = 0;
                            this.pathShape.myShapeGroup.push(new smartShape(this.path.clone()));

                        }

                    }


                    //03-1-2.3 对shapeGroup的处理
                    {
                        this.shapeGroup.uniteShapes(this.pathShape); //对this.shapeGroup中图形的修改

                        this.changeShapeGroupDisplay();
                    }


                    //03-1-2.4 最后处理pathShape 
                    {
                        for (let i = 0; i < this.pathShape.myShapeGroup.length; i++) {
                            //this.pathShape.myShapeGroup[i].myShape.scale(0.3);
                            this.pathShape.myShapeGroup[i].myShape.remove(); //取消显示，但不清空数组
                        }
                        this.pathShape.myShapeGroup.length = 0; //清空数组，但不取消显示 pathShape

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
                //console.log(this.pattern);

                //03-2-2 对shapeGroup的操作
                for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                    //console.log(i);
                    if (this.shapeGroup.myShapeGroup[i].myShape.hitTest(event.point)) {
                        this.shapeGroup.myShapeGroup[i].myShape.selected = true;

                        this.shapeGroup.myShapeGroup[i].myShape.onDoubleClick = function(event) {
                            //console.log('double Clicked: ' + i);
                            let tempPattern = new smartShapeGroup();
                            tempPattern.generatePattern(this.shapeGroup.myShapeGroup[i].myShape.bounds);

                            //this.shapeGroup.myShapeGroup[i].myShape.selected = true;
                            //console.log(this.shapeGroup.myShapeGroup[i].myShape.selected);
                            this.shapeGroup.uniteSelectedShapes(tempPattern);
                            this.changeShapeGroupDisplay();

                            //console.log(tempPattern.myShapeGroup.length);


                        }.bind(this);
                    } else {
                        this.shapeGroup.myShapeGroup[i].myShape.selected = false;
                    }
                }
            }
        }

        console.log('=====finish=====');
    }

    onMouseMove(event) {
        this.ifInside(event.point);
    }

    //判断画的位置是不是在画布内的函数
    ifInside(point) {
        if (point.x > this.x1 && point.x < this.x2 && point.y > this.y1 && point.y < this.y2) {
            this.ifIn = true;

        } else {
            this.ifIn = false;
        }
    }

    getColor() {
        var r = Math.round(Math.random() * (this.rMax - this.rMin) + this.rMin);
        var g = Math.round(Math.random() * (this.gMax - this.gMin) + this.gMin);
        var b = Math.round(Math.random() * (this.bMax - this.bMin) + this.bMin);


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

    changeShapeGroupDisplay() {
        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            this.shapeGroup.myShapeGroup[i].myShape.fillColor = this.getColor();
            this.shapeGroup.myShapeGroup[i].myShape.strokeWidth = 4;
            this.shapeGroup.myShapeGroup[i].myShape.strokeColor = 'black';
            this.shapeGroup.myShapeGroup[i].myShape.opacity = 1;
            this.shapeGroup.myShapeGroup[i].myShape.scale(1);
        }
    }

}