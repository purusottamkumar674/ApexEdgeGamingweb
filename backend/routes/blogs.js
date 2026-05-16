const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category, tag, search, featured } = req.query;
    const query = { status: 'published' };

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured) query.featured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name slug color')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content');

    res.json({
      success: true,
      blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/blogs/admin/all
// @desc    Get all blogs for admin (including drafts)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('title status views createdAt featured category author coverImage readTime');

    res.json({
      success: true,
      blogs,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/blogs/stats
// @desc    Get blog stats for admin dashboard
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalViews = await Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).select('title createdAt status views');

    res.json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.total || 0,
        recentBlogs
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/blogs/featured
// @desc    Get featured blogs
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published', featured: true })
      .populate('author', 'name avatar')
      .populate('category', 'name slug color')
      .sort({ createdAt: -1 })
      .limit(3)
      .select('-content');

    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name avatar')
      .populate('category', 'name slug color');

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Related blogs
    const related = await Blog.find({
      status: 'published',
      _id: { $ne: blog._id },
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags } }
      ]
    })
      .limit(3)
      .select('title slug coverImage createdAt readTime')
      .populate('category', 'name color');

    res.json({ success: true, blog, related });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/blogs
// @desc    Create new blog (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    await blog.populate('author', 'name');
    await blog.populate('category', 'name');
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('author', 'name').populate('category', 'name');

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
