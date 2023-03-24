const pool = require("./db.js");

let profile = {};

profile.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM profile ", (error, profiles) => {
      if (error) {
        return reject(error);
      }
      return resolve(profiles);
    });
  });
};

profile.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM profile WHERE user_id= ?",
      [id],
      (error, profile) => {
        if (error) {
          return reject(error);
        }
        return resolve(profile);
      }
    );
  });
};

profile.insertProfile = (username, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO profile (user_id, username, email, password) VALUES (NULL, ?, ?, ?)",
      [username, email, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

profile.updateProfile = (username, email, password, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE profile SET username = ?, email = ?, password = ? WHERE user_id = ?",
      [username, email, password, userId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

profile.deleteProfile = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM profile WHERE user_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = profile;
