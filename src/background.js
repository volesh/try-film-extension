function changePage() {
	const text = document.querySelector('div.gwBsXc').innerText
	const name = text.split(': ')[1]
	const div = document.createElement('div')
	const innerBlock = document.createElement('div')
	const button = document.createElement('button')
	div.append(innerBlock)
	innerBlock.append(button)
	button.innerText =  'click'
	innerBlock.addEventListener('click', (ev)=>{
		ev.stopPropagation()
	})
	div.addEventListener('click', ()=>{
		div.remove()
	})
	innerBlock.style.cssText = 'margin:auto;width:300px;height:200px;background:white;display:flex;justify-content:center;align-items:center'
	div.style.cssText = 'position:fixed;display:flex'
	div.style.top = '0'
	div.style.bottom = '0'
	div.style.right = '0'
	div.style.left = '0'
	div.style.zIndex = '9999999999'
	div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
	document.body.append(div)
	button.addEventListener('click', ()=>{
		console.log(name);
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=b7069097c038a0da53f8836716fbfe81&query=${name}`)
			.then(value => value.json())
			.then(value => {
				const newFilm = value.results[ 0 ]
				const frame = document.createElement('iframe')
				frame.setAttribute('src', `http://localhost:3000/maine/movie/${newFilm.id}`)
				frame.style.cssText = 'width:100%; height:100%; z-index:999999999999; position:fixed;left:0;top:0'
				document.body.appendChild(frame)
			});
	})

}
chrome.action.onClicked.addListener((tab)=>{
	console.log(tab);
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		function: changePage
	})
})
