export default class Session {
  static create = (id) => {
    window.localStorage.setItem("camellapuesuser", id);
    if (window.localStorage.getItem("camellapuesuser")) {
      window.location.href = "/";
    }
  };

  static get = () => {
    if (!window.localStorage.getItem("camellapuesuser")) {
      window.location.href = "/login";
    } else {
      window.location.href = "/";
    }
  };

  static destroy = () => {
    return window.localStorage.removeItem("camellapuesuser");
  };
}
