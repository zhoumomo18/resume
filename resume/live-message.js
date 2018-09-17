var APP_ID = '4VUbFNPOxIygr2X0eBUQ5wSf-gzGzoHsz';
var APP_KEY = 'gMTeDBzz2CaNHtCgm4Wo669L';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

//存储在线上
let myForm = document.querySelector('#postMessage')
myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let content = myForm.querySelector('input[name=content]')
    let name = myForm.querySelector('input[name]')
    var Resume = AV.Object.extend('Resume')
    var resume = new Resume();
    resume.save({
        'content': content.value,
        'name': name.value
    }).then((obj)=>{
        let li = document.createElement('li')
        li.innerText = obj.attributes.name+':'+obj.attributes.content
        formUl.appendChild(li)
    }).then(function () {
        content.value = ''
        name.value = ''
    })
})
//存储在服务器
var query = new AV.Query('Resume');
query.find().then(function (Resume) {
    let arr = Resume.map((key) => { return key.attributes })          
    arr.forEach(key => {
        let li = document.createElement('li')
        li.innerText = key.name+':'+key.content
        formUl.appendChild(li)
    });
});