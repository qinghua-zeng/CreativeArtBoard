//=================================================
class smartShape {
    constructor(shape, _tag) {
        this.myShape = shape;
        //this.myShape.fillColor = 'pink';
        this.myTag = new Array;
        this.myTag.push(_tag);
        //console.log('a smartShape create!  ' + _tag);
    }

}

//=================================================
class smartShapeGroup {
    constructor() {
        this.myShapeGroup = new Array; //数组元素必须是smartShape类型
        this.bounds;
        this.position;
    }

    //原始图形与输入的图形进行相交运算
    uniteShapes(shapes) {

        let tempShapeGroup = new Array;

        //01 初始化
        {

            console.log('intial shapeGroup length: ' + this.myShapeGroup.length);
            //tempShapeGroup.length = 0;
        }

        //02 图形的布尔运算
        for (let i = 0; i < this.myShapeGroup.length; i++) {

            this.myShapeGroup[i].myShape.seleted = 'false';

            //02-1 对每个原始图形进行判断
            for (let j = 0; j < shapes.myShapeGroup.length; j++) {

                //02-1-1 只有与输入图形相交或包含的原图形才会被选择 进行布尔运算
                if (this.myShapeGroup[i].myShape.intersects(shapes.myShapeGroup[j].myShape) || this.myShapeGroup[i].myShape.contains(shapes.myShapeGroup[j].myShape.position)) {


                    //01 初始化
                    {
                        //console.log('yes! i:' + i + '  j:' + j);
                        //this.myShapeGroup[i].myShape.seleted = true;
                    }

                    //02 布尔运算
                    {
                        let kk = this.myShapeGroup[i].myShape.subtract(shapes.myShapeGroup[j].myShape);

                        let gg = shapes.myShapeGroup[j].myShape.intersect(this.myShapeGroup[i].myShape);
                        //在this.tempShapeGroup创建新的smartShape类
                        //this.tempShapeGroup.push(new smartShape());
                        tempShapeGroup.push(new smartShape(gg.clone(), 'gg'));

                        //运算结果给到 this.tempShapeGroup
                        //tempShapeGroup[tempShapeGroup.length - 1].myShape = gg.clone();

                        //kk.fillColor = 'black';

                        this.myShapeGroup[i].myShape.scale(0); //清空缓存
                        this.myShapeGroup[i].myShape.remove();

                        this.myShapeGroup[i].myShape = kk.clone();

                        kk.scale(0);
                        kk.remove();
                        gg.scale(0);
                        gg.remove();
                    }

                }

                //02-1-2 
                else { //
                    //console.log('No!  i:' + i + '  j:' + j);
                }

            }
        }



        //03 把所有的布尔运算结果都给到 this.myShapeGroup
        for (let i = 0; i < tempShapeGroup.length; i++) {
            tempShapeGroup[i].myShape.seleted = false;
            //this.myShapeGroup.push(this.tempShapeGroup[i]);
            //this.tempShapeGroup[i].myShape.scale(0); //取消临时显示
            tempShapeGroup[i].myShape.fillColor = 'green';
            this.myShapeGroup.push(tempShapeGroup[i]);
        }

        //04 myShapeGroup显示设置
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            //console.log(this.myShapeGroup[i].myShape.scale(1));
            //this.myShapeGroup[i].myShape.scale(0.2);
            this.myShapeGroup[i].myShape.seleted = false;
            this.myShapeGroup[i].myShape.fillColor = 'pink';
            this.myShapeGroup[i].myShape.strokeColor = 'black';
            this.myShapeGroup[i].myShape.strokeWidth = 5;
            //this.myShapeGroup[i].myShape.opacity = 0.8;
        }

