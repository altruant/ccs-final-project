(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{54:function(e,t,a){},57:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(23),r=a.n(i),o=a(15),c=(a(54),a(24)),l=a(12),m=a.n(l),u=a(19),d=a(7),p=a(8),h=a(3),b=a(10),g=a(9),v=a(5),y=a(78),f=(a(56),a(57),a(14)),E=a.n(f),k=a.p+"static/media/Wordmark-Color.ff6b0ef2.png",j=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,"hiiii")}}]),a}(s.a.Component),O=a(22),C=a(17),S=a(27),I=a(35),T=a(41),w=a(42),N=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={body:""},n.handleInput=n.handleInput.bind(Object(h.a)(n)),n.addComment=n.addComment.bind(Object(h.a)(n)),n}return Object(p.a)(a,[{key:"handleInput",value:function(e){this.setState(Object(C.a)({},e.target.name,e.target.value))}},{key:"addComment",value:function(){this.props.addComment({timestamp:this.props.timestamp,parsedStamp:this.props.parsedStamp,body:this.state.body}),this.setState({body:""})}},{key:"render",value:function(){return s.a.createElement("div",{className:this.props.className},s.a.createElement("span",null,this.props.parsedStamp),s.a.createElement("textarea",{type:"text",name:"body",value:this.state.body,onChange:this.handleInput}),s.a.createElement("button",{className:"button ".concat(this.state.body?"":"hidden"),type:"button",onClick:this.addComment},"Add Comment"))}}]),a}(s.a.Component),R=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={player:null,isEditing:!1,comments:[],parsedStamp:"0s",timestamp:"0"},n.getTimestamp=n.getTimestamp.bind(Object(h.a)(n)),n.getIDFomURL=n.getIDFomURL.bind(Object(h.a)(n)),n.handleInput=n.handleInput.bind(Object(h.a)(n)),n.handleSubInput=n.handleSubInput.bind(Object(h.a)(n)),n.onReady=n.onReady.bind(Object(h.a)(n)),n.seekToTime=n.seekToTime.bind(Object(h.a)(n)),n.addComment=n.addComment.bind(Object(h.a)(n)),n.removeComment=n.removeComment.bind(Object(h.a)(n)),n.edit=n.edit.bind(Object(h.a)(n)),n.updateLink=n.updateLink.bind(Object(h.a)(n)),n.deleteMethod=n.deleteMethod.bind(Object(h.a)(n)),n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/links/".concat(this.props.match.params.id,"/")).then((function(e){return e.json()})).then((function(t){return e.setState(Object(c.a)({},t))}))}},{key:"updateLink",value:function(){var e=Object(u.a)(m.a.mark((function e(t){var a,n,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),delete(a=Object(c.a)({},this.state)).player,console.log(a),e.next=6,fetch("/api/links/".concat(this.props.match.params.id,"/"),{method:"PATCH",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"},body:JSON.stringify(JSON.parse(JSON.stringify(a)))});case 6:return n=e.sent,e.next=9,n.json();case 9:s=e.sent,console.log(s),this.setState({isEditing:!this.state.isEditing});case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteMethod",value:function(){var e=this;fetch("/api/links/".concat(this.props.match.params.id,"/"),{method:"DELETE",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"}}).then((function(t){e.props.history.push("/".concat(localStorage.getItem("username"),"/your-links"))})).catch((function(e){return console.log("ERR",e)}))}},{key:"getTimestamp",value:function(e){var t,a=e.target.getCurrentTime(),n=new Date(1e3*a).toISOString().substr(11,8);a<60?t=n.substr(6,7)+"s":a<600?t=n.substr(4,7):a<3600&&(t=n.substr(3,7)),this.setState({parsedStamp:t,timestamp:a})}},{key:"getIDFomURL",value:function(){var e=this.YouTubeGetID(this.state.youtube_url);this.setState({youtube_ID:e})}},{key:"YouTubeGetID",value:function(e){return void 0!==(e=e.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2]?e[2].split(/[^0-9a-z_-]/i)[0]:e[0]}},{key:"edit",value:function(){this.setState({isEditing:!this.state.isEditing})}},{key:"handleInput",value:function(e){this.setState(Object(C.a)({},e.target.name,e.target.value))}},{key:"handleSubInput",value:function(e,t){var a=Object(O.a)(this.state.comments);a[t].body=e.target.value,this.setState(a)}},{key:"onReady",value:function(e){this.setState({player:e.target})}},{key:"seekToTime",value:function(e){this.state.player.seekTo(e)}},{key:"addComment",value:function(e){var t=Object(O.a)(this.state.comments);t.push(e),this.setState({comments:t})}},{key:"removeComment",value:function(e){var t=Object(O.a)(this.state.comments);t.splice(e,1),this.setState({comments:t})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container"},s.a.createElement(S.a,{videoId:this.state.youtube_ID,opts:{height:"390",width:"640"},onPause:this.getTimestamp,onReady:this.onReady}),s.a.createElement("div",{className:"info ".concat(this.state.isEditing?"hidden":"")},s.a.createElement("div",{className:"title"},s.a.createElement("h3",null,"".concat(this.state.title,"//").concat(localStorage.getItem("username"))),s.a.createElement(I.Icon,{onClick:this.edit,icon:T.a}),s.a.createElement(I.Icon,{onClick:this.deleteMethod,icon:w.a})),this.state.comments.map((function(t,a){return s.a.createElement("div",{key:a},s.a.createElement("button",{onClick:function(){return e.seekToTime(t.timestamp)}},s.a.createElement("span",null,t.parsedStamp),s.a.createElement("span",null,t.body)))}))),s.a.createElement("div",{className:"editForm ".concat(this.state.isEditing?"":"hidden")},s.a.createElement("form",{onSubmit:this.updateLink},s.a.createElement("div",{className:"url-title"},s.a.createElement("input",{type:"url",value:this.state.youtube_url,onChange:this.handleInput,name:"youtube_url",placeholder:"Youtube URL"}),s.a.createElement("input",{type:"text",value:this.state.title,onChange:this.handleInput,name:"title",placeholder:"Title"}),s.a.createElement("button",{type:"button",onClick:function(){return e.getIDFomURL()}},"Update Youtube URL")),s.a.createElement("div",{className:"comments"},this.state.comments.map((function(t,a){return s.a.createElement("div",{key:a},s.a.createElement("span",null,t.parsedStamp),s.a.createElement("input",{type:"text",name:"body",onChange:function(t){return e.handleSubInput(t,a)},value:t.body}),s.a.createElement("button",{type:"button",onClick:function(){return e.removeComment(a)}},"Remove"))})),s.a.createElement(N,{className:"comment-form ".concat(this.state.isEditing?"":"hidden"),addComment:this.addComment,timestamp:this.state.timestamp,parsedStamp:this.state.parsedStamp})),s.a.createElement("button",{type:"submit"},"Save"))))}}]),a}(s.a.Component),F=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={links:[]},n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=Object(u.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/links/",{method:"GET",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"}});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,console.log("data",a),this.setState({links:a});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return console.log("render link list"),s.a.createElement("div",null,this.state.links.map((function(t,a){return s.a.createElement("div",{key:a},s.a.createElement(o.b,{to:"/".concat(e.props.username,"/").concat(t.id)},s.a.createElement("div",{className:"list-item-".concat(a)},s.a.createElement("img",{src:"https://img.youtube.com/vi/".concat(t.youtube_ID,"/0.jpg"),alt:"#"}),t.title)))})))}}]),a}(s.a.Component),x=a(77),L=a.p+"static/media/incin.62964a7f.jpg",D=a.p+"static/media/darksamus.f3bab206.jpg",_=a.p+"static/media/ken.549e08de.jpg",P=a.p+"static/media/bayo.a518da5c.jpg",U=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={youtube_url:"https://www.youtube.com/watch?v=m6CrWBOxecY",title:"mkleo",comments:[],isCommenting:!1,isEditing:!1,youtube_ID:"",timestamp:"0",parsedStamp:"0s"},n.handleInput=n.handleInput.bind(Object(h.a)(n)),n.addComment=n.addComment.bind(Object(h.a)(n)),n.showForm=n.showForm.bind(Object(h.a)(n)),n.removeComment=n.removeComment.bind(Object(h.a)(n)),n.getTimestamp=n.getTimestamp.bind(Object(h.a)(n)),n.toggleTitle=n.toggleTitle.bind(Object(h.a)(n)),n.seekToTime=n.seekToTime.bind(Object(h.a)(n)),n.onReady=n.onReady.bind(Object(h.a)(n)),n}return Object(p.a)(a,[{key:"getTimestamp",value:function(e){var t,a=e.target.getCurrentTime(),n=new Date(1e3*a).toISOString().substr(11,8);a<60?t=n.substr(6,7)+"s":a<600?t=n.substr(4,7):a<3600&&(t=n.substr(3,7)),this.setState({parsedStamp:t,timestamp:a})}},{key:"YouTubeGetID",value:function(e){return void 0!==(e=e.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2]?e[2].split(/[^0-9a-z_-]/i)[0]:e[0]}},{key:"onReady",value:function(e){this.setState({player:e.target})}},{key:"seekToTime",value:function(e){this.state.player.seekTo(e)}},{key:"toggleTitle",value:function(){this.setState({isEditing:!this.state.isEditing})}},{key:"showForm",value:function(){this.setState({isCommenting:!0}),this.setState({isEditing:!this.state.isEditing});var e=this.YouTubeGetID(this.state.youtube_url);this.setState({youtube_ID:e})}},{key:"addComment",value:function(e){var t=Object(O.a)(this.state.comments);t.push(e),this.setState({comments:t})}},{key:"removeComment",value:function(e){var t=Object(O.a)(this.state.comments);t.splice(e,1),this.setState({comments:t})}},{key:"handleInput",value:function(e){this.setState(Object(C.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e,t=this;return e=null===localStorage.getItem("login")?s.a.createElement(s.a.Fragment,null,s.a.createElement("span",null,"Login to create a new Link")):s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"form"},s.a.createElement("div",{className:"left-side col-12 col-lg-7"},s.a.createElement("div",{className:"youtube-container ".concat(this.state.isCommenting?"":"hidden")},s.a.createElement(S.a,{className:"youtube-player",videoId:this.state.youtube_ID,opts:{height:"438.75px",width:"100%"},onPause:this.getTimestamp,onReady:this.onReady}),s.a.createElement("div",{className:"video-title ".concat(this.state.isCommenting?"":"hidden"," ")},s.a.createElement("h2",null,"".concat(this.state.title)),s.a.createElement("button",{type:"button",className:"button",onClick:function(){return t.toggleTitle()}},"Edit"))),s.a.createElement("div",{className:"url-title ".concat(this.state.isEditing?"hidden":"")},s.a.createElement("div",{className:"title-form"},s.a.createElement("input",{className:"title-input",type:"text",name:"title",onChange:this.handleInput,value:this.state.title,placeholder:"Title",maxlength:"40"}),s.a.createElement("input",{className:"url-input",type:"url",name:"youtube_url",onChange:this.handleInput,value:this.state.youtube_url,placeholder:"Youtube URL"}),s.a.createElement("button",{class:"button",disabled:!this.state.youtube_url,onClick:this.showForm},"".concat(this.state.isEditing?"Update":"Continue"))))),s.a.createElement("div",{className:"right-side ".concat(this.state.isCommenting?"":"hidden"," col-lg-5")},s.a.createElement("form",{onSubmit:function(e){return t.props.submitLink(e,t.state)}},this.state.comments.map((function(e,a){return s.a.createElement("div",{className:"display-comment",key:a},s.a.createElement("button",{type:"button",className:"timestamp-button",onClick:function(){return t.seekToTime(e.timestamp)}},s.a.createElement("span",{className:"parsed-stamp"},e.parsedStamp),s.a.createElement("span",{className:"comment-body"},e.body)),s.a.createElement("button",{type:"button",onClick:function(){return t.removeComment(a)}},"Remove"))})),s.a.createElement(N,{className:"comment-form",addComment:this.addComment,timestamp:this.state.timestamp,parsedStamp:this.state.parsedStamp}),s.a.createElement("button",{className:"button",type:"submit"},"Save"))))),s.a.createElement("div",{className:"linkform container-fluid"},s.a.createElement("div",{className:"carousel-container ".concat(this.state.isCommenting?"hidden":"")},s.a.createElement("h1",{className:"page-title"},"Create"),s.a.createElement(x.a,{className:"carousel",interval:"8000",controls:!1,indicators:!1},s.a.createElement(x.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:P,alt:"bayo"})),s.a.createElement(x.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:L,alt:"incin"})),s.a.createElement(x.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:D,alt:"dsamus"})),s.a.createElement(x.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:_,alt:"ken"})))),s.a.createElement("div",{className:"form-container"},e))}}]),a}(s.a.Component),J=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={username:"",password:""},n.handleInput=n.handleInput.bind(Object(h.a)(n)),n}return Object(p.a)(a,[{key:"handleInput",value:function(e){this.setState(Object(C.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container login"},s.a.createElement("form",{onSubmit:function(t){return e.props.logIn(t,e.state)}},s.a.createElement("h2",null,"Login"),s.a.createElement("label",{htmlFor:"username"},"Username"),s.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleInput,placeholder:"Username"}),s.a.createElement("label",{htmlFor:"password"},"Password"),s.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleInput,placeholder:"Password"}),s.a.createElement("button",{type:"submit"},"Login")))}}]),a}(s.a.Component),Y=Object(v.f)(J),M=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={username:"",email:"",password1:"",password2:""},n.handleInput=n.handleInput.bind(Object(h.a)(n)),n}return Object(p.a)(a,[{key:"handleInput",value:function(e){this.setState(Object(C.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container"},s.a.createElement("form",{onSubmit:function(t){return e.props.handleRegister(t,e.state)}},s.a.createElement("h2",null,"Register"),s.a.createElement("label",{htmlFor:"username"},"Username"),s.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleInput,placeholder:"Username"}),s.a.createElement("label",{htmlFor:"email"},"Email"),s.a.createElement("input",{type:"email",name:"email",value:this.state.email,onChange:this.handleInput,placeholder:"Email"}),s.a.createElement("label",{htmlFor:"password1"},"Password"),s.a.createElement("input",{type:"password",name:"password1",value:this.state.password1,onChange:this.handleInput,placeholder:"Password"}),s.a.createElement("label",{htmlFor:"password2"},"Confirm Password"),s.a.createElement("input",{type:"password",name:"password2",value:this.state.password2,onChange:this.handleInput,placeholder:""}),s.a.createElement("button",{type:"submit"},"Register")))}}]),a}(s.a.Component),X=Object(v.f)(M),z=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={isLoggedIn:!1},n.logIn=n.logIn.bind(Object(h.a)(n)),n.logOut=n.logOut.bind(Object(h.a)(n)),n.handleRegister=n.handleRegister.bind(Object(h.a)(n)),n.submitLink=n.submitLink.bind(Object(h.a)(n)),n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){this.setState({username:localStorage.getItem("username")})}},{key:"logOut",value:function(){var e=Object(u.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/accounts/rest-auth/logout/",{method:"POST",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"},body:JSON.stringify(E.a.get("Authorization"))});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,console.log("Response",a),E.a.remove("Authorization"),localStorage.removeItem("login"),localStorage.removeItem("username"),this.setState({isLoggedIn:!1});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"logIn",value:function(){var e=Object(u.a)(m.a.mark((function e(t,a){var n,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("/accounts/rest-auth/login/",{method:"POST",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"},body:JSON.stringify(a)});case 3:return n=e.sent,e.next=6,n.json();case 6:s=e.sent,console.log("Response",s),E.a.set("Authorization","Token ".concat(s.key)),localStorage.setItem("login","".concat(s.key)),localStorage.setItem("username","".concat(s.user.username)),this.props.history.push("/");case 12:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"handleRegister",value:function(){var e=Object(u.a)(m.a.mark((function e(t,a){var n,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("/accounts/rest-auth/registration/",{method:"POST",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"},body:JSON.stringify(a)});case 3:return n=e.sent,e.next=6,n.json();case 6:s=e.sent,console.log("Response",s),E.a.set("Authorization","Token ".concat(s.key)),localStorage.setItem("login",s.key),localStorage.setItem("username","".concat(s.user.username)),this.props.history.push("/");case 12:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"submitLink",value:function(){var e=Object(u.a)(m.a.mark((function e(t,a){var n,s,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),delete(n=Object(c.a)({},a)).player,e.next=5,fetch("/api/links/",{method:"POST",headers:{"X-CSRFToken":E.a.get("csrftoken"),"Content-Type":"application/json"},body:JSON.stringify(n)});case 5:return s=e.sent,e.next=8,s.json();case 8:i=e.sent,this.props.history.push("/".concat(this.state.username,"/").concat(i.id)),console.log("Response",i);case 11:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t;return null===localStorage.getItem("login")?(t=s.a.createElement(s.a.Fragment,null),e=s.a.createElement(s.a.Fragment,null,s.a.createElement(o.b,{to:"/register-form"},"Register"),s.a.createElement(o.b,{to:"/login-form"},"Login"))):(t=s.a.createElement(s.a.Fragment,null,s.a.createElement(o.b,{to:"/".concat(localStorage.getItem("username"),"/your-links")},"Your Links")),e=s.a.createElement(o.b,{onClick:this.logOut,to:"/"},"Logout")),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"nav-container"},s.a.createElement(y.a,null,s.a.createElement("div",{className:"main"},s.a.createElement(o.b,{to:"/"},s.a.createElement("img",{src:k,alt:"#"})),s.a.createElement(o.b,{to:"/create"},"Create"),t),s.a.createElement("div",{className:"user"},e))),s.a.createElement(v.c,null,s.a.createElement(v.a,{path:"/register-form"},s.a.createElement(X,{handleRegister:this.handleRegister})),s.a.createElement(v.a,{path:"/login-form"},s.a.createElement(Y,{logIn:this.logIn})),s.a.createElement(v.a,{path:"/create"},s.a.createElement(U,{submitLink:this.submitLink})),s.a.createElement(v.a,{path:"/".concat(this.state.username,"/your-links")},s.a.createElement(F,{username:this.state.username})),s.a.createElement(v.a,{path:"/".concat(this.state.username,"/:id"),exact:!0,component:R}),s.a.createElement(v.a,{path:"/",component:j})))}}]),a}(s.a.Component),A=Object(v.f)(z),G=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,79)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),n(e),s(e),i(e),r(e)}))};r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(o.a,null,s.a.createElement(A,null))),document.getElementById("root")),G()}},[[75,1,2]]]);
//# sourceMappingURL=main.6ae49591.chunk.js.map