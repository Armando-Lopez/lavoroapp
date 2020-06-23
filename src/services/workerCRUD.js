import Axios from "axios";
import Session from "./localStorageService";

export default class WorkerCRUD {
  static async create(newWorker) {
    try {
      const res = await Axios.post("http://localhost:3004/workers", newWorker);
      if (res.status === 201 || res.statusText === "Created") {
        Session.create(res.data.id);
      }
    } catch (error) {
      console.log(error);
    }
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
