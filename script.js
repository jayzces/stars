const svg = document.querySelector('.svg')
const nameSpace = 'http://www.w3.org/2000/svg'


// helper functions
const setAttributes = (el, attr) => {
    for (let key in attr) {
        el.setAttribute(key, attr[key])
    }
}


// animation function
const moveStar = (path, line, counter) => {
    let lineLength = line.getTotalLength()
    counter += 0.003

    let x = line.getPointAtLength(counter * lineLength).x - 20
    let y = line.getPointAtLength(counter * lineLength).y - 20

    path.setAttribute('transform', `translate(${x}, ${y})`)

    if (counter < 1) {
        requestAnimationFrame(() => moveStar(path, line, counter))
    } else {
        path.setAttribute('transform', 'translate(0, 0)')
        let timeout = setTimeout(() => {
            requestAnimationFrame(() => moveStar(path, line, 0))
        }, Math.floor(Math.random() * 5000))
    }
}


// create stars
const createStars = () => {
    let starsGroup = document.createElementNS(nameSpace, 'g')
    let numberOfStars = 300
    let maxPos = 280

    for (let i = 0; i < numberOfStars; i++) {
        // circle
        let circle = document.createElementNS(nameSpace, 'circle')
        setAttributes(circle, {
            'r': 1,
            'cx': Math.floor(Math.random() * maxPos),
            'cy': Math.floor(Math.random() * maxPos),
            'fill': '#FFF'
        })

        // animation
        let animation = document.createElementNS(nameSpace, 'animate')
        setAttributes(animation, {
            'attributeName': 'opacity',
            'values': '0; 1; 0',
            'dur': (Math.random() * 20 + 20) / 10,
            'begin': (Math.random() * 20) / -10,
            'repeatCount': 'indefinite'
        })

        circle.append(animation)
        starsGroup.append(circle)
    }

    svg.append(starsGroup)
}

// create shooting stars
const createShootingStars = () => {
    let shootingStarsGroup = document.createElementNS(nameSpace, 'g')
    let linesGroup = document.createElementNS(nameSpace, 'g')
    let numberOfShootingStars = 6

    for (let i = 0; i < numberOfShootingStars; i++) {
        // shooting star
        let path = document.createElementNS(nameSpace, 'path')

        // starting and end points
        // must always -x & +y or +x & -y
        let x0 = i % 2 == 1 ? Math.random() * (-113 + 1) : -113
        let y0 = i % 2 == 1 ? -43 : Math.random() * (97 - -43 + 1)

        // line to
        let x1 = x0 + 112.16
        let y1 = y0 + 39.77

        // first curve
        let c1 = {
            cx1: x1 + 0.52,
            cy1: y1 + 0.18,
            cx2: x1 + 0.79,
            cy2: y1 + 0.76,
            cx: x1 + 0.6,
            cy: y1 + 1.27 // also vertical
        }

        // second curve
        let c2 = {
            cx1: x1 + 0.41,
            cy1: c1.cy + 0.52,
            cx2: x1 + 0.16,
            cy2: c1.cy + 0.78,
            cx: x1 - 0.68,
            cy: c1.cy + 0.59
        }

        setAttributes(path, {
            'fill': '#FFF',
            'd': `M${x0} ${y0}L${x1} ${y1}C${c1.cx1} ${c1.cy1} ${c1.cx2} ${c1.cy2} ${c1.cx} ${c1.cy}V${c1.cy}C${c2.cx1} ${c2.cy1} ${c2.cx2} ${c2.cy2} ${c2.cx} ${c2.cy}L${x0} ${y0}Z`,
            'id': `star-${i}`
        })

        // path to outside the svg
        let line = document.createElementNS(nameSpace, 'path')
        setAttributes(line, {
            // 'stroke': 'red',
            'd': `M${x0} ${y0}L${x0 + 420} ${y0 + 151.13}`,
            'id': `star-path-${i}`
        })

        shootingStarsGroup.append(path)
        linesGroup.append(line)

        requestAnimationFrame(() => moveStar(path, line, 0))
    }

    svg.append(linesGroup)
    svg.append(shootingStarsGroup)
}

createStars()
createShootingStars()