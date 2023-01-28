class panel {
    constructor() {

        //左侧边栏
        //状态选择工具
        {
            this.tools = new Array;
            this.status = 'bezeir'

            this.tools.push(new mouseClickButton1(0, 60, 'draw2'));
            this.tools.push(new mouseClickButton1(0, 120, 'test'));
            this.tools.push(new mouseClickButton1(0, 90, 'bezeir'));

            this.tools.push(new mouseClickButton1(0, 30, 'select'));
            this.tools.push(new mouseClickButton1(0, 150, 'image'));
            this.tools.push(new mouseClickButton1(0, 700, 'circle'));

            //this.tools.push(new mouseClickButton1(0, 120, 'Boards'));
            //
            this.undoButton = new mouseClickButton1(0, 430, 'Undo');

            //
            this.multipleArtBoardsButton = new mouseClickButton1(0, 370, 'Boards');
        }

        //底部
        {
            //曲线简化程度
            {
                this.simplifyLevelButtons = new Array;
                this.simplifyLevel;

                this.simplifyLevelButtons.push(new mouseClickButton1(50, 830, 0));
                this.simplifyLevelButtons.push(new mouseClickButton1(110, 830, 0.5));
                this.simplifyLevelButtons.push(new mouseClickButton1(170, 830, 5));
                this.simplifyLevelButtons.push(new mouseClickButton1(230, 830, 10));
            }
            //get svg from Ai
            this.getTextButton = new mouseClickButton1(1100, 880, 'get');
            this.change_color_button = new mouseClickButton1(800, 820, 'c-color');
        }


        //右侧区域
        {
            //color 按钮
            {

                this.sendColorButton = new mouseClickButton1(920, 490, 'S Color');


                this.colorButtons = new Array;

                this.colorButtons.push(new mouseClickButton1(920, 520, 'cus1'));

                this.colorButtons.push(new mouseClickButton1(920, 550, 'g0'));
                this.colorButtons.push(new mouseClickButton1(920, 580, 'b0'));
                this.colorButtons.push(new mouseClickButton1(920, 610, 'pink'));
                this.colorButtons.push(new mouseClickButton1(920, 640, 'yellow'));
                this.colorButtons.push(new mouseClickButton1(920, 670, 'cyan'));
                this.colorButtons.push(new mouseClickButton1(920, 700, 'r0'));
                //this.currentColorSet;
            }

            //tag
            {
                this.tagButton = new Array;
                this.currentTag;
                this.currentY = 550;

                this.sendTagButton = new mouseClickButton1(860, 490, 'S Tag');
                this.tagButton.push(new mouseClickButton1(860, 520, 'no tag'));
            }

            this.flowerButton = new mouseClickButton1(980, 520, 'flower');
        }


        //右侧边栏
        {
            //sendSketchWindow
            this.sendSketchShapesButton = new mouseClickButton1(1110, 440, 'S Shape');

            this.undo_sketchWindow = new mouseClickButton1(1110, 410, 'Undo');
        }


    }


    setup_panel(event) {
        this.status = this.updateButtonStatus(this.tools, event);

        this.status = this.updateButtonStatus(this.tools, event);

        this.simplifyLevel = this.updateButtonStatus(this.simplifyLevelButtons, event);

        this.currentTag = this.updateButtonStatus(this.tagButton, event);

        this.currentColorSet = this.updateButtonStatus(this.colorButtons, event);





    }

    onMouseDown(event) {

        this.status = this.updateButtonStatus(this.tools, event);

        this.simplifyLevel = this.updateButtonStatus(this.simplifyLevelButtons, event);

        this.currentTag = this.updateButtonStatus(this.tagButton, event);

        this.currentColorSet = this.updateButtonStatus(this.colorButtons, event);

    }




    onKeyUp(event) {
        //console.log('event.key: ' + event.key);
        if (event.key == 'enter') {
            if (textbox1.value) {
                this.addNewTag(textbox1.value);
                textbox1.value = '';
            }

        }
    }

    addNewTag(_tag) {

        //判断是否有重复tag
        let newTag = false;
        for (let i = 0; i < this.tagButton.length; i++) {
            if (_tag == this.tagButton[i].title) {
                newTag = true;
            }
        }

        if (newTag == false) {
            this.tagButton.push(new mouseClickButton1(860, this.currentY, _tag));
            this.currentY += 30;
        }


    }

    updateButtonStatus(buttonArray, event) {
        let value;

        let start = true;

        //如果有按钮被按下，不认为是初始化
        for (let i = 0; i < buttonArray.length; i++) {
            if (buttonArray[i].pressed) {
                start = false;
            }

        }

        //初始化
        if (start) {
            buttonArray[0].initialize();
        }



        for (let i = 0; i < buttonArray.length; i++) {
            buttonArray[i].onMouseDown(event); //更新图标颜色等
        }

        //02 判断是否有newclick
        for (let i = 0; i < buttonArray.length; i++) {

            if (buttonArray[i].newClick) { //当发现有一个有newClick时。newClick为true代表有其他按钮被电击

                for (let j = 0; j < buttonArray.length; j++) {
                    buttonArray[j].pressed = false;
                    buttonArray[j].newClick = false;
                    buttonArray[j].onMouseDown(event); //更新图标颜色等
                }

                buttonArray[i].pressed = true;
                value = buttonArray[i].title;


            } else if (buttonArray[i].pressed) {
                value = buttonArray[i].title;
            }
        }

        for (let i = 0; i < buttonArray.length; i++) {
            buttonArray[i].onMouseDown(event); //更新图标颜色等
            buttonArray[i].newClick = false;
            //console.log(this.tools[i].newClick + '  ' + this.tools[i].x);

        }

        return value;
    }




}