const links = document.querySelectorAll('.link')

const clearClass = (element, className = 'active') => {
    element.forEach(item => item.classList.remove(className))
}

function init(startItem = 0) {
    createScript(startItem)
    
    links.forEach((link, index) => {
        if (startItem === index) link.classList.add('active')
        
        link.addEventListener('pointerdown', () => {
            if (link.classList.contains('active')) return
            
            clearClass(links)
            link.classList.add('active')
            
            createScript(index)
        })
    })
}


// костыль ! утечка памяти !
function createScript(index) {
    let script = document.createElement('script')
    
    script.setAttribute('type', 'module')
    script.src = `js/tasks/${ index }.js`
    script.classList.add('task-script')
    
    document.querySelector('body').append(script)
    
    // setTimeout(() => {
    //     if (script.classList.contains('task-script')) {
    //         script.remove()
    //         script = null
    //     }
    // }, 100)
}

init()
