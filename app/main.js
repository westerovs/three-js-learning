const links = document.querySelectorAll('.link')

links.forEach((link, index) => {
    if (index === 0) {
        link.addEventListener('pointerdown', () => {
            console.log(index)
            createScript(1)
        })
    }

    if (index === 1) {
        link.addEventListener('pointerdown', () => {
            console.log(index)
            createScript(1.1)
        })
    }
})

function createScript(source) {
    const script = document.createElement('script')
    script.src = `tasks/${source}.js`
    document.querySelector('body').append(script)

    setTimeout(() => {
        script.remove()
    }, 1000)
}
