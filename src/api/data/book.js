import Mock from "mockjs";
import { param2Obj } from "./base";
let List = [];
const count = 7;

let bookInfoList = [
  {
    name: "百年孤独",
    bookid: Mock.Random.guid(),
    author: "马尔克斯",
    isbn: "9787536692930",
  },
  {
    name: "平凡的世界",
    bookid: Mock.Random.guid(),
    author: "路遥",
    isbn: "9787536692931",
  },
  {
    name: "白鹿原",
    bookid: Mock.Random.guid(),
    author: "陈忠实",
    isbn: "9787536692932",
  },
  {
    name: "红楼梦",
    bookid: Mock.Random.guid(),
    author: "曹雪芹",
    isbn: "9787536692933",
  },
  {
    name: "西游记",
    bookid: Mock.Random.guid(),
    author: "吴承恩",
    isbn: "9787536692934",
  },
  {
    name: "水浒传",
    bookid: Mock.Random.guid(),
    author: "施耐庵",
    isbn: "9787536692935",
  },
  {
    name: "三国演义",
    bookid: Mock.Random.guid(),
    author: "罗贯中",
    isbn: "9787536692936",
  },
  {
    name: "呐喊",
    bookid: Mock.Random.guid(),
    author: "鲁迅",
    isbn: "9787536692937",
  },
  {
    name: "围城",
    bookid: Mock.Random.guid(),
    author: "钱钟书",
    isbn: "9787536692938",
  },
  {
    name: "活着",
    bookid: Mock.Random.guid(),
    author: "余华",
    isbn: "9787536692939",
  },
];

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      // name: Mock.Random.title(),
      // bookid: Mock.Random.guid(),
      // author: "XXX",
      // isbn: "XXX",
      name: bookInfoList[i].name,
      bookid: bookInfoList[i].bookid,
      author: bookInfoList[i].author,
      isbn: bookInfoList[i].isbn,
    })
  );
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getBookList: (config) => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    console.log("name:" + name, "page:" + page, "分页大小limit:" + limit);
    const mockList = List.filter((book) => {
      if (
        name &&
        book.name.indexOf(name) === -1 &&
        book.bookid.indexOf(name) === -1
      )
        return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },
  /**
   * @return {{code: number, data: {message: string}}}
   */
  createBook: (config) => {
    const { name, bookid, author, isbn } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    List.unshift({
      id: Mock.Random.guid(),
      name,
      bookid,
      author,
      isbn,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  /**
   * @param id
   * @return {*}
   */
  deleteBook: (config) => {
    const { id } = param2Obj(config.url);
    if (!id) {
      return {
        code: -999,
        message: "参数不正确",
      };
    } else {
      List = List.filter((u) => u.id !== id);
      return {
        code: 20000,
        message: "删除成功",
      };
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: (config) => {
    let { ids } = param2Obj(config.url);
    ids = ids.split(",");
    List = List.filter((u) => !ids.includes(u.id));
    return {
      code: 20000,
      data: {
        message: "批量删除成功",
      },
    };
  },
  /**
   * @return {{code: number, data: {message: string}}}
   */
  updateBook: (config) => {
    const { id, name, bookid, author, isbn } = JSON.parse(config.body);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.bookid = bookid;
        u.author = author;
        u.isbn = isbn;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功",
      },
    };
  },
  /**
   * 上传图书
   * @param {*} item
   */
  uploadBook(item) {
    List.unshift(item);
    return {
      code: 20000,
      data: {
        imageUrl: "/static/$RP3VH8G.jpg",
      },
    };
  },
};
