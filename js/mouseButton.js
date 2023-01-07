class mouseClickButton1 {
    constructor(x, y, title) {


        //Input
        {
            this.base = new Point(x, y);
            this.h = 20;
            this.w = 50;
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
            this.text1.content = title; //负责按钮图标的显示
        }

        this.x = false; //主要参数，表示按钮是否被选择的状态
        this.newClick = false;

        this.title = title; //负责向外传递的值
    }


    onMouseDown(event) {

        if (this.button1.hitTest(event.point)) {

            this.newClick = true;
            this.x = true;

            this.button1.fillColor = 'green';
        }

        if (this.x) {
            this.button1.fillColor = 'green';
        } else {
            this.button1.fillColor = 'pink';
        }

    }
}