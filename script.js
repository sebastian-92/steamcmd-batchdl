var Download = 
    {
        click : function(node) {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            return node.dispatchEvent(ev);
        },
        encode : function(data) {
                return 'data:application/octet-stream;base64,' + btoa( data );
        },
        link : function(data, name){
            var a = document.createElement('a');
            a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
            a.href = data || self.location.href;
            return a;
        }
    };
    Download.save = function(data, name)
    {
        this.click(
            this.link(
                this.encode( data ),
                name
            )
        );
    };
var modIds = Array.from(document.querySelectorAll('[id^="sharedfile_"]')).map(mod => {
	return mod.id.replace('sharedfile_','');
});
var appid = document.querySelector("[data-appid]").getAttribute("data-appid");
function createscript() {
    const start = " +workshop_download_item " + appid + " "
    var output = "steamcmd +login anonymous"
    return output + start + modIds.join(start) + " +quit";
};
console.log(`This list contains ${modIds.length} mods.`);
console.log('appid: ' + appid);
console.log(`Workshop Items=${modIds.join(';')}`);
Download.save(createscript(),appid + ".sh");

