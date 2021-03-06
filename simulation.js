"use strict";
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
            return this.getData().getLength() > 0;
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
var DataStructures;
(function (DataStructures) {
    var Tree;
    (function (Tree) {
        "use strict";
        var AbstractNode = (function () {
            function AbstractNode() {
                this.parent = null;
                this.descendants = null;
            }
            AbstractNode.prototype.getParent = function () {
                return this.parent;
            };
            AbstractNode.prototype.setParent = function (parent) {
                this.parent = parent;
                return this;
            };
            AbstractNode.prototype.compare = function (node) {
                if (node !== null) {
                    throw new Error("Comparasion must be implemented");
                }
                return 1;
            };
            AbstractNode.prototype.add = function (node) {
                if (node !== null) {
                    node.setParent(this);
                    var children = this.children();
                    var length = children.length;
                    var add = false;
                    for (var i; i < length; i++) {
                        if (children[i] !== null && node.compare(children[i]) < 0) {
                            this.getDescendants().add(i, node);
                            add = true;
                            break;
                        }
                    }
                    if (!add) {
                        this.getDescendants().addLast(node);
                    }
                }
                return this;
            };
            AbstractNode.prototype.children = function () {
                return this.getDescendants().getValues();
            };
            AbstractNode.prototype.getDescendants = function () {
                if (this.descendants === null || this.descendants === undefined) {
                    this.descendants = new DataStructures.List();
                }
                return this.descendants;
            };
            AbstractNode.prototype.setDescendants = function (children) {
                this.getDescendants().clear();
                this.getDescendants().addRange(children);
                return this;
            };
            AbstractNode.prototype.setDescendant = function (index, node) {
                this.getDescendants().set(index, node);
                return this;
            };
            AbstractNode.prototype.getDescendant = function (index) {
                return this.getDescendants().get(index);
            };
            AbstractNode.prototype.remove = function (node) {
                if (node !== null) {
                    var removeNode = this.search(node);
                    var child = null;
                    var children = removeNode.children();
                    var length = children.length;
                    for (var i; i < length; i++) {
                        if (children[i] !== null) {
                            child = children[i];
                            children.splice(i, 1);
                            break;
                        }
                    }
                    child.setParent(removeNode.getParent());
                    length = children.length;
                    for (var i; i < length; i++) {
                        if (children[i] !== null) {
                            child.add(children[i]);
                        }
                    }
                    return removeNode;
                }
            };
            AbstractNode.prototype.search = function (node) {
                if (node !== null) {
                    var test = this.compare(node);
                    if (test === 0) {
                        return this;
                    }
                    else {
                        var values = this.children();
                        for (var i = 0; i < values.length; i++) {
                            var value = values[1];
                            var testnode = value.search(node);
                            if (testnode != null) {
                                return testnode;
                            }
                        }
                        return null;
                    }
                }
                return null;
            };
            AbstractNode.prototype.hasChildren = function () {
                return this.getDescendants().hasValues();
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
            AbstractTree.prototype.setRoot = function (node, clearParent) {
                if (clearParent === void 0) { clearParent = true; }
                if (node !== null && clearParent) {
                    node.setParent(null);
                }
                this.root = node;
                return this;
            };
            AbstractTree.prototype.getParent = function () {
                if (this.getRoot() !== null) {
                    return this.getRoot().getParent();
                }
                return null;
            };
            AbstractTree.prototype.setParent = function (node) {
                if (this.getRoot() !== null) {
                    this.getRoot().setParent(node);
                }
                return this;
            };
            AbstractTree.prototype.add = function (node) {
                if (this.getRoot() === null) {
                    this.setRoot(node);
                }
                else {
                    this.getRoot().add(node);
                }
                return this;
            };
            AbstractTree.prototype.search = function (node) {
                if (this.getRoot() !== null) {
                    return this.getRoot().search(node);
                }
                return null;
            };
            AbstractTree.prototype.remove = function (node) {
                var removeNode = null;
                if (this.getRoot() !== null && node !== null) {
                    if (this.getRoot().compare(node) == 0) {
                        removeNode = this.getRoot();
                        var child = null;
                        var children = removeNode.children();
                        var length = children.length;
                        for (var i; i < length; i++) {
                            if (children[i] !== null) {
                                child = children[i];
                                children.splice(i, 1);
                                break;
                            }
                        }
                        this.setRoot(child);
                        if (this.getRoot() !== null) {
                            length = children.length;
                            for (var i; i < length; i++) {
                                if (children[i] !== null) {
                                    this.getRoot().add(children[i]);
                                }
                            }
                        }
                    }
                    else {
                        removeNode = this.getRoot().remove(node);
                    }
                }
                return removeNode;
            };
            AbstractTree.prototype.compare = function (node) {
                if (this.getRoot() !== null) {
                    return this.getRoot().compare(node);
                }
                return -1;
            };
            AbstractTree.prototype.children = function () {
                if (this.getRoot() !== null) {
                    return this.getRoot().children();
                }
                return null;
            };
            AbstractTree.prototype.hasChildren = function () {
                if (this.getRoot() !== null) {
                    return this.getRoot().hasChildren();
                }
                return false;
            };
            AbstractTree.prototype.inOrder = function (result) {
                if (result === null) {
                    result = new DataStructures.List();
                }
                if (this.getRoot() !== null) {
                    result = this.getRoot().inOrder(result);
                }
                return result;
            };
            AbstractTree.prototype.preOrder = function (result) {
                if (result === null) {
                    result = new DataStructures.List();
                }
                if (this.getRoot() !== null) {
                    result = this.getRoot().preOrder(result);
                }
                return result;
            };
            AbstractTree.prototype.postOrder = function (result) {
                if (result === null) {
                    result = new DataStructures.List();
                }
                if (this.getRoot() !== null) {
                    result = this.getRoot().postOrder(result);
                }
                return result;
            };
            AbstractTree.prototype.leverOrder = function (result) {
                if (result === null) {
                    result = new DataStructures.List();
                }
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
var DataStructures;
(function (DataStructures) {
    var Tree;
    (function (Tree) {
        "use strict";
        var AbstractBinaryNode = (function (_super) {
            __extends(AbstractBinaryNode, _super);
            function AbstractBinaryNode() {
                var _this = _super.call(this) || this;
                _this.setDescendants([null, null]);
                return _this;
            }
            AbstractBinaryNode.prototype.getParent = function () {
                return _super.prototype.getParent.call(this);
            };
            AbstractBinaryNode.prototype.setParent = function (parent) {
                return _super.prototype.setParent.call(this, parent);
            };
            AbstractBinaryNode.prototype.getLeft = function () {
                return this.getDescendant(0);
            };
            AbstractBinaryNode.prototype.setLeft = function (left) {
                return this.setDescendant(0, left);
            };
            AbstractBinaryNode.prototype.getRight = function () {
                return this.getDescendant(1);
            };
            AbstractBinaryNode.prototype.setRight = function (right) {
                return this.setDescendant(1, right);
            };
            AbstractBinaryNode.prototype.children = function () {
                return _super.prototype.children.call(this);
            };
            AbstractBinaryNode.prototype.compare = function (node) {
                return _super.prototype.compare.call(this, node);
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
            AbstractBinaryNode.prototype.remove = function (node) {
                return _super.prototype.remove.call(this, node);
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
            BinaryTree.prototype.getLeft = function () {
                if (this.getRoot() !== null) {
                    return this.getRoot().getLeft();
                }
                return null;
            };
            BinaryTree.prototype.setLeft = function (node) {
                if (this.getRoot() !== null) {
                    this.getRoot().setLeft(node);
                }
                return this;
            };
            BinaryTree.prototype.getRight = function () {
                if (this.getRoot() !== null) {
                    return this.getRoot().getRight();
                }
                return null;
            };
            BinaryTree.prototype.setRight = function (node) {
                if (this.getRoot() !== null) {
                    this.getRoot().setRight(node);
                }
                return this;
            };
            BinaryTree.prototype.getParent = function () {
                return _super.prototype.getParent.call(this);
            };
            BinaryTree.prototype.setParent = function (node) {
                return _super.prototype.setParent.call(this, node);
            };
            BinaryTree.prototype.getRoot = function () {
                return _super.prototype.getRoot.call(this);
            };
            BinaryTree.prototype.setRoot = function (root, clearParent) {
                if (clearParent === void 0) { clearParent = true; }
                return _super.prototype.setRoot.call(this, root, clearParent);
            };
            BinaryTree.prototype.add = function (node) {
                return _super.prototype.add.call(this, node);
            };
            BinaryTree.prototype.remove = function (node) {
                return _super.prototype.remove.call(this, node);
            };
            BinaryTree.prototype.search = function (node) {
                return _super.prototype.search.call(this, node);
            };
            BinaryTree.prototype.children = function () {
                return _super.prototype.children.call(this);
            };
            BinaryTree.prototype.inOrder = function (result) {
                return _super.prototype.inOrder.call(this, result);
            };
            BinaryTree.prototype.preOrder = function (result) {
                return _super.prototype.preOrder.call(this, result);
            };
            BinaryTree.prototype.postOrder = function (result) {
                return _super.prototype.postOrder.call(this, result);
            };
            BinaryTree.prototype.leverOrder = function (result) {
                return _super.prototype.leverOrder.call(this, result);
            };
            return BinaryTree;
        }(Tree.AbstractTree));
        Tree.BinaryTree = BinaryTree;
    })(Tree = DataStructures.Tree || (DataStructures.Tree = {}));
})(DataStructures || (DataStructures = {}));
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
            AbstractPairingHeapNode.prototype.remove = function (node) {
                return _super.prototype.remove.call(this, node);
            };
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
            return AbstractPairingHeapNode;
        }(Tree.AbstractBinaryNode));
        Tree.AbstractPairingHeapNode = AbstractPairingHeapNode;
        var PairingHeap = (function (_super) {
            __extends(PairingHeap, _super);
            function PairingHeap() {
                return _super.call(this) || this;
            }
            PairingHeap.prototype.getMinPiorityNode = function () {
                return this.getRoot();
            };
            PairingHeap.prototype.removeMinPriorityNode = function () {
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
            PairingHeap.prototype.priority = function () {
                if (this.getRoot() !== null) {
                    return this.getRoot().priority();
                }
                return Infinity;
            };
            PairingHeap.prototype.getLeft = function () {
                return _super.prototype.getLeft.call(this);
            };
            PairingHeap.prototype.setLeft = function (node) {
                return _super.prototype.setLeft.call(this, node);
            };
            PairingHeap.prototype.getRight = function () {
                return _super.prototype.getRight.call(this);
            };
            PairingHeap.prototype.setRight = function (node) {
                return _super.prototype.setRight.call(this, node);
            };
            PairingHeap.prototype.getParent = function () {
                return _super.prototype.getParent.call(this);
            };
            PairingHeap.prototype.setParent = function (node) {
                return _super.prototype.setParent.call(this, node);
            };
            PairingHeap.prototype.getRoot = function () {
                return _super.prototype.getRoot.call(this);
            };
            PairingHeap.prototype.setRoot = function (root, clearParent) {
                if (clearParent === void 0) { clearParent = true; }
                return _super.prototype.setRoot.call(this, root, clearParent);
            };
            PairingHeap.prototype.add = function (node) {
                return _super.prototype.add.call(this, node);
            };
            PairingHeap.prototype.search = function (node) {
                return _super.prototype.search.call(this, node);
            };
            PairingHeap.prototype.remove = function (node) {
                return _super.prototype.remove.call(this, node);
            };
            PairingHeap.prototype.children = function () {
                return _super.prototype.children.call(this);
            };
            PairingHeap.prototype.inOrder = function (result) {
                return _super.prototype.inOrder.call(this, result);
            };
            PairingHeap.prototype.preOrder = function (result) {
                return _super.prototype.preOrder.call(this, result);
            };
            PairingHeap.prototype.postOrder = function (result) {
                return _super.prototype.postOrder.call(this, result);
            };
            PairingHeap.prototype.leverOrder = function (result) {
                return _super.prototype.leverOrder.call(this, result);
            };
            return PairingHeap;
        }(Tree.BinaryTree));
        Tree.PairingHeap = PairingHeap;
    })(Tree = DataStructures.Tree || (DataStructures.Tree = {}));
})(DataStructures || (DataStructures = {}));
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
                _super.prototype.add.call(this, node);
                if (node.compare(this.getRoot()) === 0) {
                    this.setNextTime(node.priority());
                }
            }
            return this;
        };
        TimePlan.prototype.removeMinPriorityEvent = function () {
            var result = _super.prototype.removeMinPriorityNode.call(this);
            if (!this.isEmpty()) {
                this.setNextTime(this.getRoot().priority());
            }
            else {
                this.setNextTime(undefined);
            }
            return result;
        };
        TimePlan.prototype.getMinpriorityEvent = function () {
            return this.getMinPiorityNode();
        };
        return TimePlan;
    }(DataStructures.Tree.PairingHeap));
    Simulation.TimePlan = TimePlan;
})(Simulation || (Simulation = {}));
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
        AgentSimulator.prototype.execute = function () {
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