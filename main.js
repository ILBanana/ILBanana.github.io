//获取头部
var header=document.getElementById('header');
//获取箭头dom
var arrow=document.querySelector('#header .w .arrow');
//获取列表dom
var liNodes=document.querySelectorAll('#header .w .nav ul li');
//获取类名为up的dom
var upNodes=document.querySelectorAll('#header .w .nav ul li .up');
//获取内容
var content=document.getElementById('content');
//滚轮降频定时器
var timer = null;
//当前所在页面编号
var now=0;
//上一个页面编号
var preIndex=now;
//内容区列表
var contentList = document.querySelector('#content .list');
//内容区列表子元素
var contentLi=document.querySelectorAll('#content .list>li');
//图片炸裂列表
var ulList=document.querySelectorAll('#content .about .about3 .item ul');
//侧边导航栏元素
var menuBarLis = document.querySelectorAll('#content .menuBar ul>li');
//动画组
var animationArr = [
    {
        inAin:function () {

            var homeList = document.querySelector('#content .list .home .homelist');
            var homeIcon = document.querySelector('#content .list .home .homeIcon');

            homeList.style.transform = 'translate(0,0)';
            homeIcon.style.transform = 'translate(-50%,0)';

            homeList.style.opacity = '1';
            homeIcon.style.opacity = '1';
        },
        outAin:function () {
            var homeList = document.querySelector('#content .list .home .homelist');
            var homeIcon = document.querySelector('#content .list .home .homeIcon');

            homeList.style.transform = 'translate(0,-200px)';
            homeIcon.style.transform = 'translate(-50%,200px)';

            homeList.style.opacity = '0.3';
            homeIcon.style.opacity = '0.3';
        }
    },
    {
        //第二屏
        inAin:function () {
            var planes = document.querySelectorAll('#content .course .plane');
            for (var i = 0; i < planes.length; i++) {
                planes[i].style.transform = 'translate(0px,0px)';
            }

        },
        outAin:function () {
            var planes = document.querySelectorAll('#content .course .plane');


            planes[0].style.transform = 'translate(-200px,-200px)';
            planes[1].style.transform = 'translate(-200px,200px)';
            planes[2].style.transform = 'translate(200px,-200px)';
        }

    },
    {
        //第三屏
        inAin:function () {
            var pencels = document.querySelectorAll('#content .works .pencel');


            pencels[0].style.transform = 'translateY(0px)';
            pencels[1].style.transform = 'translateY(0px)';
            pencels[2].style.transform = 'translateY(0px)';
        },
        outAin:function () {
            var pencels = document.querySelectorAll('#content .works .pencel');


            pencels[0].style.transform = 'translateY(-200px)';
            pencels[1].style.transform = 'translateY(200px)';
            pencels[2].style.transform = 'translateY(200px)';
        }
    },
    {
        //第四屏
        inAin:function () {
            var item1 = document.querySelectorAll('#content .list .about .about3>.item')[0];
            var item2 = document.querySelectorAll('#content .list .about .about3>.item')[1];

            item1.style.transform = 'rotate(0deg)';
            item2.style.transform = 'rotate(0deg)';
        },
        outAin:function () {
            var item1 = document.querySelectorAll('#content .list .about .about3>.item')[0];
            var item2 = document.querySelectorAll('#content .list .about .about3>.item')[1];

            item1.style.transform = 'rotate(45deg)';
            item2.style.transform = 'rotate(-45deg)';
        }
    },
    {
        //第五屏
        inAin:function () {
            var team1 = document.querySelector('#content .list .team .team1')
            var team2 = document.querySelector('#content .list .team .team2')
            team1.style.transform = 'translateX(0px)';
            team2.style.transform = 'translateX(0px)';
        },
        outAin:function () {
            var team1 = document.querySelector('#content .list .team .team1')
            var team2 = document.querySelector('#content .list .team .team2')
            team1.style.transform = 'translateX(-200px)';
            team2.style.transform = 'translateX(200px)';
        }
    }
];
//入场动画加载进度条
var maskLine = document.querySelector('#mask>.maskLine');
var maskTop = document.querySelector('#mask>.maskBottom');
var maskBottom = document.querySelector('#mask>.maskTop');
//音乐容器和音频
var music = document.querySelector('#header .w .music');
var myAudio = document.querySelector('#header .w .music>audio');
/************************默认为出厂动画****************************/
for (var i = 0; i < animationArr.length; i++) {
    animationArr[i].outAin();
}
/************************音频播放****************************/
music.onclick = function () {
    if(myAudio.paused){
        myAudio.play();
        music.style.backgroundImage = 'url("img/musicon.gif")'
    }else {
        myAudio.pause();
        music.style.backgroundImage = 'url("img/musicoff.gif")'
    }

}
/************************开机动画****************************/
/************************加载图片****************************/
var imgs = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
function imgLoad(imgArr) {
    var imgFlag = 0;
    for (var i = 0; i < imgArr.length; i++) {
        var imgNode = new Image();
        imgNode.src = 'img/' + imgs[i];
        imgFlag++;
        maskLine.style.width = imgFlag/imgArr.length*100 + '%';
    }

    maskLine.addEventListener('transitionend',function () {

        maskTop.style.height = '0';
        maskBottom.style.height = '0';
        maskLine.style.display = 'none';
    });
    maskTop.addEventListener('transitionend',function () {
       animationArr[now]['inAin']();
        home3D();

        document.getElementById('mask').remove();
    });
}
// var imgNode = new Image();
// imgNode.src = 'img/bg1.jpg';
imgLoad(imgs);
// now=0;
// move(0);
/************************头部小箭头移动****************************/
function arrowMove(index){
    //改变选中标签颜色
    upNodes[preIndex].style.width='';
    upNodes[index].style.width='100%';
    //改变箭头位置
    arrow.style.left=liNodes[index].getBoundingClientRect().left+liNodes[index].offsetWidth/2-arrow.offsetWidth/2+'px';
}
/************************切换页面****************************/
function move(now_index) {
    //移动小箭头
    arrowMove(now_index);
    //页面切换
    contentList.style.top=-now_index*(document.documentElement.clientHeight-header.offsetHeight)+'px';
    //导航栏图标变换
    menuBarLis[preIndex].className = '';
    menuBarLis[now].className = 'active';

    animationArr[preIndex]['outAin']();
    animationArr[now]['inAin']();
}
/***************头部约束*************************/
function headerBind(){
    //设置初始箭头位置在第一个li的正下方
    upNodes[0].style.width='100%';

    arrow.style.left=liNodes[0].getBoundingClientRect().left+liNodes[0].offsetWidth/2-arrow.offsetWidth/2+'px';

    for (var i=0;i<liNodes.length;i++){
        //添加编号便于查找
        liNodes[i].index=i;
        //绑定点击事件
        liNodes[i].onclick=function () {
            preIndex=now;
            now=this.index;
            move(now);
        }
    }
}
headerBind();
/**********************内容区约束***************/
function contentBind(){
    content.style.height=document.documentElement.clientHeight-header.offsetHeight+'px';
    for (var i=0;i<liNodes.length;i++){
        contentLi[i].style.height=document.documentElement.clientHeight-header.offsetHeight+'px';
    }

}
contentBind();
/************************侧边导航****************************/
function menuBarClick() {

    for (var i = 0; i < menuBarLis.length; i++) {
        menuBarLis[i].index=i;

        menuBarLis[i].onclick = function () {
            preIndex=now;
            now=this.index;
            move(now);
        }
    }
}
menuBarClick();
/************************第三屏图片炸裂****************************/
function picBoom() {
    for (var i=0;i<ulList.length;i++){
        changeImg(ulList[i]);
    }
}
function changeImg(ul){
    var w=ul.offsetWidth/2;
    var h=ul.offsetHeight/2;
    var imgSrc=ul.dataset.src;

    for (var i=0;i<4;i++){
        var liNode = document.createElement('li');
        var imgNode = new Image();
        imgNode.src=imgSrc;

        //图片位置
        // i=0  l :0   -(0*w)          t:0
        // i=1  l :-w  -(1*w)          t:0
        // i=2  l :0   -(0*w)          t:-h
        // i=3  l :-w  -(1*w)          t:-h
        liNode.style.width = w+'px';
        liNode.style.height = h+'px';

        imgNode.style.top = -Math.floor(i/2)*h + 'px';
        imgNode.style.left = -(i%2)*w + 'px';

        liNode.appendChild(imgNode);
        ul.appendChild(liNode);
    }
    var imgNodes = ul.querySelectorAll('img')

    ul.onmouseenter = function () {
        imgNodes[0].style.top = h + 'px';
        imgNodes[1].style.left = -2*w + 'px';
        imgNodes[2].style.left = w + 'px';
        imgNodes[3].style.top = -2*h + 'px';
    };
    ul.onmouseleave = function () {
        imgNodes[0].style.top = 0 + 'px';
        imgNodes[1].style.left = -w + 'px';
        imgNodes[2].style.left = 0 + 'px';
        imgNodes[3].style.top = -h + 'px';
    }


}
picBoom();
/************************第一屏轮播图****************************/
function home3D() {
    var homeIcons = document.querySelectorAll('#content .list .home .homeIcon ul>li');
    var homeLis = document.querySelectorAll('#content .list .home .homelist>li');
    var oldIndex = 0;
    var nowIndex = 0;
    var hometimer = null;

    for (var i = 0; i < homeIcons.length; i++) {
        homeIcons[i].index=i;
        homeIcons[i].onclick=function () {
            clearInterval(hometimer);
            oldIndex=nowIndex;
            nowIndex=this.index;
            //小圆点移动
            homeIcons[oldIndex].className='';
            homeIcons[nowIndex].className='active';
            //图片移动
            for (var j = 0; j <homeIcons.length; j++) {
                homeLis[j].className = '';
            }

            if(oldIndex < nowIndex) {
                homeLis[oldIndex].className = 'leftHide';
                homeLis[nowIndex].className = 'rightShow';
            }else if (oldIndex > nowIndex){
                homeLis[oldIndex].className = 'rightHide'
                homeLis[nowIndex].className = 'leftShow'
            }
            auto();
        }
    }
    function auto() {
        hometimer = setInterval(function () {
            oldIndex = nowIndex++;
            nowIndex = nowIndex % 4;
            homeLis[oldIndex].className = 'leftHide';
            homeLis[nowIndex].className = 'rightShow';

            homeIcons[oldIndex].className = '';
            homeIcons[nowIndex].className = 'active';

        },2000);
    }
    auto();
}

