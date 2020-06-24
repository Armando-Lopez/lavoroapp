export default class Session {
  static create = (id) => {
    window.localStorage.setItem("camellapuesuser", id);
    if (window.localStorage.getItem("camellapuesuser")) {
      window.location.href = "/";
    }
  };

  static getCurrent = () => window.localStorage.getItem("camellapuesuser");

  static destroy = () => {
    return window.localStorage.removeItem("camellapuesuser");
  };
}
