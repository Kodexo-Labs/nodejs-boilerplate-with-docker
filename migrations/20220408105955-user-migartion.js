module.exports = {
  async up(db) {
    return db.collection("users").updateMany({}, { $set: { role: "admin" } });
  },

  async down(db) {
    return db.collection("users").updateMany({}, { $unset: { role: "" } });
  },
};
