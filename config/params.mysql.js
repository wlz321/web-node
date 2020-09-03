
if(ENV_Production){
    module.exports = {
        host:'127.0.0.1',
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