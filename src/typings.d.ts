declare namespace LiveEdit {
  export interface IProduct {
    brand: string;
    model: string;
    index: number;
  }

  export interface IStoredData {
    value: string;
    type?: string;
    id?: string;
    status?: boolean;
  }

  export interface IFieldEmitter {
    status: boolean;
    value: string;
  }
}
