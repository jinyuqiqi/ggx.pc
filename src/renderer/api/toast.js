import { default as swal } from 'sweetalert2'
import router from '../router/index'

export const handlefail = (title='错误提示！', text='', path='/login') =>{
  swal({
      title: title,
      type: 'error',
      text: text,
      showConfirmButton: false,
      timer: 2500
  }).then(
      function () {
          router.push({ path: path})
      },
      function (dismiss) {
          router.push({ path: path})
      }
  )
  return
}

export const handlemodal = (title='', text='', callback=function(){}, params={}) =>{
  swal({ 
    title: title, 
    text: text, 
    type: 'warning',
    showCancelButton: true, 
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#aaaaaa',
    confirmButtonText: '确定', 
    cancelButtonText: '取消'
  }).then(function(result){
    if(result.value){
      callback(params)
    }else{
      return
    }
  })
}

export const handlesuccess = (title='操作成功!', text='') =>{
  swal({
      title: title,
      text: '',
      type: 'success',
      showConfirmButton: false,
      timer: 2500
  })
}

export const handlenotice = (title='提示！', text='') =>{
  swal({
      title: title,
      type: 'info',
      text: text,
      showConfirmButton: false,
      timer: 2500
  })
}