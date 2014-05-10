/// <reference path="TimePlan.ts" />
module Simulation {
    "use strict";
    export class Simulator {
        private timePlan: TimePlan = null;
        private currentTime: number = undefined;
        private paused: boolean = false;

        constructor(timePlan: TimePlan) {
            this.timePlan = null;
            this.currentTime = undefined;
            this.paused = false;
        }

        isPause(): boolean {
            return this.paused;
        }

        pause():void {
            this.paused = true;
        }

        resume():void {
            this.paused = false;
        }

        getNextTime():number {
            if (this.timePlan !== undefined) {
                return this.timePlan.nextTime;
            }
            return 0;
        }

        isRunning(): boolean {
            return this.getCurretTime() !== undefined;
        }

        isEmpty(): boolean {
            if (this.timePlan !== undefined) {
                return this.timePlan.isEmpty();
            }
            return true;
        }

        stop():void {
            this.timePlan.clear();
            this.currentTime = undefined;
        }

        setCurrentTime(currentTime: number):void {
            if (!this.isPause()) {
                this.currentTime = currentTime;
                if (this.getCurretTime() !== undefined) {
                    this.execute();
                }
            }
        }

        getCurretTime(): number {
            return this.currentTime;
        }

        execute(): void {
            var events: Array<Event> = new Array();
            var time:number = this.getNextTime();
            while (this.getNextTime() <= this.getCurretTime()) {
                var event: Event = <Event>this.timePlan.removeMinPriorityEvent();
                events.push(event);
            }
            // webworker?
            events.forEach(function (value: Event, index: number): void {
                throw new Error("Implementation missing");
            });
        }

        addEvent(time: number): void {
            if (this.timePlan !== undefined) {
                time += this.getCurretTime();
                var event: Event = new Event(time);
                this.timePlan.addEvent(event);
            }
        }
    }
}