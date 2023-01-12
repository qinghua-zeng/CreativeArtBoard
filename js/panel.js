class panel {
    constructor() {

        //状态选择工具
        {
            this.tools = new Array;
            this.status = 'draw2'

            this.tools.push(new mouseClickButton1(0, 60, 'draw2'));
            this.tools.push(new mouseClickButton1(0, 30, 'select'));

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
            this.currentY = 430;

            this.sendTagButton = new mouseClickButton1(1080, 460, 'S Tag');
            this.tagButton.push(new mouseClickButton1(950, 460, 'no tag'));
        }

        //sendSketchWindow
        this.sendSketchShapesButton = new mouseClickButton1(1080, 430, 'S Shape');

        //get svg from Ai
        this.getTextButton = new mouseClickButton1(1100, 880, 'get');
        this.getShapeButton = new mouseClickButton1(1030, 880, 'replace');

    }

    onMouseDown(event) {

        this.status = this.updateButtonStatus(this.tools, event);

        this.simplifyLevel = this.updateButtonStatus(this.simplifyLevelButtons, event);

        this.currentTag = this.updateButtonStatus(this.tagButton, event);

        /* for (let i = 0; i < this.tagButton.length; i++) {
            this.tagButton[i].button1.onDoubleClick = function() {
                //console.log('double');
                //console.log(this.currentTag);
                //console.log(this.tagButton.length);
            }.bind(this) */

    }

    onKeyUp(event) {
        //console.log('event.key: ' + event.key);
        if (event.key == 'enter') {

            this.tagButton.push(new mouseClickButton1(880, this.currentY, textbox1.value));
            this.currentY += 30;
            textbox1.value = '';

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