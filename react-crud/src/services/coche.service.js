import http from "../http-common";

class CocheDataService {
  getAll() {
    return http.get("/coches");
  }

  get(id) {
    return http.get(`/coches/${id}`);
  }

  create(data) {
    return http.post("/coches", data);
  }

  update(id, data) {
    return http.put(`/coches/${id}`, data);
  }

  delete(id) {
    return http.delete(`/coches/${id}`);
  }

  deleteAll() {
    return http.delete(`/coches`);
  }

  findByMake(title) {
    return http.get(`/coches?Make=${Make}`);
  }
}

export default new CocheDataService();
