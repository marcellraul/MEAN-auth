const app = require('./app')
const db = require('./database')
async function init(){
    await app.listen(app.get('port'), ()=>{
        console.log('server on port:', app.get('port'))
    })
    db.startConnection()
} 

init()