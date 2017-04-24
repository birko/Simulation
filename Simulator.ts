/// <reference path="TimePlan.ts" />
module Simulation {
    "use strict";
    export abstract class AbstractSimulator {
        private currentTime: number = undefined;
        private paused: boolean = false;

        constructor() {
            this.currentTime = undefined;
            this.paused = false;
        }

        public setCurrentTime(currentTime: number): AbstractSimulator{
            if (!this.isPause()) {
                this.currentTime = currentTime;
                if (this.getCurretTime() !== undefined) {
                    this.execute();
                }
            }
            return this;
        }

        public isRunning(): boolean {
            return this.getCurretTime() !== undefined;
        }

        public getCurretTime(): number {
            return this.currentTime;
        }

        public isPause(): boolean {
            return this.paused;
        }

        public stop(): AbstractSimulator {
            this.setCurrentTime(undefined);
            return this;
        }

        public pause(): AbstractSimulator {
            this.paused = true;
            return this;
        }

        public resume(): AbstractSimulator{
            this.paused = false;
            return this;
        }

        public abstract execute(): AbstractSimulator;

        public abstract addEvent(time: number, func: EventFunction): AbstractSimulator;
    }

    export class Simulator extends AbstractSimulator {
        private timePlan: TimePlan = null;
       

        constructor(timePlan: TimePlan) {
            super();
            this.timePlan = null;
        }

        public getNextTime(): number {
            if (this.timePlan !== undefined) {
                return this.timePlan.getNextTime();
            }
            return 0;
        }

        public isEmpty(): boolean {
            if (this.timePlan !== undefined) {
                return this.timePlan.isEmpty();
            }
            return true;
        }

        public stop(): Simulator {
            this.timePlan.clear();
            super.stop();
            return this;
        }

        public execute(): Simulator {
            var events: Event[] = [];
            var time:number = this.getNextTime();
            while (this.getNextTime() <= this.getCurretTime()) {
                var event: Event = <Event>this.timePlan.removeMinPriorityEvent();
                if (event !== undefined && event !== null) {
                    events.push(event);
                }
            }
            events.forEach(function (value: Event, index: number): void {
                event.execute();
            });

            return this;
        }

        public addEvent(time: number, func: EventFunction = null): Simulator {
            if (this.timePlan !== undefined) {
                time += this.getCurretTime();
                var event: Event = new Event(time, func);
                this.timePlan.addEvent(event);
            }
            return this;
        }
    }
}