const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sequelize = require('./models');
const User = require('./models/User');
const Post = require('./models/Post');
const authenticate = require('./middleware/auth');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'mysecretkey';

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log('DB 연결 성공 및 테이블 생성');
});

// 회원가입
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return res.status(400).json({ message: '이미 존재하는 유저입니다.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  res.status(201).json({ message: '회원가입 성공!' });
});

// 로그인
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: '유저가 존재하지 않습니다.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: '비밀번호가 틀렸습니다.' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: '로그인 성공!', token });
});

// 글쓰기 (로그인 필요)
app.post('/posts', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const post = await Post.create({ title, content, UserId: userId });
  res.status(201).json(post);
});

// 글목록 (작성자 포함 조회)
app.get('/posts', async (req, res) => {
  Post.belongsTo(User, { foreignKey: 'UserId' });
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User, attributes: ['username'] }]
  });
  res.json(posts);
});

// 글 상세 조회
app.get('/posts/:id', async (req, res) => {
  Post.belongsTo(User, { foreignKey: 'UserId' });
  const post = await Post.findByPk(req.params.id, {
    include: [{ model: User, attributes: ['username'] }]
  });
  if (!post) return res.status(404).json({ message: '게시글이 없습니다.' });
  res.json(post);
});

// 글 수정 (내 글만 가능)
app.put('/posts/:id', authenticate, async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  const post = await Post.findByPk(postId);
  if (!post) return res.status(404).json({ message: '게시글이 없습니다.' });
  if (post.UserId !== req.user.id) return res.status(403).json({ message: '수정 권한이 없습니다.' });

  post.title = title;
  post.content = content;
  await post.save();

  res.json(post);
});

// 글 삭제 (내 글만 가능)
app.delete('/posts/:id', authenticate, async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: '게시글이 없습니다.' });
  if (post.UserId !== req.user.id) return res.status(403).json({ message: '삭제 권한이 없습니다.' });

  await post.destroy();
  res.json({ message: '삭제 성공' });
});

app.listen(5001, () => {
  console.log('서버 실행 중 (포트: 5001)');
});
