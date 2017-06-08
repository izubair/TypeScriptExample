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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/Graphic", "esri/layers/FeatureLayer", "esri/geometry/support/webMercatorUtils"], function (require, exports, __extends, __decorate, decorators_1, Widget, widget_1, Graphic, FeatureLayer, webMercatorUtils) {
    "use strict";
    var CSS = {
        base: "asset-edit"
    };
    var featureLayer; //, editExpand: any;
    // feature edit area domNodes
    //let editArea, attributeEditing, inputDescription,
    //    inputUserInfo, updateInstructionDiv;
    var editFeature = undefined;
    var PRODFeatureLayers = [];
    var EditFeatureLayers = [];
    var AssetEdit = (function (_super) {
        __extends(AssetEdit, _super);
        function AssetEdit(wName, wView, wContainer) {
            var _this = _super.call(this) || this;
            // widget name
            _this.widgetName = "Unknown";
            //emphasized
            _this.emphasized = false;
            _this.widgetName = wName;
            _this.view = wView;
            _this.container = wContainer;
            //EditFeatureLayers=featureLyrs.slice();
            _this._addBtnClick = _this._addBtnClick.bind(_this);
            _this._relocateBtnClick = _this._relocateBtnClick.bind(_this);
            _this.addFlag = false;
            _this.relocateFlag = false;
            return _this;
        }
        AssetEdit.prototype.postInitialize = function () {
            //watchUtils.init(this, "vis", () => this._addBtnClick());  
        };
        // Public methods
        AssetEdit.prototype.render = function () {
            //const greeting=this._getGreeting();
            //const classes={
            //    [CSS.emphasis]: this.emphasized
            //};
            //this.bgExpand_baseMap.content=this.baseMapGallery.domNode;
            var styles = {
                editAttrVisible: this.vis ? 'style="display:none; margin-top: 0.5em;' : 'style="display:bold; margin-top: 0.5em;'
            };
            this.vis = true;
            return (widget_1.jsxFactory.createElement("div", { style: "padding: 5px; background-color: lightblue" },
                widget_1.jsxFactory.createElement("div", { id: "mainDiv", style: "padding: 5px; background-color: lightblue" },
                    widget_1.jsxFactory.createElement("label", { style: "color: green; font-size: 18px" }, this.widgetName),
                    widget_1.jsxFactory.createElement("img", { src: "app/close_icon.png", style: "width:18px;height:18px;float:right;", id: "Off", bind: this, onclick: this._removeWidget }, " Base Maps Off "),
                    widget_1.jsxFactory.createElement("br", null)),
                widget_1.jsxFactory.createElement("div", { bind: this, id: "editArea", class: "editArea-container" },
                    widget_1.jsxFactory.createElement("div", { id: "addFeatureDiv" },
                        widget_1.jsxFactory.createElement("select", { bind: this, style: "height: 32px; width: 100%;", id: "mapLyrsSelect", afterCreate: this._addSelectOptions }),
                        widget_1.jsxFactory.createElement("ul", { style: "font-size: 13px; padding-left: 1.5em;" },
                            widget_1.jsxFactory.createElement("li", null, "Click Add asset button"),
                            widget_1.jsxFactory.createElement("li", null, "Click on the map to create the asset")),
                        widget_1.jsxFactory.createElement("input", { type: "button", class: "edit-button", value: "Add asset", id: "btnAddFeature", onclick: this._addBtnClick }),
                        widget_1.jsxFactory.createElement("ul", { style: "font-size: 13px; padding-left: 1.5em;" },
                            widget_1.jsxFactory.createElement("li", null, "Click Relocate asset button"),
                            widget_1.jsxFactory.createElement("li", null, "Drag an asset on the map to relocate")),
                        widget_1.jsxFactory.createElement("input", { type: "button", class: "edit-button", value: "Relocate asset", id: "btnRelocateFeature", onclick: this._relocateBtnClick })),
                    widget_1.jsxFactory.createElement("div", { id: "updateInstructionDiv", style: "text-align:center" },
                        widget_1.jsxFactory.createElement("p", { class: "or-wrap" },
                            widget_1.jsxFactory.createElement("span", { class: "or-text" }, "Or")),
                        widget_1.jsxFactory.createElement("p", null, "Select an asset to edit or delete.")),
                    widget_1.jsxFactory.createElement("div", { id: "featureUpdateDiv", style: "display:none; margin-top: 0em;" },
                        widget_1.jsxFactory.createElement("h3", { class: "list-heading" }, "Enter the asset information"),
                        widget_1.jsxFactory.createElement("div", { id: "attributeArea" },
                            widget_1.jsxFactory.createElement("label", { for: "inputASID" }, "Asset ID: "),
                            widget_1.jsxFactory.createElement("input", { class: "inputInfo", type: "text", id: "inputASID", placeHolder: "", disabled: true }),
                            widget_1.jsxFactory.createElement("br", null),
                            widget_1.jsxFactory.createElement("label", { for: "inputDescription" }, "Description: "),
                            widget_1.jsxFactory.createElement("input", { class: "inputInfo", type: "text", id: "inputDescription", placeHolder: "Enter description" }),
                            widget_1.jsxFactory.createElement("br", null),
                            widget_1.jsxFactory.createElement("label", { for: "inputLat" }, "Latitude: "),
                            widget_1.jsxFactory.createElement("input", { class: "inputInfo", type: "text", id: "inputLat", placeHolder: "", disabled: true }),
                            widget_1.jsxFactory.createElement("br", null),
                            widget_1.jsxFactory.createElement("label", { for: "inputLon" }, "Longitude: "),
                            widget_1.jsxFactory.createElement("input", { class: "inputInfo", type: "text", id: "inputLon", placeHolder: "", disabled: true }),
                            widget_1.jsxFactory.createElement("br", null),
                            widget_1.jsxFactory.createElement("input", { type: "button", class: "edit-button", value: "Update asset info", id: "btnUpdate", onclick: this._updateBtnClick })),
                        widget_1.jsxFactory.createElement("div", { id: "deleteArea" },
                            widget_1.jsxFactory.createElement("input", { type: "button", class: "edit-button", value: "Delete asset", id: "btnDelete", onclick: this._deleteBtnClick })),
                        widget_1.jsxFactory.createElement("div", { id: "prodArea" },
                            widget_1.jsxFactory.createElement("input", { bind: this, type: "button", class: "edit-button", value: "Move asset to PRODUCTION", id: "btnMoveToProd", onclick: this._moveToProdBtnClick }))))));
        }; // render
        // Private method 
        AssetEdit.prototype._addSelectOptions = function () {
        };
        AssetEdit.prototype._removeWidget = function () {
            this.view.ui.empty("top-right");
            this.vis = false;
        };
        AssetEdit.prototype._addBtnClick = function () {
            if (this.addFlag) {
                this.addFlag = false;
                $("#btnAddFeature")[0].style.borderColor = '#0079c1';
                $("#btnAddFeature")[0].blur();
                var elm = $("#featureUpdateDiv")[0];
                elm.style.display = 'none';
                // change the view's mouse cursor once user selects
                // a new incident type to create
                $("#viewDiv")[0].style.cursor = "auto";
                $("#editArea")[0].style.cursor = "auto";
            }
            else {
                this.addFlag = true;
                $("#btnAddFeature")[0].style.borderColor = 'green';
                // change the view's mouse cursor once user selects
                // a new incident type to create
                $("#viewDiv")[0].style.cursor = "crosshair";
                $("#editArea")[0].style.cursor = "auto";
            }
        };
        AssetEdit.prototype._relocateBtnClick = function () {
            if (this.relocateFlag) {
                this.relocateFlag = false;
                $("#btnRelocateFeature")[0].style.borderColor = '#0079c1';
                // blur() to make focus go away from button so it does not look like selected
                $("#btnRelocateFeature")[0].blur();
                var elm = $("#featureUpdateDiv")[0];
                elm.style.display = 'none';
                // change the view's mouse cursor once user selects
                // a new incident type to create
                $("#viewDiv")[0].style.cursor = "auto";
                $("#editArea")[0].style.cursor = "auto";
            }
            else {
                this.relocateFlag = true;
                $("#btnRelocateFeature")[0].style.borderColor = 'green';
                // change the view's mouse cursor once user selects
                // a new incident type to create
                $("#viewDiv")[0].style.cursor = "crosshair";
                $("#editArea")[0].style.cursor = "auto";
            }
        };
        AssetEdit.prototype._updateBtnClick = function () {
            if (editFeature) {
                if (editFeature.attributes["ASID"] == undefined) {
                    editFeature.attributes["AssetID"] = $("#inputASID")[0].value;
                }
                else {
                    editFeature.attributes["ASID"] = $("#inputASID")[0].value;
                }
                editFeature.attributes["Name"] = $("#inputDescription")[0].value;
                editFeature.attributes["Latitude"] = $("#inputLat")[0].value;
                editFeature.attributes["Longitude"] = $("#inputLon")[0].value;
                var edits = {
                    updateFeatures: [editFeature]
                };
                applyEdits(edits);
            }
        };
        AssetEdit.prototype._deleteBtnClick = function () {
            if (editFeature) {
                var edits = {
                    deleteFeatures: [editFeature]
                };
                applyEdits(edits);
                $("#inputASID")[0].value = "";
                $("#inputDescription")[0].value = "";
                $("#inputLat")[0].value = "";
                $("#inputLon")[0].value = "";
            }
        };
        AssetEdit.prototype._moveToProdBtnClick = function () {
            if (editFeature) {
                this.addAssetToPROD(featureLayer, editFeature);
            }
        };
        AssetEdit.prototype.updateAttr = function (selFeatureLyr, selFeature) {
            var lat = null;
            var lon = null;
            if (selFeature.geometry.type == "polygon") {
                lat = selFeature.geometry.centroid.latitude;
                lon = selFeature.geometry.centroid.longitude;
            }
            if (selFeature.geometry.type == "polyline") {
                var geom = webMercatorUtils.webMercatorToGeographic(selFeature.geometry);
                var myPnt = geom.getPoint(0, 1);
                lat = myPnt.latitude;
                lon = myPnt.longitude;
            }
            else {
                lat = selFeature.geometry.latitude;
                lon = selFeature.geometry.longitude;
            }
            editFeature = selFeature;
            featureLayer = selFeatureLyr;
            var asid = selFeature.attributes["ASID"];
            if (asid == undefined)
                asid = selFeature.attributes["AssetID"];
            $("#inputASID")[0].value = asid;
            $("#inputDescription")[0].value = selFeature.attributes["Name"];
            $("#inputLat")[0].value = lat.toFixed(6);
            $("#inputLon")[0].value = lon.toFixed(6);
            var elm = $("#featureUpdateDiv")[0];
            elm.style.display = 'block';
        };
        AssetEdit.prototype.addAsset = function (featureLyr, pnt) {
            if (this.addFlag == false) {
                return;
            }
            featureLayer = featureLyr;
            var asid = Math.floor((Math.random() * 100000) + 1);
            var name = $("#inputDescription")[0].value;
            var newAsset = new Graphic({
                geometry: pnt,
                attributes: {
                    ASID: asid,
                    Name: name
                }
            });
            var edits = {
                addFeatures: [newAsset]
            };
            applyEdits(edits);
            this.addFlag = false;
            $("#btnAddFeature")[0].style.borderColor = '#0079c1';
            // blur() to make focus go away from button so it does not look like selected
            $("#btnAddFeature")[0].blur();
            $("#viewDiv")[0].style.cursor = "auto";
            $("#editArea")[0].style.cursor = "auto";
            // ui changes in response to creating a new feature
            // display feature update and delete portion of the edit area
            $("#featureUpdateDiv")[0].style.display = "block";
            $("#updateInstructionDiv")[0].style.display = "none";
        };
        ///////////////////////////////////////////
        AssetEdit.prototype.moveAsset = function (featureLyr, selFeature, pnt) {
            if (this.relocateFlag == false) {
                return;
            }
            featureLayer = featureLyr;
            selFeature.geometry = pnt;
            var edits = {
                updateFeatures: [selFeature]
            };
            applyEdits(edits);
            this.relocateFlag = false;
            $("#btnRelocateFeature")[0].style.borderColor = '#0079c1';
            // blur() to make focus go away from button so it does not look like selected
            $("#btnRelocateFeature")[0].blur();
            $("#viewDiv")[0].style.cursor = "auto";
            $("#editArea")[0].style.cursor = "auto";
        };
        AssetEdit.prototype.addAssetToPROD = function (featureLyr, newAsset) {
            // First check if feature layer already created
            featureLayer = null;
            var FLTitle = featureLyr.title + "_PROD";
            for (var i = 0; i < PRODFeatureLayers.length; ++i) {
                if (PRODFeatureLayers[i].title === FLTitle) {
                    featureLayer = PRODFeatureLayers[i];
                    break;
                }
            }
            if (featureLayer == null) {
                // create feature layer to add asset to it
                featureLayer = new FeatureLayer({
                    url: "http://services2.arcgis.com/80HBwlYoN0Ix3abu/arcgis/rest/services/" + FLTitle + "/FeatureServer"
                });
                PRODFeatureLayers.push(featureLayer);
            }
            var edits = {
                addFeatures: [newAsset]
            };
            applyEdits(edits);
        };
        AssetEdit.prototype.addLayer = function (Lyr) {
            EditFeatureLayers.push(Lyr);
            var x = $("#mapLyrsSelect")[0];
            var option = document.createElement("option");
            option.text = Lyr.title;
            x.add(option);
        };
        AssetEdit.prototype.getSelLayer = function () {
            var x = $("#mapLyrsSelect")[0];
            var lyrTitle = x.options[x.selectedIndex].text;
            return lyrTitle;
        };
        AssetEdit.prototype.getEditLayer = function () {
            var x = $("#mapLyrsSelect")[0];
            var lyrTitle = x.options[x.selectedIndex].text;
            for (var i = 0; i < EditFeatureLayers.length; ++i) {
                if (EditFeatureLayers[i].title === lyrTitle)
                    return EditFeatureLayers[i];
            }
        };
        return AssetEdit;
    }(decorators_1.declared(Widget)));
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetEdit.prototype, "widgetName", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetEdit.prototype, "emphasized", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetEdit.prototype, "view", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetEdit.prototype, "vis", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetEdit.prototype, "addFlag", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], AssetEdit.prototype, "relocateFlag", void 0);
    AssetEdit = __decorate([
        decorators_1.subclass("esri.widgets.AssetEdit")
    ], AssetEdit);
    function applyEdits(params) {
        //unselectFeature();
        var promise = featureLayer.applyEdits(params);
        editResultsHandler(promise);
    }
    // *****************************************************
    // applyEdits promise resolved successfully
    // query the newly created feature from the featurelayer
    // set the editFeature object so that it can be used
    // to update its features.
    // *****************************************************
    function editResultsHandler(promise) {
        promise
            .then(function (editsResult) {
            var extractObjectId = function (result) {
                return result.objectId;
            };
            // get the objectId of the newly added feature
            if (editsResult.addFeatureResults.length > 0) {
                var adds = editsResult.addFeatureResults.map(extractObjectId);
                var addedFeature = editsResult.addFeatureResults[0].graphic;
                var newObjId = adds[0];
                var query = featureLayer.createQuery();
                query.where = featureLayer.objectIdField + " = " + newObjId;
                featureLayer.queryFeatures(query).then(function (results) {
                    if (results.features.length > 0) {
                        var newFeature = results.features[0];
                        $("#inputASID")[0].value = newFeature.attributes["ASID"];
                        var lat = newFeature.geometry.latitude;
                        var lon = newFeature.geometry.longitude;
                        $("#inputLat")[0].value = lat.toFixed(6);
                        $("#inputLon")[0].value = lon.toFixed(6);
                        //editFeature.symbol=selectionSymbol;
                        //this.view.graphics.add(editFeature);
                    }
                });
                //selectFeature(newIncidentId);
            }
        })
            .otherwise(function (error) {
            console.log("===============================================");
            console.error("[ applyEdits ] FAILURE: ", error.code, error.name, error.message);
            console.log("error = ", error);
        });
    }
    return AssetEdit;
});
//# sourceMappingURL=AssetEdit.js.map