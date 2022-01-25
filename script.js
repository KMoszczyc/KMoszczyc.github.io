let theme = localStorage.getItem('theme')
if(theme==null) {
    setTheme('light')
} else {
    setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')

for (let i=0; i< themeDots.length; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.dataset.mode;
        setTheme(mode)
    })
}

function setTheme(mode) {
    switch (mode){
        case 'blue':
            document.getElementById('theme-style').href = 'default.css'
            break;
        case 'red':
            document.getElementById('theme-style').href = 'red.css'
            break;
        case 'green':
            document.getElementById('theme-style').href = 'green.css'
            break
        case 'purple':
            document.getElementById('theme-style').href = 'purple.css'
            break;
    }

    localStorage.setItem('theme', mode)
}


