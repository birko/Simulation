var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\DataStructures\Tree.ts" />
/// <reference path="..\DataStructures\BinaryTree.ts" />
/// <reference path="..\DataStructures\PairingHeap.ts" />
var Simulation;
(function (Simulation) {
    "use strict";
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event(time) {
            _super.call(this);
            this.time = time;
        }
        Event.prototype.priority = function () {
            return this.time;
        };
        return Event;
    })(DataStructures.Tree.AbstractPairingHeapNode);
    Simulation.Event = Event;

    var TimePlan = (function (_super) {
        __extends(TimePlan, _super);
        function TimePlan() {
            _super.call(this);
            this.nextTime = undefined;
        }
        TimePlan.prototype.isEmpty = function () {
            return this.root === undefined;
        };

        TimePlan.prototype.clear = function () {
            this.root = undefined;
            return this;
        };

        TimePlan.prototype.addEvent = function (node) {
            if (node !== undefined) {
                _super.prototype.addNode.call(this, node);
                if (node.compare(this.root) === 0) {
                    this.nextTime = node.priority();
                }
            }
            return this;
        };

        TimePlan.prototype.removeMinPriorityEvent = function () {
            var result = _super.prototype.removeMinPriority.call(this);
            if (this.root !== undefined) {
                this.nextTime = this.root.priority();
            } else {
                this.nextTime = undefined;
            }
            return result;
        };

        TimePlan.prototype.getMinpriorityEvent = function () {
            return this.root;
        };
        return TimePlan;
    })(DataStructures.Tree.PairingHeap);
    Simulation.TimePlan = TimePlan;
})(Simulation || (Simulation = {}));
//# sourceMappingURL=TimePlan.js.map
