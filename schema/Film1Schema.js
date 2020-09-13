const mongoose  = require('mongoose');

// 定义属性
const Film1Schema = new mongoose.Schema({
  _id: Number,
  oldweburl: String,
  mainweburl: String,
  maintitle: String,
  mainimgsrc: String,
  h1_list: String,
  href: Array,
  data_title: Array,
  img_src: Array,
  img_srcset: Array,
  maininfo: Array,
  year: String,
  country: String,
  _class: String,
  language: String,
  maintext: String,
  table_blue_high: Array,
  table_blue_hight_width: Array,
  table_blue_high_diskspace: Array,
  table_blue_high_filename: Array,
  table_osd: String,

  table_blue_origin: Array,
  table_blue_origin_width: Array,
  table_blue_origin_diskspace: Array,
  table_webdl: Array,
  table_4K: Array
});

// 定义方法
Film1Schema.methods.speak = function () {
    const greeting = this.maintitle ? "Meow maintitle is " + this.maintitle : "I don't have a maintitle";
    console.log(greeting);
}

module.exports = {
    name:'film1',
    schema:Film1Schema
}