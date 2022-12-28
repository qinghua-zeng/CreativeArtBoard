//freeOpenCurve===================================================================================
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
                console.log(this.path);
                this.multiPaths = new Array; //核心变量！！储存画布上显示的图形！！
                this.multiPaths.push(new Path.Rectangle(point1, size)); //先放一个背景板，它是一个矩形路径

                //初始化背景颜色
                for (let i = 0; i < this.multiPaths.length; i++) {
                    this.multiPaths[i].fillColor = 'white'; //初始化的背景是黑色
                    this.multiPaths[i].strokeColor = 'black';
                    //this.multiPaths[i].selected = false;
                }
                this.multiPaths2 = new Array; //负责存储图形布尔计算结果的数组，每次计算完会还给multiPaths数组！}

            }

            //00.4存储状态的变量
            {
                this.drawing = 'none'; //控制当前是不是在绘画
                this.ifIn = false; //初始化的变量为不在画布内
                this.seletedPathNum = 0;
                this.mouseDragged = false;
            }

            //00.5画布变量信息显示
            {

                this.text1 = new PointText(new Point(50, 495)); //下方文字的位置
                this.text1.justification = 'left';
                this.text1.fillColor = 'green'; //下方文字的颜色

                //this.selectButton = new mouseClickButton1(0, 362, 'select');
                //this.drawButton = new mouseClickButton1(60, 362, 'draw');
                //this.colorButton = new mouseClickButton1(120, 362, 'color');
                this.panel = new panel;
            }

            //00.6颜色变量
            {
                //this.myColor = new Array;
                this.rMin = 200;
                this.rMax = 255;
                this.gMin = 0;
                this.gMax = 255;
                this.bMin = 200;
                this.bMax = 255;
                //this.currentColor;
            }

        }
    }



    //00-1 界面刷新
    draw() {

        //显示变量状态
        {
            this.text1.content = 'multiPaths1 : ' + this.multiPaths.length + '   multiPaths2 : ' + this.multiPaths2.length + '   status: ' + this.drawing + '   selected path:' + this.seletedPathNum + '  ifIn: ' + this.ifIn;
        }


    }

    //01 鼠标按下的情况
    onMouseDown(event) {
        this.ifInside(event.point);
        this.panel.onMouseDown(event); //第一时间更新panel的status的变量
        this.drawing = this.panel.status;

        if (this.drawing == 'select') { //01-2 如果是“选择”状态
            if (this.ifIn == true) {
                console.log('multipath length: ' + this.multiPaths.length);

                for (let i = 0; i < this.multiPaths.length; i++) {

                    if (this.multiPaths[i].hitTest(event.point)) {
                        this.multiPaths[i].selected = true; //
                        this.multiPaths[i].strokeColor = 'blue';
                        this.multiPaths[i].strokeWidth = '3';
                    } else {
                        this.multiPaths[i].selected = false; //
                        //this.multiPaths[i].strokeColor = 'red';
                        this.multiPaths[i].strokeWidth = '0';
                    }
                    console.log('multipath[' + i + ']:' + this.multiPaths[i].selected);
                }
            }
            //}

        } else if (this.drawing == 'draw2') { //01-2 如果是“选择”状态

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


        //this.panel.onMouseDown(event);

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
        if (this.drawing == 'draw2') { //03-1 如果在画布内

            //如果没拖拽过，删除创建的path
            if (this.ifIn && this.mouseDragged == false) {
                for (let i = 0; i < this.multiPaths.length; i++) {

                    if (this.multiPaths[i].hitTest(event.point)) {
                        this.multiPaths[i].selected = true; //
                        this.multiPaths[i].strokeColor = 'blue';
                        this.multiPaths[i].strokeWidth = '3';
                    } else {
                        this.multiPaths[i].selected = false; //
                        //this.multiPaths[i].strokeColor = 'red';
                        this.multiPaths[i].strokeWidth = '0';
                    }
                    console.log('multipath[' + i + ']:' + this.multiPaths[i].selected);
                }
                this.path.remove();
            }
            //如果拖拽过，进行布尔运算
            if (this.ifIn && this.mouseDragged) {
                //对刚画完路径的处理
                {
                    this.path.closed = true;
                    this.path.simplify(1); //精简路径
                }

                //用新画的图形与原图形生成新图形
                for (let i = 0; i < this.multiPaths.length; i++) {
                    if (this.multiPaths[i].selected) { //挑出被选中的图形
                        //alert('you selected!');
                        this.multiPaths2.push(this.multiPaths[i].subtract(this.path)); //一个相减

                        this.multiPaths2.push(this.multiPaths[i].intersect(this.path)); //一个相交，就会把一个图形分成两个
                        //this.getColor();
                        this.multiPaths2[this.multiPaths2.length - 1].fillColor = this.getColor(); //为数组中最后（最新）一个图形上色
                        this.multiPaths[i].remove(); //
                    } else { //如果没被选中（鼠标没经过）

                        this.multiPaths2.push(this.multiPaths[i].clone()); //把这个以前没变的路径原封不动放到multiPaths2，到此为止multiPaths2已经存储所有最新生成的图形
                        //this.multiPaths[i].remove();
                    }
                }


                this.multiPaths.length = 0; //清空，为了放新的

                //把临时存储multiPaths2还给multiPaths数组
                for (let j = 0; j < this.multiPaths2.length; j++) {
                    this.multiPaths.push(this.multiPaths2[j].clone());
                }

                //打印路径数量
                //console.log('multipath length: ' + this.multiPaths.length);

                //打印每个路径的是否被选择
                {
                    // for (let i = 0; i < this.multiPaths.length; i++) {
                    //     console.log('multipath[' + i + ']:' + this.multiPaths[i].selected);
                    // }
                }


                //清空临时存储multiPaths2
                {
                    for (let j = 0; j < this.multiPaths2.length; j++) {
                        this.multiPaths2[j].selected = false;
                        this.multiPaths2[j].remove();
                    }
                    this.multiPaths2.length = 0; //清空临时储存路径的变量
                }

                //取消所有图形选择
                for (let i = 0; i < this.multiPaths.length; i++) {
                    this.multiPaths[i].selected = false; //先都取消选择
                    this.multiPaths[i].strokeWidth = 0; //
                }

                this.path.remove(); //清空新画路径
                this.mouseDragged = false;
            }
        } else { //03 - 2 如果释放鼠标时鼠标在画布区域外
            for (let i = 0; i < this.multiPaths.length; i++) {
                //this.multiPaths[i].selected = false; //先都取消选择

            }
        }
        this.seletedPathNum = 0;

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

}