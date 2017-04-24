/// <reference path="..\DataStructures\Tree.ts" />
/// <reference path="..\DataStructures\BinaryTree.ts" />
/// <reference path="..\DataStructures\PairingHeap.ts" />
module Simulation {
    "use strict";
    export interface EventFunction {
        (): void;
    }

    export class Event extends DataStructures.Tree.AbstractPairingHeapNode {
        private time: number;
        private func: EventFunction = null;

        constructor(time: number, func: EventFunction = null) {
            super();
            this.time = time;
            this.func = func;
        }

        public priority(): number {
            return this.time;
        }

        /// TODO: Async await, promise
        /*async*/ public execute(): Event {
            if (this.func !== undefined && this.func !== null)
            {
                /*await*/ this.func();
            }
            return this;
        }
    }

    export class TimePlan extends DataStructures.Tree.PairingHeap {
        private nextTime: number;

        constructor() {
            super();
            this.setNextTime(undefined);
        }

        public getNextTime(): number {
            return this.nextTime;
        }

        public setNextTime(time: number): TimePlan {
            this.nextTime = time;
            return this;
        }

        public getRoot(): Event{
            return <Event>super.getRoot();
        }

        public setRoot(root: Event): TimePlan {
            super.setRoot(root);
            return this;
        }

        public isEmpty(): boolean {
            return this.getRoot() === null;
        }

        public clear(): TimePlan {
            this.setRoot(null);
            return this;
        }

        public addEvent(node: Event): TimePlan {
            if (node !== undefined) {
                super.add(node);
                if (node.compare(this.getRoot()) === 0) {
                    this.setNextTime(node.priority());
                }
            }
            return this;
        }

        public removeMinPriorityEvent(): Event {
            var result: Event = <Event>super.removeMinPriorityNode();
            if (!this.isEmpty()) {
                this.setNextTime(this.getRoot().priority());
            } else {
                this.setNextTime(undefined);
            }
            return result;
        }

        public getMinpriorityEvent(): Event {
            return <Event>this.getMinPiorityNode();
        }
    }
}
