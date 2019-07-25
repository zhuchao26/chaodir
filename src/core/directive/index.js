
export default (Vue) => {
    Vue.directive("onloadPic", (el, binding, vnode) => {
        let val=binding.value;
        ipt(val);
        function ipt (data){
            var ipt = document.createElement("input");
            ipt.type="file";
            ipt.multiple=data.multiple?"multiple":"";//限制一张.
            ipt.accept="image/jpeg,image/png,image/jpg";
            ipt.style.display="none";
            el.prepend(ipt);
            el.onclick=function(){
                el.children[0].click();
            }
        }
        el.children[0].onchange=function(event){
            let file=event.target.files[0];
            vnode.context.fileUpload(URL.createObjectURL(file))
        }
    })
  
}