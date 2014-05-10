module Simulation {
    "use strict";
    export class EventSimulator extends Simulator {
        resume():void {
            super.resume();
            this.simulate();
        }

        simulate(): void {
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
        }
    }
}