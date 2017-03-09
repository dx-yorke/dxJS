function type (el) {
	return typeof el;
}

function types (...els) {
	let arr = []

	for(let i = 0 ; i < els.length; i++) {
		arr.push(type(els[i]))
	}

	return arr;
}


class SystemConsole {
	constructor() {}
	doubleConsole(...args) {
		for(let i = 0 ; i < args.length ; i++) {
			console.log(args[i])
		}
	}
	translate(message) {
		let lang = navigator.language
		let output = ''
		switch(lang) {
			case "uk" :
				output = message.uk;
				break;
			case "ru" :
				output = message.ru;
				break;
			case "en" :
				output = message.en;
				break;
			default :
				output = message;
				break;
		}

		return output;
	}
	log(message, bool) {
		if(bool == true) {
			return this.doubleConsole(message, `Type of element - ${type(message)}`)
		}
		else {
			return console.log(message)
		}
	}

	consoleErrorWithAlert(message, alerted) {
		let string = {
			uk: "Помилка. Перегляньте будь ласка Вашу консоль",
			ru: "Ошибка. Посмотрите пожалуйста в Вашу консоль",
			en: "Error. Please check your console"
		}
		string = this.translate(string)
		if(alerted) {
			string = alerted
		}

		console.error(message)
		alert(string)
		return;
	}