/************************resize****************************/
window.onresize=function () {
    move(now);
    contentBind();
}
/****************************滚轮绑定事件**************************/
//ie/chrome
document.onmousewheel = function (event){

    // 鼠标滚轮降频
    clearTimeout(timer);
    timer = setTimeout(function (){
        fun(event);
    },200);
}
//firfox
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',function (event){
        //鼠标滚轮降频
        clearTimeout(timer);
        timer = setTimeout(function (){

            fun(event);

        },200);
    });
}

function fun(event){
    event=event||window.event;
    var flag='';
    if (event.wheelDelta){
        //ie/chrom
        if(event.wheelDelta > 0){
            flag='up';
        }else {
            flag='down';
        }
    }else if(event.detail){
        //firfox
        if(event.detail < 0){
            flag='up';
        }else {
            flag='down';
        }
    }
    preIndex=now;
    //判断是否超出页面
    if((preIndex==0 && flag=='up') || (preIndex==liNodes.length-1 && flag=='down')){
        return;
    }
    switch (flag){
        case 'up':
            // console.log(flag);
            if (now>0){
                now--;
            }
            move(now);
            break;
        case 'down':
            if(now<liNodes.length-1){
                now++;
            }
            move(now);
            break;
    }
    event.preventDefault && event.preventDefault();
    return false;
}

