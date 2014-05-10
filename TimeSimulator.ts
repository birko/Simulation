module Simulation {
    "use strict";
    export class TimeSimulator extends Simulator {
        private period: number = undefined;
        private pausePeriod:number = undefined;
        private timeOut: number = undefined;
        private timeOutTime:Date = undefined;
        private speed: number = 1;
       

        constructor(timePlan: TimePlan, period: number) {
            super(timePlan);
            this.period = period;
            this.timeOut = undefined;
            this.speed = 1;
        }

        getPeriod(): number {
            return this.period;
        }

        private getTikPeriod(): number {
            var tikPeriod: number = this.getPeriod();
            if (this.pausePeriod !== undefined) {
                tikPeriod = this.pausePeriod;
                this.pausePeriod = undefined;

            }
            return tikPeriod / this.getSpeed();
        }

        getSpeed(): number {
            return this.speed;
        }

        setSpeed(speed: number): void {
            this.speed = speed;
        }

        setCurrentTime(time: number): void {
            super.setCurrentTime(time);
            clearTimeout(this.timeOut);
            this.timeOut = undefined;
            this.timeOutTime = undefined;
            this.simulate();
        }

        pause(): void {
            super.pause();
            clearTimeout(this.timeOut);
            var now: Date = new Date();
            this.pausePeriod = (now.valueOf() - this.timeOutTime.valueOf());
            this.timeOutTime = undefined;
        }

        resume(): void {
            super.resume();
            this.simulate();
        }

        simulate(): void {
            if (!this.pause()) {
                this.timeOutTime = new Date();
                var toTime:number = this.getTikPeriod();
                this.timeOut = setTimeout(function(): void {
                    var time:number = this.getCurretTime() + this.getPeriod();
                    this.setCurrentTime(time);
                }.bind(this), toTime);
            }
        }
    }
}