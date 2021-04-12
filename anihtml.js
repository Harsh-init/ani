console.time(":)")

var footer=`
    <link rel="stylesheet" type="text/css" href="/style.css">
    <div class="footer">   
   <a class="f2" href="/mylist"><center>My list</center></a>
     
      <div class="f1">   
          <form class="fsearch-box" method="get" action="/search">
          <input name="q" class="fsearch" type="text" placeholder="Search here">
        <button class="fbtn">Search</button>
      </form>
         </div>

         <a class="f2" href="/"><center>Home</center></a>
    </div>
    <div style="height: 52px;width: 100%;">
    `;



function search(query){
 console.log(query)
  var file=`
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<style>*{margin:0;padding:;}li{display: inline-block;font-size: small;
        width: 49%;color: black;}
        img{width:100%;height:auto;}
        li{background: grey; color:black;}
        a{text-decoration: none;color: white}
        </style>
        <body>
        <div class='box'>Waiting for your search result</div>
        </body>
     <script>
    var box =document.querySelector('.box')
    var xhr=new XMLHttpRequest()
  	xhr.onload=function(){
  	  box.innerHTML=this.responseText

     var ps=document.querySelectorAll('.name')
         ps.forEach((p)=>{
      var name=p.firstElementChild.innerHTML
      if(name.includes('(Dub)')){
        p.parentElement.style.background = '#0077ff'
      }
     })
  	}
  	xhr.open('GET','/getsearch?q=${query.name}')
  	xhr.send()
    </script>
    
  `+footer

  return file
}

function link(obj){
 console.log(obj)
 var file=`
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="box">Loading Links </div>
  <textarea style='display:block' class="nam" ></textarea>
  <script>
  var box=document.querySelector('.box')
  var nam=document.querySelector('.nam')
    var xhttp=new XMLHttpRequest()
    xhttp.onreadystatechange=function(){
      box.innerHTML=this.responseText
      var atags=document.querySelectorAll('a')
      for(var x=0;x<atags.length;x++){
        atags[x].download='${obj.name}${obj.ep}.mp4'
        atags[x].onclick=function(){
        nam.select()
        document.execCommand('copy')
        }
      }
     }
    xhttp.open('GET','/download?q=${obj.name}')
    xhttp.send()
  </script>

 `+footer

 return file
}

