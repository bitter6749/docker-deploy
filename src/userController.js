import User from './userModel.js';

// ユーザー作成 (POST)
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 全ユーザー取得
export const getUsers =  async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 特定ユーザー取得
export const getUserById =  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ユーザー情報の更新
export const updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ error: '必要なフィールドが不足しています' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }  // 更新後のドキュメントを返すオプション
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ユーザーの削除
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }
    res.json({ message: 'ユーザーが削除されました', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};