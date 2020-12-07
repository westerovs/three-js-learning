const links = document.querySelectorAll('.link')

links.forEach((link, index) => {
    switch (index) {
        case 0:
            link.addEventListener('pointerdown', () => {
                console.log(index)
                createScript(1)
            })
            break
        case 1:
            link.addEventListener('pointerdown', () => {
                console.log(index)
                createScript(1.1)
            })
            break
    }
})

// костыль
function createScript(source) {
    const script = document.createElement('script')
    script.src = `tasks/${source}.js`

    document.querySelector('body').append(script)

    setTimeout(() => script.remove(), 100)
}

createScript(1.1)