function main(obj){
  var file=`
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${obj.url}</title>
     <style type="text/css">
       *{margin: 0;padding: 0}
       .red{color: red}.green{color: green}.blue{color: blue}
       .yellow{color: yellow}
       a{
           background:#0062ff;
           color:white;text-decoration: none;
           padding:3px;
           padding-left: 5px;
           padding-right: 5px;
          font-size: medium;font-family: verdana;
           border-radius: 10%;
           width: 80px;
           overflow:hidden;
           margin-right: 10px;
           margin-top: 10px;
           margin-bottom: 10px;
           white-space: nowrap;
       }.link{
        background: #9500ff;
        padding:5px;
        padding-left: 7px;
        padding-right: 7px;
       
       }#loaded{
        background: #e3ffd1;
       }.anime{
        display: flex;
        background: black;
       }
       .info{
        color: white;
         width: 50%;
         display: inline-block;
       }.iurl{
        background: transparent;
        text-decoration: underline;
       }
       .epbox div{
         background: #f0f0f0;
         margin: 10px;
         padding: 10px;

       }li{list-style: none;}
      @media only screen and (min-width: 600px) {
          a{font-size: large;}
        }
     </style>
      <center><h2>${obj.url}</h2>
        <button class="addbtn" disabled="true" onclick="add()">Add to list</button>
        <input type='text' class='inp'>
        <button type='button'  onclick='loadall()'>load all</button>
       </center>
       <div class="epbox"></div>
       <div class="anime">
         <img class="iimg" width="50%" src="https://cdn.myanimelist.net/images/anime/10/47347.jpg">
         <div class="info"> 
          <div class="itype">Type : </div>
           <div class="iep">Episodes : </div>
          <div class="iscore">Score : <span class="yellow">&#9733;</span><span class="green"></div></span>
          <div class="istatus">Status : </div>
           <div class="iaired">Aired : </div>
           <div class="imore">   <a class="iurl">View in MAL </a></div>
           <div class="ititle">Titles : </div>

         </div>
       </div>
    <script>
    var rawidarr='${obj.ids}'
    var idarr=[]
    idarr=rawidarr.split(',')
    var epbox =document.querySelector('.epbox')
    var addbtn =document.querySelector('.addbtn')
    var animeInfo={}
    var zxc=0
    idarr.forEach((id,ep)=>{
      var element='<div class="ep'+(ep+1)+'">'
      element+='<center><a class="link" href="/download?q='+id+'">Episode'+(ep+1)+'</a>'
      element+='<button id="'+id+'" name="'+(ep+1)+'" onclick="load()">'
      element+='Load</button>'
      element+='</center></div>'
      epbox.innerHTML+=element
    })
    function load(e){
      console.dir(event.target)
      loada(event.target.id,event.target.name,true)
    }
  var input =document.querySelector('.inp')
       function loada(s,num,stop){
        var xhttp=new XMLHttpRequest()

        xhttp.open('get','/download?for=api&q='+s)
        xhttp.send()
        try{
       xhttp.onreadystatechange=function(){
          
          document.querySelector('.ep'+num).innerHTML+=this.response 
          if(this.readyState==4){
          var res=this.responseText
          res=res.replace(/Download/g,'')
          res=res.replace(/- mp4/ig,'')        
          res=res.split('<br><br>')
          
     var tbox=document.querySelector('.ep'+num)
          tbox.innerHTML=res.slice(0,5).join('')
          tbox.id='loaded'
  var tboxas=tbox.querySelectorAll('a')
  

 for (i = 0; i < tboxas.length; i++) {
  console.log(tboxas)
    tboxas[i].target='_blank'
    tboxas[i].onclick=function(e){
      e.preventDefault()
      var zz=window.open(this.href)
     window.focus()
     
    }
      
 }

          }
       }
      
        }catch(merr){
          alert(merr)
        }
        xhttp.onload=function(){
         if(zxc<(idarr.length - 1)&&!stop){
          zxc+=1
          loada(idarr[zxc],(zxc+1))
         }
           
        }
      }
        
    function add(){
       var xhttp=new XMLHttpRequest()
       var ${obj.malid}
        xhttp.open('post','/mylist')
       xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");      
        var t=animeInfo
        var asa='malid='+t.mal_id
        asa+='&name='+t.title
        asa+='&url=${obj.url}'
        asa+='&score='+t.score
        asa+='&totalep='+t.episodes
        asa+='&air='+t.aired.string
        asa+='&airing='+t.airing
        asa+='&img='+t.image_url
        console.log(asa)
        xhttp.send(asa)
        xhttp.onload=function(){
          alert(this.responseText)
        }
    }
    function getAnimeInfo(){
      var xhttp=new XMLHttpRequest()
       var ${obj.malid}
        xhttp.open('get','/anime?q='+malid)
        xhttp.send()
        xhttp.onload=function(){
          animeInfo=JSON.parse(this.responseText)
          console.log(animeInfo)
            addbtn.disabled=false
            var ai=animeInfo
            document.body.innerHTML+='</br>Synopsis : '+animeInfo.synopsis
           function ainfo(a1,a2){
               document.querySelector(a1).innerHTML+=a2
           }
           ainfo('.itype',ai.type)
           ainfo('.iscore',ai.score)
           ainfo('.iep',ai.episodes)
           ainfo('.istatus',ai.status)
           ainfo('.iaired',ai.aired.string)
           ainfo('.ititle',ai.title+','+ai.title_english+','+ai.title_synonyms)
           document.querySelector('.iimg').src=ai.image_url 
            document.body.innerHTML+='<iframe src="'+ai.trailer_url+'"></iframe>'
           document.querySelector('.iurl').href=ai.url 
            document.body.innerHTML+='</br></br></br>Opening Songs : '+ai.opening_themes
            document.body.innerHTML+='</br></br></br>Ending Songs : '+ai.ending_themes


        }
    }
    getAnimeInfo()
    function loadall(){
        loada(idarr[zxc],(zxc+1))
      }
      
    
  
       </script>
  `+footer

  return file
}

