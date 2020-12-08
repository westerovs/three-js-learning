const links = document.querySelectorAll('.link')

links.forEach((link, index) => {
    link.addEventListener('pointerdown', () => {
        createScript(index)
    })
})

// костыль ! утечка памяти !
function createScript(source) {
    const script = document.createElement('script')
    script.src = `tasks/${source}.js`
    script.classList.add('task-script')

    document.querySelector('body').append(script)
    setTimeout(() => {
        if (script.classList.contains('task-script')) {
            script.remove()
        }
    }, 100)
}

createScript(2)