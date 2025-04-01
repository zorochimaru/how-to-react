// interface IRuntimeForm {
//   [key: string]: unknown;
// }

// export class RuntimeForm<T extends IRuntimeForm> {
//   constructor(private _form: T) {}
//   public formData(): FormData {
//     const form = new FormData();

//     for (const key in this._form) {
//       if (this._form[key] !== undefined) {
//         form.append(key, this._form[key]);
//       }
//     }

//     return form;
//   }
// }
