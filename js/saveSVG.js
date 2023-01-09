//=================
class saveSVG {
    constructor() {
        this.x = 0;
        this.y = 880;
        this.n;
        this.button = new Path.Rectangle(new Point(this.x, this.y), new Size(40, 20));
        this.button.fillColor = "black";
        //this.button.position=new Point(3,3);

        var text = new PointText(new Point(this.x + 4, this.y + 13));
        text.fillColor = 'white';
        text.content = "save";

        /* this.group = new Group({
            children: [button, text],
        }) */

        this.svgData;

    }

    /* draw(event) {
        this.group.onMouseDrag = function(event) {

            this.translate(event.delta);

        }
        this.group.onClick = function(event) {
            //printObject(this.children);
        }

        this.group.onDoubleClick = onDoubleClick;

        function onDoubleClick() {
            //saveFile();
        }

    } */

    onMouseUp(event) {
        if (this.button.hitTest(event.point)) {
            //console.log(this.svgData);
            this.saveFile();
        }
    }

    //保存文件 使用中==================
    saveFile() {
        //console.log(this.svgData);
        //var ko = project.exportSVG({ layer: secondLayer }); //保存整个project！！要更改保存范围研究此行代码
        //var import1= project.importSVG("http://127.0.0.1/javascriptTest/bot.svg");
        //ko=project.exportSVG();
        var blob = new Blob([this.svgData.outerHTML], { type: "text/plain;charset=utf-8" });
        //var blob = new Blob([ko.outerHTML], { type: "text/plain;charset=utf-8" });
        //var blob = new Blob([import1], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "svg.svg");
    }
}