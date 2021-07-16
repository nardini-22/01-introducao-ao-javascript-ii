const visor = document.querySelector("#visor")
const historyContent = document.querySelector("#history")
const historyButton = document.querySelector("#historyBtn")
historyButton.disabled = true;

const history = []

let calculateResult
let visor2 = document.querySelector("#visor2")
let conta = ""
let lastNumber
let lastOperation
let operationCheck = false
let decimalCheck = false
let lastCalc = true
let clearCheck = false

const showNumber = (numberValue) => {
    if (clearCheck) {
        clearVisor()
        visor2.value = calculateResult
        conta = ''
        clearCheck = false
        visor2.value = ''
    }
    if (visor.value.length >= 14) {
        return null;
    } else if (visor.value == "0" || visor.value == "Syntax error") {
        visor.value = numberValue
    } else {
        visor.value += numberValue
        conta += numberValue
        visor2.value += " "
        lastNumber = visor.value
        lastCalc = false
    }
}

const decimal = (numberValue) => {
    if (!decimalCheck) {
        visor.value += numberValue
        conta += numberValue
        decimalCheck = true
    }
}

const clearVisor = () => {
    clearCheck = false
    operationCheck = false
    let splittedCount = conta.split(lastOperation)
    console.log(visor.value, lastOperation, splittedCount)
    splittedCount[splittedCount.length - 1] = ""
    splittedCount.push(lastOperation)
    let newConta = splittedCount.join("")
    conta = newConta
    visor.value = ""
    //console.log(conta, splittedCount)
}

const deleteNumber = () => {
    if (visor.value.length == 1 || visor.value == "0" || visor.value == "Syntax Error") {
        visor.value = ""
        clearCheck = false
        operationCheck = false
    } else {
        visor.value = visor.value.substring(0, visor.value.length - 1)
        conta = conta.substring(0, conta.length - 1)
        console.log(conta)
        
    }
}

const setOperation = (numberValue) => {
    if (clearCheck) {
        //console.log(visor2.value)
        clearVisor()
        visor2.value = ''
        visor2.value = calculateResult
        conta = calculateResult
        clearCheck = false
    }

    if (visor.value == "0" || visor.value == "Syntax error") {
        visor.value = ""
    } else if (operationCheck) {
        return null
    } else {
        conta += numberValue
        visor.value = ''
        visor2.value = conta
        operationCheck = true
        lastOperation = numberValue
        lastCalc = false
    }

}

const calculate = () => {
    //console.log(conta)
    teste = visor.value
    calculateResult = eval(conta)
    try {
        if (lastCalc) {
            let lastResult = visor.value
            let lastCalculate = eval(`${visor.value} ${lastOperation} ${lastNumber}`)
            history.push(`${visor.value} ${lastOperation} ${lastNumber} = ${lastCalculate}`)

            visor2.value = `${lastResult} ${lastOperation} ${lastNumber}`
            visor.value = lastCalculate
            lastCalc = true
            calculateResult = lastCalculate
            //console.log(`${calculateResult} ${lastOperation} ${lastNumber}`)
        }
        if (visor.value != '' && !lastCalc) {
            visor.value = calculateResult
            visor2.value = conta
            history.push(`${conta} = ${calculateResult}`)
            lastCalc = true
        }
        historyButton.disabled = false
        clearCheck = true
        operationCheck = false
    }
    catch (err) {
        visor.value = "Syntax error"
    }
}


const clearAll = () => {
    visor.value = ""
    conta = ""
    visor2.value = ""
    clearCheck = false
    operationCheck = false
}

const showHistory = () => {
    historyContent.innerHTML = ""
    historyContent.style.display = "block"
    historyContent.innerHTML += `<h3>Histórico</h3>`
    history.map((e) => {
        historyContent.innerHTML += `<p>${e}</p>`
    })
}