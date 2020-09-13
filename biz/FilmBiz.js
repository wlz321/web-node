
class FilmBiz{
    /**
     * 获取指定filmid的信息
     * @param {int} film_id
     */
    static async getFilmItemsJSON(film_id=0){
        if(parseInt(film_id) > 0){
            let item = {};
            await Film1.findAll({where:{FilmID:film_id}, raw: true , attributes:['ItemName','ItemValue']}).then((rows)=>{
                return rows.map((row)=>{
                    if(!item[row.ItemName]){
                        item[row.ItemName] = row.ItemValue
                    }else{
                        if(Array.isArray(item[row.ItemName])){
                            item[row.ItemName].push(row.ItemValue)
                        }else{
                            item[row.ItemName] = [ item[row.ItemName], row.ItemValue]
                        }
                    }
                })
            });
            return item;
        }
        return null;
    }
}

module.exports = FilmBiz;