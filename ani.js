//   Modules require 
const express=require('express')
const app=express()
const fileupload=require('express-fileupload')
const terminal=require('child_process')
const fs=require('fs')
const html=require('./anihtml')
// Project Global variables 
var version='1.1'
var port=3000
var storage=__dirname+'/received'
var animelist=[]
// server modules to use
app.use(express.urlencoded({extended:true}))
fs.readFile('anime.txt','utf-8',(e,o)=>{
     if (e) {
      console.log(e)
     }else{
        console.log('Loaded list ******* * ** * * *')
        animelist=JSON.parse(o)
      }
})

app.get('/',(req,res)=>{
	console.log('sendhome')
	res.sendFile(__dirname+'/ani.html')
})
app.get('/style.css',(req,res)=>{
  console.log('send-stylesheet')
  res.sendFile(__dirname+'/style.css')
})
app.get('/getsearch',(req,res)=>{
	var query=req.query.q
    terminal.exec(`curl 'https://animixplay.to/api/search/v1' \
  --data-raw 'q2=${query}&origin=1'`,(e,r)=>{
  	if (e) {
        console.log(e)
  	}else{
  		var k=JSON.parse(r)
  		console.log(k)
  		res.send(k.result)
  	}
  })
})
app.get('/search',(req,res)=>{
  var obj={name:req.query.q}
  res.send(html.search(obj))
})
app.get('/favicon.ico',(req,res)=>{
  res.end('yh')
})
app.get('/test',(req,res)=>{
  res.header('Content-Type', 'text/event-stream');
  res.write('hi ')
  setTimeout(()=>{
     res.write(' sorry after 4 seconds')
     
  },4000)
  setTimeout(()=>{
     res.write(' sorry after 8 seconds')
     res.end(' ok bye')
  },8000)
})
app.get('/link',(req,res)=>{
  console.log(req.query)
  var obj={name:req.query.q,
           ep:req.query.ep
          }
  res.send(html.link(obj))
})
app.get('/m.mp4',(req,res)=>{
  res.sendFile(__dirname+'/sample.html')
})

