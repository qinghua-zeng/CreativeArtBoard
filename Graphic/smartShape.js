//=================================================
class smartShape {
    constructor(shape) {
        this.myShape = shape;
        //this.myShape.fillColor = 'pink';
        this.myTag = new Array;
        this.myTag.push('noTag');
        //console.log('a smartShape create!');
    }

}

//=================================================
class smartShapeGroup {
    constructor() {
        this.myShapeGroup = new Array; //数组元素必须是smartShape类型
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
                        tempShapeGroup.push(new smartShape(gg.clone()));

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
            this.myShapeGroup[i].myShape.fillColor = 'red';
            this.myShapeGroup[i].myShape.strokeColor = 'black';
            this.myShapeGroup[i].myShape.strokeWidth = 5;
            //this.myShapeGroup[i].myShape.opacity = 0.8;
        }

        //05 结束，打印最终变量
        {
            console.log('final shapeGroup length: ' + this.myShapeGroup.length);
        }


    }

    uniteSelectedShapes(shapes) {

        let tempShapeGroup = new Array;

        //01 初始化
        {

            //console.log('intial shapeGroup length: ' + this.myShapeGroup.length);
            //tempShapeGroup.length = 0;
        }

        //02 图形的布尔运算
        for (let i = 0; i < this.myShapeGroup.length; i++) {
            //console.log(i);
            //console.log(this.myShapeGroup[i].myShape.selected);
            //this.myShapeGroup[i].myShape.seleted = 'false';
            if (this.myShapeGroup[i].myShape.selected == true) {
                //console.log('yes! i:' + i + ' selected');
                //console.log(i);
                this.myShapeGroup[i].myShape.selected = false;
                //02-1 对每个原始图形进行判断
                for (let j = 0; j < shapes.myShapeGroup.length; j++) {

                    //02-1-1 只有与输入图形相交或包含的原图形才会被选择 进行布尔运算
                    if (this.myShapeGroup[i].myShape.intersects(shapes.myShapeGroup[j].myShape) || this.myShapeGroup[i].myShape.contains(shapes.myShapeGroup[j].myShape.position)) {


                        //01 初始化
                        {
                            //console.log('yes! i:' + i + '  j:' + j);
                            //this.myShapeGroup[i].myShape.seleted = true;
                        }

                        //02 布尔运算,
                        {
                            let kk = this.myShapeGroup[i].myShape.subtract(shapes.myShapeGroup[j].myShape);

                            let gg = shapes.myShapeGroup[j].myShape.intersect(this.myShapeGroup[i].myShape);
                            //在this.tempShapeGroup创建新的smartShape类
                            //this.tempShapeGroup.push(new smartShape());
                            tempShapeGroup.push(new smartShape(gg.clone()));

                            //运算结果给到 this.tempShapeGroup
                            //tempShapeGroup[tempShapeGroup.length - 1].myShape = gg.clone();

                            //kk.fillColor = 'black';

                            this.myShapeGroup[i].myShape.scale(0); //清空缓存
                            this.myShapeGroup[i].myShape.remove();

                            this.myShapeGroup[i].myShape = kk.clone(); //把参与运算的图形变成相减后的结果

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


        }

        //03 把所有的【相交】运算结果都给到 this.myShapeGroup
        for (let i = 0; i < tempShapeGroup.length; i++) {
            tempShapeGroup[i].myShape.seleted = false;

            tempShapeGroup[i].myShape.fillColor = globalColor();
            this.myShapeGroup.push(tempShapeGroup[i]);
        }

        //04 myShapeGroup显示设置
        for (let i = 0; i < this.myShapeGroup.length; i++) {

            //this.myShapeGroup[i].myShape.scale(0.2);
            this.myShapeGroup[i].myShape.seleted = false;
            //this.myShapeGroup[i].myShape.fillColor = globalColor();
            this.myShapeGroup[i].myShape.strokeColor = 'black';
            this.myShapeGroup[i].myShape.strokeWidth = 2;
            //this.myShapeGroup[i].myShape.opacity = 0.8;
        }

        //05 结束，打印最终变量
        {
            //this.tempShapeGroup.length = 0;
            //console.log('final shapeGroup length: ' + this.myShapeGroup.length);
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

    //基于传递进来的基本图形组（smartShapeGroup类） 生成复合图案 最终生成smartShapeGroup类============================================
    generatePattern2(bounds, shapes) {


        //console.log(bounds);
        //console.log('shapes.myShapeGroup.length: ' + shapes.myShapeGroup.length);

        for (let i = 0; i < shapes.myShapeGroup.length; i++) {
            shapes.myShapeGroup[i].myShape.position = new Point(bounds._x, bounds._y);
        }

        let xNum = 5;
        let yNum = 5;

        let xSpace = bounds._width / (xNum - 1);
        let ySpace = bounds._height / (yNum - 1);

        //this.myShapeGroup = shapes.myShapeGroup; //完全接受传来的图形
        for (let i = 0; i < shapes.myShapeGroup.length; i++) {
            //this.pushNewShape();
            for (let j = 0; j < xNum; j++) {
                for (let k = 0; k < yNum; k++) {
                    //this.pushNewShape(shapes.myShapeGroup[i].myShape);
                    //this.myShapeGroup.push(shapes.myShapeGroup[i]);
                    let temp = new smartShape(shapes.myShapeGroup[i].myShape.clone());
                    temp.myShape.opacity = 0;
                    shapes.myShapeGroup[i].myShape.opacity = 0;
                    //console.log(shapes.myShapeGroup[i].myShape.position);
                    //console.log(temp.myShape.position);
                    temp.myShape.position = new Point((temp.myShape.position._x + (j * xSpace)), temp.myShape.position._y + (k * ySpace));
                    this.myShapeGroup.push(temp);
                    //temp.myShape.scale(0);
                }
            }
        }

        //console.log('this.myShapeGroup.length: ' + this.myShapeGroup.length);

    }


    //============================================
    pushNewShape(shape) {
        this.myShapeGroup.push(new smartShape(shape));
    }
}


//=================================================