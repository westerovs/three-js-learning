const links = document.querySelectorAll('.link')

links.forEach((link, index) => {
    link.addEventListener('pointerdown', () => {
        console.log(index)
        createScript(index)
    })
})

// костыль ! утечка памяти !
function createScript(source) {
    const script = document.createElement('script')

    setTimeout(() => {
        if (script.classList.contains('task-script')) {
            script.remove()
            return
        }
    }, 100)

    script.setAttribute('type', 'module')
    script.src = `tasks/${source}.js`
    script.classList.add('task-script')

    document.querySelector('body').append(script)
}

// createScript(4)