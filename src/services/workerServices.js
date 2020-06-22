import Axios from "axios";

export default class Worker {
  static create(worker) {
    console.log(worker);

    Axios.post("http://localhost:3004/workers", worker).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  static async get(workerId) {}

  static async getAll() {
    try {
      const response = await Axios.get("http://localhost:3004/workers");
      return Promise.resolve(response.data);
    } catch (error) {
      console.log("FETCH ERROR " + error);
      return Promise.reject(error);
    }
  }
}
