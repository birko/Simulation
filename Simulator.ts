/// <reference path="TimePlan.ts" />
module Simulation {
    export class Simulator {
        private timePlan :TimePlan= null;
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

        pause() {
            this.paused = true;
        }

        resume() {
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

        stop() {
            this.timePlan.clear();
            this.currentTime = undefined;
        }

        setCurrentTime(currentTime: number) {
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

        execute() {
            var events = new Array();
            var time = this.getNextTime();
            while (this.getNextTime() <= this.getCurretTime()) {
                var event = this.timePlan.removeMinPriorityEvent();
                events.push(event);
            }
            //webworker?
            for (var i = 0; i < events.length; i++) {
                //runevent
                throw new Error('Implementation missing');
            }
        }

        addEvent(time: number) {
            if (this.timePlan !== undefined) {
                time += this.getCurretTime();
                var event = new Event(time);
                this.timePlan.addEvent(event);
            }
        }
    }
}