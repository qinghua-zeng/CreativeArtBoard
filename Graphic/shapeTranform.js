//从一个圆上获取等距的点
function getPointsFromCircle(circle, pointsNum) {

    let points = []; //存储的点

    let cx = circle.position._x;
    let cy = circle.position._y;
    let r;
    if (circle.bounds._width == circle.bounds._height) {
        r = circle.bounds._width / 2; //半径
    } else {
        console.log('it is not a circle!!');
    }

    for (let i = 0; i < pointsNum; i++) { //分成5份
        let angle = i * (360 / pointsNum) * (Math.PI / 180);
        let x = cx + r * Math.cos(angle); //坐标x
        let y = cy + r * Math.sin(angle); //坐标y
        points.push(new Point(x, y));
    }

    //console.log(points);

    //circle.remove();
    return points;
}

//从一个圆上获取等距的点和角度
function getPointsAngleFromCircle(circle, pointsNum) {

    let points_with_angle = []; //存储的点

    let cx = circle.position._x;
    let cy = circle.position._y;
    let r;

    if (circle.bounds._width == circle.bounds._height) {
        r = circle.bounds._width / 2; //半径
    } else {
        console.log('it is not a circle!!');
    }

    for (let i = 0; i < pointsNum; i++) { //分成5份
        let angle = i * (360 / pointsNum) * (Math.PI / 180);
        //let _angle = i * (360 / pointsNum);
        let x = cx + r * Math.cos(angle); //坐标x
        let y = cy + r * Math.sin(angle); //坐标y

        points_with_angle.push(new pointWithAngle(new Point(x, y), 360 / pointsNum));

    }

    circle.remove();

    return points_with_angle;
}

class pointWithAngle {
    constructor(_point, _angle) {
        this.point = _point;
        this.angle = _angle;

    }


}


//从一个点的数组,一个半径值（或数组） 上创建圆
function arrayCircle(points, radius) {
    let ArrayCircle = new Array;

    //01 当是数组的情况
    if (Array.isArray(radius)) {
        //01-1
        if (points.length > radius.length) {

            for (let i = 0; i < points.length; i++) {

                ArrayCircle.push(new Path.Circle({
                    center: points[i],
                    radius: radius[i % radius.length],
                    fillColor: 'yellow'
                }));

            }

        }
        //01-2
        else {
            for (let i = 0; i < points.length; i++) {
                ArrayCircle.push(new Path.Circle({
                    center: points[i],

                    radius: radius[i],
                    fillColor: 'yellow'
                }));
            }
        }

    }
    //02 当不是数组的情况
    else {
        for (let i = 0; i < points.length; i++) {
            ArrayCircle.push(new Path.Circle({
                center: points[i],

                radius: radius,
                fillColor: 'yellow'
            }));
        }

    }

    //console.log(radius);
    //console.log(radius.length);
    return ArrayCircle;
}

//从一个点(或数组),一个半径值（或数组） 上创建圆。 
//onwhich是决定按哪个数组的数量为准,
//目前必须有一个输入参数是数组
function arrayCircle2(points, radius, onWhich) {
    let ArrayCircle = new Array;

    //01 以point数量为准的时候
    if (onWhich == 'points') {

        //01 当radius是数组的情况
        if (Array.isArray(radius)) {
            //01-1
            if (points.length > radius.length) {

                for (let i = 0; i < points.length; i++) {

                    ArrayCircle.push(new Path.Circle({
                        center: points[i],
                        radius: radius[i % radius.length],
                        fillColor: 'yellow'
                    }));

                }

            }
            //01-2
            else {
                for (let i = 0; i < points.length; i++) {
                    ArrayCircle.push(new Path.Circle({
                        center: points[i],

                        radius: radius[i],
                        fillColor: 'yellow'
                    }));
                }
            }

        }
        //02 当radius不是数组的情况
        else {
            for (let i = 0; i < points.length; i++) {
                ArrayCircle.push(new Path.Circle({
                    center: points[i],

                    radius: radius,
                    fillColor: 'yellow'
                }));
            }

        }



    }
    //02 以radius数组数量为准时
    else if (onWhich == 'radius') {
        //02-1
        if (Array.isArray(points)) {
            //point数组数量少于radius数组个数
            if (points.length < radius.length) {

                console.log(points.length + '---' + radius.length);
                for (let i = 0; i < radius.length; i++) {

                    ArrayCircle.push(new Path.Circle({
                        center: points[i % points.length],
                        radius: radius[i],
                        selected: true,
                        fillColor: 'yellow'
                    }));

                }


            }
            //
            else {

                for (let i = 0; i < points.length; i++) {
                    ArrayCircle.push(new Path.Circle({
                        center: points[i],

                        radius: radius[i],
                        fillColor: 'yellow'
                    }));
                }


            }



        }
        //02-2 当points不是一个数组
        else {

            //console.log('pts not array')
            for (let i = 0; i < radius.length; i++) {

                ArrayCircle.push(new Path.Circle({
                    center: points,
                    radius: radius[i],
                    selected: true,
                    fillColor: 'yellow'
                }));

            }


        }








        //console.log(radius);
        //console.log(radius.length);
        return ArrayCircle;
    }

}


