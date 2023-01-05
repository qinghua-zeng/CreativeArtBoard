class panel {
    constructor() {
        this.tools = new Array;
        this.status = 'draw2'
        this.tools.push(new mouseClickButton1(0, 362, 'select'));
        this.tools.push(new mouseClickButton1(60, 362, 'draw2'));
        this.tools.push(new mouseClickButton1(120, 362, 'color'));
        this.tools.push(new mouseClickButton1(180, 362, 'dots'));
    }

    onMouseDown(event) {

        //01 第一步传入鼠标信息，更新变量newClick
        for (let i = 0; i < this.tools.length; i++) {
            this.tools[i].onMouseDown(event); //更新图标颜色等
            //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

        }

        //02 判断是否有newclick
        for (let i = 0; i < this.tools.length; i++) {
            //this.tools[i].x = false;

            if (this.tools[i].newClick) { //当发现有一个有newClick时。newClick为true代表有其他按钮被电击
                //console.log(i); //打印这个编号
                //this.tools[i].x = true;
                //this.tools[i].newClick = false; //清空newClick

                for (let j = 0; j < this.tools.length; j++) {
                    this.tools[j].x = false;
                    this.tools[j].newClick = false;
                    this.tools[j].onMouseDown(event); //更新图标颜色等
                }

                this.tools[i].x = true;
                this.status = this.tools[i].title;

            } else {
                //console.log('no newClick!');
            }
            //this.tools[i].mouseDown(event); //更新图标颜色等

        }

        //03 初始化newClick
        for (let i = 0; i < this.tools.length; i++) {
            this.tools[i].onMouseDown(event); //更新图标颜色等
            this.tools[i].newClick = false;
            //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

        }

        //console.log(this.status);


    }
}