        //05 结束，打印最终变量
        {
            console.log('final shapeGroup length: ' + this.myShapeGroup.length);
        }


    }

    uniteSelectedShapes(shapes, _colorMode) {
        console.log('=== start doing uniteSelectedShapes()...');
        let tempShapeGroup = new Array;
        let ifAnySelectedShape = false;
        //01 初始化
        console.log('intial shapeGroup length: ' + this.myShapeGroup.length);

        //02 图形的布尔运算
        for (let i = 0; i < this.myShapeGroup.length; i++) {

            if (this.myShapeGroup[i].myShape.selected == true) { //遍历【基本】图形
                ifAnySelectedShape = true;

                this.myShapeGroup[i].myShape.selected = false;

                //02-1 对每个原始图形进行判断
                for (let j = 0; j < shapes.myShapeGroup.length; j++) { //遍历【输入】图形

                    //02-1-1 只有与输入图形相交或包含的原图形才会被选择 进行布尔运算
                    if (this.myShapeGroup[i].myShape.intersects(shapes.myShapeGroup[j].myShape) || this.myShapeGroup[i].myShape.contains(shapes.myShapeGroup[j].myShape.position)) {

                        //02 布尔运算,
                        {
                            //subtractResult 获取基本图形减去输入图形的结果
                            let subtractResult = this.myShapeGroup[i].myShape.subtract(shapes.myShapeGroup[j].myShape);

                            //intersectResult 获取输入图形和基本图形的相交结果
                            let intersectResult = shapes.myShapeGroup[j].myShape.intersect(this.myShapeGroup[i].myShape);

                            intersectResult.opacity = 1;

                            if (_colorMode == 'random') {
                                intersectResult.fillColor = globalColor('no');
                                //intersectResult.fillColor = 'green';
                            }


                            //let ttt = generateRandomString();
                            //在this.tempShapeGroup创建新的smartShape类
                            tempShapeGroup.push(new smartShape(intersectResult.clone(), shapes.myShapeGroup[j].myTag[0]));
                            //console.log(shapes.myShapeGroup[j].myTag[0]);

                            this.myShapeGroup[i].myShape.scale(0); //清空缓存
                            this.myShapeGroup[i].myShape.remove();

                            this.myShapeGroup[i].myShape = subtractResult.clone(); //把参与运算的图形变成相减后的结果

                            //取消缓存显示
                            {
                                subtractResult.scale(0);
                                subtractResult.remove();
                                intersectResult.scale(0);
                                intersectResult.remove();
                            }
                        }

                    }

                }
            }
        }


        for (let j = 0; j < shapes.myShapeGroup.length; j++) {
            shapes.myShapeGroup[j].myShape.remove(); //清除【输入路径】的缓存，不然在ai文件背后有透明度为0的多余路径
        }

        console.log('tempShapeGroup.length: ' + tempShapeGroup.length);

        //03 把所有的【相交】运算结果都给到 this.myShapeGroup

        for (let i = 0; i < tempShapeGroup.length; i++) {
            tempShapeGroup[i].myShape.seleted = false;

            //tempShapeGroup[i].myShape.fillColor = 'yellow'; //只针对相交产生的图形
            this.myShapeGroup.push(tempShapeGroup[i]);
            //console.log(tempShapeGroup[i]);
            //tempShapeGroup[i].myShape.remove();
        }

        //04 myShapeGroup显示设置,注意这个是针对所有的图形
        for (let i = 0; i < this.myShapeGroup.length; i++) {

            //this.myShapeGroup[i].myShape.scale(0.2);
            this.myShapeGroup[i].myShape.seleted = false;
            //this.myShapeGroup[i].myShape.fillColor = globalColor();
            //this.myShapeGroup[i].myShape.fillColor = 'red';
            //this.myShapeGroup[i].myShape.strokeColor = 'black';
            //this.myShapeGroup[i].myShape.strokeWidth = 0;
            //this.myShapeGroup[i].myShape.opacity = 0.8;
        }

        //05 结束，打印最终变量
        {
            console.log('final shapeGroup length: ' + this.myShapeGroup.length);
            if (ifAnySelectedShape) {
                console.log('=== done uniteSelectedShapes()');
            } else {
                console.log('=== no selected shape, not doing anything! ');
            }
        }
    }


    //生成图形============================================
    generatePattern(bounds) {

        let xNum = 4;
        let yNum = 4;

        for (let i = 0; i < xNum; i++) {
            for (let j = 0; j < yNum; j++) {
                this.pushNewShape(new Path.Circle({
                    center: [bounds._x + i * (bounds._width / (xNum - 1)), bounds._y + j * (bounds._height / (yNum - 1))],
                    radius: 10,
                    seleted: false
                        //fillColor: 'green'
                }));
            }

        }
    }

    //基于传递进来的基本图形组（smartShapeGroup类） 生成复合图案 最终生成smartShapeGroup类
    generatePattern4(bounds, shapes, _xNumMin, _xNumMax, _yNumMin, _yNumMax, _scaleMax, _scaleMin, _rotateMin, _rotateMax, _xOffset, _yOffset) {
        console.log('=== start doing generatePattern4 ()...');

        //let sss = shapes;
        //console.log(sss);

        let originalBounds = shapes.getBounds();

        //========================================================
        let xNumMin = _xNumMin;
        let xNumMax = _xNumMax;

        let yNumMin = _yNumMin;
        let yNumMax = _yNumMax;

        let scaleMax = _scaleMax; //比例
        let scaleMin = _scaleMin; //比例

        let rotateMin = _rotateMin; //角度度数
        let rotateMax = _rotateMax; //角度度数

        let xOffset = _xOffset;
        let yOffset = _yOffset;

        // xSpace ySpace的计算 =====================================

        let xNum = Math.round(xNumMin + (xNumMax - xNumMin) * Math.random());
        let yNum = xNum;

        let xSpace;
        let ySpace;

        {
            if (xNum > 1) {
                xSpace = (bounds._width - originalBounds._width) / (xNum - 1);
            } else {
                xSpace = 0;
            }

            if (yNum > 1) {
                ySpace = (bounds._height - originalBounds._height) / (yNum - 1);
            } else {
                ySpace = 0;
            }
        }



        //==================================================
        for (let j = 0; j < xNum; j++) {
            for (let k = 0; k < yNum; k++) {

                let xOffsetRandom = xOffset * (-1) + xOffset * 2 * (Math.random());
                let yOffsetRandom = yOffset * (-1) + yOffset * 2 * (Math.random());

                //先调整位置
                shapes.moveTo(new Point(originalBounds._width / 2 + bounds._x + j * xSpace + xOffsetRandom, originalBounds._height / 2 + k * ySpace + yOffsetRandom + bounds._y));

                //随机角度
                let rotateShape = rotateMin + (rotateMax - rotateMin) * Math.random();
                shapes.rotate(rotateShape);

                //随机缩放
                let scaleShape = scaleMin + (scaleMax - scaleMin) * Math.random();
                shapes.scale(scaleShape);


                for (let i = 0; i < shapes.myShapeGroup.length; i++) {
                    //获取子图形
                    let temp = new smartShape(shapes.myShapeGroup[i].myShape.clone(), 'temp');
                    temp.myShape.opacity = 0;
                    shapes.myShapeGroup[i].myShape.opacity = 0; //这个把复制的图形全部隐藏
                    this.myShapeGroup.push(new smartShape(temp.myShape.clone(), shapes.myShapeGroup[i].myTag[0]));

                    temp.myShape.scale(0);
                    temp.myShape.remove();
                }

                //恢复图形的原大小和角度
                shapes.scale(1 / scaleShape);
                shapes.rotate(rotateShape * (-1));

                //恢复位置
                shapes.moveTo(new Point(originalBounds._width / 2 + bounds._x + j * xSpace - xOffsetRandom, originalBounds._height / 2 + bounds._y + k * ySpace - yOffsetRandom));
            }
        }

        for (let i = 0; i < shapes.myShapeGroup.length; i++) {
            shapes.myShapeGroup[i].myShape.remove();
        }

        console.log('=== done generatePattern4()');
        //console.log('this.myShapeGroup.length: ' + this.myShapeGroup.length);

    }


    //============================================
    pushNewShape(shape, _tag) {
        this.myShapeGroup.push(new smartShape(shape, _tag));
    }

    //====
    updateBoundsAndPosition() {
        let tempGroup = new Group();
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            tempGroup.addChildren([this.myShapeGroup[i].myShape]);
        }
        this.bounds = tempGroup.bounds;
        this.position = tempGroup.position;
        //console.log(this.bounds);
        //console.log(tempGroup.position);
    }

    getBounds() {
        this.updateBoundsAndPosition();
        //console.log(this.bounds);
        //console.log(this.position);
        return this.bounds;

    }

    rotate(angle) {
        let tempGroup = new Group();
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            tempGroup.addChildren([this.myShapeGroup[i].myShape]);
        }
        tempGroup.rotate(angle);
    }

    scale(percentage) {
        let tempGroup = new Group();
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            tempGroup.addChildren([this.myShapeGroup[i].myShape]);
        }
        tempGroup.scale(percentage);
    }

    moveTo(point) {
        let tempGroup = new Group();
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            tempGroup.addChildren([this.myShapeGroup[i].myShape]);
        }
        tempGroup.position = point;


    }

    move(x, y) {
        let tempGroup = new Group();
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            tempGroup.addChildren([this.myShapeGroup[i].myShape]);
        }
        tempGroup.position = new Point(tempGroup.position._x + x, tempGroup.position._y + y);
        //console.log(tempGroup.position);
        //console.log(new Point(x, y));
    }

    remove() {
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            //this.myShapeGroup[i].myShape.scale(0);
            this.myShapeGroup[i].myShape.remove();

        }
        this.myShapeGroup.length = 0;
    }


    //基于传递进来的基本图形组（smartShapeGroup类） 生成复合图案 最终生成smartShapeGroup类============================================
    generatePattern3(bounds, shapes) {
        console.log('=== start doing generatePattern3 ()...');

        let sss = shapes;
        console.log(sss);

        /* for(){
    
            } */

        let originalBounds = shapes.getBounds();

        //========================================================
        let xNumMin = 4;
        let xNumMax = 7;

        let yNumMin = 2;
        let yNumMax = 3;

        let xNum = Math.round(xNumMin + (xNumMax - xNumMin) * Math.random());
        let yNum = xNum;


        let scaleMax = 0.7; //比例
        let scaleMin = 0.3; //比例

        let rotateMin = 0; //角度度数
        let rotateMax = 180; //角度度数

        let xOffset = 40;
        let yOffset = 40;


        // xSpace ySpace的计算 =====================================
        let xSpace;
        let ySpace;

        {
            if (xNum > 1) {
                xSpace = (bounds._width - originalBounds._width) / (xNum - 1);
            } else {
                xSpace = 0;
            }

            if (yNum > 1) {
                ySpace = (bounds._height - originalBounds._height) / (yNum - 1);
            } else {
                ySpace = 0;
            }
        }



        //==================================================
        for (let j = 0; j < xNum; j++) {
            for (let k = 0; k < yNum; k++) {

                let xOffsetRandom = xOffset * (-1) + xOffset * 2 * (Math.random());
                let yOffsetRandom = yOffset * (-1) + yOffset * 2 * (Math.random());

                //先调整位置
                shapes.moveTo(new Point(originalBounds._width / 2 + bounds._x + j * xSpace + xOffsetRandom, originalBounds._height / 2 + k * ySpace + yOffsetRandom + bounds._y));

                //随机角度
                let rotateShape = rotateMin + (rotateMax - rotateMin) * Math.random();
                shapes.rotate(rotateShape);

                //随机缩放
                let scaleShape = scaleMin + (scaleMax - scaleMin) * Math.random();
                shapes.scale(scaleShape);


                for (let i = 0; i < shapes.myShapeGroup.length; i++) {
                    //获取子图形
                    let temp = new smartShape(shapes.myShapeGroup[i].myShape.clone(), 'yyy');
                    temp.myShape.opacity = 0;
                    shapes.myShapeGroup[i].myShape.opacity = 0; //这个把复制的图形全部隐藏
                    this.myShapeGroup.push(new smartShape(temp.myShape.clone(), 'uuu'));

                    temp.myShape.scale(0);
                    temp.myShape.remove();
                }

                //恢复图形的原大小和角度
                shapes.scale(1 / scaleShape);
                shapes.rotate(rotateShape * (-1));

                //恢复位置
                shapes.moveTo(new Point(originalBounds._width / 2 + bounds._x + j * xSpace - xOffsetRandom, originalBounds._height / 2 + bounds._y + k * ySpace - yOffsetRandom));
            }
        }

        for (let i = 0; i < shapes.myShapeGroup.length; i++) {
            shapes.myShapeGroup[i].myShape.remove();
        }

        console.log('=== done generatePattern3()');
        //console.log('this.myShapeGroup.length: ' + this.myShapeGroup.length);

    }

}


//=================================================