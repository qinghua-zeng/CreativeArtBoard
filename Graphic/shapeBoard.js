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


            this.mouseDownPoint = new Point();
            this.pathVector;
            this.simplifyLevel = 0;
            this.shapeGroup = new smartShapeGroup();

            this.lastShapeGroup = new smartShapeGroup();

            this.newTag = [];
            //背景矩形，这个矩形规定了整个画面的范围
            this.shapeGroup.myShapeGroup.push(new smartShape(new Path.Rectangle(this.x1 + 30, this.y1 + 30, this.canvasWidth - 60, this.canvasHeight - 60), 'bg'));

            this.lastShapeGroup.myShapeGroup.push(new smartShape(new Path.Rectangle(this.x1 + 30, this.y1 + 30, this.canvasWidth - 60, this.canvasHeight - 60), 'bg'));

            this.newTag.push('bg');
            //this.newTag.push('bg2');

            //初始化背景颜色
            this.shapeGroup.myShapeGroup[0].myShape.fillColor = 'white';

            this.lastShapeGroup.myShapeGroup[0].myShape.fillColor = 'white';
            //this.shapeGroup.myShapeGroup[0].myShape.strokeColor = 'black';
            //this.shapeGroup.myShapeGroup[0].myShape.strokeWidth = 2;
            this.shapeGroup.myShapeGroup[0].myShape.selected = true;

            //this.lastShapeGroup.myShapeGroup[0].myShape.selected = true;

            this.path; //鼠标当前画的新路径
            this.bezierCurve;
            this.bezierHandle = new Path();
            this.vector;

            this.shapesForSend = new smartShapeGroup();

            this.currentColorSet = 'cyan';
        }

        //00.4存储状态的变量
        {
            this.drawing = 'draw2'; //控制当前是不是在绘画
            this.ifIn = false; //初始化的变量为不在画布内
            this.mouseDragged = false;
            //this.currentTag;
            this.currentPressedKey;

            this.newTag;
        }

        //00.5画布变量信息显示
        {
            this.text1 = new PointText(new Point(this.x1, this.y1 + this.canvasHeight - 10)); //下方文字的位置
            this.text1.justification = 'left';
            this.text1.fillColor = 'green'; //下方文字的颜色
        }
    }

    setup_shapeBoard() {
        // 创建一个新的 Raster 对象
        var raster = new Raster('image4.jpg');
        raster.scale(0.2);
        raster.position = new Point(1100, 820);
        this.colorSets = getColorSet(raster, 8, 8);

        //this.shapeGroup.myShapeGroup[0].myShape.fillColor = this.colorSets[6];

    }

    getColor() {
        let theColor;

        let ppp = Math.round(Math.random() * (this.colorSets.length - 1));
        console.log(ppp);
        theColor = this.colorSets[ppp];

        return theColor;
    }

    //00-1 界面刷新
    draw_shapeBoard() {

        //显示变量状态
        {
            this.text1.content = '   status: ' + this.drawing + '  ifIn: ' + this.ifIn + '  simplifyLevel: ' + this.simplifyLevel + '  colorSet: ' + this.currentColorSet;
        }

    }

    //01 鼠标按下的情况
    onMouseDown(event) {

        this.ifMouseInsideBoard(event.point);

        if (this.drawing == 'test') {

            /* //let ttt = generateRandomString();
            //console.log(ttt);



            //====== 图形1 =======================================
            let pt = new Point(200, 200);
            let radius = 100;

            let circle = new Path.Circle({
                center: pt,

                radius: radius,
                fillColor: 'red'
            });

            let pts = getPointsFromCircle(circle, 16);
            let cls = arrayCircle2(pts, [5, 20], 'points');

            let pts4 = getPointsAngleFromCircle(circle, 9);

            //====== 图形2 =========================================
            let pts3 = new Point(600, 200); //圆的中心点

            //一组圆的半径
            let circleNum = getRandomArray(3, 10, 100, 'float'); //参数顺序 num, min, max, ifInt

            //基于点和半径生成一组圆
            let ccs = arrayCircle2(pts3, circleNum, 'radius');

            //======= 图形3 ========================================

            let rec = new Path.Rectangle(200, 400, 130, 30);
            rec.fillColor = 'green';

            let arrayRec = arrayShape(rec, pts4);
            this.newTag = generateRandomString(); */


        }

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

        //01-3 如果是bezeir模式
        if (this.drawing == 'bezeir') {
            //this.path.moveTo(event.point);

            //this.path.curveTo(70, 100, 130, 100, 150, 50);

            if (this.ifIn == true) {

                if (this.bezierCurve) {

                    //存在但封闭，需要创建新的
                    if (this.bezierCurve.closed) {
                        //console.log('exist closed, create new');
                        this.bezierCurve.remove();
                        this.bezierCurve = new Path();
                        this.mouseDownPoint = event.point;
                        this.bezierCurve.strokeColor = 'black';
                        this.bezierCurve.strokeWidth = 2;
                        this.bezierCurve.fullySelected = true;
                    }
                    //存在但没封闭，说明正在画
                    else {
                        //console.log('exist, continue');
                        this.mouseDownPoint = event.point;
                    }

                }
                //不存在，创建新的
                else {
                    //console.log('no exist');
                    this.bezierCurve = new Path();
                    this.mouseDownPoint = event.point;
                    this.bezierCurve.strokeColor = 'black';
                    this.bezierCurve.strokeWidth = 2;
                    this.bezierCurve.fullySelected = true;
                }

                this.bezierHandle = new Path();
                this.bezierHandle.fullySelected = true;
                this.bezierHandle.add(event.point);
                this.bezierHandle.add(event.point);
                //this.bezierHandle.add(new Point(300, 300));
                //console.log(this.bezierHandle._segments[1]._point._x);
            }


        }

    }

    //02 鼠标拖拽的情况  While the user drags the mouse, points are added to the path
    onMouseDrag(event) {
        this.mouseDragged = true;
        if (this.drawing == 'draw2') {
            //这次下笔产生的新图形
            this.ifMouseInsideBoard(event.point); //用于切换this.ifIn的状态，即鼠标是否在画布内
            if (this.ifIn) {
                this.path.add(event.point);
            }
        }

        if (this.bezierHandle && this.drawing == 'bezeir' && this.ifIn) {

            this.vector = new Point(event.point.x - this.mouseDownPoint.x, event.point.y - this.mouseDownPoint.y);

            this.bezierHandle._segments[0]._point._x = event.point.x - this.vector.x * 2;
            this.bezierHandle._segments[0]._point._y = event.point.y - this.vector.y * 2;


            this.bezierHandle._segments[1]._point._x = event.point.x;
            this.bezierHandle._segments[1]._point._y = event.point.y;

        }

    }

    //03 鼠标释放的情况  When the mouse is released, we simplify the path:
    onMouseUp(event) {


        //this.moveShapeGroup(this.shapeGroup);

        //03-1 如果是绘画模式
        {
            if (this.drawing == 'draw2') {

                //03-1-1 如果没拖拽过，删除创建的path
                if (this.ifIn && this.mouseDragged == false) {

                    this.path.remove();
                    this.itemSelect(event);

                }

                //03-1-2 如果拖拽过，进行布尔运算
                else if (this.ifIn && this.mouseDragged && this.ifAnySelected()) {
                    //console.log('dragged');
                    this.lastShapeGroup = this.cloneSmartShapeGroup(this.shapeGroup);

                    console.log(this.lastShapeGroup);
                    let pathSmartShapeGroup = new smartShapeGroup();

                    //path的生成
                    {
                        this.path.closed = true;
                        this.path.simplify(this.simplifyLevel); //精简路径
                        this.path.selected = false; //重要，防止生成结果有选择边界

                        this.newTag.push(generateRandomString());

                        pathSmartShapeGroup.myShapeGroup.push(new smartShape(this.path.clone(), this.newTag[this.newTag.length - 1]));
                    }



                    //03-1-2.3 进行相交运算
                    this.shapeGroup.uniteSelectedShapes(pathSmartShapeGroup, 'random'); //对this.shapeGroup中图形的修改
                    this.changeShapeGroupDisplay('all', 'noChange', 'black', 0);

                    this.mouseDragged = false;

                    this.path.remove();
                    this.path = new Path();
                    //console.log(this.lastShapeGroup);
                }

                //如果拖拽过但没有任何东西选择
                else if (this.ifIn && this.mouseDragged) {

                    this.path.remove();
                    this.path = new Path();
                    //this.path.remove(); //清空新画路径
                    this.mouseDragged = false;
                }


            }
        }

        //03-2 如果是选择模式
        {
            if (this.drawing == 'select') {

                this.itemSelect(event);

            }
        }

        //03-3 如果是bezeir模式
        if (this.drawing == 'bezeir' && this.ifIn) {


            let vector = new Point(event.point.x - this.mouseDownPoint.x, event.point.y - this.mouseDownPoint.y);

            let _vector = new Point(this.mouseDownPoint.x - event.point.x, this.mouseDownPoint.y - event.point.y);


            let segment1 = new Segment(this.mouseDownPoint, _vector, vector);
            this.bezierCurve.add(segment1);

            //console.log(this.path);

            this.bezierHandle.remove();
        }


    }

    //
    onKeyUp(event) {
        //console.log('event.key: ' + event.key);
        if (event.key == 's') {
            for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                //console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
                if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                    //this.shapeGroup.myShapeGroup[i].myTag.push(this.currentTag);
                    for (let j = 0; j < this.shapeGroup.myShapeGroup[i].myTag.length; j++) {
                        console.log(this.shapeGroup.myShapeGroup[i].myTag[j]);
                    }

                }
            }
        }

        //bezeir
        if (this.drawing == 'bezeir') {
            if (event.key == 'enter') {
                if (this.bezierCurve) {
                    this.bezierCurve.closed = true;
                    this.bezierCurve.selected = false;
                    this.shapeGroup.pushNewShape(this.bezierCurve.clone());
                }

                //console.log(this.shapeGroup.myShapeGroup.length);
            }


        }

        //
        this.currentPressedKey = 'none';
    }

    //
    shapeBoardKeyDown(event) {
        this.currentPressedKey = event.key;
        //console.log('shapeBoardKeyDown:' + this.currentPressedKey);
    }

    //04
    onMouseMove(event) {
        this.ifMouseInsideBoard(event.point);
    }

    //05 判断画的位置是不是在画布内的函数
    ifMouseInsideBoard(point) {
        if (point.x > this.x1 && point.x < this.x1 + this.canvasWidth && point.y > this.y1 && point.y < this.y1 + this.canvasHeight) {
            this.ifIn = true;

        } else {
            this.ifIn = false;
        }
    }

    //0
    changeShapeGroupDisplay(scope, color, strokeColor, strokeWidth) {

        //this.lastShapeGroup = this.cloneSmartShapeGroup(this.shapeGroup);

        if (scope == 'all') {
            for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {


                if (color == 'randomColor') {

                    //this.shapeGroup.myShapeGroup[i].myShape.fillColor = globalColor(this.currentColorSet);
                    this.shapeGroup.myShapeGroup[i].myShape.fillColor = this.getColor();

                } else if (color == 'noChange') {

                } else {
                    this.shapeGroup.myShapeGroup[i].myShape.fillColor = color;
                }

                this.shapeGroup.myShapeGroup[i].myShape.strokeWidth = strokeWidth;
                this.shapeGroup.myShapeGroup[i].myShape.strokeColor = strokeColor;

            }
        } else if (scope == 'selected') {
            for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                    if (color == 'randomColor') {

                        //this.shapeGroup.myShapeGroup[i].myShape.fillColor = globalColor(this.currentColorSet);
                        this.shapeGroup.myShapeGroup[i].myShape.fillColor = this.getColor();

                    } else if (color == 'noChange') {

                    } else {
                        this.shapeGroup.myShapeGroup[i].myShape.fillColor = color;
                    }
                }

                this.shapeGroup.myShapeGroup[i].myShape.strokeWidth = strokeWidth;
                this.shapeGroup.myShapeGroup[i].myShape.strokeColor = strokeColor;
                //this.shapeGroup.myShapeGroup[i].myShape.opacity = 1;
                //this.shapeGroup.myShapeGroup[i].myShape.scale(1);
            }
        }
    }

    //0
    itemSelect(event) {
        if (this.ifIn) { //console.log(i);


            if (this.currentPressedKey == 'meta') {
                for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                    if (this.shapeGroup.myShapeGroup[i].myShape.hitTest(event.point)) {
                        this.shapeGroup.myShapeGroup[i].myShape.selected = true;
                    }

                }

            } else if (this.currentPressedKey == 'alt') {
                //console.log(this.currentPressedKey);
                for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                    if (this.shapeGroup.myShapeGroup[i].myShape.hitTest(event.point)) {
                        this.shapeGroup.myShapeGroup[i].myShape.selected = false;
                    }
                }

                //没有快捷键的时候
            } else {

                for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {

                    //01 普通单选模式
                    if (this.shapeGroup.myShapeGroup[i].myShape.hitTest(event.point)) {
                        this.shapeGroup.myShapeGroup[i].myShape.selected = true;

                        //打印每个tag的内容
                        for (let k = 0; k < this.shapeGroup.myShapeGroup[i].myTag.length; k++) {
                            //console.log('Tag ' + j + ': ' + this.shapeGroup.myShapeGroup[i].myTag[j]);
                        }

                    }
                    //03
                    else {
                        this.shapeGroup.myShapeGroup[i].myShape.selected = false;
                        //console.log('no selected');
                    }
                }

            }


            //02 shift 模式
            if (this.currentPressedKey == 'shift') {
                for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
                    if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                        for (let j = 0; j < this.shapeGroup.myShapeGroup.length; j++) {
                            if (this.ifShape1InsideShape2(this.shapeGroup.myShapeGroup[j].myShape, this.shapeGroup.myShapeGroup[i].myShape)) {

                                this.shapeGroup.myShapeGroup[j].myShape.selected = true;

                            }
                        }
                    }

                }
            }
            //this.displaySelectStatus();
        }
    }

    //
    ifShape1InsideShape2(shape1, shape2) {
        let ifMouseInsideBoardShape;

        if (shape1.bounds._x > shape2.bounds._x && shape1.bounds._y > shape2.bounds._y && shape1.bounds._x + shape1.bounds._width < shape2.bounds._x + shape2.bounds._width && shape1.bounds._y + shape1.bounds._height < shape2.bounds._y + shape2.bounds._height) {

            if (shape2.contains(shape1.position) || shape1.intersects(shape2)) {

                ifMouseInsideBoardShape = true;
            } else {

                ifMouseInsideBoardShape = false;
            }

        } else {
            ifMouseInsideBoardShape = false;
        }

        return ifMouseInsideBoardShape;

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

        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) { //只有某个图形被选择才会生成图形
                this.shapeGroup.myShapeGroup[i].myShape.selected = false;

                let temp = this.shapeGroup.myShapeGroup[i].myShape.clone()
                    //temp.position = new Point(0, 0);
                this.shapesForSend.pushNewShape(temp.clone(), this.shapeGroup.myShapeGroup[i].myTag[0]); //把这个被选择的图形加到临时变量shapesForSend里
                temp.remove();

            }
        }

    }

    //这个函数在主窗口的对象中执行。接受sketchWindow里生成的基本图形，并交给generatePattern2复制多个
    receivePattern(shapes) {

        //接受tag
        for (let i = 0; i < shapes.myShapeGroup.length; i++) {
            for (let j = 0; j < shapes.myShapeGroup[i].myTag.length; j++) {
                this.newTag.push(shapes.myShapeGroup[i].myTag[j]);

            }

        }



        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {

            //如果被选中
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {

                //this.newTag=shapes
                let tempPattern = new smartShapeGroup(); //临时变量存放生成的pattern

                //参数顺序：bounds, shapes, _xNumMin, _xNumMax, _yNumMin, _yNumMax, _scaleMax, _scaleMin, _rotateMin, _rotateMax, _xOffset, _yOffset
                tempPattern.generatePattern4(this.shapeGroup.myShapeGroup[i].myShape.bounds, shapes, 4, 7, 4, 7, 0.3, 0.8, 0, 180, 50, 50); //基于输入的图形

                //tempPattern.generatePattern3(this.shapeGroup.myShapeGroup[i].myShape.bounds, shapes);

                this.shapeGroup.uniteSelectedShapes(tempPattern, 'nochange'); //和全体图形相交运算
                //this.changeShapeGroupDisplay('all','noChange',);
            }

        } //选择被选中的那个（些）图形

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
                break;

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
                //console.log(i + ' selected');
                this.shapeGroup.myShapeGroup[i].myShape.selected = false;
            }
            //this.shapeGroup.myShapeGroup[i].myShape.selected = false;
        }
    }

    selectInsideShapes() {

        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {
                console.log(this.shapeGroup.myShapeGroup[i]);
            }

        }

        //console.log(event.event.key);

    }

    cloneSmartShapeGroup(shapes) {


        let cloneSmartShapeGroup = new smartShapeGroup();
        for (let i = 0; i < shapes.myShapeGroup.length; i++) {


            cloneSmartShapeGroup.myShapeGroup.push(new smartShape(shapes.myShapeGroup[i].myShape.clone(), 'clone'));

            for (let j = 0; j < shapes.myShapeGroup[i].myTag.length; j++) {
                cloneSmartShapeGroup.myShapeGroup[cloneSmartShapeGroup.myShapeGroup.length - 1].myTag.push(shapes.myShapeGroup[i].myTag[j]);
            }
            cloneSmartShapeGroup.myShapeGroup[cloneSmartShapeGroup.myShapeGroup.length - 1].myShape.selected = false;

        }

        cloneSmartShapeGroup.move(-1500, 0);

        return cloneSmartShapeGroup;

    }

    undo() {

        //console.log('undo');

        let tempExchange = this.cloneSmartShapeGroup(this.shapeGroup)

        this.shapeGroup.remove();
        //console.log(this.shapeGroup);
        this.shapeGroup = this.cloneSmartShapeGroup(this.lastShapeGroup);
        //console.log(this.shapeGroup);
        this.shapeGroup.move(+3000, 0);

        //console.log(tempExchange);
        this.lastShapeGroup = tempExchange;

        //console.log(this.shapeGroup.myShapeGroup.length);
    }

    moveShapeGroup(shapes) {
        shapes.move(20, 0);
        return shapes;
    }


    generateFlower(petal_num_min, petal_num_max) {


        let petal_num = get_random_int_from_range(petal_num_min, petal_num_max);


        //console.log(petal_num);
        let pt = new Point(1000, 110);

        let radius_pistil = 10;

        let radius_petals = 30; //花瓣所在的看不见的圆的半径


        //花蕊的圆
        let circle_pistil = new Path.Circle({
            center: pt,

            radius: radius_pistil,
            fillColor: globalColor(this.currentColorSet)

        });


        //花瓣的圆
        let circle_petals = new Path.Circle({
            center: pt,

            radius: radius_petals,
            fillColor: 'red'

        });

        let pa = getPointsAngleFromCircle(circle_petals, petal_num); //带角度的点阵

        let ss = this.getSelectedShape(); //手绘的单个花瓣图形
        ss.selected = true;
        ss.bringToFront();

        let as = arrayShape(ss, pa); //花瓣图形组

        this.lastShapeGroup = this.cloneSmartShapeGroup(this.shapeGroup);
        console.log(this.lastShapeGroup.myShapeGroup.length);

        //给到shapeGroup
        this.shapeGroup.pushNewShape(circle_pistil, 'flowCT');

        for (let i = 0; i < as.length; i++) {
            this.shapeGroup.pushNewShape(as[i], 'petal');
            this.shapeGroup.myShapeGroup[this.shapeGroup.myShapeGroup.length - 1].myShape.selected = false;
        }

        //console.log(this.shapeGroup);

    }

    getSelectedShape() {

        for (let i = 0; i < this.shapeGroup.myShapeGroup.length; i++) {
            if (this.shapeGroup.myShapeGroup[i].myShape.selected) {

                return this.shapeGroup.myShapeGroup[i].myShape.clone();

            }
            //console.log(i + ': ' + this.shapeGroup.myShapeGroup[i].myShape.selected);
        }

    }

    shapeColor() {



    }

    getColorRange(_colorSet) {
        let rMin = 1;
        let rMax = 0;

        let gMin = 1;
        let gMax = 0;

        let bMin = 1;
        let bMax = 0;

        for (let i = 0; i < _colorSet.length; i++) {
            if (_colorSet[i]._components[0] < rMin) {
                rMin = _colorSet[i]._components[0];
            }
            if (_colorSet[i]._components[0] > rMax) {
                rMax = _colorSet[i]._components[0];
            }

            if (_colorSet[i]._components[1] < gMin) {
                gMin = _colorSet[i]._components[1];
            }
            if (_colorSet[i]._components[1] > gMax) {
                gMax = _colorSet[i]._components[1];
            }

            if (_colorSet[i]._components[2] < bMin) {
                bMin = _colorSet[i]._components[2];
            }
            if (_colorSet[i]._components[2] > bMax) {
                bMax = _colorSet[i]._components[2];
            }
            //console.log();
        }

        console.log('r: ' + rMin + '--' + rMax);
        console.log('g: ' + gMin + '--' + gMax);
        console.log('b: ' + bMin + '--' + bMax);

    }


}