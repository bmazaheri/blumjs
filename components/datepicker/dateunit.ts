export class DateUnit {
    year: number;
    month: number;
    day: number;
    hour: number = 0;
    minute: number = 0;
    seconds: number = 0;

    addMonth() {
        if (this.month == 11) {
            this.year++;
            this.month = 0;
        } else {
            this.month++;
        }
    }

    subMonth() {
        if (this.month == 0) {
            this.year--;
            this.month = 11;
        } else {
            this.month--;
        }
    }
}