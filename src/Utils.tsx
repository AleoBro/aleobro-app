import moment from "moment";

export default {
  formatDate(timestamp:number):string{
    return moment(timestamp*1000).format("YYYY-MM-DD HH:mm:ss")
  }
};