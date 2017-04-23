var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
"use strict";
var DataStructures;
(function (DataStructures) {
    var Tree;
    (function (Tree) {
        "use strict";
        var AbstractNode = (function () {
            function AbstractNode() {
                this.parent = null;
            }
            AbstractNode.prototype.getParent = function () {
                return this.parent;
            };
            AbstractNode.prototype.setParent = function (parent) {
                this.parent = parent;
                return this;
            };
            AbstractNode.prototype.compare = function (node) {
                throw new Error("Abstract method must be implemnted");
            };
            AbstractNode.prototype.add = function (node) {
                throw new Error("Abstract method must be implemnted");
            };
            AbstractNode.prototype.children = function () {
                throw new Error("Abstract method must be implemnted");
            };
            AbstractNode.prototype.search = function (node) {
                throw new Error("Abstract method must be implemnted");
            };
            AbstractNode.prototype.hasChildren = function () {
                var children = this.children();
                return (children !== null && children !== undefined && children.length > 0);
            };
            AbstractNode.prototype.inOrder = function (items) {
                var children = this.children();
                var length = (this.hasChildren()) ? children.length : 0;
                var half = Math.floor(length / 2);
                if (length > 0) {
                    for (var i = 0; i < half; i++) {
                        var value = children[i];
                        if (value !== null && value !== undefined) {
                            items = value.inOrder(items);
                        }
                    }
                }
                items.addLast(this);
                if (length > half) {
                    for (var i = half; i < length; i++) {
                        var value = children[i];
                        if (value !== null && value !== undefined) {
                            items = value.inOrder(items);
                        }
                    }
                }
                return items;
            };
            AbstractNode.prototype.preOrder = function (items) {
                items.addLast(this);
                this.children().forEach(function (value) {
                    if (value !== null && value !== undefined) {
                        items = value.inOrder(items);
                    }
                });
                return items;
            };
            AbstractNode.prototype.postOrder = function (items) {
                this.children().forEach(function (value) {
                    if (value !== null && value !== undefined) {
                        items = value.inOrder(items);
                    }
                });
                items.addLast(this);
                return items;
            };
            AbstractNode.prototype.leverOrder = function (items) {
                var list = new DataStructures.List();
                list.addLast(this);
                while (list.getLength() > 0) {
                    var values = list.getValues();
                    list = new DataStructures.List();
                    values.forEach(function (value) {
                        if (value !== null && value !== undefined) {
                            items.addLast(value);
                            list.addRange(value.children());
                        }
                    });
                }
                return items;
            };
            return AbstractNode;
        }());
        Tree.AbstractNode = AbstractNode;
        var AbstractTree = (function () {
            function AbstractTree() {
                this.root = null;
                this.setRoot(null);
            }
            AbstractTree.prototype.getRoot = function () {
                return this.root;
            };
            AbstractTree.prototype.setRoot = function (root) {
                this.root = root;
                return this;
            };
            AbstractTree.prototype.addNode = function (node) {
                if (this.getRoot() === null) {
                    this.setRoot(node);
                }
                else {
                    this.getRoot().add(node);
                }
                return this;
            };
            AbstractTree.prototype.searchNode = function (node) {
                if (this.getRoot() !== null) {
                    return this.getRoot().search(node);
                }
                return null;
            };
            AbstractTree.prototype.removeNode = function (node) {
                throw new Error("Abstract method must be implemnted");
            };
            AbstractTree.prototype.inOrder = function () {
                var result = new DataStructures.List();
                if (this.getRoot() !== null) {
                    result = this.getRoot().inOrder(result);
                }
                return result;
            };
            AbstractTree.prototype.preOrder = function () {
                var result = new DataStructures.List();
                if (this.getRoot() !== null) {
                    result = this.getRoot().preOrder(result);
                }
                return result;
            };
            AbstractTree.prototype.postOrder = function () {
                var result = new DataStructures.List();
                if (this.getRoot() !== null) {
                    result = this.getRoot().postOrder(result);
                }
                return result;
            };
            AbstractTree.prototype.leverOrder = function () {
                var result = new DataStructures.List();
                if (this.getRoot() !== null) {
                    result = this.getRoot().leverOrder(result);
                }
                return result;
            };
            return AbstractTree;
        }());
        Tree.AbstractTree = AbstractTree;
    })(Tree = DataStructures.Tree || (DataStructures.Tree = {}));
})(DataStructures || (DataStructures = {}));
"use strict";
var DataStructures;
(function (DataStructures) {
    var Tree;
    (function (Tree) {
        "use strict";
        var AbstractBinaryNode = (function (_super) {
            __extends(AbstractBinaryNode, _super);
            function AbstractBinaryNode() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.left = null;
                _this.right = null;
                return _this;
            }
            AbstractBinaryNode.prototype.getParent = function () {
                return _super.prototype.getParent.call(this);
            };
            AbstractBinaryNode.prototype.setParent = function (parent) {
                return _super.prototype.setParent.call(this, parent);
            };
            AbstractBinaryNode.prototype.getLeft = function () {
                return this.left;
            };
            AbstractBinaryNode.prototype.setLeft = function (left) {
                this.left = left;
                return this;
            };
            AbstractBinaryNode.prototype.getRight = function () {
                return this.right;
            };
            AbstractBinaryNode.prototype.setRight = function (right) {
                this.right = right;
                return this;
            };
            AbstractBinaryNode.prototype.children = function () {
                return [this.getLeft(), this.getRight()];
            };
            AbstractBinaryNode.prototype.compare = function (node) {
                throw new Error("This method is abstract");
            };
            AbstractBinaryNode.prototype.add = function (node) {
                if (this.compare(node) > 0) {
                    if (this.getLeft() === null) {
                        node.setParent(this);
                        this.setLeft(node);
                        return node;
                    }
                    else {
                        return this.getLeft().add(node);
                    }
                }
                else {
                    if (this.getRight() === null) {
                        node.setParent(this);
                        this.setRight(node);
                        return node;
                    }
                    else {
                        return this.getRight().add(node);
                    }
                }
            };
            AbstractBinaryNode.prototype.search = function (node) {
                var test = this.compare(node);
                if (test === 0) {
                    return this;
                }
                else if (test < 0) {
                    return this.getLeft().search(node);
                }
                else {
                    return this.getRight().search(node);
                }
            };
            AbstractBinaryNode.prototype.inOrder = function (items) {
                return _super.prototype.leverOrder.call(this, items);
            };
            AbstractBinaryNode.prototype.preOrder = function (items) {
                return _super.prototype.preOrder.call(this, items);
            };
            AbstractBinaryNode.prototype.postOrder = function (items) {
                return _super.prototype.postOrder.call(this, items);
            };
            AbstractBinaryNode.prototype.leverOrder = function (items) {
                return _super.prototype.leverOrder.call(this, items);
            };
            return AbstractBinaryNode;
        }(Tree.AbstractNode));
        Tree.AbstractBinaryNode = AbstractBinaryNode;
        var BinaryTree = (function (_super) {
            __extends(BinaryTree, _super);
            function BinaryTree() {
                return _super.call(this) || this;
            }
            BinaryTree.prototype.getRoot = function () {
                return _super.prototype.getRoot.call(this);
            };
            BinaryTree.prototype.setRoot = function (root) {
                return _super.prototype.setRoot.call(this, root);
            };
            BinaryTree.prototype.addNode = function (node) {
                return _super.prototype.addNode.call(this, node);
            };
            BinaryTree.prototype.removeNode = function (node) {
                var removeNode = this.searchNode(node);
                var children = removeNode.children();
                var nodeLeft = children[0];
                var nodeRight = children[1];
                nodeLeft.setParent(removeNode.getParent());
                nodeLeft.add(nodeRight);
                return removeNode;
            };
            BinaryTree.prototype.searchNode = function (node) {
                return _super.prototype.searchNode.call(this, node);
            };
            return BinaryTree;
        }(Tree.AbstractTree));
        Tree.BinaryTree = BinaryTree;
    })(Tree = DataStructures.Tree || (DataStructures.Tree = {}));
})(DataStructures || (DataStructures = {}));
"use strict";
var DataStructures;
(function (DataStructures) {
    var Tree;
    (function (Tree) {
        "use strict";
        var AbstractPairingHeapNode = (function (_super) {
            __extends(AbstractPairingHeapNode, _super);
            function AbstractPairingHeapNode() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AbstractPairingHeapNode.prototype.getParent = function () {
                return _super.prototype.getParent.call(this);
            };
            AbstractPairingHeapNode.prototype.setParent = function (parent) {
                return _super.prototype.setParent.call(this, parent);
            };
            AbstractPairingHeapNode.prototype.getLeft = function () {
                return _super.prototype.getLeft.call(this);
            };
            AbstractPairingHeapNode.prototype.setLeft = function (left) {
                return _super.prototype.setLeft.call(this, left);
            };
            AbstractPairingHeapNode.prototype.getRight = function () {
                return _super.prototype.getRight.call(this);
            };
            AbstractPairingHeapNode.prototype.setRight = function (right) {
                return _super.prototype.setRight.call(this, right);
            };
            AbstractPairingHeapNode.prototype.children = function () {
                return _super.prototype.children.call(this);
            };
            AbstractPairingHeapNode.prototype.priority = function () {
                throw new Error("This method is abstract");
            };
            AbstractPairingHeapNode.prototype.compare = function (node) {
                var thispriority = this.priority();
                var nodepriority = node.priority();
                if (thispriority === nodepriority) {
                    return 0;
                }
                else if (thispriority < nodepriority) {
                    return -1;
                }
                else {
                    return 1;
                }
            };
            AbstractPairingHeapNode.prototype.search = function (node) {
                return _super.prototype.search.call(this, node);
            };
            AbstractPairingHeapNode.prototype.inOrder = function (items) {
                return _super.prototype.inOrder.call(this, items);
            };
            AbstractPairingHeapNode.prototype.preOrder = function (items) {
                return _super.prototype.preOrder.call(this, items);
            };
            AbstractPairingHeapNode.prototype.postOrder = function (items) {
                return _super.prototype.postOrder.call(this, items);
            };
            AbstractPairingHeapNode.prototype.leverOrder = function (items) {
                return _super.prototype.leverOrder.call(this, items);
            };
            AbstractPairingHeapNode.prototype.add = function (node) {
                var minNode = null;
                var min_left = null;
                if (this.compare(node) > 0) {
                    min_left = node.getLeft();
                    node.setLeft(this);
                    this.setRight(min_left);
                    this.setParent(node);
                    if (min_left !== null) {
                        min_left.setParent(this);
                    }
                    minNode = node;
                }
                else {
                    min_left = this.getLeft();
                    var max_right = node.getRight();
                    node.setRight(min_left);
                    this.setLeft(node);
                    this.setRight(max_right);
                    node.setParent(this);
                    if (min_left !== null) {
                        min_left.setParent(node);
                    }
                    if (max_right !== null) {
                        max_right.setParent(this);
                    }
                    minNode = this;
                }
                return minNode;
            };
            return AbstractPairingHeapNode;
        }(Tree.AbstractBinaryNode));
        Tree.AbstractPairingHeapNode = AbstractPairingHeapNode;
        var PairingHeap = (function (_super) {
            __extends(PairingHeap, _super);
            function PairingHeap() {
                return _super.call(this) || this;
            }
            PairingHeap.prototype.getRoot = function () {
                return _super.prototype.getRoot.call(this);
            };
            PairingHeap.prototype.setRoot = function (root) {
                return _super.prototype.setRoot.call(this, root);
            };
            PairingHeap.prototype.addNode = function (node) {
                return _super.prototype.addNode.call(this, node);
            };
            PairingHeap.prototype.searchNode = function (node) {
                return _super.prototype.searchNode.call(this, node);
            };
            PairingHeap.prototype.removeNode = function (node) {
                return _super.prototype.removeNode.call(this, node);
            };
            PairingHeap.prototype.removeMinPriority = function () {
                var result = this.getRoot();
                if (this.getRoot() !== null) {
                    this.setRoot(result.getLeft());
                    if (this.getRoot() !== null) {
                        while (this.getRoot().getRight() !== null) {
                            this.setRoot(this.getRoot().add(this.getRoot().getRight()));
                        }
                        this.getRoot().setParent(null);
                    }
                }
                return result;
            };
            return PairingHeap;
        }(Tree.BinaryTree));
        Tree.PairingHeap = PairingHeap;
    })(Tree = DataStructures.Tree || (DataStructures.Tree = {}));
})(DataStructures || (DataStructures = {}));
"use strict";
var Simulation;
(function (Simulation) {
    "use strict";
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event(time, func) {
            if (func === void 0) { func = null; }
            var _this = _super.call(this) || this;
            _this.func = null;
            _this.time = time;
            _this.func = func;
            return _this;
        }
        Event.prototype.priority = function () {
            return this.time;
        };
        Event.prototype.execute = function () {
            if (this.func !== undefined && this.func !== null) {
                this.func();
            }
            return this;
        };
        return Event;
    }(DataStructures.Tree.AbstractPairingHeapNode));
    Simulation.Event = Event;
    var TimePlan = (function (_super) {
        __extends(TimePlan, _super);
        function TimePlan() {
            var _this = _super.call(this) || this;
            _this.setNextTime(undefined);
            return _this;
        }
        TimePlan.prototype.getNextTime = function () {
            return this.nextTime;
        };
        TimePlan.prototype.setNextTime = function (time) {
            this.nextTime = time;
            return this;
        };
        TimePlan.prototype.getRoot = function () {
            return _super.prototype.getRoot.call(this);
        };
        TimePlan.prototype.setRoot = function (root) {
            _super.prototype.setRoot.call(this, root);
            return this;
        };
        TimePlan.prototype.isEmpty = function () {
            return this.getRoot() === null;
        };
        TimePlan.prototype.clear = function () {
            this.setRoot(null);
            return this;
        };
        TimePlan.prototype.addEvent = function (node) {
            if (node !== undefined) {
                _super.prototype.addNode.call(this, node);
                if (node.compare(this.getRoot()) === 0) {
                    this.setNextTime(node.priority());
                }
            }
            return this;
        };
        TimePlan.prototype.removeMinPriorityEvent = function () {
            var result = _super.prototype.removeMinPriority.call(this);
            if (!this.isEmpty()) {
                this.setNextTime(this.getRoot().priority());
            }
            else {
                this.setNextTime(undefined);
            }
            return result;
        };
        TimePlan.prototype.getMinpriorityEvent = function () {
            return this.getRoot();
        };
        return TimePlan;
    }(DataStructures.Tree.PairingHeap));
    Simulation.TimePlan = TimePlan;
})(Simulation || (Simulation = {}));
"use strict";
var Simulation;
(function (Simulation) {
    "use strict";
    var AbstractSimulator = (function () {
        function AbstractSimulator() {
            this.currentTime = undefined;
            this.paused = false;
            this.currentTime = undefined;
            this.paused = false;
        }
        AbstractSimulator.prototype.setCurrentTime = function (currentTime) {
            if (!this.isPause()) {
                this.currentTime = currentTime;
                if (this.getCurretTime() !== undefined) {
                    this.execute();
                }
            }
            return this;
        };
        AbstractSimulator.prototype.isRunning = function () {
            return this.getCurretTime() !== undefined;
        };
        AbstractSimulator.prototype.getCurretTime = function () {
            return this.currentTime;
        };
        AbstractSimulator.prototype.isPause = function () {
            return this.paused;
        };
        AbstractSimulator.prototype.stop = function () {
            this.setCurrentTime(undefined);
            return this;
        };
        AbstractSimulator.prototype.pause = function () {
            this.paused = true;
            return this;
        };
        AbstractSimulator.prototype.resume = function () {
            this.paused = false;
            return this;
        };
        AbstractSimulator.prototype.execute = function () {
            throw new Error("This method is abstract");
        };
        AbstractSimulator.prototype.addEvent = function (time, func) {
            if (func === void 0) { func = null; }
            throw new Error("This method is abstract");
        };
        return AbstractSimulator;
    }());
    Simulation.AbstractSimulator = AbstractSimulator;
    var Simulator = (function (_super) {
        __extends(Simulator, _super);
        function Simulator(timePlan) {
            var _this = _super.call(this) || this;
            _this.timePlan = null;
            _this.timePlan = null;
            return _this;
        }
        Simulator.prototype.getNextTime = function () {
            if (this.timePlan !== undefined) {
                return this.timePlan.getNextTime();
            }
            return 0;
        };
        Simulator.prototype.isEmpty = function () {
            if (this.timePlan !== undefined) {
                return this.timePlan.isEmpty();
            }
            return true;
        };
        Simulator.prototype.stop = function () {
            this.timePlan.clear();
            _super.prototype.stop.call(this);
            return this;
        };
        Simulator.prototype.execute = function () {
            var events = [];
            var time = this.getNextTime();
            while (this.getNextTime() <= this.getCurretTime()) {
                var event = this.timePlan.removeMinPriorityEvent();
                if (event !== undefined && event !== null) {
                    events.push(event);
                }
            }
            events.forEach(function (value, index) {
                event.execute();
            });
            return this;
        };
        Simulator.prototype.addEvent = function (time, func) {
            if (func === void 0) { func = null; }
            if (this.timePlan !== undefined) {
                time += this.getCurretTime();
                var event = new Simulation.Event(time, func);
                this.timePlan.addEvent(event);
            }
            return this;
        };
        return Simulator;
    }(AbstractSimulator));
    Simulation.Simulator = Simulator;
})(Simulation || (Simulation = {}));
"use strict";
var Simulation;
(function (Simulation) {
    "use strict";
    var TimeSimulator = (function (_super) {
        __extends(TimeSimulator, _super);
        function TimeSimulator(timePlan, period) {
            var _this = _super.call(this, timePlan) || this;
            _this.period = undefined;
            _this.pausePeriod = undefined;
            _this.timeOut = undefined;
            _this.timeOutTime = undefined;
            _this.speed = 1;
            _this.period = period;
            _this.timeOut = undefined;
            _this.speed = 1;
            return _this;
        }
        TimeSimulator.prototype.getPeriod = function () {
            return this.period;
        };
        TimeSimulator.prototype.getTikPeriod = function () {
            var tikPeriod = this.getPeriod();
            if (this.pausePeriod !== undefined) {
                tikPeriod = this.pausePeriod;
                this.pausePeriod = undefined;
            }
            return tikPeriod / this.getSpeed();
        };
        TimeSimulator.prototype.getSpeed = function () {
            return this.speed;
        };
        TimeSimulator.prototype.setSpeed = function (speed) {
            this.speed = speed;
            return this;
        };
        TimeSimulator.prototype.setCurrentTime = function (time) {
            _super.prototype.setCurrentTime.call(this, time);
            clearTimeout(this.timeOut);
            this.timeOut = undefined;
            this.timeOutTime = undefined;
            this.simulate();
            return this;
        };
        TimeSimulator.prototype.pause = function () {
            _super.prototype.pause.call(this);
            clearTimeout(this.timeOut);
            var now = new Date();
            this.pausePeriod = (now.valueOf() - this.timeOutTime.valueOf());
            this.timeOutTime = undefined;
            return this;
        };
        TimeSimulator.prototype.resume = function () {
            _super.prototype.resume.call(this);
            return this.simulate();
        };
        TimeSimulator.prototype.simulate = function () {
            if (!this.pause() || !this.isRunning()) {
                this.timeOutTime = new Date();
                var toTime = this.getTikPeriod();
                this.timeOut = setTimeout(function () {
                    var time = this.getCurretTime() + this.getPeriod();
                    this.setCurrentTime(time);
                }.bind(this), toTime);
            }
            return this;
        };
        TimeSimulator.prototype.execute = function () {
            return this.simulate();
        };
        return TimeSimulator;
    }(Simulation.Simulator));
    Simulation.TimeSimulator = TimeSimulator;
})(Simulation || (Simulation = {}));
"use strict";
var DataStructures;
(function (DataStructures) {
    "use strict";
    var KeyValuePair = (function () {
        function KeyValuePair(key, value) {
            this.key = null;
            this.value = null;
            this
                .setKey(key)
                .setValue(value);
        }
        KeyValuePair.prototype.getKey = function () {
            return this.key;
        };
        KeyValuePair.prototype.setKey = function (key) {
            this.key = key;
            return this;
        };
        KeyValuePair.prototype.getValue = function () {
            return this.value;
        };
        KeyValuePair.prototype.setValue = function (value) {
            this.value = value;
            return this;
        };
        return KeyValuePair;
    }());
    DataStructures.KeyValuePair = KeyValuePair;
    var List = (function () {
        function List() {
            this.values = [];
        }
        List.prototype.getValues = function () {
            if (this.values === undefined || this.values === null) {
                this.clear();
            }
            return this.values;
        };
        List.prototype.setValues = function (values) {
            this.values = values;
            return this;
        };
        List.prototype.clear = function () {
            return this.setValues([]);
        };
        List.prototype.getLength = function () {
            return this.getValues().length;
        };
        List.prototype.hasValues = function () {
            return this.getLength() > 0;
        };
        List.prototype.indexOf = function (value) {
            return this.getValues().indexOf(value);
        };
        List.prototype.add = function (index, value) {
            if (index <= 0) {
                return this.addFirst(value);
            }
            else if (index > this.getLength()) {
                return this.addLast(value);
            }
            else {
                this.values.splice(index, 0, value);
                return this;
            }
        };
        List.prototype.addLast = function (value) {
            return this.push(value);
        };
        List.prototype.addFirst = function (value) {
            return this.unshift(value);
        };
        List.prototype.unshift = function (value) {
            this.getValues();
            this.values.unshift(value);
            return this;
        };
        List.prototype.push = function (value) {
            this.getValues();
            this.values.push(value);
            return this;
        };
        List.prototype.addRange = function (values) {
            var _this = this;
            if (values !== null && values !== undefined) {
                values.forEach(function (value) {
                    _this.addLast(value);
                });
            }
            return this;
        };
        List.prototype.get = function (index) {
            if (index >= 0 && index < this.getLength()) {
                return this.values[index];
            }
            return null;
        };
        List.prototype.set = function (index, value) {
            if (index >= 0 && index < this.getLength()) {
                this.values[index] = value;
            }
            return this;
        };
        List.prototype.remove = function (index) {
            if (this.hasValues() && index >= 0 && index < this.getLength()) {
                this.values.splice(index, 1);
            }
            return this;
        };
        List.prototype.removeFirst = function () {
            return this.shift();
        };
        List.prototype.removeLast = function () {
            return this.pop();
        };
        List.prototype.shift = function () {
            if (this.hasValues()) {
                this.values.shift();
            }
            return this;
        };
        List.prototype.pop = function () {
            if (this.hasValues()) {
                this.values.pop();
            }
            return this;
        };
        return List;
    }());
    DataStructures.List = List;
    var Dictionary = (function () {
        function Dictionary() {
            this.values = new List();
            this.keys = new List();
        }
        Dictionary.prototype.getKeysList = function () {
            if (this.keys === undefined || this.keys === null) {
                this.clear();
            }
            return this.keys;
        };
        Dictionary.prototype.getKeys = function () {
            return this.getKeysList().getValues();
        };
        Dictionary.prototype.getValuesList = function () {
            if (this.values === undefined || this.values === null) {
                this.clear();
            }
            return this.values;
        };
        Dictionary.prototype.getValues = function () {
            return this.getValuesList().getValues();
        };
        Dictionary.prototype.getItems = function () {
            var _this = this;
            return this.getKeys().map(function (value, index) {
                return new KeyValuePair(value, _this.get(value));
            });
        };
        Dictionary.prototype.clear = function () {
            this.values = new List();
            this.keys = new List();
            return this;
        };
        Dictionary.prototype.getLength = function () {
            return this.getKeysList().getLength();
        };
        Dictionary.prototype.containsKey = function (key) {
            return this.getKeys().indexOf(key) >= 0;
        };
        Dictionary.prototype.set = function (key, value) {
            if (!this.containsKey(key)) {
                this.getKeysList().addLast(key);
                this.getValuesList().addLast(value);
            }
            else {
                var index = this.getKeysList().indexOf(key);
                this.getValuesList().set(index, value);
            }
            return this;
        };
        Dictionary.prototype.get = function (key) {
            if (this.containsKey(key)) {
                var index = this.getKeysList().indexOf(key);
                return this.getValuesList().get(index);
            }
            return null;
        };
        Dictionary.prototype.remove = function (key) {
            if (this.containsKey(key)) {
                var index = this.getKeysList().indexOf(key);
                var value = this.getValuesList().get(index);
                this.getKeysList().remove(index);
                this.getValuesList().remove(index);
                return value;
            }
            return null;
        };
        return Dictionary;
    }());
    DataStructures.Dictionary = Dictionary;
    var AbstractFactory = (function () {
        function AbstractFactory() {
            this.data = new DataStructures.Dictionary();
        }
        AbstractFactory.prototype.getData = function () {
            if (this.data === null || this.data === undefined) {
                this.clear();
            }
            return this.data;
        };
        AbstractFactory.prototype.hasData = function () {
            return (this.getData().getLength() > 0);
        };
        AbstractFactory.prototype.getItems = function () {
            return this.getData().getValues();
        };
        AbstractFactory.prototype.clear = function () {
            this.data = new DataStructures.Dictionary();
            return this;
        };
        AbstractFactory.prototype.set = function (name, agent) {
            this.getData().set(name, agent);
            return this;
        };
        AbstractFactory.prototype.has = function (name) {
            return (this.getData().containsKey(name));
        };
        AbstractFactory.prototype.get = function (name) {
            return this.getData().get(name);
        };
        AbstractFactory.prototype.remove = function (name) {
            return this.getData().remove(name);
        };
        return AbstractFactory;
    }());
    DataStructures.AbstractFactory = AbstractFactory;
})(DataStructures || (DataStructures = {}));
"use strict";
var Simulation;
(function (Simulation) {
    "use strict";
    var Agent = (function (_super) {
        __extends(Agent, _super);
        function Agent(name, simulator, period) {
            var _this = _super.call(this, simulator.getTimePlan(name), period) || this;
            _this.simulator = null;
            _this.timePlans = null;
            _this.setSimulator(simulator)
                .setName(name);
            return _this;
        }
        Agent.prototype.getName = function () {
            return this.name;
        };
        Agent.prototype.setName = function (name) {
            this.name = name;
            return this;
        };
        Agent.prototype.getSimulator = function () {
            return this.simulator;
        };
        Agent.prototype.setSimulator = function (simulator) {
            this.simulator = simulator;
            return this;
        };
        return Agent;
    }(Simulation.TimeSimulator));
    Simulation.Agent = Agent;
    var AgentFactory = (function (_super) {
        __extends(AgentFactory, _super);
        function AgentFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AgentFactory;
    }(DataStructures.AbstractFactory));
    Simulation.AgentFactory = AgentFactory;
    var AgentSimulator = (function (_super) {
        __extends(AgentSimulator, _super);
        function AgentSimulator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.agents = new AgentFactory();
            _this.timePlanFactory = new Simulation.TimePlanFactory();
            return _this;
        }
        AgentSimulator.prototype.addAgent = function (agent) {
            this.agents.set(agent.getName(), agent);
            agent.setSimulator(this);
            return this;
        };
        AgentSimulator.prototype.getAgent = function (name) {
            return this.agents.get(name);
        };
        AgentSimulator.prototype.getTimePlan = function (name) {
            return this.timePlanFactory.get(name);
        };
        AgentSimulator.prototype.addEventToAgent = function (agentName, time, func) {
            if (func === void 0) { func = null; }
            this.agents.get(agentName).addEvent(time, func);
            return this;
        };
        AgentSimulator.prototype.addEvent = function (time, func) {
            if (func === void 0) { func = null; }
            if (this.agents.hasData()) {
                this.agents.getData().getValues()[0].addEvent(time, func);
            }
            return this;
        };
        AgentSimulator.prototype.setCurrentTime = function (currentTime) {
            _super.prototype.setCurrentTime.call(this, currentTime);
            this.agents.getItems().forEach(function (value, index) {
                if (!value.isPause()) {
                    value.setCurrentTime(currentTime);
                }
            });
            return this;
        };
        AgentSimulator.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this.agents.getItems().forEach(function (value, index) {
                value.pause();
            });
            return this;
        };
        AgentSimulator.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.agents.getItems().forEach(function (value, index) {
                value.resume();
            });
            return this;
        };
        AgentSimulator.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this.agents.getItems().forEach(function (value, index) {
                value.stop();
            });
            return this;
        };
        AgentSimulator.prototype.exexute = function () {
            return this.simulate();
        };
        AgentSimulator.prototype.simulate = function () {
            if (!this.isPause() || !this.isRunning()) {
                this.agents.getItems().forEach(function (value, index) {
                    if (!value.pause() || !value.isRunning()) {
                        value.simulate();
                    }
                });
            }
            return this;
        };
        return AgentSimulator;
    }(Simulation.AbstractSimulator));
    Simulation.AgentSimulator = AgentSimulator;
})(Simulation || (Simulation = {}));
"use strict";
var Simulation;
(function (Simulation) {
    "use strict";
    var EventSimulator = (function (_super) {
        __extends(EventSimulator, _super);
        function EventSimulator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EventSimulator.prototype.resume = function () {
            _super.prototype.resume.call(this);
            return this.simulate();
        };
        EventSimulator.prototype.simulate = function () {
            if (!this.isRunning() || this.isPause()) {
                if (this.isPause()) {
                    this.resume();
                }
                while (!this.isEmpty() && !this.isPause()) {
                    this.setCurrentTime(this.getNextTime());
                }
                if (!this.isPause()) {
                    this.stop();
                }
            }
            return this;
        };
        return EventSimulator;
    }(Simulation.Simulator));
    Simulation.EventSimulator = EventSimulator;
})(Simulation || (Simulation = {}));
"use strict";
var Simulation;
(function (Simulation) {
    "use strict";
    var TimePlanSingleton;
    (function (TimePlanSingleton) {
        var instance = null;
        function getInstance() {
            if (instance === null || instance === undefined) {
                instance = new TimePlanFactory();
            }
            return instance;
        }
        TimePlanSingleton.getInstance = getInstance;
    })(TimePlanSingleton = Simulation.TimePlanSingleton || (Simulation.TimePlanSingleton = {}));
    var TimePlanFactory = (function (_super) {
        __extends(TimePlanFactory, _super);
        function TimePlanFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TimePlanFactory;
    }(DataStructures.AbstractFactory));
    Simulation.TimePlanFactory = TimePlanFactory;
})(Simulation || (Simulation = {}));
//# sourceMappingURL=simulation.js.map