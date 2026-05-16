const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  coverImage: {
    type: String,
    default: ''
  },
  coverImagePublicId: {
    type: String,
    default: ''
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

// Auto-generate slug from title
BlogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now();
  }
  // Auto-generate excerpt if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.replace(/<[^>]+>/g, '').substring(0, 300) + '...';
  }
  // Calculate read time (avg 200 words/min)
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