function mylist(obj){
  var file =`
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      *{margin: 0;padding: 0;color: white;}
      body{
        background: #0a0a0a;
      }
      .box{
         height: 150px;
         background: #333333;
         display: flex;
         margin-top: 5px;
         margin-bottom: 5px;
      }b{
       
       display: block;
        text-align: center;
        color: white;
      }
      a{
        text-decoration: none;
      }.info{
        display: flex;
        flex-direction: column;
        width: 100%;
      }#timer{
        font-size: x-large;
        color: orange;
        text-align: center;
      }#date{
        padding: 3px;
      }#latest{
        background: grey;
        padding: 2px;
        position: absolute;
        right: 0;
        down:0;
         height: 30px;
      }#ep{
        text-align: center;
       
      }
    </style>
    <body>
     <script type="text/javascript">
       var animelist=${JSON.stringify(obj.animelist)}
       var data=''
       var ids=[]
       animelist.forEach((anime)=>{
        ids.push({malid:anime.malid,ep:anime.totalep,url:anime.url})
    data+='<a href="'+anime.url+'"><div class="box">'
    data+='<img height="100%" src="'+anime.img+'">'
    data+='<div class="info"><b >'+anime.name+'</b>'
    data+='<div id="date" class="m'+anime.malid+'">Already Finished</div>'
    data+='<div id="timer" class="mm'+anime.malid+'"></div>'
    data+='<div id="ep" class="mmm'+anime.malid+'"></div></div>'
    data+='</div></a>'
       })
       document.body.innerHTML+=data
        
      function epinfo(q,s){
        var xhttp=new XMLHttpRequest()
        xhttp.open('get','/epinfo?q='+q)
        xhttp.send()
        xhttp.onload=function(){
          var list=JSON.parse(this.responseText)
          console.log(list)
      var mmmbox=document.querySelector('.mmm'+s)
       mmmbox.innerHTML='Episode Available :'+list.length+'<a id="latest" href="/download?q='+list[list.length - 1]+'">Episode : '+list.length+'</a>'
        }
      }
       function getSchedule(){
       var xhttp=new XMLHttpRequest()
        xhttp.open('get','/schedule')
        xhttp.send()
        xhttp.onload=function(){
         var schedule=[]
         schedule= JSON.parse(this.responseText)
        var result=[]
        ids.forEach((id)=>{
         schedule.filter((s)=>{
            if(s.malid == id.malid){
              result.push(s)
               var dat=new Date(s.time * 1000)
               var cdate=new Date(Date.now())
                for(var i = 0;i<id.ep; i++){
                   if(cdate<dat){
                    console.log(dat,'dhillon')
                   }else {
                     dat.setDate(dat.getDate() +7)
                   }

                 } 
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
               var mbox=document.querySelector('.m'+s.malid)
               var mmbox=document.querySelector('.mm'+s.malid)

               var epin=((dat.getTime() - cdate.getTime())/60000)
                var dhour=Math.floor(epin/60)
                var dmin=Math.round(epin%60)
                var timer=''
                if(dhour>=24){
                  var dday=Math.floor(dhour/24)
                  dhour=Math.floor(dhour%24)
                  timer=dday+':D,'
                }
                timer+=dhour+':H,'+dmin+':M'
                mmbox.innerHTML=timer
               mbox.innerHTML='New Episode on '+days[dat.getDay()]+'</br>'+dat.toLocaleString()
            }
          })
         epinfo(id.url,id.malid)
        })
        console.log(result)        
        }
       }
          getSchedule()
     </script>
   
    
    </body>



  `+footer

  return file 
}

exports.search=search
exports.link=link
exports.main=main
exports.main=main
exports.mylist=mylist
console.log('second file loaded')
console.timeEnd(":)")