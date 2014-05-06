module Simulation {
    export class EventSimulator extends Simulator {
        resume() {
            super.resume();
            this.simulate();
        }

        simulate() {
            if (!this.isRunning() || this.isPause()) {
                if (this.isPause()) {
                    this.resume()
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