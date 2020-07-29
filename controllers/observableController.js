import { filter, concat, empty } from "rxjs";
import { delay, startWith } from "rxjs/operators";
import { Releases } from "./../Database/text";

const filterData = async (req, res) => {
  var ret = Releases.filter((release) => release.rating === 4).map(
    (rel) => rel.id
  );
  res.json({ code: "11", data: ret });
};
const reduceData = async (req, res) => {};
export default {
  filterData,
  reduceData,
};
