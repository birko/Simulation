declare module DataStructures {
    interface IComparable {
        compare(item: IComparable): number;
    }
    interface IAssocArray<TValue> {
        [index: string]: TValue;
    }
    class KeyValuePair<TKey, TValue> {
        private key;
        private value;
        constructor(key: TKey, value: TValue);
        getKey(): TKey;
        setKey(key: TKey): KeyValuePair<TKey, TValue>;
        getValue(): TValue;
        setValue(value: TValue): KeyValuePair<TKey, TValue>;
    }
    class List<TValue> {
        private values;
        getValues(): TValue[];
        setValues(values: TValue[]): List<TValue>;
        clear(): List<TValue>;
        getLength(): number;
        hasValues(): boolean;
        indexOf(value: TValue): number;
        add(index: number, value: TValue): List<TValue>;
        addLast(value: TValue): List<TValue>;
        addFirst(value: TValue): List<TValue>;
        unshift(value: TValue): List<TValue>;
        push(value: TValue): List<TValue>;
        addRange(values: TValue[]): List<TValue>;
        get(index: number): TValue;
        set(index: number, value: TValue): List<TValue>;
        remove(index: number): List<TValue>;
        removeFirst(): List<TValue>;
        removeLast(): List<TValue>;
        shift(): List<TValue>;
        pop(): List<TValue>;
    }
    class Dictionary<TKey, TValue> {
        private values;
        private keys;
        getKeysList(): List<TKey>;
        getKeys(): TKey[];
        getValuesList(): List<TValue>;
        getValues(): TValue[];
        getItems(): KeyValuePair<TKey, TValue>[];
        clear(): Dictionary<TKey, TValue>;
        getLength(): number;
        containsKey(key: TKey): boolean;
        set(key: TKey, value: TValue): Dictionary<TKey, TValue>;
        get(key: TKey): TValue;
        remove(key: TKey): TValue;
    }
    class AbstractFactory<TValue> {
        private data;
        getData(): DataStructures.Dictionary<string, TValue>;
        hasData(): boolean;
        getItems(): TValue[];
        clear(): AbstractFactory<TValue>;
        set(name: string, agent: TValue): AbstractFactory<TValue>;
        has(name: string): boolean;
        get(name: string): TValue;
        remove(name: string): TValue;
    }
}
declare module DataStructures.Tree {
    interface INodeInterface extends IComparable {
        getParent(): INodeInterface;
        setParent(parent: INodeInterface): INodeInterface;
        add(node: INodeInterface): INodeInterface;
        remove(node: INodeInterface): INodeInterface;
        search(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): INodeInterface[];
        hasChildren(): boolean;
        inOrder(items: List<INodeInterface>): List<INodeInterface>;
        preOrder(items: List<INodeInterface>): List<INodeInterface>;
        postOrder(items: List<INodeInterface>): List<INodeInterface>;
        leverOrder(items: List<INodeInterface>): List<INodeInterface>;
    }
    abstract class AbstractNode implements INodeInterface {
        private parent;
        private descendants;
        constructor();
        getParent(): INodeInterface;
        setParent(parent: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        add(node: INodeInterface): INodeInterface;
        children(): INodeInterface[];
        getDescendants(): List<INodeInterface>;
        setDescendants(children: INodeInterface[]): INodeInterface;
        setDescendant(index: number, node: INodeInterface): INodeInterface;
        getDescendant(index: number): INodeInterface;
        remove(node: INodeInterface): INodeInterface;
        search(node: INodeInterface): INodeInterface;
        hasChildren(): boolean;
        inOrder(items: List<INodeInterface>): List<INodeInterface>;
        preOrder(items: List<INodeInterface>): List<INodeInterface>;
        postOrder(items: List<INodeInterface>): List<INodeInterface>;
        leverOrder(items: List<INodeInterface>): List<INodeInterface>;
    }
    interface ITreeInterface extends INodeInterface {
        getRoot(): INodeInterface;
        setRoot(node: INodeInterface, clearParent: boolean): ITreeInterface;
        getParent(): INodeInterface;
        setParent(parent: INodeInterface): INodeInterface;
        add(node: INodeInterface): ITreeInterface;
        remove(node: INodeInterface): INodeInterface;
        search(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): INodeInterface[];
        hasChildren(): boolean;
        inOrder(items: List<INodeInterface>): List<INodeInterface>;
        preOrder(items: List<INodeInterface>): List<INodeInterface>;
        postOrder(items: List<INodeInterface>): List<INodeInterface>;
        leverOrder(items: List<INodeInterface>): List<INodeInterface>;
    }
    abstract class AbstractTree implements ITreeInterface {
        private root;
        constructor();
        getRoot(): INodeInterface;
        setRoot(node: INodeInterface, clearParent?: boolean): AbstractTree;
        getParent(): INodeInterface;
        setParent(node: INodeInterface): AbstractTree;
        add(node: INodeInterface): AbstractTree;
        search(node: INodeInterface): INodeInterface;
        remove(node: INodeInterface): INodeInterface;
        compare(node: INodeInterface): number;
        children(): INodeInterface[];
        hasChildren(): boolean;
        inOrder(result: List<INodeInterface>): List<INodeInterface>;
        preOrder(result: List<INodeInterface>): List<INodeInterface>;
        postOrder(result: List<INodeInterface>): List<INodeInterface>;
        leverOrder(result: List<INodeInterface>): List<INodeInterface>;
    }
}
declare module DataStructures.Tree {
    interface IBinaryNodeInterface extends INodeInterface {
        getLeft(): IBinaryNodeInterface;
        setLeft(left: IBinaryNodeInterface): IBinaryNodeInterface;
        getRight(): IBinaryNodeInterface;
        setRight(right: IBinaryNodeInterface): IBinaryNodeInterface;
        getParent(): IBinaryNodeInterface;
        setParent(parent: IBinaryNodeInterface): IBinaryNodeInterface;
        add(node: IBinaryNodeInterface): IBinaryNodeInterface;
        remove(node: IBinaryNodeInterface): IBinaryNodeInterface;
        search(node: IBinaryNodeInterface): IBinaryNodeInterface;
        compare(node: IBinaryNodeInterface): number;
        children(): IBinaryNodeInterface[];
        hasChildren(): boolean;
        inOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        preOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        postOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        leverOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
    }
    abstract class AbstractBinaryNode extends AbstractNode implements IBinaryNodeInterface {
        constructor();
        getParent(): IBinaryNodeInterface;
        setParent(parent: IBinaryNodeInterface): IBinaryNodeInterface;
        getLeft(): IBinaryNodeInterface;
        setLeft(left: IBinaryNodeInterface): IBinaryNodeInterface;
        getRight(): IBinaryNodeInterface;
        setRight(right: IBinaryNodeInterface): IBinaryNodeInterface;
        children(): IBinaryNodeInterface[];
        compare(node: IBinaryNodeInterface): number;
        add(node: IBinaryNodeInterface): IBinaryNodeInterface;
        search(node: IBinaryNodeInterface): IBinaryNodeInterface;
        remove(node: IBinaryNodeInterface): IBinaryNodeInterface;
        inOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        preOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        postOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        leverOrder(items: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
    }
    class BinaryTree extends AbstractTree implements ITreeInterface, IBinaryNodeInterface {
        constructor();
        getLeft(): IBinaryNodeInterface;
        setLeft(node: IBinaryNodeInterface): BinaryTree;
        getRight(): IBinaryNodeInterface;
        setRight(node: IBinaryNodeInterface): BinaryTree;
        getParent(): IBinaryNodeInterface;
        setParent(node: IBinaryNodeInterface): BinaryTree;
        getRoot(): IBinaryNodeInterface;
        setRoot(root: IBinaryNodeInterface, clearParent?: boolean): BinaryTree;
        add(node: IBinaryNodeInterface): BinaryTree;
        remove(node: IBinaryNodeInterface): IBinaryNodeInterface;
        search(node: IBinaryNodeInterface): IBinaryNodeInterface;
        children(): IBinaryNodeInterface[];
        inOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        preOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        postOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
        leverOrder(result: List<IBinaryNodeInterface>): List<IBinaryNodeInterface>;
    }
}
declare module DataStructures.Tree {
    interface IHeapNodeInterface extends INodeInterface {
        priority(): number;
    }
    interface IPairingHeapNodeInterface extends IBinaryNodeInterface, IHeapNodeInterface {
        priority(): number;
        getParent(): IPairingHeapNodeInterface;
        setParent(parent: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        add(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        remove(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        search(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        compare(node: IPairingHeapNodeInterface): number;
        children(): Array<IPairingHeapNodeInterface>;
        hasChildren(): boolean;
        inOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        preOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        postOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        leverOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        getLeft(): IPairingHeapNodeInterface;
        setLeft(left: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        getRight(): IPairingHeapNodeInterface;
        setRight(right: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
    }
    abstract class AbstractPairingHeapNode extends AbstractBinaryNode implements IPairingHeapNodeInterface {
        abstract priority(): number;
        compare(node: IPairingHeapNodeInterface): number;
        add(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        remove(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        getParent(): IPairingHeapNodeInterface;
        setParent(parent: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        getLeft(): IPairingHeapNodeInterface;
        setLeft(left: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        getRight(): IPairingHeapNodeInterface;
        setRight(right: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        children(): IPairingHeapNodeInterface[];
        search(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        inOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        preOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        postOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        leverOrder(items: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
    }
    class PairingHeap extends BinaryTree implements ITreeInterface, IPairingHeapNodeInterface {
        constructor();
        getMinPiorityNode(): IPairingHeapNodeInterface;
        removeMinPriorityNode(): IPairingHeapNodeInterface;
        priority(): number;
        getLeft(): IPairingHeapNodeInterface;
        setLeft(node: IPairingHeapNodeInterface): PairingHeap;
        getRight(): IPairingHeapNodeInterface;
        setRight(node: IPairingHeapNodeInterface): PairingHeap;
        getParent(): IPairingHeapNodeInterface;
        setParent(node: IPairingHeapNodeInterface): PairingHeap;
        getRoot(): IPairingHeapNodeInterface;
        setRoot(root: IPairingHeapNodeInterface, clearParent?: boolean): PairingHeap;
        add(node: IPairingHeapNodeInterface): PairingHeap;
        search(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        remove(node: IPairingHeapNodeInterface): IPairingHeapNodeInterface;
        children(): IPairingHeapNodeInterface[];
        inOrder(result: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        preOrder(result: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        postOrder(result: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
        leverOrder(result: List<IPairingHeapNodeInterface>): List<IPairingHeapNodeInterface>;
    }
}
declare module Simulation {
    interface EventFunction {
        (): void;
    }
    class Event extends DataStructures.Tree.AbstractPairingHeapNode {
        private time;
        private func;
        constructor(time: number, func?: EventFunction);
        priority(): number;
        execute(): Event;
    }
    class TimePlan extends DataStructures.Tree.PairingHeap {
        private nextTime;
        constructor();
        getNextTime(): number;
        setNextTime(time: number): TimePlan;
        getRoot(): Event;
        setRoot(root: Event): TimePlan;
        isEmpty(): boolean;
        clear(): TimePlan;
        addEvent(node: Event): TimePlan;
        removeMinPriorityEvent(): Event;
        getMinpriorityEvent(): Event;
    }
}
declare module Simulation {
    abstract class AbstractSimulator {
        private currentTime;
        private paused;
        constructor();
        setCurrentTime(currentTime: number): AbstractSimulator;
        isRunning(): boolean;
        getCurretTime(): number;
        isPause(): boolean;
        stop(): AbstractSimulator;
        pause(): AbstractSimulator;
        resume(): AbstractSimulator;
        abstract execute(): AbstractSimulator;
        abstract addEvent(time: number, func: EventFunction): AbstractSimulator;
    }
    class Simulator extends AbstractSimulator {
        private timePlan;
        constructor(timePlan: TimePlan);
        getNextTime(): number;
        isEmpty(): boolean;
        stop(): Simulator;
        execute(): Simulator;
        addEvent(time: number, func?: EventFunction): Simulator;
    }
}
declare module Simulation {
    class TimeSimulator extends Simulator {
        private period;
        private pausePeriod;
        private timeOut;
        private timeOutTime;
        private speed;
        constructor(timePlan: TimePlan, period: number);
        getPeriod(): number;
        private getTikPeriod();
        getSpeed(): number;
        setSpeed(speed: number): TimeSimulator;
        setCurrentTime(time: number): TimeSimulator;
        pause(): TimeSimulator;
        resume(): TimeSimulator;
        simulate(): TimeSimulator;
        execute(): TimeSimulator;
    }
}
declare module Simulation {
    class Agent extends TimeSimulator {
        private name;
        private simulator;
        private timePlans;
        constructor(name: string, simulator: AgentSimulator, period: number);
        getName(): string;
        setName(name: string): Agent;
        getSimulator(): AgentSimulator;
        setSimulator(simulator: AgentSimulator): Agent;
    }
    class AgentFactory extends DataStructures.AbstractFactory<Agent> {
    }
    class AgentSimulator extends AbstractSimulator {
        private agents;
        private timePlanFactory;
        addAgent(agent: Agent): AgentSimulator;
        getAgent(name: string): Agent;
        getTimePlan(name: string): TimePlan;
        addEventToAgent(agentName: string, time: number, func?: EventFunction): AgentSimulator;
        addEvent(time: number, func?: EventFunction): AgentSimulator;
        setCurrentTime(currentTime: number): AgentSimulator;
        pause(): AgentSimulator;
        resume(): AgentSimulator;
        stop(): AgentSimulator;
        execute(): AgentSimulator;
        simulate(): AgentSimulator;
    }
}
declare module Simulation {
    class EventSimulator extends Simulator {
        resume(): EventSimulator;
        simulate(): EventSimulator;
    }
}
declare module Simulation {
    module TimePlanSingleton {
        function getInstance(): TimePlanFactory;
    }
    class TimePlanFactory extends DataStructures.AbstractFactory<TimePlan> {
    }
}