	error(message, bool, string) {
		if(bool == true) {
			return this.consoleErrorWithAlert(message, string)
		}
		else {
			return console.error(message)
		}
	}
}





	function makeTransition (el, timeout, prop) {
		el.style.transition = timeout + "s ease-in-out"
		let beforeTransition = el.style.transition
		if(prop) {
			el.style.transition = prop + " " + beforeTransition
		}
	}

	function get(el) {
		let string = new String(el)
		let output = ''
		let childStarted = string.indexOf('>'),
			childEnded   = string.lastIndexOf('>'),
			childSelector = string.slice(childEnded + 1, childEnded + 2),
			isChild = false;

		let selector = string.slice(0,1)
		let element = string.slice(1, childEnded),
			tag = string.slice(0, childEnded),
			childTag = string.slice(childEnded + 1)

		if(childStarted <= 0 || childEnded <= 0) {
			element = string.slice(1)
		}
		else {
			isChild = true
		}


		let childElement = string.slice(childStarted + 2)

		switch(selector) {
			case "#" :
				output = document.getElementById(element);
				break;
			case "." :
				output = document.getElementsByClassName(element)[0]
				break;
			case "%" :
				output = document.getElementsByName(element)[0]
				break;
			default :
				output = document.getElementsByTagName(tag)[0]
				break;
		}

		if(isChild == true) {
			switch(childSelector) {
				case "#" :
					output = output.getElementById(childElement)
					break;
				case "." :
					output = output.getElementsByClassName(childElement)
					break;
				case "%" :
					output = output.getElementsByName(childElement)
					break;
				default :
					output = output.getElementsByTagName(childTag)
			}
		}

		console.log(childTag)
		return output

	}

	function remove(el) {
		let element = el

		element.parentNode.removeChild(element)
	}



	function fadeOut (el, speed) {
		el.style.opacity = el.style.opacity || 1;
		switch(speed) {
			case "fast" :
				let intervalFast = setInterval(() => {
					console.log(el.style.opacity)
					el.style.opacity = el.style.opacity - 0.1

					if(el.style.opacity <= 0) {
						el.style.display = 'none'
						el.style.opacity = 0
						clearInterval(intervalFast)
					} 
					console.log(el.style.opacity)
				}, 1000/70)
				break;

			case "slow" :
				let intervalSlow = setInterval(() => {
					console.log(el.style.opacity)
					el.style.opacity = el.style.opacity - 0.1

					if(el.style.opacity <= 0) {
						el.style.display = 'none'
						el.style.opacity = 0
						clearInterval(intervalSlow)
					} 
					console.log(el.style.opacity)
				}, 1000/20)
				break;
			default: 
				let intervalDefault = setInterval(() => {
					console.log(el.style.opacity)
					el.style.opacity = el.style.opacity - 0.1

					if(el.style.opacity <= 0) {
						el.style.display = 'none'
						el.style.opacity = 0
						clearInterval(intervalDefault)
					} 
					console.log(el.style.opacity)
				}, 1000/ ((70 + 20) / 2))
				break;
		}
	}

	//Just a current year

	function getCurrentYear() {
		return new Date().getFullYear()
	}

	function getDateString (bool) {
		let d = new Date().getDate(),
     	m = new Date().getMonth() + 1 , 
     	y = getCurrentYear()

     	if(d < 10) {
     		d = "0" + d
     	}
     	if(m < 10) {
     		m = "0" + m
     	}

     	let [s,mnts,h] = 
     		[new Date().getSeconds(),
     		new Date().getMinutes(),
     		new Date().getHours()]
     	let string = ''

     	if(mnts < 10) {
     		mnts = "0" + mnts
     	}

     	if(h < 10) {
     		h = "0" + h
     	}

     	if(s < 10) {
     		s = "0" + s
     	}

     	if(bool == true) {
     		string = `${d}/${m}/${y}   ${h}:${mnts}:${s}`
     	}
     	else if (bool == 'date') {
     		string = `${d}/${m}/${y}`
     	}
     	else {
     		string = `${h}:${mnts}:${s}`
     	}

     	return string
	}

	function appendDate() {
		let el = document.getElementById('time')
		let el2 = document.getElementById('full-date')
		let el3 = document.getElementById('date')


		if(el) {
			el.innerHTML = getDateString()
		}
		if(el2) {
			el2.innerHTML = getDateString(true)
		}
		if(el3) {
			el3.innerHTML = getDateString('date')
		}
		setInterval(() => {
			if(el) {

			el.innerHTML = getDateString()
			}
			if(el2 ) {

			el2.innerHTML = getDateString(true)
			}
		}, 1000)
	}
	
	function htmlTo(el, content) {
		return el.innerHTML = content;
	}

	function reactHtmlTo(el, content, timeout) {
		setInterval(() => {
			el.innerHTML = content
		}, timeout)
	}

	function adaptive(el) {
		let newButton = document.createElement('button'),
				dopnav    = document.createElement('div')

		dopnav.id = 'dx-dopnav'

						
		newButton.innerHTML = "open"
		dopnav.appendChild(newButton)

		let nav = document.getElementById(el),
			button = document.getElementById(el + "-button")
			props  =  {
				position: nav.style.position,
				display: nav.style.display,
				height: nav.style.height,
				width: nav.style.width, 
				lis: {
					display: nav.getElementsByTagName('li')[0].style.display
				}
			},
			closeButton = document.createElement('button')

		closeButton.innerHTML = '&times;'
		closeButton.addEventListener('click', () => {
			nav.style.width = "0%"
			for(let i = 0 ; i < li.length ; i++) {
							li[i].style.transition = 'all 1s ease-in-out'
							li[i].style.width = '0%'
							li[i].style.display = 'none'
						}

			closeButton.parentNode.removeChild(closeButton)
			document.getElementById('dx-dopnav').style.display = 'block'
			document.getElementById('dx-dopnav').style.opacity = 1
		})

		nav.appendChild(dopnav)

		nav.style.zIndex = 1000

		let isButton = false

		if(button) {
			isButton = true
		}

		let metas = document.getElementsByTagName('meta')
		let isCorrectMeta = false

		if(metas.length <= 0) {
			console.error("You don't have meta tags. Please correct it")
		}
		else {
			for(let i = 0 ; i < metas.length; i++) {
				if(metas[i].name == 'viewport' && metas[i].content == "width=device-width, initial-scale=1") {
					isCorrectMeta = true
				}
			}

			if(isCorrectMeta == true) {
				return
			}
			else {
				let meta = document.createElement('meta')

				meta.name = 'viewport'

				meta.content = "width=device-width, initial-scale=1"
				document.head.appendChild(meta)
			}
		}

		nav.style.opacity = 1

		let attribute = nav.getAttribute('dx-adaptive'),
			howWidth  = nav.getAttribute('dx-width')

		if(howWidth) {
			navigationWidth = howWidth
		}
		else {
			navigationWidth = 720
		}

		let li = nav.getElementsByTagName('li')
		if(attribute == 'on') {

			makeTransition(nav, 1, 'width')

			window.onload = function () {
				let uw = window.innerWidth 


				

				if(uw < navigationWidth) {
					nav.style.width = "0%"
					nav.style.position = 'fixed'
					nav.style.top = 0 
					nav.style.left = 0
					nav.style.height = '100%'
					for(let i = 0 ; i < li.length ; i++) {
							li[i].style.transition = 'all 1s ease-in-out'
							li[i].style.width = '0%'
							li[i].style.display = 'none'
						}
					if(isButton == true) {
						return;
					}
					else {
						


						newButton.addEventListener('click', () => {
							nav.style.width = '56%'
							fadeOut(dopnav)
							for(let i = 0 ; i < li.length ; i++) {
								li[i].style.transition = 'all 1s ease-in-out'
								li[i].style.width = '100%'
								li[i].style.display = 'block'
							}
							nav.append(closeButton)
						})

						console.log(newButton)
					}
				}
				else {
					nav.style.position = props.position
					nav.style.display = props.display
					nav.style.width = props.width
					nav.style.height = props.height
					document.getElementById('dx-dopnav').style.display = 'none'
				}
			}

			window.onresize = function () {
				let uw = window.innerWidth 


				

				if(uw < navigationWidth) {
					dopnav.style.opacity = 1
					dopnav.style.display = 'block'
					nav.style.width = "0%"
					nav.style.position = 'fixed'
					nav.style.top = 0 
					nav.style.left = 0
					nav.style.height = '100%'
					for(let i = 0 ; i < li.length ; i++) {
							li[i].style.transition = 'all 1s ease-in-out'
							li[i].style.width = '0%'
							li[i].style.display = 'none'
						}
					if(isButton == true) {
						return;
					}
					else {
						


						newButton.addEventListener('click', () => {
							nav.style.width = '56%'
							fadeOut(dopnav)
							for(let i = 0 ; i < li.length ; i++) {
								li[i].style.transition = 'all 1s ease-in-out'
								li[i].style.width = '100%'
								li[i].style.display = 'block'
							}
							nav.append(closeButton)
						})

						console.log(newButton)
					}
				}
				else {
					nav.style.position = props.position
					nav.style.display = props.display
					nav.style.width = props.width
					nav.style.height = props.height
					document.getElementById('dx-dopnav').style.display = 'none'
				}

		}}			
	}
	

	appendDate()

	adaptive('nav')
