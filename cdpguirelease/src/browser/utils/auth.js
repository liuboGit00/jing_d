import {check_pwd} from '../actions/useractions'
import API from 'fetch-api';
import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,loginpath,logoutpath,username,password} from '../confs/host'


module.exports = {
  username : '',
  password : '',
  login(loginName, pass, cb) {
    //cb = arguments[arguments.length - 1]
    if (sessionStorage.token) {
      if (cb) cb(true)
      //this.onChange(true)
      return
    }



    pretendRequest(loginName, pass, (res) => {
      if (res.flag == "success") {
        sessionStorage.token = res.user.token
        // sessionStorage.sessionid=res.sessionid
        if (cb) cb(true)
        this.onChange(loginName,pass)
        sessionStorage.user = JSON.stringify(res.user);
      } else {
        if (cb) cb(false)
        //this.onChange(false)
      }
    })
  },

  getToken: function () {
    return sessionStorage.token
  },

  logout: function (cb) {
    postlogout()
    delete sessionStorage.token
    delete sessionStorage.user
    
    if (cb) cb()
    this.onChange(false)
    window.location.reload();
  },

  loggedIn: function () {
    return !!sessionStorage.token
  },

  onChange: function (loginName,pass) {
      this.username = loginName,
      this.password = pass
  }
}

function postlogout() {
  const params = { 'baseURI': restapi, 'path': logoutpath };
  let api = new API({
    baseURI: params.baseURI
  });
  // log in to our API with a user/pass
  api.auth(username,password)
  api.post(params.path, {
    credentials: 'include',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
    mode: 'cors',
    body: JSON.stringify({
      'key':sessionStorage.token
      })
  }, (err, res, body) => {
    if (err) {
      console.log('err', err)
      cb({flag:'error',message:'网络连接错误，请重新再试!'});
      return false
    }

  })
}


function pretendRequest(loginName, pass, cb) {
  const params = { 'baseURI': restapi, 'path': loginpath };
  let api = new API({
    baseURI: params.baseURI
  });
    // log in to our API with a user/passap
  api.auth(loginName,pass)  
  api.post(params.path, {
  // credentials: 'include',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
    mode: 'cors',
    body: JSON.stringify({
      'username':loginName,
      'password':pass
    })
  }, (err, res, body) => {
    if (err) {
      console.log('err', err)
      cb({flag:'error',message:'网络连接或用户名或密码错误，请重新再试!'});
      return false
    }

    if(res.status == 200){
          
      cb({flag:'success',message:'',user:{username:loginName,token:body.key}});
    }else{
      cb({flag:'error',message:'用户名或密码错误，请重新再试!'});
    }
  })
}
// import {check_pwd} from '../actions/useractions'
// import API from 'fetch-api';
// import {restapi,poolspath,diskspath,volumespath,agentspath,mirrorspath,loginpath,logoutpath,username,password} from '../confs/host'


// module.exports = {
//   username : '',
//   password : '',
//   login(loginName, pass, cb) {
//     //cb = arguments[arguments.length - 1]
//     if (sessionStorage.token) {
//       if (cb) cb(true)
//       this.onChange(true)
//       return
//     }



//     pretendRequest(loginName, pass, (res) => {
//       if (res.flag == "success") {
//         sessionStorage.token = res.user.token
//         sessionStorage.sessionid=res.user.sessionid
//         if (cb) cb(true)
//         this.onChange(loginName,pass)
//         sessionStorage.user = JSON.stringify(res.user);
//       } else {
//         if (cb) cb(false)
//         //this.onChange(false)
//       }
//     })
//   },

//   getToken: function () {
//     return sessionStorage.token
//   },

//   logout: function (cb) {
//     delete sessionStorage.token
//     delete sessionStorage.user
//     postlogout()
//     if (cb) cb()
//     this.onChange(false)
//     window.location.reload();
//   },

//   loggedIn: function () {
//     return !!sessionStorage.token
//   },

//   onChange: function (loginName,pass) {
//       this.username = loginName,
//       this.password = pass
//   }
// }

// function postlogout() {
//   const params = { 'baseURI': restapi, 'path': logoutpath };
//   let api = new API({
//     baseURI: params.baseURI
//   });
//   // log in to our API with a user/pass
  
//   api.post(params.path, {
//     credentials: 'include',
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
//     mode: 'cors',
//     body: JSON.stringify({
//       })
//   }, (err, res, body) => {
//     if (err) {
//       console.log('err', err)
//       cb({flag:'error',message:'网络连接错误，请重新再试!'});
//       return false
//     }

//   })
// }


// function pretendRequest(loginName, pass, cb) {
//   const params = { 'baseURI': restapi, 'path': loginpath };
//   let api = new API({
//     baseURI: params.baseURI
//   });
//   // log in to our API with a user/pass
//   api.post(params.path, {
//     //credentials: 'include',
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','cache-control':'no-cache' },
//     mode: 'cors',
//     body: JSON.stringify({
//       'username':loginName,
//       'password':pass
//     })
//   }, (err, res, body) => {
//     if (err) {
//       console.log('err', err)
//       cb({flag:'error',message:'网络连接或用户名或密码错误，请重新再试!'});
//       return false
//     }

//     if(res.status == 200){
//       cb({flag:'success',message:'',user:{username:loginName,token:body.key,}});
//     }else{
//       cb({flag:'error',message:'用户名或密码错误，请重新再试!'});
//     }
//   })
// }
