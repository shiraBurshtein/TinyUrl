import Link from "../Models/LinkModel.js";

const LinksController = {
  getList: async (req, res) => {
    try {

      const Links = await Link.find();
      res.json({ Links});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const Link = await Link.findById(req.params.id);//שליפה לפי מזהה
      res.json(Link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },



  add: async (req, res) => {
    const { originalUrl } = req.body;
    try {
      const newLink = await Link.create({ originalUrl });//הוספת חדש
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { originalUrl } = req.body;

    try {
      const updatedLink = await Link.findByIdAndUpdate(id, { originalUrl } 
        , {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Link.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },



  redirect:  async (req, res) => {
    const { id } = req.params;

    try {
      const link = await Link.findById(id);
      if (!link) {
        return res.status(404).send('Link not found');
      }
  
      // בדיקה עבור הפרמטר ב-query string
      const targetParamValue = req.query[link.targetParamName] || "";
  
      // עדכון הקליק במסד הנתונים
      const click = {
        insertedAt: new Date(),
        ipAddress: req.ip,
        targetParamValue: targetParamValue
      };
      link.clicks.push(click);
      await Link.save();
  
      // הפניה מחדש לקישור המקורי
      res.redirect(link.originalUrl);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Endpoint to get click statistics
  getClickStatistics: async (req, res) => {
  const { id } = req.params;

  try {
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).send('Link not found');
    }

    // פילוח הקליקים לפי מקורות
    const clickStats = link.clicks.reduce((acc, click) => {
      const source = click.targetParamValue || "unknown";
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source]++;
      return acc;
    }, {});

    res.json(clickStats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

};
export default LinksController;

