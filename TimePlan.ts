/// <reference path="..\DataStructures\Tree.ts" />
/// <reference path="..\DataStructures\BinaryTree.ts" />
/// <reference path="..\DataStructures\PairingHeap.ts" />
module Simulation {
    "use strict";
    export class Event extends DataStructures.Tree.AbstractPairingHeapNode {
        time: number;

        constructor(time: number) {
            super();
            this.time = time;
        }

        priority(): number {
            return this.time;
        }

    }

    export class TimePlan extends DataStructures.Tree.PairingHeap {
        nextTime: number;
        root: Event;

        constructor() {
            super();
            this.nextTime = undefined;
        }

        isEmpty(): boolean {
            return this.root === undefined;
        }

        clear(): TimePlan {
            this.root = undefined;
            return this;
        }

        addEvent(node: Event): DataStructures.Tree.ITreeInterface {
            if (node !== undefined) {
                super.addNode(node);
                if (node.compare(this.root) === 0) {
                    this.nextTime = node.priority();
                }
            }
            return this;
        }

        removeMinPriorityEvent(): Event {
            var result:Event = <Event>super.removeMinPriority();
            if (this.root !== undefined) {
                this.nextTime = this.root.priority();
            } else {
                this.nextTime = undefined;
            }
            return result;
        }

        getMinpriorityEvent(): Event {
            return this.root;
        }
    }
}
