(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{478:function(e,t,r){},480:function(e,t,r){"use strict";r(478)},484:function(e,t,r){"use strict";r.r(t);var n=r(9),o=(r(19),r(2)),c=r(247);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d=Object(c.defineComponent)({layout:"login",name:"Login",setup:function(){var e=Object(c.ref)([{type:"input",id:"enterpriseId",el:{placeholder:"租户Id"},rules:[{type:"string",trigger:"blur",required:!0,message:"请输入租户ID"}]},{type:"input",id:"username",el:{placeholder:"用户名 / 邮箱"},rules:[{type:"string",trigger:"blur",required:!0,message:"请输入账号"}]},{type:"input",id:"password",el:{placeholder:"密码",type:"password","show-password":!0},rules:[{type:"string",trigger:"blur",required:!0,message:"请输入密码"}]}]),t=function(){var e=Object(c.getCurrentInstance)(),t=Object(c.ref)(!1),r=e.$route.query.redirect;return{loading:t,handleLogin:function(){var form=e.$refs.form;form.validate(function(){var n=Object(o.a)(regeneratorRuntime.mark((function n(o){var data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o){n.next=2;break}return n.abrupt("return");case 2:return data=form.getFormValue(),t.value=!0,n.prev=4,n.next=7,e.$store.dispatch("login",{body:f({channel:"pc"},data),redirect:r});case 7:return n.prev=7,t.value=!1,n.finish(7);case 10:case"end":return n.stop()}}),n,null,[[4,,7,10]])})));return function(e){return n.apply(this,arguments)}}())}}}();return{formContent:e,loading:t.loading,handleLogin:t.handleLogin}},head:function(){return{title:"DEEPEXI ADMIN 登录"}}}),h=(r(480),r(5)),component=Object(h.a)(d,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login"},[t("div",{staticClass:"main"},[t("el-form-renderer",{ref:"form",attrs:{content:this.formContent,"status-icon":""}},[t("el-form-item",[t("el-button",{attrs:{loading:this.loading,type:"primary",round:"","native-type":"submit"},on:{click:this.handleLogin,submit:function(e){e.preventDefault()}}},[this._v("登录")])],1)],1)],1)])}),[],!1,null,null,null);t.default=component.exports}}]);