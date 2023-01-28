//02点击鼠标时，显示鼠标点击序号==============================================
function drawMouseClickPoints() {
    var points = new Array;
    //var numbers = new Array; 
    var tool = new Tool();
    var currentNum = 0;
    //var path;

    function enter(event) {
        this.fillColor = 'red';
    }

    function leave(event) {
        this.fillColor = 'black';
    }

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function(event) {

        points.push(new Path.Circle(event.point, 15));
        currentNum++;
        showInfo(currentNum, event.point, "num");
        //numbers.push(currentNum);
        //this.yes++;

        for (var i = 0; i < points.length; i++) {
            points[i].fillColor = 'black';
            points[i].onMouseEnter = enter;
            points[i].onMouseLeave = leave;
        }
    }
}

//文件==================
function writeObj(obj) {
    var description = "";
    for (var i in obj) {
        var property = obj[i];
        description += i + " = " + property + "\n";
    }
    alert(description);
}


//打印对象信息====================================================
function po(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert(out);
}

//========================================
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

//=================
function FileHelper() {
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom) {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;
    }
}


//偏移与显示法线，好用
function offset(path, number) { //输入一个路径与偏移距离

    var point1 = path.getPointAt(number); //起始点
    var normal1 = path.getNormalAt(number); //长度为1的法线
    normal = new Point((normal1.x * 20), (normal1.y * 20)); //扩大后的法线

    point2 = new Point(normal.x + point1.x, normal.y + point1.y); //重要！扩大后的法线端点

    var line = new Path.Line(point1, point2); //显示的法线
    line.strokeColor = 'black';

}

//生成随机字符串，作为tag
function generateRandomString() {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}