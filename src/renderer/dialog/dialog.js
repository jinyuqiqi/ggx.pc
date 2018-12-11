import $ from 'jquery'
function Dialog(){
    this.dialog = null
    this.mask = null
    this.setting = { //配置参数
        showbtn: true,
        confirm: function(){},
        cancel: function(){},
        hide: function(){},
        title: '提示',
        text: '',
        icon: null
    }
}

Dialog.prototype.init = function(opt){
        extend(this.setting, opt);
        this.creat();
        this.hide();
        this.confirm();
        this.cancel();
}

Dialog.prototype.creat = function(){
    this.dialog = document.createElement('div');
    this.dialog.className = "box";
    
    let innerHtml = `
        <div class="alert-dialog-text">
            <div class="alert-dialog-tle">
                ${this.setting.title}
            </div>
            <div class="alert-dialog-word">
                ${this.setting.text}
            </div>
        </div>
        <div class="alert-dialog-hide">
            <i class="iconfont icon-close icon-grey"></i>
        </div>
        <div class="alert-diaog-btns flex-center">
            <div class="btn-cancel pointer">取消</div>
            <div class="btn-confirm b_m pointer">确定</div>
        </div>
    `
    if(this.setting.icon!=null){
        let icon = ''
        switch(this.setting.icon){
            case 'success':
                icon = 'iconfont icon-chenggong c_success';
                break;
            case 'info':
                icon = 'iconfont icon-tishi- c_m';
                break;
            case 'error':
                icon = 'iconfont icon-chenggong c_error';
                break;
        }
        innerHtml = `
            <div class="alert-dialog-icon">
                <i class="${icon}"></i>
            </div>
            <h2>${this.setting.title}</h2>
        `
    }
    
    this.dialog.innerHTML = `
        <div id="alert-dialog">
            <div class="alert-dialog-mask"></div>
            <div class="alert-dialog-content">
                ${innerHtml}
            </div>
        </div>
    `
    document.body.appendChild(this.dialog);
    if(!this.setting.showbtn){
        $('.alert-diaog-btns').remove()
    }
    $('.alert-dialog-content').animate({width: '320px', height: '240px'}, 500)
}


//关闭窗口
Dialog.prototype.close = function(){
    const that = this;
    // oClose.onclick = function(){
    $('.alert-dialog-content').html('')
    $('.alert-dialog-content').animate({width: '0', height: '0'}, 500)
    setTimeout(() => {
        document.body.removeChild( that.dialog);
    }, 520)
        
    // }
}

Dialog.prototype.hide = function(){
    const that = this
    if(this.setting.icon != null) {
        setTimeout(() => {
          that.close()
          that.setting.hide()
        }, 2500)
        return
    }
    const oClose = this.dialog.getElementsByClassName('alert-dialog-hide')[0]
    oClose.onclick = function(){
        that.close()
    }
}

Dialog.prototype.cancel = function(){
    const that = this
     if(!this.setting.showbtn) return
    const oCancel = this.dialog.getElementsByClassName('btn-cancel')[0]
    oCancel.onclick = function(){
        that.setting.cancel()
        that.close()
    }
}

Dialog.prototype.confirm = function(){
    const that = this
     if(!this.setting.showbtn) return
    const oConfirm = this.dialog.getElementsByClassName('btn-confirm')[0]
    oConfirm.onclick = function(){
        that.setting.confirm()
        that.close()
    }
}

function extend(obj1,obj2){
    for(var i in obj2){
        obj1[i] = obj2[i];
    }
}

export default Dialog