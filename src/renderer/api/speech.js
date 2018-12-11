import $ from 'jquery'

function Speech(){
   this.audio = new Audio()
   this.audiosrc = null
   this.playIntervalFlag = null
}

Speech.prototype.pause = function(target){
    clearInterval(this.playIntervalFlag)
    this.playIntervalFlag = null
    this.audiosrc = null
    $('.speechbox').removeClass('active')
    if($('.speechbox').find('.iconfont').hasClass('icon-yuyinzuo2')){
        $('.speechbox').find('.iconfont').removeClass('icon-yuyinzuo2').addClass('icon-yuyin')
    }
    this.audio.pause() 
}

Speech.prototype.play = function(audiosrc, target){
    
    if(this.audiosrc!=null) this.pause()
    
    this.audiosrc = audiosrc
    this.audio.src = audiosrc
    if(this.audio.paused){
        clearInterval(this.playIntervalFlag)
        $(target).addClass('active')
        this.playIntervalFlag = setInterval(() => {
           if($(target).find('.iconfont').hasClass('icon-yuyin')){
              $(target).find('.iconfont').removeClass('icon-yuyin').addClass('icon-yuyinzuo2')
           }else{
              $(target).find('.iconfont').removeClass('icon-yuyinzuo2').addClass('icon-yuyin')
           }
           if(this.audio.ended||this.audio.paused) {
              clearInterval(this.playIntervalFlag)
              this.playIntervalFlag = null
              this.audiosrc = null
              $(target).removeClass('active')
              $(target).find('.iconfont').removeClass('icon-yuyinzuo2').addClass('icon-yuyin')
           }
        }, 500)
        this.audio.play()
    }
}

export default Speech