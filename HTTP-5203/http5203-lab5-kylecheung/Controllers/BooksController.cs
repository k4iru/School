using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Xml;
using http5203_lab5_kylecheung.Models;

namespace http5203_lab5_kylecheung.Controllers
{
    public class BooksController : Controller
    {
        public IActionResult Index()
        {
            IList<Book> bookList = new List<Book>();

            string path = Request.PathBase + "App_Data/books.xml";
            XmlDocument xd = new XmlDocument();

            if (System.IO.File.Exists(path))
            {
                xd.Load(path);
                XmlNodeList books = xd.GetElementsByTagName("book");

                foreach (XmlElement b in books)
                {
                    Book newBook = new Book();
                    newBook.id = Int32.Parse(b.GetElementsByTagName("id")[0].InnerText);
                    newBook.bookTitle = b.GetElementsByTagName("title")[0].InnerText;
                    
                    XmlElement authorNode = (XmlElement)b.GetElementsByTagName("author")[0];

                    newBook.authorTitle = authorNode.GetAttribute("title");
                    newBook.first = b.GetElementsByTagName("firstname")[0].InnerText;

                    if (b.GetElementsByTagName("middlename").Count == 0)
                    {
                        newBook.middle = "";
                    }
                    else
                    {
                        newBook.middle = b.GetElementsByTagName("middlename")[0].InnerText;
                    }
                    newBook.last = b.GetElementsByTagName("lastname")[0].InnerText;

                    bookList.Add(newBook);
                }
            }

            return View(bookList);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var book = new Book();
            return View(book);
        }

        [HttpPost]
        public IActionResult Create(Book b)
        {
            string path = Request.PathBase + "App_Data/books.xml";
            XmlDocument xd = new XmlDocument();

            if (System.IO.File.Exists(path))
            {
                //if file exists, just load it and create new Book
                xd.Load(path);

                //create a new book
                XmlElement book = _CreateBookElement(xd, b);

                //get the root element
                xd.DocumentElement.AppendChild(book);

            }
            else
            {
                //file doesn't exist, so create and create new person
                XmlNode dec = xd.CreateXmlDeclaration("1.0", "utf-8", "");
                xd.AppendChild(dec);
                XmlNode root = xd.CreateElement("books");

                //create a new book
                XmlElement book = _CreateBookElement(xd, b);
                root.AppendChild(book);
                xd.AppendChild(root);
            }
            xd.Save(path);

            return View();
        }

        private XmlElement _CreateBookElement(XmlDocument doc, Book newBook)
        {

            // lastchild of root element
            XmlNode lastbook = doc.DocumentElement.LastChild;


            // truncate to last 5 books
            int numBooks = doc.DocumentElement.ChildNodes.Count;
            while (numBooks > 5 )
            {
                doc.DocumentElement.RemoveChild(doc.DocumentElement.FirstChild);
                numBooks--;
            }

            // get id of last book and add 1
            int lastbookID = Int32.Parse(lastbook.ChildNodes[0].InnerText) + 1;

            XmlElement book = doc.CreateElement("book");

            XmlElement id = doc.CreateElement("id");

            // pad string to 4 digits
            id.InnerText = lastbookID.ToString("D4");
            book.AppendChild(id);

            XmlElement title = doc.CreateElement("title");
            title.InnerText = newBook.bookTitle;
            book.AppendChild(title);

            XmlElement author = doc.CreateElement("author");
            XmlAttribute authorTitle = doc.CreateAttribute("title");
            authorTitle.Value = newBook.authorTitle;
            author.Attributes.Append(authorTitle);

            XmlNode first = doc.CreateElement("firstname");
            first.InnerText = newBook.first;
            author.AppendChild(first);

            XmlNode middle = doc.CreateElement("middlename");
            middle.InnerText = newBook.middle;
            author.AppendChild(middle);
            
            XmlNode last = doc.CreateElement("lastname");
            last.InnerText = newBook.last;
            author.AppendChild(last);

            book.AppendChild(author);

            return book;
        }
    }
}
