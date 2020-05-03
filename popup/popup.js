chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	chrome.tabs.sendMessage(tabs[0].id, { getSelectedWord: true }, (word) => {
		showResponse(word);
	});
});

async function showResponse(word) {
	const app = document.querySelector('#app');

	if (!word) {
		app.innerHTML = 'Please select a word.';
		return;
	}

	let markup;
	try {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${Math.trunc(Math.random() * 2)}` // It's a 50% chance to fail(at 0)
		);
		if (!res.ok) {
			throw new Error("Couldn't find the word.");
		}

		const definition = await res.json();

		markup = `
			<h2>${word}</h2>
			<p>${definition.title}</p>`;
	} catch (error) {
		markup = error.message;
	} finally {
		app.innerHTML = markup;
	}
}
