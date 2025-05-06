const Book = require('../models/book');

// GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book
      .find()
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/books
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    return res.status(201).json(book);
  } catch (err) {
    console.error("CreateBook error:", err);
    return res.status(400).json({ message: err.message });
  }
};

// PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.error("UpdateBook error:", err);
    return res.status(400).json({ message: err.message });
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id).lean();
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    console.error("DeleteBook error:", err);
    return res.status(500).json({ message: err.message });
  }
};
