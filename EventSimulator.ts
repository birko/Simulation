/// <reference path="Simulator.ts" />
module Simulation {
    "use strict";
    export class EventSimulator extends Simulator {
        public resume(): EventSimulator {
            super.resume();
            return this.simulate();
        }

        public simulate(): EventSimulator {
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
            return this;
        }
    }
}