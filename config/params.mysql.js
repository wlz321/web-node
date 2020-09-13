console.log(__filename+'    ENV_Production  ', ENV_Production)
if(ENV_Production){
    module.exports = {
        host:'121.36.202.19',
        port:'3306',
        username:'chw',
        password:'chw@Wifi654321',
        database:'lobby'
    }
}
else{
    module.exports = {
        host:'172.17.0.3',
        port:'3306',
        username:'root',
        password:'mnbvcxz@123',
        database:'lobby'
    }
}