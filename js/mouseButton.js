//09 一对方形按钮=========
//20.10.17 增加了显示按钮信息的文字
class mouseButton2 {
    constructor(x, y, content) {
        this.x = 5; //主要参数


        this.base = new Point(x, y);
        this.h = 20;
        this.w = 20;
        this.x1 = this.base.x;
        this.x2 = this.base.x + this.w;

        this.y1 = this.base.y;
        this.y2 = this.base.y + this.h;

        //this.y3 = this.base.y + this.h + this.h;

        this.text = new showInfo();
        this.text2 = new showInfo();
        this.content = content;



    }
    draw(event) {
        this.button1 = new Path.Rectangle(this.base, new Size(this.w, this.h));
        this.button1.fillColor = 'green';

        this.button2 = new Path.Rectangle(new Point(this.base.x + this.w, this.base.y), new Size(this.w, this.h));
        this.button2.fillColor = 'red';


        if (event.point.x > this.x1 && event.point.x < this.x1 + this.w && event.point.y > this.y1 && event.point.y < this.y1 + this.h) {
            this.x += 1;


        }
        if (event.point.x > this.x2 && event.point.x < this.x2 + this.w && event.point.y > this.y1 && event.point.y < this.y2) {
            this.x -= 1;


        }


        //显示button 信息
        this.text.draw(this.content, this.x1 + 5, this.y1);
        this.text2.draw("+    -", this.x1 + 4, this.y1 + 13);

    }
}

class mouseClickButton1 {
    constructor(x, y, title) {


        //Input
        {
            this.base = new Point(x, y);
            this.h = 20;
            this.w = 40;
        }


        //转换成4个坐标值
        {
            this.x1 = this.base.x;
            this.x2 = this.base.x + this.w;
            this.y1 = this.base.y;
            this.y2 = this.base.y + this.h;
        }

        //按钮矩形框的初始化
        {
            this.button1 = new Path.Rectangle(this.base, new Size(this.w, this.h));
            this.button1.fillColor = 'pink';
        }

        //按钮标题文字的初始化
        {
            this.text1 = new PointText(new Point(x + 3, y + 12)); //下方文字的位置
            this.text1.justification = 'left';
            this.text1.fillColor = 'black'; //下方文字的颜色
            this.text1.content = title;
        }

        this.x = false; //主要参数，表示按钮是否被选择的状态
        this.newClick = false;

    }


    draw(event) {

    }


    mouseDown(event) {

        if (this.button1.hitTest(event.point)) {
            //console.log('hit!');

            this.newClick = true;
            this.x = true;

            this.button1.fillColor = 'green';
        } else {
            //this.x = false;
        }

        if (this.x) {
            this.button1.fillColor = 'green';
        } else {
            this.button1.fillColor = 'pink';
        }

    }
}

//========
class switchButton {
    constructor(x, y, content) {
        this.x = false; //主要参数


        this.base = new Point(x, y);
        this.h = 20;
        this.w = 20;
        this.x1 = this.base.x;
        this.x2 = this.base.x + this.w;

        this.y1 = this.base.y;
        this.y2 = this.base.y + this.h;

        //this.y3 = this.base.y + this.h + this.h;

        this.text = new showInfo();
        this.text2 = new showInfo();
        this.content = content;



    }
    draw(event) {
        this.button1 = new Path.Rectangle(this.base, new Size(this.w, this.h));
        this.button2 = new Path.Rectangle(new Point(this.base.x + this.w, this.base.y), new Size(this.w, this.h));
        if (this.x == true) {
            this.button1.fillColor = 'yellow';
            this.button2.fillColor = 'grey';

        } else {
            this.button1.fillColor = 'grey';
            this.button2.fillColor = 'yellow';

        }





        if (event.point.x > this.x1 && event.point.x < this.x1 + this.w && event.point.y > this.y1 && event.point.y < this.y1 + this.h) {
            this.x = true;
            this.button1.fillColor = 'yellow';
            this.button2.fillColor = 'grey';


        }
        if (event.point.x > this.x2 && event.point.x < this.x2 + this.w && event.point.y > this.y1 && event.point.y < this.y2) {
            this.x = false;
            this.button2.fillColor = 'yellow';
            this.button1.fillColor = 'grey';

        }


        //显示button 信息
        this.text.draw(this.content, this.x1 + 2, this.y1);
        this.text2.draw("Y    N", this.x1 + 4, this.y1 + 13);

    }
}