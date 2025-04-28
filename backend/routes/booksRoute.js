import express from "express"
import {Book} from "../models/bookModels.js"
const router= express.Router()


//Route to save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: "Send all required fields" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Route to Get all books from Database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route to get one book from database
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const book = await Book.findById(id)
        return res.status(200).json({
            count: book.length,
            data: book
        })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
//Route to update book by id
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: "Send all required fields" })
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: "Book Successfully Updated" })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//route for deleting a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: "Book Successfully Deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router