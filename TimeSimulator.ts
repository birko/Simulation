module Simulation {
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
            var tikPeriod = this.getPeriod();
            if (this.pausePeriod != undefined) {
                tikPeriod = this.pausePeriod;
                this.pausePeriod = undefined;

            } 
            return tikPeriod / this.getSpeed();
        }

        getSpeed(): number {
            return this.speed;
        }

        setSpeed(speed: number) {
            this.speed = speed;
        }

        setCurrentTime(time: number) {
            super.setCurrentTime(time);
            clearTimeout(this.timeOut);
            this.timeOut = undefined;
            this.timeOutTime = undefined;
            this.simulate();
        }

        pause() {
            super.pause();
            clearTimeout(this.timeOut);
            var now = new Date();
            this.pausePeriod = (now.valueOf() - this.timeOutTime.valueOf());
            this.timeOutTime = undefined;
        }

        resume() {
            super.resume();
            this.simulate();
        }

        simulate() {
            if (!this.pause()) {
                this.timeOutTime = new Date();
                var toTime = this.getTikPeriod();
                this.timeOut = setTimeout(() => {
                    var time = this.getCurretTime() + this.getPeriod();
                    this.setCurrentTime(time);
                }, toTime);
            }
        }
    }
}