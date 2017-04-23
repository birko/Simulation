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

        public getPeriod(): number {
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

        public getSpeed(): number {
            return this.speed;
        }

        public setSpeed(speed: number): TimeSimulator {
            this.speed = speed;
            return this;
        }

        public setCurrentTime(time: number): TimeSimulator {
            super.setCurrentTime(time);
            clearTimeout(this.timeOut);
            this.timeOut = undefined;
            this.timeOutTime = undefined;
            this.simulate();
            return this;
        }

        public pause(): TimeSimulator {
            super.pause();
            clearTimeout(this.timeOut);
            var now: Date = new Date();
            this.pausePeriod = (now.valueOf() - this.timeOutTime.valueOf());
            this.timeOutTime = undefined;
            return this;
        }

        public resume(): TimeSimulator {
            super.resume();
            return this.simulate();
        }

        public simulate(): TimeSimulator {
            if (!this.pause() || !this.isRunning()) {
                this.timeOutTime = new Date();
                var toTime:number = this.getTikPeriod();
                this.timeOut = setTimeout(function(): void {
                    var time:number = this.getCurretTime() + this.getPeriod();
                    this.setCurrentTime(time);
                }.bind(this), toTime);
            }
            return this;
        }

        public execute(): TimeSimulator {
            return this.simulate();
        }
    }
}