app.get('/download',(req,res)=>{
  console.log(req.url)
  if(req.query.q.includes('http')){
 res.writeHead(302, {location: `${req.query.q}`});
 res.end();
   // res.redirect(302,req.query.q)
  }else{
 var urll=`https://gogo-stream.com/download?id=${req.query.q}`
 terminal.exec(`curl 'https://gogo-stream.com/download?id=${req.query.q}'`,(e,r)=>{
  if(e){
    if(req.query.for=='api'){
    res.header('Content-Type', 'text/event-stream');
    res.write('falling back to external server ')
    }
    console.log(e,'Error:changing server')
  terminal.exec(`curl 'https://plastic-learned-enigmosaurus.glitch.me/download?q=${req.query.q}'`,(ee,rr)=>{
     if(ee){
       res.end('<h5>External</h5> '+rr)
     }
     else{
       console.log(rr)
       if(req.query.for=='api'){
       res.end('<h5>External</h5> '+rr)
       }else {
        res.send('<h5>External</h5> '+rr)
       }
     }
   })
    //res.send(e+`<a href='${urll}'>${urll}</a>`)
  }else{
    var rt= r.match(/(?<=dowload\">).*?(?=<\/div)/gs)
    var rv= r.match(/(?<=class=\"sumer_l\">).*?(?=<\/div)/s)
    console.log(rt)  
     //var d='<meta name="viewport" content="width=device-width, initial-scale=1.0">'
     //var c=`<a href="intent:http://localhost:3000/m.mp4#Intent;package=com.mxtech.videoplayer.ad;S.title=New%20title;end">Launch through Intent scheme.</a>`
    res.send('<center><h2>hi from Harsh</h2>'+rv+rt.join('<br><br>'))
      
  }
})

}
//else end here
})
app.get('/new',(req,res)=>{
 terminal.exec(`curl 'https://animixplay.to'`,(e,r)=>{
  if(e){
    console.log(e)
    res.send(e)
  }else{
   // var rt= r.match(/<div class=\"details\">.*?(?=<div class=\"details\">)/gs)
    console.log(r,'555')
    var rt= r.match(/<li><a.*?<\/a><\/li>/gs)
  
    console.log(rt)
    res.send(rt.toString())
   //  var d='<meta name="viewport" content="width=device-width, initial-scale=1.0">'
   //  var c=`<a href="intent:http://localhost:3000/m.mp4#Intent;package=com.mxtech.videoplayer.ad;S.title=New%20title;end">Launch through Intent scheme.</a>`
  //  res.send(d+c+'<center><h2>hi</h2>'+rv+rt.join('<br><br>'))
      // 24QFEBXMJCIYQV7K
      // 7V3NRICEZ6FRKAT4
      //VRubuXfJv993GsobVjV9OrOeTS0EL6nR5JnVQaEqA5fcBH4cdR43AQfYcunN94Ho
      //    B0piwoWkrWtpiJVY80BpcTEsMKP49cq8tJ9bvgrb9aPu7gdTSZ4PnvB2MZjVpQhl
  } 
})
})
app.get('/anime',(req,res)=>{
  if(req.query.q){
    terminal.exec(`curl https://animixplay.to/assets/mal/${req.query.q}.json`,(e,o)=>{
        if (e) {console.log(e);
          res.send(e)}
          else{
            console.log(o)
              res.send(o)
          }
    })
  }
  else {
    res.send('Please provide a Mal id for Anime')
  }
})
app.get('/mylist',(req,res)=>{
  var obj={"animelist":animelist}
  console.log(animelist)   
  res.send(html.mylist(obj))
})
app.post('/mylist',(req,res)=>{
   if(req.body.url&&req.body.malid){
       console.log(req.body)
       var inlist=false
       animelist.forEach((anime)=>{
          if(anime.url==req.body.url){
            inlist=true
          }
       })
       if(!inlist){
        var b=req.body
       var tobj={malid:b.malid,
                 name:b.name,
                 url:b.url,
                  score:b.score,
                  totalep:b.totalep,
                  air:b.air,
                  airing:b.airing,
                  img:b.img}
       animelist.push(tobj)
       fs.writeFile('anime.txt',JSON.stringify(animelist),(e)=>{
        if (e) {console.log(e)}
          else {
            res.send('Added ')
            console.log('aded anime')
          }
       })
     }
     else{
      res.send('Already added')
     }
       
   }
   else{res.send('No Name Provided')}
     
})
app.get('/schedule',(req,res)=>{
  terminal.exec(`curl https://animixplay.to/assets/s/schedule.json`,(e,o)=>{
    if (e) {console.log(e)
      res.send(e)}
      else{
        console.log('sending schedule - -- - - - ')
        res.send(o)
      }
  })
})
app.get('/epinfo',(req,res)=>{
  console.log(req.url)
  if(req.query.q){
    terminal.exec(`curl 'https://animixplay.to${req.query.q}'`,(e,r)=>{
    if (e) {
        console.log(e)
        res.send(e)
    }else{
    
      var nrr=r.match(/(?<=id=).*?(?=&title)/g)

      res.send(JSON.stringify(nrr))
    }
  })
  }else {
    res.send('Provide a Query')
  }
})
app.use((req,res)=>{
  if(req.url.includes('v1')){
    
  console.log(req.url)
  terminal.exec(`curl 'https://animixplay.to${req.url}'`,(e,r)=>{
 	if (e) {
        console.log(e)
        res.send(e)
  	}else{
      console.log(r)
      var nrr=r.match(/(?<=id=).*?(?=&title)/g)
    //var rv= r.match(/(?<=class=\"sumer_l\">).*?(?=<\/div)/s)

      var malid=r.match(/(?<=var).*?(?=;)/s)
      //var malid=rawmalid[0].match(/(?<=\').*?(\')/)
      var obj ={url:req.url,ids:nrr,malid:malid}
      console.log(malid[0])
      console.dir(nrr)
 // terminal.exec(`curl 'https://animixplay.to${req.url}'`,(e,r)=>{
      res.send(html.main(obj))
  	}
  })
  }
  else{
    res.send('no')
  }
})
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
});

// do end - g
// Harsh-go-go-123
// Harsh-@-git-123
// Money-/-harsh-576
// gurwinderkaur2743 - google letter
// Gurwinder-@-123
