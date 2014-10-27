var Component = require('../core/component/Component');
var CSS = require('../core/document/CSS');
var EventType = require('../core/event/EventType');
var Metric = require('../core/Metric');

function Canvas(parent,params)
{
    Component.apply(this,arguments);

    /*-------------------------------------------------------------------------------------*/

    var wrapNode = this._wrapNode;
        wrapNode.setStyleClass(CSS.CanvasWrap);

    var wrapWidth = wrapNode.getWidth();

    var canvas = this._canvas = document.createElement('canvas');
        wrapNode.getElement().appendChild(canvas);

    this._canvasWidth = this._canvasHeight = 0;
    this._setCanvasSize(wrapWidth,wrapWidth);

    this._updateHeight();

    /*-------------------------------------------------------------------------------------*/

    this._node.setStyleClass(CSS.CanvasListItem);

    this._parent.addEventListener(EventType.GROUP_SIZE_CHANGE,this,  'onGroupSizeChange');
    this.addEventListener(EventType.GROUP_SIZE_UPDATE,this._parent,'onGroupSizeUpdate');

};

Canvas.prototype = Object.create(Component.prototype);

/*-------------------------------------------------------------------------------------*/


Canvas.prototype._updateHeight = function()
{
    var canvasHeight = this._canvas.height;

    this._wrapNode.setHeight(canvasHeight);
    this._node.setHeight(canvasHeight + Metric.PADDING_WRAPPER);

};

Canvas.prototype.onGroupSizeChange = function()
{
    var width = this._wrapNode.getWidth();

    this._setCanvasSize(width,width);
    this._updateHeight();
    this._redraw();

    this.dispatchEvent(new Event_(this,EventType.GROUP_SIZE_UPDATE,null));
};

Canvas.prototype._setCanvasSize = function(width,height)
{
    var canvasWidth  = this._canvasWidth  = width,
        canvasHeight = this._canvasHeight = height;

    var canvas = this._canvas;
        canvas.style.width  = canvasWidth  + 'px';
        canvas.style.height = canvasHeight + 'px';
        canvas.width        = canvasWidth;
        canvas.height       = canvasHeight;
};

Canvas.prototype.getCanvas  = function(){return this._canvas;};
Canvas.prototype.getContext = function(){return this._canvas.getContext('2d');};

module.exports = Canvas;

//ControlKit.Canvas = function(parent,params)
//{
//    ControlKit.Component.apply(this,arguments);
//
//    /*-------------------------------------------------------------------------------------*/
//
//    var wrapNode = this._wrapNode;
//        wrapNode.setStyleClass(ControlKit.CSS.CanvasWrap);
//
//    var wrapWidth = wrapNode.getWidth();
//
//    var canvas = this._canvas = document.createElement('canvas');
//        wrapNode.getElement().appendChild(canvas);
//
//    this._canvasWidth = this._canvasHeight = 0;
//    this._setCanvasSize(wrapWidth,wrapWidth);
//
//    this._updateHeight();
//
//    /*-------------------------------------------------------------------------------------*/
//
//    this._node.setStyleClass(ControlKit.CSS.CanvasListItem);
//
//    this._parent.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE,this,  'onGroupSizeChange');
//    this.addEventListener(ControlKit.EventType.GROUP_SIZE_UPDATE,this._parent,'onGroupSizeUpdate');
//
//};
//
//ControlKit.Canvas.prototype = Object.create(ControlKit.Component.prototype);
//
///*-------------------------------------------------------------------------------------*/
//
//
//ControlKit.Canvas.prototype._updateHeight = function()
//{
//    var canvasHeight = this._canvas.height;
//
//    this._wrapNode.setHeight(canvasHeight);
//    this._node.setHeight(canvasHeight + ControlKit.Metric.PADDING_WRAPPER);
//
//};
//
//ControlKit.Canvas.prototype.onGroupSizeChange = function()
//{
//    var width = this._wrapNode.getWidth();
//
//    this._setCanvasSize(width,width);
//    this._updateHeight();
//    this._redraw();
//
//    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_UPDATE,null));
//};
//
//ControlKit.Canvas.prototype._setCanvasSize = function(width,height)
//{
//    var canvasWidth  = this._canvasWidth  = width,
//        canvasHeight = this._canvasHeight = height;
//
//    var canvas = this._canvas;
//        canvas.style.width  = canvasWidth  + 'px';
//        canvas.style.height = canvasHeight + 'px';
//        canvas.width        = canvasWidth;
//        canvas.height       = canvasHeight;
//};
//
//ControlKit.Canvas.prototype.getCanvas  = function(){return this._canvas;};
//ControlKit.Canvas.prototype.getContext = function(){return this._canvas.getContext('2d');};