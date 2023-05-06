import Mock from "mockjs";
import { param2Obj } from "./base";
let List = [];
const count = 200;

for (let i = 0; i < count; i++) {
  let borrowTime = randomDate(new Date(2023, 3, 1), new Date(2023, 4, 1));
  let tmpBorrowTime = new Date(borrowTime);
  let expireTime = new Date(tmpBorrowTime.setDate(tmpBorrowTime.getDate() + 5));
  let overTime = daysBetween(new Date(), expireTime);
  List.push(
    Mock.mock({
      name: Mock.Random.cname(),
      userID: Mock.Random.guid(),
      bookName: Mock.Random.title(),
      bookID: Mock.Random.guid(),
      borrowTime: borrowTime.toISOString().split("T")[0],
      expireTime: expireTime.toISOString().split("T")[0],
      overTime: overTime,
    })
  );
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
  return diffDays;
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getViolateList: (config) => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    console.log("name:" + name, "page:" + page, "分页大小limit:" + limit);
    const mockList = List.filter((violate) => {
      if (
        name &&
        violate.name.indexOf(name) === -1 &&
        violate.userID.indexOf(name) === -1
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
   * 增加违规用户（废弃）
   * @return {{code: number, data: {message: string}}}
   */
  createViolate: (config) => {
    const { name, userID, bookName, bookID, borrowTime, expireTime, overTime } =
      JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    List.unshift({
      name,
      userID,
      bookName,
      bookID,
      borrowTime: borrowTime,
      expireTime: expireTime,
      overTime: overTime,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteViolate: (config) => {
    const { userID } = param2Obj(config.url);
    if (!userID) {
      return {
        code: -999,
        message: "参数不正确",
      };
    } else {
      List = List.filter((u) => u.userID !== id);
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
    List = List.filter((u) => !ids.includes(u.userID));
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
  updateViolate: (config) => {
    const { name, userID, bookName, bookID, borrowTime, expireTime, overTime } =
      JSON.parse(config.body);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.userID = userID;
        u.bookName = bookName;
        u.bookID = bookID;
        u.borrowTime = borrowTime;
        u.expireTime = expireTime;
        u.overTime = overTime;
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
};
