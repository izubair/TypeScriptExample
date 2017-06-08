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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, decorators_1, Widget, widget_1) {
    "use strict";
    var CSS = {
        base: "assets-list"
    };
    var AssetsList = (function (_super) {
        __extends(AssetsList, _super);
        function AssetsList(wName, wView, wContainer) {
            var _this = _super.call(this) || this;
            // widget name 
            _this.widgetName = "Assets List";
            _this.widgetName = wName;
            _this.view = wView;
            _this.container = wContainer;
            return _this;
            // any construction initialization here          
        }
        /////////////////////////
        AssetsList.prototype.postInitialize = function () {
            //watchUtils.init(this, "vis", () => this._addBtnClick());        
        };
        // Public methods
        AssetsList.prototype.render = function () {
            return (widget_1.jsxFactory.createElement("div", { style: "padding: 5px; background-color: lightblue" },
                widget_1.jsxFactory.createElement("div", { id: "mainDiv", style: "padding: 5px; background-color: lightblue" },
                    widget_1.jsxFactory.createElement("label", { style: "color: green; font-size: 18px" }, this.widgetName),
                    widget_1.jsxFactory.createElement("img", { src: "app/close_icon.png", style: "width:18px;height:18px;float:right;", id: "Off", bind: this, onclick: this._removeWidget }, " Base Maps Off "),
                    widget_1.jsxFactory.createElement("br", null)),
                widget_1.jsxFactory.createElement("div", { id: "listArea", class: "listArea-container" },
                    widget_1.jsxFactory.createElement("div", { id: "searchDiv" },
                        widget_1.jsxFactory.createElement("label", { for: "inputSearch" }, "Filter: "),
                        widget_1.jsxFactory.createElement("input", { class: "inputInfo", type: "text", id: "inputSearch", placeHolder: "Enter filter text", onkeyup: this._searchKeyUp }),
                        widget_1.jsxFactory.createElement("br", null)),
                    widget_1.jsxFactory.createElement("div", { id: "listDiv" },
                        widget_1.jsxFactory.createElement("h3", { class: "list-heading" }, "Select an asset"),
                        widget_1.jsxFactory.createElement("nav", { class: "nav-list" },
                            widget_1.jsxFactory.createElement("ul", { id: "ulAssets", class: "assetUL", style: "font-size: 13px; padding-left: 1.5em;" },
                                widget_1.jsxFactory.createElement("li", null, " No item selected from map ")))))));
        }; // render
        // Private method   
        AssetsList.prototype._removeWidget = function () {
            this.view.ui.empty("top-right");
        };
        AssetsList.prototype._searchKeyUp = function () {
            //alert("clicked");
            myFunction();
        };
        AssetsList.prototype.fillList = function (features) {
            $("#ulAssets").empty();
            features.forEach(function (item, i) {
                // Do something here to each feature
                var myLI = document.createElement("li");
                //li.value = item.attributes.ASID;
                myLI.innerHTML = item.attributes.ASID + ": " + item.attributes.Name;
                $("#ulAssets").append(myLI);
                myLI.outerHTML.concat(" bind={this} ");
                myLI.onclick = liClick;
            });
        };
        return AssetsList;
    }(decorators_1.declared(Widget)));
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetsList.prototype, "widgetName", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetsList.prototype, "view", void 0);
    AssetsList = __decorate([
        decorators_1.subclass("esri.widgets.AssetsList")
    ], AssetsList);
    function liClick() {
        alert($(this)[0].innerText);
        //alert($("#ulAssets").);
        //
    }
    function myFunction() {
        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById('inputSearch');
        filter = input.value.toUpperCase();
        ul = document.getElementById("ulAssets");
        li = ul.getElementsByTagName('li');
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i];
            //a=li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            }
            else {
                li[i].style.display = "none";
            }
        }
    }
    return AssetsList;
});
//# sourceMappingURL=AssetsList.js.map