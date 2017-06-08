/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/widgets/BasemapGallery", "esri/widgets/LayerList", "esri/widgets/Search"], function (require, exports, __extends, __decorate, decorators_1, Widget, widget_1, BaseMapGallery, LayerList, Search) {
    "use strict";
    var CSS = {
        base: "esri-hello-world",
        emphasis: "esri-hello-world--emphasis"
    };
    var HelloWorld = (function (_super) {
        __extends(HelloWorld, _super);
        function HelloWorld(wName, wView, wContainer) {
            var _this = _super.call(this) || this;
            // widget name
            _this.widgetName = "BaseMapGallery";
            //emphasized
            _this.emphasized = false;
            _this.widgetName = wName;
            _this.view = wView;
            _this.container = wContainer;
            return _this;
        }
        HelloWorld.prototype.postInitialize = function () {
            //watchUtils.init(this, "view.center, view.interacting, view.scale", () => this._onViewChange());   
            if (this.widgetName == "BaseMapGallery") {
                this.baseMapGallery = new BaseMapGallery({
                    view: this.view,
                    container: "baseMapDiv"
                });
            }
            else if (this.widgetName == "LayersList") {
                this.lyrList = new LayerList({
                    view: this.view,
                    container: "baseMapDiv"
                });
            }
            else {
                this.search = new Search({
                    view: this.view,
                    container: "baseMapDiv"
                });
            }
            /*
            this.bgExpand_baseMap=new Expand({
                view: this.view,
                content: this.baseMapGallery.domNode,
                expandIconClass: "esri-icon-basemap"
            });*/
            //this.view.ui.add("mainDiv", "top-right");
            //this.view.ui.add({ component: this.bgExpand_baseMap, position: "top-right", index: 1 });
            this.view.ui.empty("top-right");
        };
        // @property()
        //  @renderable()
        //  baseMapGalley: BaseMapGallery;
        // Public methods
        HelloWorld.prototype.render = function () {
            //const greeting=this._getGreeting();
            var classes = (_a = {},
                _a[CSS.emphasis] = this.emphasized,
                _a);
            // This line assigns the baseMapGallery widget to the baseMapDiv
            if (this.widgetName == "BaseMapGallery") {
                this.baseMapGallery.container = "baseMapDiv";
            }
            else if (this.widgetName == "LayersList") {
                this.lyrList.container = "baseMapDiv";
            }
            else {
                this.search.container = "baseMapDiv";
            }
            //this.bgExpand_baseMap.content=this.baseMapGallery.domNode;
            return (widget_1.jsxFactory.createElement("div", { id: "mainDiv", style: "padding: 5px; background-color: lightblue" },
                widget_1.jsxFactory.createElement("label", { style: "color: green; font-size: 18px" }, this.widgetName),
                widget_1.jsxFactory.createElement("img", { src: "app/close_icon.png", style: "width:18px;height:18px;float:right;", id: "Off", bind: this, onclick: this._collapseBaseMapGallery }, " Base Maps Off "),
                widget_1.jsxFactory.createElement("br", null),
                widget_1.jsxFactory.createElement("div", { bind: this, 
                    //  class={CSS.base}
                    //  classes={classes}
                    id: "baseMapDiv" })));
            var _a;
        };
        // Private method  
        HelloWorld.prototype._expandBaseMapGallery = function () {
            //this.view.ui.empty("top-right");
            //this.view.ui.add({ component: this.baseMapGallery, position: "top-left", index: 1 });
            //this.bgExpand_baseMap.expand();
        };
        HelloWorld.prototype._collapseBaseMapGallery = function () {
            //var coords={ X: 0, Y: 0 };
            //GetStatePlaneCoord(36.1590525, -115.1742310, coords);
            //alert("X: "+coords.X+" Y: "+coords.Y);
            //this.bgExpand_baseMap.toggle();
            this.view.ui.empty("top-right");
            //this.view.ui.empty("top-right");
            //this.view.ui.add({ component: this.bgExpand_baseMap, position: "top-right", index: 1 });
        };
        return HelloWorld;
    }(decorators_1.declared(Widget)));
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], HelloWorld.prototype, "widgetName", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], HelloWorld.prototype, "emphasized", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], HelloWorld.prototype, "view", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], HelloWorld.prototype, "baseMapGallery", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], HelloWorld.prototype, "lyrList", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], HelloWorld.prototype, "search", void 0);
    HelloWorld = __decorate([
        decorators_1.subclass("esri.widgets.HelloWorld")
    ], HelloWorld);
    function GetStatePlaneCoord(lat, lon, coords) {
        var dataStr = 'inSR=4326&outSR=3421&geometries=' + lon + '%2C' + lat + '&transformation=&transformForward=false&f=pjson';
        $.ajax({
            type: "GET",
            // The URL for the request
            url: "http://gisgate.co.clark.nv.us/arcgis/rest/services/Utilities/Geometry/GeometryServer/project",
            async: false,
            // The data to send 
            data: dataStr,
            // The type of data we expect back
            dataType: "json",
        })
            .done(function (json) {
            //alert( "The request is complete! x: " + json.geometries[0].x + "y: " + json.geometries[0].y);														
            coords.X = json.geometries[0].x;
            coords.Y = json.geometries[0].y;
        })
            .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
            .always(function (xhr, status) {
            //alert( "The request is complete!" );
        });
    }
    ;
    return HelloWorld;
});
//# sourceMappingURL=HelloWorld.js.map