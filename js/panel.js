class panel {
    constructor() {

        //状态选择工具
        {
            this.tools = new Array;

            this.status = 'draw2'
            this.tools.push(new mouseClickButton1(0, 30, 'select'));
            this.tools.push(new mouseClickButton1(0, 60, 'draw2'));
            this.tools.push(new mouseClickButton1(0, 90, 'color'));
            this.tools.push(new mouseClickButton1(0, 120, 'dots'));
        }

        //曲线简化程度
        {
            this.simplifyLevelButtons = new Array;
            this.simplifyLevel;

            this.simplifyLevelButtons.push(new mouseClickButton1(0, 180, 0));
            this.simplifyLevelButtons.push(new mouseClickButton1(0, 210, 0.5));
            this.simplifyLevelButtons.push(new mouseClickButton1(0, 240, 5));
            this.simplifyLevelButtons.push(new mouseClickButton1(0, 270, 10));
        }

        //tag
        {
            this.tagButton = new Array;
            this.currentTag;

            this.currentY = 30;

            this.getTextButton = new mouseClickButton1(1100, 880, 'get');
            this.getShapeButton = new mouseClickButton1(1030, 880, 'replace');
        }

        //sendSketchWindow
        this.sendSketchShapesButton = new mouseClickButton1(1100, 430, 'send');


    }

    onMouseDown(event) {
        //01 tools ====
        {
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
        }


        //02 simplifyLevelButtons ===============================================================================
        {
            //01 第一步传入鼠标信息，更新变量newClick
            for (let i = 0; i < this.simplifyLevelButtons.length; i++) {
                this.simplifyLevelButtons[i].onMouseDown(event); //更新图标颜色等
                //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

            }

            //02 判断是否有newclick
            for (let i = 0; i < this.simplifyLevelButtons.length; i++) {
                //this.tools[i].x = false;

                if (this.simplifyLevelButtons[i].newClick) { //当发现有一个有newClick时。newClick为true代表有其他按钮被电击
                    //console.log(i); //打印这个编号
                    //this.tools[i].x = true;
                    //this.tools[i].newClick = false; //清空newClick

                    for (let j = 0; j < this.simplifyLevelButtons.length; j++) {
                        this.simplifyLevelButtons[j].x = false;
                        this.simplifyLevelButtons[j].newClick = false;
                        this.simplifyLevelButtons[j].onMouseDown(event); //更新图标颜色等
                    }

                    this.simplifyLevelButtons[i].x = true;
                    this.simplifyLevel = this.simplifyLevelButtons[i].title;

                } else {
                    //console.log('no newClick!');
                }
                //this.tools[i].mouseDown(event); //更新图标颜色等

            }

            //03 初始化newClick
            for (let i = 0; i < this.simplifyLevelButtons.length; i++) {
                this.simplifyLevelButtons[i].onMouseDown(event); //更新图标颜色等
                this.simplifyLevelButtons[i].newClick = false;
                //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

            }
        }

        //03 tagButton ====
        {
            //01 第一步传入鼠标信息，更新变量newClick
            for (let i = 0; i < this.tagButton.length; i++) {
                this.tagButton[i].onMouseDown(event); //更新图标颜色等
                //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

            }

            //02 判断是否有newclick
            for (let i = 0; i < this.tagButton.length; i++) {
                //this.tools[i].x = false;

                if (this.tagButton[i].newClick) { //当发现有一个有newClick时。newClick为true代表有其他按钮被电击
                    //console.log(i); //打印这个编号
                    //this.tools[i].x = true;
                    //this.tools[i].newClick = false; //清空newClick

                    for (let j = 0; j < this.tagButton.length; j++) {
                        this.tagButton[j].x = false;
                        this.tagButton[j].newClick = false;
                        this.tagButton[j].onMouseDown(event); //更新图标颜色等
                    }

                    this.tagButton[i].x = true;
                    this.currentTag = this.tagButton[i].title;
                    console.log('currentTag: ' + this.currentTag);

                } else {
                    //console.log('no newClick!');
                }
                //this.tools[i].mouseDown(event); //更新图标颜色等

            }

            //03 初始化newClick
            for (let i = 0; i < this.tagButton.length; i++) {
                this.tagButton[i].onMouseDown(event); //更新图标颜色等
                this.tagButton[i].newClick = false;
                //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

            }
        }



    }

    onKeyUp(event) {
        //console.log('event.key: ' + event.key);
        if (event.key == 'enter') {

            this.tagButton.push(new mouseClickButton1(850, this.currentY, textbox1.value));
            this.currentY += 30;
            textbox1.value = '';

        }
    }


}