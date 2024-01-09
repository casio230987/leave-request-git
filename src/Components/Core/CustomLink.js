
function CustomLink(probs){
    var finalClassName = "";
    if(probs.className){
        finalClassName = probs.className;
    }
    if(probs.activeClassName && (window.location.pathname == probs.href)){
        finalClassName += probs.activeClassName;
    }
    const onClick = (event) => {
        // prevent full page reload
        event.preventDefault();
        // update url
        window.history.pushState({}, "", probs.href);
    
        // communicate to Routes that URL has changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
      };
    return <a href={probs.href} class={finalClassName} onClick={e=>onClick(e)} >{probs.children}</a>
}
export default CustomLink;