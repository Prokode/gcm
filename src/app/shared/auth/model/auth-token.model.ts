export class AuthToken {

    public reference: string;
    public createdAt: string;
    public value: string;
  
    constructor(reference: string = null, createdAt: string = null, value: string = null) {
      this.reference = reference;
      this.createdAt = createdAt;
      this.value = value;
    }


  }
  