//生成一组随机数
function getRandomArray(num, min, max, ifInt) {
    let randomArray = new Array;
    if (ifInt = 'int') {

        for (let i = 0; i < num; i++) {
            randomArray.push(Math.round(min + (max - min) * Math.random()));
        }


    } else if (ifInt = 'float') {

        for (let i = 0; i < num; i++) {
            randomArray.push(min + (max - min) * Math.random());
        }

    }


    //console.log(randomArray);
    return randomArray;

}

//一个复合图形组，一组pointWithAngles,可以产生带角度的图形阵列
function arrayShape(_shapes, _pointWithAngles) {

    let shapesArray = [];

    for (let i = 0; i < _pointWithAngles.length; i++) {

        _shapes.position = _pointWithAngles[i].point;
        //_shapes.fillColor = 'pink';
        shapesArray.push(_shapes.clone());
        _shapes.rotate(_pointWithAngles[i].angle);
    }

    _shapes.remove();
    return shapesArray;
}

//03 二维点阵  函数==============================================
function myPoints(xBase, yBase, xNum, yNum, xLength, yLength) {
    class myPoints {
        constructor() {
            this.circles = new Array;
            this.thePoints = new Array;
        }
    }

    for (var i = 0; i < xNum; i++) {
        for (var j = 0; j < yNum; j++) {
            var tempPoint = new Point(i * xLength + xBase, j * yLength + yBase);
            thePoints.push(tempPoint);
            circles.push(new Path.Circle(tempPoint, 1));
            //=一个圆shape====================
        }
    }
    for (w = 0; w < circles.length; w++) {
        circles[w].fillColor = 'black';
    }
    return thePoints;
}

//======
function get_random_int_from_range(_min, _max) {

    let randomInt = Math.round(_min + (_max - _min) * Math.random());

    return randomInt;
}

//bounds上获取点，是世界的绝对坐标
function get_pt_on_bounds(bounds, _xNum, _yNum) {

    //console.log(bounds);

    let pts = [];

    for (let i = 0; i < _xNum; i++) {
        for (let j = 0; j < _yNum; j++) {

            pts.push(new Point(bounds._x + i * (bounds._width - 1) / (_xNum - 1), bounds._y + j * (bounds._height - 1) / (_yNum - 1)));

            let circle = new Path.Circle(new Point(bounds._x + i * bounds._width / (_xNum - 1), bounds._y + j * bounds._height / (_yNum - 1)), 2);
            circle.strokeColor = 'black';
        }
    }

    //console.log(pts);

    return pts;
}

//
function getColorSet(_raster, _xNum, _yNum) {

    let colorSet = [];
    //console.log(_raster.bounds);
    let pts = get_pts_by_bounds(_raster.bounds, _xNum, _yNum);
    //console.log(pts);

    for (i = 0; i < pts.length; i++) {
        let pixel = _raster.getPixel(pts[i].x, pts[i].y);

        colorSet.push(pixel);
    }

    return colorSet;
}

//从矩形的内部相对坐标取点
function get_pts_by_bounds(bounds, _xNum, _yNum) {

    //console.log(bounds);
    let pts = [];

    for (let i = 0; i < _xNum; i++) {
        for (let j = 0; j < _yNum; j++) {

            pts.push(new Point(i * (bounds._width - 1) / (_xNum - 1), j * (bounds._height - 1) / (_yNum - 1)));

            let circle = new Path.Circle(new Point(bounds._x + i * bounds._width / (_xNum - 1), bounds._y + j * bounds._height / (_yNum - 1)), 2);
            circle.strokeColor = 'black';
        }
    }

    //console.log(pts);

    return pts;

}