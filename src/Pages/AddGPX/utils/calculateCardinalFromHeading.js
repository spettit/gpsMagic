function calculateCardinalFromHeading (heading) {
    let adjustedHeading = parseFloat(heading)+22.5
    let enuma = Math.floor(adjustedHeading/45)
    switch(enuma) {
        case 0: {
            return ["N", ""]
        }
        case 1: {
            return ["N", "E"]
        }
        case 2: {
            return ["", "E"]
        }
        case 3: {
            return ["S", "E"]
        }
        case 4: {
            return ["S", ""]
        }
        case 5: {
            return ["S","W"]
        }
        case 6: {
            return ["", "W"]
        }
        case 7: {
            return ["N", "W"]
        }
        default: {
            return ["N", ""];
          }
    }

}

export default calculateCardinalFromHeading