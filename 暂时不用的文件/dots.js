//用于存储斑点路径

class dots {


    constructor() {

        //矩形范围
        {
            this.xNum = 4;
            this.yNum = 4;
        }

        //dot数组
        this.dots = new Array;
        //this.smartDots = new Array;

    }

    //重新生成新的
    reGenerate(x, y, w, h) { //x,y,w,h代表输入图形的bounds（矩形边界）

        //如果有上一次的残余数据，清空它
        {
            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i].scale(0);
            }

            this.dots.length = 0;


            /* for (let i = 0; i < this.smartDots.length; i++) {
                this.smartDots[i].scale(0);
            } */

            //this.smartDots.length = 0;
        }

        //生成新的dots
        for (let i = 0; i < this.xNum; i++) {
            for (let j = 0; j < this.yNum; j++) {
                this.dots.push(new Path.Circle({
                    center: [x + i * (w / (this.xNum - 1)), y + j * (h / (this.yNum - 1))],
                    radius: 10,
                    fillColor: 'green'
                }));
            }
        }

        //生成新的smartDots
        /* for (let i = 0; i < this.xNum; i++) {
            for (let j = 0; j < this.yNum; j++) {
                this.smartDots.push(new Path.Circle({
                    center: [x + i * (w / (this.xNum - 1)), y + j * (h / (this.yNum - 1))],
                    radius: 10,
                    fillColor: 'blue'
                }));
            }
        } */



    }



}