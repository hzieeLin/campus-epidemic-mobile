
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/account/login/login","pages/epidemicPersonnel/index/index","pages/epidemicPersonnel/index/openCard","pages/student/index/openCard","pages/student/my/my","pages/student/scan/scan","pages/isolationPersonnel/index/index","pages/isolationPersonnel/index/message","pages/isolationPersonnel/my/my","pages/student/index/index","pages/student/index/leave","pages/student/index/back","pages/student/index/vacation","pages/epidemicPersonnel/index/feedback","pages/epidemicPersonnel/my/my","pages/epidemicPersonnel/scan/scan","pages/epidemicPersonnel/index/myFeed/myFeed","pages/common/subSuccess/subSuccess","pages/isolationPersonnel/index/myFeed/myFeed","pages/isolationPersonnel/index/openCard/openCard","pages/isolationPersonnel/index/record/record","pages/common/leaveSuccess/leaveSuccess"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#ffffff","backgroundColor":"#e0e0e0","background":"#e0e0e0"},"tabBar":{"list":[]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"campus-epidemic-mobile","compilerVersion":"3.5.3","entryPagePath":"pages/account/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/account/login/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/epidemicPersonnel/index/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/epidemicPersonnel/index/openCard","meta":{},"window":{"navigationBarTitleText":"日常健康打卡"}},{"path":"/pages/student/index/openCard","meta":{},"window":{"navigationBarTitleText":"每日健康打卡"}},{"path":"/pages/student/my/my","meta":{},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/student/scan/scan","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/isolationPersonnel/index/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/isolationPersonnel/index/message","meta":{},"window":{"navigationStyle":"反馈记录"}},{"path":"/pages/isolationPersonnel/my/my","meta":{},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/student/index/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/student/index/leave","meta":{},"window":{"navigationBarTitleText":"出校审批"}},{"path":"/pages/student/index/back","meta":{},"window":{"navigationBarTitleText":"返校审批"}},{"path":"/pages/student/index/vacation","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/epidemicPersonnel/index/feedback","meta":{},"window":{"navigationBarTitleText":"反馈处理"}},{"path":"/pages/epidemicPersonnel/my/my","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/epidemicPersonnel/scan/scan","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/epidemicPersonnel/index/myFeed/myFeed","meta":{},"window":{"navigationBarTitleText":"个人反馈","enablePullDownRefresh":false}},{"path":"/pages/common/subSuccess/subSuccess","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/isolationPersonnel/index/myFeed/myFeed","meta":{},"window":{"navigationBarTitleText":"个人反馈","enablePullDownRefresh":false}},{"path":"/pages/isolationPersonnel/index/openCard/openCard","meta":{},"window":{"navigationBarTitleText":"每日健康打卡","enablePullDownRefresh":false}},{"path":"/pages/isolationPersonnel/index/record/record","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/common/leaveSuccess/leaveSuccess","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
