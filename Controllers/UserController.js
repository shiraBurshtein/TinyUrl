import User from "../Models/UserModel.js";

const UsersController = {
  getList: async (req, res) => {
    try {
      const Users = await User.find();//ללא סינון

      res.json({ Users});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);//שליפה לפי מזהה
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    console.log(req.body)
    const originalUser  = req.body;
    try {       
      const newUser = await User.create(originalUser);//הוספת חדש    
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },


  update: async (req, res) => {
    const { id } = req.params;
    const { originalUser } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(id, { originalUser } 
        , {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await User.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UsersController;