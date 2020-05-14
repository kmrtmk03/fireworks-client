export default class Database {

    static Setter(_string) {
        this.sample = _string
        console.log(this.sample)
        
        this.sample = "Hello World"
    }

    static Getter() {
        return this.sample
    }

  }