(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{399:function(e,n,r){"use strict";r.r(n);r(51),r(116);var t={layout:"login",name:"Login",components:{},data:function(){return{loading:!1,form:{username:"",password:""},rules:{username:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{login:function(){var e=this;this.$store.dispatch("login",this.form).then((function(){e.loading=!1,e.$router.replace("/")})).catch((function(n){e.loading=!1,console.error(n)}))}}},o=r(29),component=Object(o.a)(t,(function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"login"})}),[],!1,null,null,null);n.default=component.exports}}]);