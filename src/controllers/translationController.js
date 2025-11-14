const pool = require("../config/db");

const getTranslations = async (req, res) => {
  const { page, lang } = req.query;

  if (!page || !lang) {
    return res.status(400).json({ success: false, message: "Page and lang parameters are required" });
  }

  try {
    const result = await pool.query(
      "SELECT key, value FROM translations WHERE page = $1 AND lang = $2",
      [page, lang]
    );

    const data = result.rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    res.json({ success: true, data });
  } catch (err) {
    console.error("Get Translations Error:", err.message);
    res.status(500).json({ success: false, message: "Server error fetching translations" });
  }
};

module.exports = { getTranslations };

