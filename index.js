//web socket server
import {WebSocketServer}  from 'ws';
import ffmpeg from 'ffmpeg-static';
import {spawn} from 'child_process';
import Client from 'ssh2-sftp-client';
import * as dotenv from 'dotenv'

dotenv.config({ debug: true })
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(msg) {
    
    let data = JSON.parse(msg);

    //receive message start recording
    if (data.event == "answer")
    {
        start_record(data.payload)
        console.log('received: %s', data.event);
        
    }
    //receive event stop recording
    if (data.event=="hangup")
    {
        stop_record(data.payload)
        console.log('received: %s', data.event);
    }
    console.log('received: %s', data);
  });

  ws.send('Connected');
});

let ps;
const ffmpeg_param = process.env.FFMPEG_PARAM.split(" ");
const start_record = payload =>
{
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear(); 

        let date_string = year + '/'+ month +'/'+ date
        spawn('mkdir',['-p',process.env.TEMP_PATH+date_string]);

        ps = spawn(ffmpeg,[...ffmpeg_param,process.env.TEMP_PATH+date_string+'/'+payload.uuid+"."+process.env.FFMPEG_OUT_FORMAT]);
        
        ps.stdout.on("data",(data)=>{
            console.log(`stdout : ${data}`);
        });
        ps.stderr.on("data",(data)=>{
            console.log(`stderr : ${data}`);
        })
      
}

const stop_record = payload =>
{
    ps.kill(2);
    //transfer2server();
}

let sftp = new Client();

//transfer file to sftp
const transfer2server = () =>
{
    sftp.connect({
    host: process.env.HOST,
    port: process.env.RORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
    })
    .then(()=>{
        return sftp.uploadDir(process.env.TEMP_PATH,process.env.REMOTE_PATH)
    }).then(()=>{
        //remove temp
    })
    .catch(err => {
    console.log(err, 'catch error');
    });
    sftp.end()
   
}
